import { GoogleGenAI, Type } from "@google/genai";
import { ReviewResult } from '../types';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    programDescription: {
      type: Type.STRING,
      description: "A brief, one or two-sentence summary of what the provided code does."
    },
    errors: {
      type: Type.ARRAY,
      description: "A list of critical errors, bugs, or security vulnerabilities in the code.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "The line number of the error. Use 0 for general errors."
          },
          comment: {
            type: Type.STRING,
            description: "A detailed explanation of the error."
          }
        },
        required: ["line", "comment"]
      }
    },
    suggestions: {
      type: Type.ARRAY,
      description: "A list of suggestions for improvement regarding best practices, performance, or readability.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "The line number the suggestion applies to. Use 0 for general suggestions."
          },
          comment: {
            type: Type.STRING,
            description: "A detailed explanation of the suggestion."
          }
        },
        required: ["line", "comment"]
      }
    },
    correctApproach: {
      type: Type.STRING,
      description: "A brief, high-level explanation of the ideal approach to writing this code correctly and efficiently."
    },
    updatedCode: {
      type: Type.STRING,
      description: "The complete, corrected, and improved version of the user's original code snippet."
    }
  },
  required: ["programDescription", "errors", "suggestions", "correctApproach", "updatedCode"]
};

export const reviewCode = async (code: string, language: string): Promise<ReviewResult> => {
  const systemInstruction = `You are a world-class senior software engineer and an expert in ${language}, acting as an automated code reviewer. 
  Your task is to provide a detailed, structured review of the user's code.
  Analyze it for bugs, security vulnerabilities, performance issues, and violations of best practices.
  Your response MUST be a JSON object adhering to the provided schema. The JSON object should contain these exact keys: 'programDescription', 'errors', 'suggestions', 'correctApproach', 'updatedCode'.
  If there are no errors or suggestions, return empty arrays for those keys.
  Do not include any markdown formatting like \`\`\`json in your response.`;

  const prompt = `Please provide a structured review for the following ${language} code snippet:\n\n\`\`\`${language}\n${code}\n\`\`\``;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation to ensure the structure matches ReviewResult
    if (result && typeof result.programDescription === 'string' && Array.isArray(result.errors)) {
      return result as ReviewResult;
    } else {
      throw new Error("Invalid response format from API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API for review:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("Invalid API Key. Please check your credentials.");
    }
    throw new Error("Failed to get a valid response from the code review service.");
  }
};

export const executeCode = async (code: string, language: string): Promise<string> => {
  const systemInstruction = `You are a code execution engine.
  Your task is to act as a ${language} interpreter.
  Execute the provided code snippet and return ONLY the raw output that would appear in a standard terminal or console.
  Do NOT provide any explanations, annotations, or markdown formatting.
  If the code produces an error, return the standard error message.
  If the code executes successfully but produces no output (e.g., it only defines a function), return a simple confirmation like "Code executed successfully with no output."`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: code,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.0,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for execution:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("Invalid API Key. Please check your credentials.");
    }
    throw new Error("Failed to get a valid response from the code execution service.");
  }
};