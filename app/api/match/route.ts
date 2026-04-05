import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileData, mimeType, jobDescription } = body;

    if (!fileData || !mimeType || !jobDescription) {
      return NextResponse.json({ error: 'Missing file data, mime type, or job description' }, { status: 400 });
    }

    const prompt = `
      You are an expert technical recruiter and career coach.
      Compare the provided resume document with the following job description:
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      Calculate a match score (0-100) based on:
      - Required skills match (weight: 40%)
      - Experience level (weight: 30%)
      - Education requirements (weight: 15%)
      - Cultural fit keywords (weight: 15%)
      
      Provide a detailed JSON response with the following:
      1. matchScore: The overall match score (0-100).
      2. summary: A brief summary of how well the candidate fits the role.
      3. matchingSkills: Array of skills from the resume that match the job description.
      4. missingSkills: Array of important skills required by the job but missing from the resume.
      5. experienceMatch: A short sentence evaluating if the candidate's experience level matches the requirements.
      6. educationMatch: A short sentence evaluating if the candidate's education matches the requirements.
      7. salaryEstimate: A realistic salary range estimation based on the experience and typical market rates for this type of role (e.g., "$90k - $120k").
      8. competitivenessScore: A score (0-100) estimating how competitive this candidate would be in the current job market for this specific role.
      9. recommendations: 3-5 specific, actionable recommendations on how to tailor the resume for this specific job.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: fileData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchScore: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            matchingSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            missingSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            experienceMatch: { type: Type.STRING },
            educationMatch: { type: Type.STRING },
            salaryEstimate: { type: Type.STRING },
            competitivenessScore: { type: Type.INTEGER },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'matchScore',
            'summary',
            'matchingSkills',
            'missingSkills',
            'experienceMatch',
            'educationMatch',
            'salaryEstimate',
            'competitivenessScore',
            'recommendations',
          ],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error('No response from Gemini API');
    }

    const resultJson = JSON.parse(resultText);

    return NextResponse.json(resultJson);
  } catch (error: any) {
    console.error('Error matching job:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to match job' },
      { status: 500 }
    );
  }
}
