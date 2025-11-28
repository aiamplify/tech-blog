import { GoogleGenAI } from "@google/genai";

// Helper to generate a real AI image URL using Pollinations.ai (free, no key needed)
const getAIImage = (prompt: string) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=600&nologo=true`;

export const generateBlogPost = async (topic: string, apiKey?: string) => {
    if (apiKey) {
        try {
            const genAI = new GoogleGenAI({ apiKey });
            const model = "gemini-2.0-flash-exp";

            const prompt = `You are a professional tech journalist. Create a comprehensive blog post about "${topic}".

Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks):
{
    "title": "An engaging, SEO-optimized title",
    "category": "Technology",
    "excerpt": "A compelling 2-3 sentence summary",
    "tags": ["tag1", "tag2", "tag3"],
    "content": "Full HTML content goes here..."
}

CRITICAL REQUIREMENTS for the "content" field:

1. Write 5-8 detailed paragraphs with proper HTML formatting
2. Use <h2> for main sections (3-5 sections)
3. Use <h3> for subsections
4. Use <p> tags for ALL paragraphs
5. Use <strong> for key terms
6. Use <ul>/<li> for bullet lists
7. Use <blockquote> for important quotes or takeaways
8. The content MUST be substantial - at least 800 words

Do NOT include any images in the content - we will handle images separately.
Focus on creating rich, informative text content with proper HTML structure.

Example structure:
<p>Introduction paragraph...</p>
<h2>First Main Topic</h2>
<p>Detailed explanation...</p>
<ul><li>Point one</li><li>Point two</li></ul>
<h2>Second Main Topic</h2>
<p>More details...</p>
<blockquote>Key insight or quote</blockquote>`;

            const response = await genAI.models.generateContent({
                model: model,
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });

            console.log("Raw API Response:", response);
            console.log("Response structure:", JSON.stringify(response, null, 2));

            // The @google/genai package returns response.text as a string directly
            let text = response.text;

            // If text is undefined, try different properties
            if (!text) {
                console.log("response.text is undefined, checking alternatives...");
                console.log("response keys:", Object.keys(response));

                // Try to access the text from candidates
                if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
                    text = response.candidates[0].content.parts[0].text;
                    console.log("Found text in candidates:", text);
                }
            }

            if (!text) {
                console.error("Full response object:", response);
                throw new Error("No content generated from API - check console for response structure");
            }

            console.log("Response text:", text);

            const data = JSON.parse(text);
            console.log("Parsed data:", data);

            // Validate that we have all required fields
            if (!data.title) {
                console.error("Missing title in response");
                throw new Error("API response missing title field");
            }
            if (!data.content) {
                console.error("Missing content in response");
                throw new Error("API response missing content field");
            }
            if (!data.excerpt) {
                console.warn("Missing excerpt in response, will use empty string");
                data.excerpt = "";
            }
            if (!data.category) {
                console.warn("Missing category in response, defaulting to Technology");
                data.category = "Technology";
            }
            if (!data.tags || !Array.isArray(data.tags)) {
                console.warn("Missing or invalid tags in response, using default");
                data.tags = [topic, "Technology", "Innovation"];
            }

            console.log("Validated data - Title:", data.title);
            console.log("Validated data - Content length:", data.content?.length || 0);
            console.log("Validated data - Excerpt:", data.excerpt);

            // Generate a featured image based on the title
            const featuredImageUrl = getAIImage(`futuristic ${topic} concept art, cinematic lighting, 8k`);

            return {
                ...data,
                imageUrl: featuredImageUrl
            };

        } catch (error) {
            console.error("Gemini API Error:", error);
            // Provide more detailed error message
            if (error instanceof Error) {
                throw new Error(`Gemini API Error: ${error.message}`);
            }
            throw new Error("Failed to generate content with Gemini API");
        }
    }

    // Fallback Mock Implementation (if no key provided or for testing)
    const techTopic = topic || "Artificial Intelligence";
    const keywords = [techTopic, "Innovation", "Future", "Tech", "Digital Transformation"];
    const featuredImageUrl = getAIImage(`futuristic ${techTopic} concept art, cinematic lighting, 8k, high detail`);

    return new Promise<{ title: string; content: string; excerpt: string; category: string; tags: string[]; imageUrl: string }>((resolve) => {
        setTimeout(() => {
            resolve({
                title: `The Future of ${techTopic}: A Comprehensive Guide`,
                category: "Technology",
                excerpt: `Explore how ${techTopic} is transforming the industry with practical insights, expert analysis, and future outlooks. A deep dive into the next generation of tech.`,
                tags: keywords,
                imageUrl: featuredImageUrl,
                content: `
