import { GoogleGenAI } from "@google/genai";

async function generateImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = "gemini-2.5-flash-image";

  const prompts = [
    {
      id: "campus",
      text: "Modern flat illustration of a beautiful European university campus with historic buildings and green lawns, bright and clean style, professional education theme.",
    },
    {
      id: "consultation",
      text: "Modern flat illustration of a student consultation scene, a professional advisor talking to a student, friendly atmosphere, tech-y clean background.",
    },
    {
      id: "ai_concept",
      text: "Modern flat illustration of AI study planning concept, digital interface with graduation cap, data nodes, and European map, futuristic and professional.",
    }
  ];

  const results = {};

  for (const p of prompts) {
    console.log(`Generating ${p.id}...`);
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: p.text }] },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        results[p.id] = `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  console.log(JSON.stringify(results));
}

generateImages();
