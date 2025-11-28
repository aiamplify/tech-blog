import { GoogleGenAI } from "@google/genai";

// Nano Banana Pro - Gemini 3 Pro Image Preview model
const NANO_BANANA_PRO_MODEL = "gemini-3-pro-image-preview";
const TEXT_MODEL = "gemini-1.5-pro";

const getClient = (apiKey: string) => new GoogleGenAI({ apiKey });

export const generateBlogPost = async (apiKey: string, topic: string): Promise<{ title: string; content: string; category: string; excerpt: string }> => {
  if (!apiKey) throw new Error("API Key is required");

  try {
    const ai = getClient(apiKey);

    const prompt = `You are a professional tech journalist writing for a premium tech publication. Write a comprehensive, well-structured blog post about: "${topic}".

IMPORTANT: Return ONLY a valid JSON object with these exact fields (no markdown code blocks, no backticks):

{
  "title": "A compelling, SEO-friendly headline",
  "category": "One of: AI, Robotics, Hardware, Software, Security, or Innovation",
  "excerpt": "A compelling 2-3 sentence summary that hooks the reader",
  "content": "Full HTML-formatted article content"
}

For the content field, create a rich, engaging article with proper HTML formatting:
- Use <h2> for main section headings (3-5 sections)
- Use <h3> for subsections where appropriate
- Use <p> tags for paragraphs
- Use <strong> for emphasis on key terms and important points
- Use <em> for subtle emphasis
- Use <ul> and <li> for bullet point lists
- Use <ol> and <li> for numbered lists
- Use <blockquote> for quotes or key takeaways
- Include 5-8 well-developed paragraphs minimum
- Make it informative, engaging, and professional
- Include specific examples, data points, or scenarios where relevant

Structure the article like a professional blog post with:
1. An engaging introduction
2. Multiple detailed sections with headings
3. Lists and bullet points for clarity
4. A strong conclusion

Do NOT include the main title as <h1> in the content (it's already in the title field).
Start directly with the introduction paragraph, then use <h2> for your first section.`;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Generate image using Nano Banana Pro (Gemini 3 Pro Image Preview)
export const generateImage = async (apiKey: string, prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is required for Nano Banana Pro");

  try {
    const ai = getClient(apiKey);

    const enhancedPrompt = `Create a high-quality, professional image for a tech blog: ${prompt}. 
    Style: Modern, clean, professional, suitable for a technology publication. 
    Quality: 8K, detailed, cinematic lighting, sharp focus.`;

    console.log("🍌 Generating image with Nano Banana Pro...");
    console.log("📝 Prompt:", prompt);

    const response = await ai.models.generateContent({
      model: NANO_BANANA_PRO_MODEL,
      contents: enhancedPrompt,
      config: {
        responseModalities: ["image", "text"],
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          // Return as base64 data URL
          const mimeType = part.inlineData.mimeType || 'image/png';
          const base64Image = `data:${mimeType};base64,${part.inlineData.data}`;
          console.log("✅ Image generated successfully with Nano Banana Pro");
          return base64Image;
        }
      }
    }

    throw new Error("No image data in Nano Banana Pro response");
  } catch (error) {
    console.error("🍌 Nano Banana Pro Error:", error);
    throw error;
  }
};

export const generateSummary = async (apiKey: string, text: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const ai = getClient(apiKey);
    const prompt = `You are a tech news editor. Summarize the following article content into a concise, 2-sentence hook that excites a tech-savvy audience. Content: ${text}`;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI service.";
  }
};

export const askAIQuestion = async (apiKey: string, context: string, question: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const ai = getClient(apiKey);
    const prompt = `Context: ${context}\n\nUser Question: ${question}\n\nAnswer the user's question based on the context provided. Keep it brief and informative.`;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt
    });

    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting answer.";
  }
}
