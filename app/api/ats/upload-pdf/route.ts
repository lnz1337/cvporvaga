import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// pdf-parse is a CommonJS module, need to use dynamic import
const pdfParse = require('pdf-parse');

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPE = 'application/pdf';

export async function POST(request: NextRequest) {
    try {
        // Parse FormData
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Nenhum arquivo foi enviado' },
                { status: 400 }
            );
        }

        // Validar tipo de arquivo
        if (file.type !== ALLOWED_MIME_TYPE) {
            return NextResponse.json(
                { error: 'Apenas arquivos PDF são permitidos' },
                { status: 400 }
            );
        }

        // Validar tamanho do arquivo
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'Arquivo muito grande. Tamanho máximo: 5MB' },
                { status: 400 }
            );
        }

        // Gerar nome único para o arquivo
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = `resume_${timestamp}_${randomString}.pdf`;
        const filePath = `uploads/${fileName}`;

        // Upload para Supabase Storage
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabaseAdmin.storage
            .from('resumes')
            .upload(filePath, buffer, {
                contentType: ALLOWED_MIME_TYPE,
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            console.error('Erro ao fazer upload:', uploadError);
            return NextResponse.json(
                { error: 'Erro ao fazer upload do arquivo' },
                { status: 500 }
            );
        }

        // Extrair texto do PDF
        let extractedText = '';
        try {
            const pdfData = await pdfParse(buffer);
            extractedText = pdfData.text;

            if (!extractedText || extractedText.trim().length < 10) {
                return NextResponse.json(
                    {
                        error:
                            'Não foi possível extrair texto do PDF. Pode ser um PDF escaneado (imagem). Por favor, cole o texto manualmente.',
                    },
                    { status: 400 }
                );
            }
        } catch (pdfError) {
            console.error('Erro ao extrair texto do PDF:', pdfError);

            // Limpar arquivo do storage se extração falhar
            await supabaseAdmin.storage.from('resumes').remove([filePath]);

            return NextResponse.json(
                {
                    error:
                        'Erro ao processar PDF. Verifique se o arquivo não está corrompido ou protegido por senha.',
                },
                { status: 400 }
            );
        }

        // Retornar texto extraído e informações do arquivo
        return NextResponse.json({
            success: true,
            text: extractedText,
            fileName: file.name,
            fileSize: file.size,
            storagePath: filePath,
        });
    } catch (error) {
        console.error('Erro no upload de PDF:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar arquivo' },
            { status: 500 }
        );
    }
}
