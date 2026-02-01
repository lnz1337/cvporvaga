import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Criar usuário de teste
  const passwordHash = await bcrypt.hash('senha123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'teste@cvporvaga.com' },
    update: {},
    create: {
      email: 'teste@cvporvaga.com',
      name: 'Usuário Teste',
      passwordHash,
      credits: 10, // 10 créditos para testar
    },
  });

  console.log('✅ Usuário criado:', user.email);

  // Criar um currículo de exemplo
  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      rawText: `
JOÃO SILVA
Desenvolvedor Full Stack

RESUMO
Desenvolvedor com 5 anos de experiência em React, Node.js e TypeScript.

EXPERIÊNCIA
Desenvolvedor Full Stack - TechCorp
Jan 2020 - Atual
- Desenvolvimento de aplicações web
- Trabalho em equipe ágil
- Code review

Desenvolvedor Junior - StartupXYZ
Jan 2018 - Dez 2019
- Manutenção de código
- Desenvolvimento de features

EDUCAÇÃO
Ciência da Computação - Universidade Federal
2014 - 2017

HABILIDADES
JavaScript, React, Node.js, TypeScript, Python
      `.trim(),
    },
  });

  console.log('✅ Currículo de exemplo criado');

  console.log('🎉 Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
