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

// Blog post generation options
export interface BlogGenerationOptions {
    length: 'short' | 'medium' | 'long' | 'very-long' | 'epic';
    imageCount: number;
    postType: 'how-to' | 'review' | 'news' | 'opinion' | 'listicle' | 'case-study';
}

// Length configurations
const LENGTH_CONFIG = {
    'short': { words: 500, paragraphs: 3, sections: 2 },
    'medium': { words: 1000, paragraphs: 5, sections: 3 },
    'long': { words: 1500, paragraphs: 8, sections: 4 },
    'very-long': { words: 2000, paragraphs: 10, sections: 5 },
    'epic': { words: 3000, paragraphs: 15, sections: 7 }
};

// Post type configurations
const POST_TYPE_CONFIG = {
    'how-to': {
        name: 'How-To / Tutorial',
        structure: 'step-by-step guide with numbered instructions',
        tone: 'instructional and helpful',
        elements: 'Include prerequisites, step-by-step instructions, tips, common mistakes to avoid, and a summary'
    },
    'review': {
        name: 'Product/Tool Review',
        structure: 'comprehensive review with pros, cons, and verdict',
        tone: 'analytical and balanced',
        elements: 'Include overview, features breakdown, pros and cons, pricing, comparison with alternatives, and final verdict with rating'
    },
    'news': {
        name: 'News / Update',
        structure: 'news article format with key facts upfront',
        tone: 'informative and timely',
        elements: 'Include the key announcement, background context, implications, expert opinions, and what this means for readers'
    },
    'opinion': {
        name: 'Opinion / Analysis',
        structure: 'thought leadership piece with strong thesis',
        tone: 'analytical and persuasive',
        elements: 'Include a clear thesis, supporting arguments, counterarguments addressed, evidence and examples, and a compelling conclusion'
    },
    'listicle': {
        name: 'Listicle',
        structure: 'numbered list format with detailed items',
        tone: 'engaging and scannable',
        elements: 'Include an introduction, numbered items with descriptions, examples for each, and a conclusion summarizing key takeaways'
    },
    'case-study': {
        name: 'Case Study',
        structure: 'detailed analysis of a specific example',
        tone: 'analytical and evidence-based',
        elements: 'Include background, challenge/problem, solution implemented, results with data, lessons learned, and key takeaways'
    }
};

