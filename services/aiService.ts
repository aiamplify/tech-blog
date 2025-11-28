import { GoogleGenAI } from "@google/genai";

// Nano Banana Pro - Gemini 3 Pro Image Preview model for image generation
const NANO_BANANA_PRO_MODEL = "gemini-3-pro-image-preview";
const TEXT_MODEL = "gemini-3-pro-preview";

// Store API key globally for image regeneration
let globalApiKey: string | null = null;

export const setApiKey = (key: string) => {
    globalApiKey = key;
};

export const getApiKey = () => globalApiKey;

// Generate image using Nano Banana Pro (Gemini 3 Pro Image Preview)
export const generateImageWithNanoBanana = async (prompt: string, apiKey?: string): Promise<string> => {
    const key = apiKey || globalApiKey;
    
    if (!key) {
        throw new Error("API Key is required for Nano Banana Pro image generation");
    }

    try {
        const genAI = new GoogleGenAI({ apiKey: key });
        
        const enhancedPrompt = `Create a high-quality, professional image for a tech blog: ${prompt}. 
        Style: Modern, clean, professional, suitable for a technology publication. 
        Quality: 8K, detailed, cinematic lighting, sharp focus.`;

        console.log("🎨 Generating image with Nano Banana Pro...");
        console.log("📝 Prompt:", prompt);

        const response = await genAI.models.generateContent({
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

        throw new Error("No image data in response");
    } catch (error) {
        console.error("❌ Nano Banana Pro Error:", error);
        throw error;
    }
};

// Generate multiple images for a blog post
export const generateBlogImages = async (topic: string, apiKey?: string): Promise<{
    featured: string;
    inline: string[];
}> => {
    const key = apiKey || globalApiKey;
    
    if (!key) {
        throw new Error("API Key is required");
    }

    console.log("🖼️ Generating blog images for:", topic);

    // Generate featured image
    const featuredPrompt = `Hero image for tech blog article about ${topic}, futuristic, cinematic, wide aspect ratio, professional photography style`;
    const featured = await generateImageWithNanoBanana(featuredPrompt, key);

    // Generate inline images
    const inlinePrompts = [
        `Infographic visualization about ${topic}, data charts, modern design, tech aesthetic`,
        `Conceptual illustration of ${topic} in action, detailed, professional`,
        `Future technology concept related to ${topic}, innovative, sleek design`
    ];

    const inline: string[] = [];
    for (const prompt of inlinePrompts) {
        try {
            const img = await generateImageWithNanoBanana(prompt, key);
            inline.push(img);
        } catch (error) {
            console.error("Failed to generate inline image:", error);
        }
    }

    return { featured, inline };
};

export const generateBlogPost = async (topic: string, apiKey?: string) => {
    const key = apiKey || globalApiKey;
    
    if (key) {
        // Store the API key for later image regeneration
        setApiKey(key);
        
        try {
            const genAI = new GoogleGenAI({ apiKey: key });

            // First, generate images using Nano Banana Pro
            console.log("🎨 Step 1: Generating images with Nano Banana Pro...");
            
            let featuredImage: string;
            let inlineImages: string[] = [];
            
            try {
                const images = await generateBlogImages(topic, key);
                featuredImage = images.featured;
                inlineImages = images.inline;
                console.log("✅ Generated", 1 + inlineImages.length, "images");
            } catch (imgError) {
                console.error("⚠️ Image generation failed, will use placeholders:", imgError);
                featuredImage = "";
                inlineImages = [];
            }

            // Then generate the blog content
            console.log("📝 Step 2: Generating blog content...");
            
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
8. Include EXACTLY 3 image placeholders using this format:
   <figure class="nano-banana-image my-8" data-image-index="INDEX" data-prompt="DESCRIPTION_FOR_IMAGE">
     <div class="image-placeholder bg-dark-800 rounded-xl h-64 flex items-center justify-center">
       <span class="text-dark-500">Image will be inserted here</span>
     </div>
     <figcaption class="text-center text-sm text-primary-400 mt-3">🍌 Generated by Nano Banana Pro</figcaption>
   </figure>
   Replace INDEX with 0, 1, 2 and DESCRIPTION_FOR_IMAGE with a detailed description of what the image should show.
9. The content MUST be substantial - at least 800 words
10. Make it informative, engaging, and professional`;

            const response = await genAI.models.generateContent({
                model: TEXT_MODEL,
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });

            console.log("✅ API Response received");

            // Get text from response
            let text = response.text;
            if (!text && response.candidates?.[0]?.content?.parts?.[0]?.text) {
                text = response.candidates[0].content.parts[0].text;
            }

            if (!text) {
                console.error("❌ No text in response:", response);
                throw new Error("No content generated from API");
            }

            console.log("✅ Parsing JSON response...");
            const data = JSON.parse(text);

            // Validate required fields
            if (!data.title || !data.content) {
                console.error("❌ Missing required fields:", data);
                throw new Error("API response missing required fields (title or content)");
            }

            // Replace image placeholders with actual generated images
            let content = data.content;
            
            // Replace placeholder images with actual Nano Banana Pro generated images
            inlineImages.forEach((imgSrc, index) => {
                const placeholderRegex = new RegExp(
                    `<figure class="nano-banana-image[^"]*"[^>]*data-image-index="${index}"[^>]*>.*?</figure>`,
                    'gs'
                );
                
                // Extract the prompt from the placeholder
                const promptMatch = content.match(new RegExp(`data-image-index="${index}"[^>]*data-prompt="([^"]*)"`, 's'));
                const imagePrompt = promptMatch ? promptMatch[1] : `Image ${index + 1} for ${topic}`;
                
                const replacement = `<figure class="nano-banana-image my-8 group relative" data-image-index="${index}" data-prompt="${imagePrompt}" data-editable="true">
                    <img src="${imgSrc}" alt="${imagePrompt}" class="w-full rounded-xl shadow-lg border border-white/10" />
                    <figcaption class="text-center text-sm text-primary-400 mt-3">🍌 Generated by Nano Banana Pro</figcaption>
                    <button class="edit-image-btn absolute top-4 right-4 p-2 rounded-lg bg-dark-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20" title="Regenerate this image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                    </button>
                </figure>`;
                
                content = content.replace(placeholderRegex, replacement);
            });

            // Set defaults for optional fields
            data.excerpt = data.excerpt || "";
            data.category = data.category || "Technology";
            data.tags = Array.isArray(data.tags) ? data.tags : [topic, "Technology"];
            data.content = content;

            console.log("✅ Blog post generated:", data.title);

            return {
                ...data,
                imageUrl: featuredImage
            };

        } catch (error) {
            console.error("❌ Gemini API Error:", error);
            const errorMsg = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to generate content: ${errorMsg}`);
        }
    }

    // Fallback - require API key
    throw new Error("API Key is required for Nano Banana Pro image generation. Please enter your Gemini API key.");
};

// Regenerate a single image - called when user clicks edit button
export const regenerateImage = async (prompt: string, apiKey?: string): Promise<string> => {
    const key = apiKey || globalApiKey;
    
    if (!key) {
        throw new Error("API Key is required for image regeneration");
    }

    console.log("🔄 Regenerating image with Nano Banana Pro...");
    console.log("📝 New prompt:", prompt);

    return await generateImageWithNanoBanana(prompt, key);
};

// Edit an existing image using Nano Banana Pro
// This sends the existing image along with edit instructions
export const editImageWithNanoBanana = async (
    existingImageBase64: string,
    editInstructions: string,
    apiKey?: string
): Promise<string> => {
    const key = apiKey || globalApiKey;
    
    if (!key) {
        throw new Error("API Key is required for Nano Banana Pro image editing");
    }

    try {
        const genAI = new GoogleGenAI({ apiKey: key });
        
        console.log("✏️ Editing image with Nano Banana Pro...");
        console.log("📝 Edit instructions:", editInstructions);

        // Extract base64 data from data URL if present
        let imageData = existingImageBase64;
        let mimeType = 'image/png';
        
        if (existingImageBase64.startsWith('data:')) {
            const matches = existingImageBase64.match(/^data:([^;]+);base64,(.+)$/);
            if (matches) {
                mimeType = matches[1];
                imageData = matches[2];
            }
        }

        // Create the edit prompt
        const editPrompt = `Edit this image according to these instructions: ${editInstructions}.
        Maintain the overall composition and style while applying the requested changes.
        Output a high-quality edited version of the image.`;

        // Send the image along with edit instructions
        const response = await genAI.models.generateContent({
            model: NANO_BANANA_PRO_MODEL,
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: mimeType,
                                data: imageData
                            }
                        },
                        {
                            text: editPrompt
                        }
                    ]
                }
            ],
            config: {
                responseModalities: ["image", "text"],
            }
        });

        // Extract edited image from response
        if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    // Return as base64 data URL
                    const responseMimeType = part.inlineData.mimeType || 'image/png';
                    const base64Image = `data:${responseMimeType};base64,${part.inlineData.data}`;
                    console.log("✅ Image edited successfully with Nano Banana Pro");
                    return base64Image;
                }
            }
        }

        throw new Error("No edited image data in response");
    } catch (error) {
        console.error("❌ Nano Banana Pro Edit Error:", error);
        throw error;
    }
};

// Legacy export for compatibility
export const generateImage = async (prompt: string, apiKey?: string): Promise<string> => {
    return regenerateImage(prompt, apiKey);
};
