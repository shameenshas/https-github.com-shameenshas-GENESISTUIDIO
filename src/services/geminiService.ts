import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your_api_key_here") {
  console.warn("GEMINI_API_KEY is not set or is still the placeholder. Some features may not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function chatWithBrain(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are the 'Brain' of GENESISTUDIO. Your goal is to help the user expand their ideas on a node-based canvas. Respond with concise, creative insights that can be broken into nodes. If the user asks for a story or a concept, give them a foundation they can build on.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
}