export const DEFAULT_GENERATION_OPTIONS: BlogGenerationOptions = {
    length: 'medium',
    imageCount: 3,
    postType: 'news'
};

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
export const generateBlogImages = async (
    topic: string,
    imageCount: number = 3,
    postType: string = 'news',
    apiKey?: string
): Promise<{
    featured: string;
    inline: string[];
}> => {
    const key = apiKey || globalApiKey;
    
    if (!key) {
        throw new Error("API Key is required");
    }

    console.log(`🖼️ Generating ${imageCount} blog images for:`, topic);

    // Generate featured image
    const featuredPrompt = `Hero image for tech blog article about ${topic}, futuristic, cinematic, wide aspect ratio, professional photography style`;
    const featured = await generateImageWithNanoBanana(featuredPrompt, key);

    // Generate inline images based on count and post type
    const inlineCount = Math.max(0, imageCount - 1); // -1 for featured image
    const inline: string[] = [];
    
    // Generate contextual prompts based on post type
    const getImagePrompts = (topic: string, count: number, type: string): string[] => {
        const prompts: string[] = [];
        
        const basePrompts: Record<string, string[]> = {
            'how-to': [
                `Step-by-step diagram showing ${topic} process, clean infographic style`,
                `Before and after comparison for ${topic}, split screen design`,
                `Tools and equipment needed for ${topic}, flat lay photography`,
                `Common mistakes visualization for ${topic}, warning style infographic`,
                `Success metrics dashboard for ${topic}, data visualization`,
                `Workflow diagram for ${topic}, flowchart style`,
                `Tips and tricks illustration for ${topic}, icon-based design`,
                `Checklist visualization for ${topic}, modern design`,
                `Progress stages for ${topic}, timeline infographic`,
                `Final result showcase for ${topic}, professional photography`
            ],
            'review': [
                `Product showcase for ${topic}, professional product photography`,
                `Features comparison chart for ${topic}, infographic style`,
                `User interface screenshot mockup for ${topic}, clean design`,
                `Pros and cons visualization for ${topic}, balanced design`,
                `Rating breakdown for ${topic}, star rating infographic`,
                `Price comparison for ${topic}, value chart`,
                `Alternative products comparison for ${topic}, side by side`,
                `User experience flow for ${topic}, UX diagram`,
                `Performance metrics for ${topic}, benchmark visualization`,
                `Final verdict badge for ${topic}, award style design`
            ],
            'news': [
                `Breaking news visualization about ${topic}, modern news graphic`,
                `Timeline of events for ${topic}, chronological infographic`,
                `Key statistics about ${topic}, data visualization`,
                `Industry impact diagram for ${topic}, ripple effect design`,
                `Expert quote card for ${topic}, testimonial style`,
                `Market trends chart for ${topic}, financial visualization`,
                `Global impact map for ${topic}, geographic infographic`,
                `Future predictions for ${topic}, futuristic design`,
                `Stakeholder analysis for ${topic}, relationship diagram`,
                `Summary infographic for ${topic}, key points design`
            ],
            'opinion': [
                `Thought leadership visualization for ${topic}, abstract concept art`,
                `Argument structure diagram for ${topic}, logical flow design`,
                `Supporting evidence chart for ${topic}, data-backed design`,
                `Counterargument visualization for ${topic}, debate style`,
                `Industry perspective on ${topic}, multiple viewpoints design`,
                `Future vision for ${topic}, conceptual illustration`,
                `Impact analysis for ${topic}, cause and effect diagram`,
                `Expert insights for ${topic}, quote compilation design`,
                `Trend analysis for ${topic}, pattern visualization`,
                `Call to action for ${topic}, motivational design`
            ],
            'listicle': [
                `Number one item visualization for ${topic}, featured highlight`,
                `Top picks showcase for ${topic}, grid layout design`,
                `Comparison matrix for ${topic}, table infographic`,
                `Quick tips icons for ${topic}, icon set design`,
                `Best practices checklist for ${topic}, list visualization`,
                `Resource collection for ${topic}, curated gallery`,
                `Tool recommendations for ${topic}, product showcase`,
                `Examples gallery for ${topic}, portfolio style`,
                `Summary cards for ${topic}, card-based design`,
                `Action items for ${topic}, task list visualization`
            ],
            'case-study': [
                `Challenge visualization for ${topic}, problem statement design`,
                `Solution architecture for ${topic}, technical diagram`,
                `Implementation timeline for ${topic}, project roadmap`,
                `Results dashboard for ${topic}, KPI visualization`,
                `Before and after metrics for ${topic}, comparison chart`,
                `Team and stakeholders for ${topic}, organizational chart`,
                `Process flow for ${topic}, workflow diagram`,
                `Lessons learned for ${topic}, key insights design`,
                `ROI calculation for ${topic}, financial impact chart`,
                `Success story badge for ${topic}, achievement design`
            ]
        };
        
        const typePrompts = basePrompts[type] || basePrompts['news'];
        for (let i = 0; i < count && i < typePrompts.length; i++) {
            prompts.push(typePrompts[i]);
        }
        
        return prompts;
    };
    
    const imagePrompts = getImagePrompts(topic, inlineCount, postType);
    
    for (const prompt of imagePrompts) {
        try {
            const img = await generateImageWithNanoBanana(prompt, key);
            inline.push(img);
        } catch (error) {
            console.error("Failed to generate inline image:", error);
        }
    }

    return { featured, inline };
};