<div class="space-y-8">
    <p class="lead text-xl text-gray-300 leading-relaxed">
        The future of <strong>${techTopic}</strong> is comprehensive in how it transforms the way we interact with digital content. As we look ahead, we see a landscape defined by innovation, efficiency, and unprecedented scale.
    </p>

    <figure class="my-8 group relative cursor-pointer">
        <img src="${getAIImage(`futuristic ${techTopic} visualization, digital art`)}" alt="Concept Art of ${techTopic}" class="w-full rounded-xl shadow-2xl border border-gray-700/50 hover:scale-[1.01] transition-transform duration-500" />
        <figcaption class="text-center text-sm text-primary mt-3 font-mono">
            <span class="opacity-75">Generated by NanoBanana Pro v2.0</span> • Prompt: "Futuristic ${techTopic} visualization"
        </figcaption>
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span class="text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">Click to Edit with NanoBanana</span>
        </div>
    </figure>

    <h2 class="text-3xl font-bold text-white mt-12 mb-6 border-l-4 border-primary pl-4">1. The Evolution of ${techTopic}</h2>
    
    <p>
        To understand where we are going, we must first look at where we've been. The evolution of ${techTopic} has been marked by rapid milestones that have reshaped industries overnight.
    </p>

    <blockquote class="border-l-4 border-accent-green pl-6 py-2 my-8 bg-surface-dark/50 rounded-r-lg italic text-lg text-gray-300">
        "${techTopic} is not just a trend, but a fundamental shift in how we approach problem-solving. It represents the bridge between human creativity and machine efficiency."
        <footer class="text-sm text-gray-500 mt-2 not-italic font-bold">- Dr. Sarah Chen, AI Research Director</footer>
    </blockquote>

    <h2 class="text-3xl font-bold text-white mt-12 mb-6 border-l-4 border-primary pl-4">2. Market Growth & Adoption</h2>
    
    <p>
        Generative models and ${techTopic} solutions have seen exponential growth. The market has shifted towards more integrated and intelligent systems that prioritize user experience and reliability.
    </p>

    <figure class="my-8 group relative cursor-pointer">
        <img src="${getAIImage(`growth chart graph data visualization ${techTopic}, futuristic UI`)}" alt="Market Growth Chart" class="w-full rounded-xl shadow-lg border border-gray-700/50" />
        <figcaption class="text-center text-sm text-accent-green mt-3 font-mono">
            <span class="opacity-75">Analysis by NanoBanana Pro</span> • "Projected Market Growth 2024-2030"
        </figcaption>
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span class="text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">Click to Edit with NanoBanana</span>
        </div>
    </figure>

    <h2 class="text-3xl font-bold text-white mt-12 mb-6 border-l-4 border-primary pl-4">Conclusion</h2>
    
    <p>
        The future of ${techTopic} is bright. Intelligence engineers and developers are working tirelessly to create a more sustainable and efficient future. As tools like <strong>Gemini 3 Pro</strong> and <strong>NanoBanana Pro</strong> evolve, they will unlock new possibilities we can only dream of today.
    </p>
</div>
                `
            });
        }, 2500);
    });
};

export const generateImage = async (prompt: string) => {
    // Real AI image generation using Pollinations.ai
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&nologo=true&seed=${Math.random()}`);
        }, 1500);
    });
};
