import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { CVData } from './openai';
import { writeFile } from 'fs/promises';
import path from 'path';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  headline: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#1f2937',
  },
  section: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    borderBottom: '1pt solid #d1d5db',
    paddingBottom: 4,
  },
  experienceItem: {
    marginBottom: 12,
  },
  role: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  company: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skill: {
    fontSize: 10,
    padding: '4 8',
    backgroundColor: '#eff6ff',
    borderRadius: 4,
    color: '#1e40af',
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  institution: {
    fontSize: 10,
    color: '#6b7280',
  },
});

interface CVDocumentProps {
  data: CVData;
}

function CVDocument({ data }: CVDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.headline}>{data.headline}</Text>
          {data.summary && <Text style={styles.summary}>{data.summary}</Text>}
        </View>

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIÊNCIA PROFISSIONAL</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.role}>{exp.role}</Text>
                <Text style={styles.company}>
                  {exp.company} · {exp.dates}
                </Text>
                {exp.bullets && exp.bullets.map((bullet, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {bullet}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FORMAÇÃO ACADÊMICA</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>
                  {edu.institution} · {edu.dates}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>HABILIDADES</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJETOS</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{project.name}</Text>
                <Text style={styles.institution}>{project.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

export async function generatePDF(cvData: CVData): Promise<string> {
  const fileName = `cv-${Date.now()}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'generated-pdfs', fileName);

  const doc = <CVDocument data={cvData} />;
  const blob = await pdf(doc).toBlob();
  const buffer = Buffer.from(await blob.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/generated-pdfs/${fileName}`;
}