export const generateBlogPost = async (
    topic: string,
    apiKey?: string,
    options: BlogGenerationOptions = DEFAULT_GENERATION_OPTIONS
) => {
    const key = apiKey || globalApiKey;
    
    if (key) {
        // Store the API key for later image regeneration
        setApiKey(key);
        
        const lengthConfig = LENGTH_CONFIG[options.length];
        const postTypeConfig = POST_TYPE_CONFIG[options.postType];
        const inlineImageCount = Math.max(0, options.imageCount - 1); // -1 for featured
        
        try {
            const genAI = new GoogleGenAI({ apiKey: key });

            // First, generate images using Nano Banana Pro
            console.log(`🎨 Step 1: Generating ${options.imageCount} images with Nano Banana Pro...`);
            console.log(`📊 Post settings: ${options.length} length (~${lengthConfig.words} words), ${postTypeConfig.name}`);
            
            let featuredImage: string;
            let inlineImages: string[] = [];
            
            try {
                const images = await generateBlogImages(topic, options.imageCount, options.postType, key);
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
            
            const prompt = `You are a professional tech journalist. Create a ${postTypeConfig.name} blog post about "${topic}".

POST TYPE: ${postTypeConfig.name}
- Structure: ${postTypeConfig.structure}
- Tone: ${postTypeConfig.tone}
- Required elements: ${postTypeConfig.elements}

LENGTH REQUIREMENTS:
- Target word count: ${lengthConfig.words} words (MINIMUM)
- Number of paragraphs: ${lengthConfig.paragraphs}+
- Number of main sections: ${lengthConfig.sections}+

Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks):
{
    "title": "An engaging, SEO-optimized title appropriate for a ${postTypeConfig.name}",
    "category": "Technology",
    "excerpt": "A compelling 2-3 sentence summary",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "content": "Full HTML content goes here..."
}

CRITICAL REQUIREMENTS for the "content" field:
1. Write AT LEAST ${lengthConfig.words} words - this is MANDATORY
2. Include ${lengthConfig.paragraphs}+ detailed paragraphs with proper HTML formatting
3. Use <h2> for main sections (${lengthConfig.sections}+ sections required)
4. Use <h3> for subsections where appropriate
5. Use <p> tags for ALL paragraphs - make them substantial and detailed
6. Use <strong> for key terms and important concepts
7. Use <ul>/<li> or <ol>/<li> for lists (especially important for ${options.postType === 'listicle' ? 'listicles' : options.postType === 'how-to' ? 'step-by-step instructions' : 'key points'})
8. Use <blockquote> for important quotes, takeaways, or highlighted information
9. Include EXACTLY ${inlineImageCount} image placeholders distributed throughout the content using this format:
   <figure class="nano-banana-image my-8" data-image-index="INDEX" data-prompt="DESCRIPTION_FOR_IMAGE">
     <div class="image-placeholder bg-dark-800 rounded-xl h-64 flex items-center justify-center">
       <span class="text-dark-500">Image will be inserted here</span>
     </div>
     <figcaption class="text-center text-sm text-primary-400 mt-3">🍌 Generated by Nano Banana Pro</figcaption>
   </figure>
   Replace INDEX with 0, 1, 2, etc. and DESCRIPTION_FOR_IMAGE with a detailed description relevant to that section.
10. Make the content informative, engaging, and professional
11. Follow the ${postTypeConfig.name} structure closely
12. Include specific examples, data points, or scenarios where relevant

${options.postType === 'how-to' ? `
SPECIAL INSTRUCTIONS FOR HOW-TO POST:
- Start with prerequisites or what readers need before starting
- Number your steps clearly using <ol> and <li>
- Include tips and warnings using <blockquote>
- End with troubleshooting tips or FAQ
` : ''}

${options.postType === 'review' ? `
SPECIAL INSTRUCTIONS FOR REVIEW POST:
- Include a clear rating or score
- List pros and cons in separate <ul> lists
- Compare with at least 2 alternatives
- Include pricing information if relevant
- End with a clear verdict/recommendation
` : ''}

${options.postType === 'listicle' ? `
SPECIAL INSTRUCTIONS FOR LISTICLE:
- Use numbered headings for each item (e.g., "1. First Item", "2. Second Item")
- Each item should have 2-3 paragraphs of explanation
- Include examples or use cases for each item
- Order items logically (best first, or chronologically, etc.)
` : ''}

${options.postType === 'case-study' ? `
SPECIAL INSTRUCTIONS FOR CASE STUDY:
- Start with the challenge/problem clearly stated
- Include specific metrics and data where possible
- Show the timeline of implementation
- Highlight measurable results
- End with actionable lessons learned
` : ''}`;

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
            console.log(`📊 Final stats: ~${data.content.split(/\s+/).length} words`);

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
