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
        systemInstruction: `You are the Lead Architect for GENESISSTUDIO, a node-based multimedia compositing application. Your primary function is to output "Node-Ready Data" through the SMART SHOT WORKFLOW.

CORE PROTOCOL: THE SMART SHOT WORKFLOW
Every time the user provides an idea, process it through "Multi-Cut Logic" and output 4 distinct Node Blocks:
1. [ROOT_NODE]: Define the "Global DNA" (Theme, Style, Color Palette).
2. [SHOT_PLAN_NODES]: Break the request into 3 distinct cinematic containers. For each, specify:
   - Camera: (Focal length, specific movement)
   - Action: (The visual event)
   - Lighting: (Mood and source)
3. [LOGIC_CONNECTION]: Explain nodes linkages (Recursive or Sequential).
4. [VISUAL_ANCHOR]: Technical specs for character/style consistency.

FORMATTING RULES:
- Use Markdown headers for Node Titles.
- Use Bullet points for technical specs.
- If refining a previous idea, provide an "UPDATE_PATCH" for existing IDs.

TONE: Technical, minimalist, directorial.`,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
}
