import { GoogleGenerativeAI } from "@google/generative-ai";

const getClient = (apiKey: string) => new GoogleGenerativeAI(apiKey);

export const generateBlogPost = async (apiKey: string, topic: string): Promise<{ title: string; content: string; category: string; excerpt: string }> => {
  if (!apiKey) throw new Error("API Key is required");

  try {
    const ai = getClient(apiKey);
    const model = 'gemini-1.5-pro';

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

    const genModel = ai.getGenerativeModel({
      model: model,
      generationConfig: { responseMimeType: 'application/json' }
    });

    const result = await genModel.generateContent(prompt);
    const text = result.response.text();
    if (!text) throw new Error("No content generated");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateImage = async (apiKey: string, prompt: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is required");

  // Try multiple image generation services for reliability

  // Option 1: Try using a more reliable AI image service
  try {
    // Using a different, more reliable endpoint
    const cleanPrompt = prompt.replace(/[^\w\s,.-]/g, '').trim();
    const encodedPrompt = encodeURIComponent(cleanPrompt);

    // Use Hugging Face's image generation (more reliable)
    // This creates a deterministic URL that should work
    const seed = Math.floor(Math.random() * 10000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=600&seed=${seed}&nologo=true`;

    return imageUrl;
  } catch (error) {
    console.error("Image generation error:", error);

    // Fallback: Use a tech-themed placeholder from Unsplash
    const techKeywords = ['technology', 'computer', 'ai', 'robot', 'circuit', 'digital', 'cyber', 'tech'];
    const randomKeyword = techKeywords[Math.floor(Math.random() * techKeywords.length)];
    return `https://source.unsplash.com/1200x600/?${randomKeyword},technology`;
  }
};

export const generateSummary = async (apiKey: string, text: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const ai = getClient(apiKey);
    const model = 'gemini-1.5-pro';
    const prompt = `You are a tech news editor. Summarize the following article content into a concise, 2-sentence hook that excites a tech-savvy audience. Content: ${text}`;

    const genModel = ai.getGenerativeModel({ model: model });
    const result = await genModel.generateContent(prompt);

    return result.response.text() || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI service.";
  }
};

export const askAIQuestion = async (apiKey: string, context: string, question: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const ai = getClient(apiKey);
    const model = 'gemini-1.5-pro';
    const prompt = `Context: ${context}\n\nUser Question: ${question}\n\nAnswer the user's question based on the context provided. Keep it brief and informative.`;

    const genModel = ai.getGenerativeModel({ model: model });
    const result = await genModel.generateContent(prompt);

    return result.response.text() || "No answer generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting answer.";
  }
}

