import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize the Gemini API client
// The API key is automatically injected by AI Studio into process.env.NEXT_PUBLIC_GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileData, mimeType } = body;

    if (!fileData || !mimeType) {
      return NextResponse.json({ error: 'Missing file data or mime type' }, { status: 400 });
    }

    // Prepare the prompt
    const prompt = `
      You are an expert ATS (Applicant Tracking System) and senior technical recruiter.
      Analyze the provided resume document and provide a comprehensive evaluation.
      
      Extract and evaluate the following:
      1. Calculate an overall ATS compatibility score (0-100).
      2. Provide a brief executive summary of the candidate's profile.
      3. Identify 3-5 key strengths of the resume.
      4. Identify 3-5 weaknesses or areas for improvement.
      5. Extract technical and soft skills.
      6. Score the formatting and readability (0-100).
      7. Score the impact and metrics usage (0-100) - how well they quantified their achievements.
      8. Provide 3-5 specific, actionable recommendations to improve the resume.
    `;

    // Call Gemini API
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
            atsScore: {
              type: Type.INTEGER,
              description: 'Overall ATS compatibility score (0-100)',
            },
            summary: {
              type: Type.STRING,
              description: 'Brief executive summary of the candidate',
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Key strengths of the resume',
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Areas for improvement',
            },
            skills: {
              type: Type.OBJECT,
              properties: {
                technical: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                soft: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['technical', 'soft'],
            },
            formattingScore: {
              type: Type.INTEGER,
              description: 'Score for formatting and readability (0-100)',
            },
            impactScore: {
              type: Type.INTEGER,
              description: 'Score for impact and metrics usage (0-100)',
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Actionable recommendations to improve the resume',
            },
          },
          required: [
            'atsScore',
            'summary',
            'strengths',
            'weaknesses',
            'skills',
            'formattingScore',
            'impactScore',
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
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
