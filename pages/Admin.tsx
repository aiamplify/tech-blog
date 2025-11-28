import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Save, Trash2, Layout, Smartphone, Monitor, Eye, EyeOff,
    Settings, Calendar, Globe, ChevronDown, ChevronUp, ChevronRight,
    CheckCircle2, AlertCircle, RefreshCw, Sparkles, Loader2, Wand2,
    FileText, Image as ImageIcon, Zap, TrendingUp, Clock, Users,
    BarChart3, PenTool, BookOpen, Layers, Target, Hash, Link2,
    Copy, Download, Share2, MoreHorizontal, Plus, X, Check,
    Lightbulb, MessageSquare, Bot, Palette, Type, List
} from 'lucide-react';
import { Article } from '../types';
import AdminSidebar from '../components/AdminSidebar';
import RichTextEditor from '../components/RichTextEditor';
import { generateBlogPost, regenerateImage, editImageWithNanoBanana, setApiKey, BlogGenerationOptions, DEFAULT_GENERATION_OPTIONS } from '../services/aiService';

// Stats Card Component
const StatCard: React.FC<{
    icon: React.ElementType;
    label: string;
    value: string;
    change?: string;
    positive?: boolean;
    color: string;
}> = ({ icon: Icon, label, value, change, positive, color }) => (
    <div className="glass rounded-2xl p-5 card-hover">
        <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            {change && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    positive ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-accent-rose/20 text-accent-rose'
                }`}>
                    {positive ? '+' : ''}{change}
                </span>
            )}
        </div>
        <div className="text-2xl font-display font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-dark-400">{label}</div>
    </div>
);

// AI Suggestion Component
const AISuggestion: React.FC<{
    icon: React.ElementType;
    title: string;
    description: string;
    action: string;
    onClick: () => void;
}> = ({ icon: Icon, title, description, action, onClick }) => (
    <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onClick={onClick}>
        <div className="p-2 rounded-lg bg-primary-500/20 text-primary-400 group-hover:bg-primary-500/30 transition-colors">
            <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white mb-0.5">{title}</h4>
            <p className="text-xs text-dark-500 line-clamp-2">{description}</p>
        </div>
        <button className="text-xs text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {action}
        </button>
    </div>
);

const Admin: React.FC = () => {
    const navigate = useNavigate();

    // Layout State
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [showPreview, setShowPreview] = useState(true);
    const [activeTab, setActiveTab] = useState<'editor' | 'seo' | 'settings'>('editor');
    const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [isGenerating, setIsGenerating] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);

    // AI Assistant State
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');

    // Image Editing State
    const [showImageEditor, setShowImageEditor] = useState(false);
    const [editingImageSrc, setEditingImageSrc] = useState<string | null>(null);
    const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
    const [imageEditPrompt, setImageEditPrompt] = useState('');
    const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
    const [editingFeaturedImage, setEditingFeaturedImage] = useState(false);
    const [imageEditMode, setImageEditMode] = useState<'generate' | 'edit'>('edit'); // 'generate' = new image, 'edit' = modify existing

    // Generation Options State
    const [showGenerationOptions, setShowGenerationOptions] = useState(false);
    const [generationOptions, setGenerationOptions] = useState<BlogGenerationOptions>(DEFAULT_GENERATION_OPTIONS);

    // SEO State
    const [seoScore, setSeoScore] = useState(0);

    // Data State
    const [posts, setPosts] = useState<Article[]>([]);
    const [currentPost, setCurrentPost] = useState<Partial<Article>>({
        title: '',
        category: 'Technology',
        content: '',
        excerpt: '',
        imageUrl: '',
        status: 'draft',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    // Calculate SEO Score
    const calculateSeoScore = useCallback(() => {
        let score = 0;
        if (currentPost.title && currentPost.title.length >= 30 && currentPost.title.length <= 60) score += 20;
        else if (currentPost.title && currentPost.title.length > 0) score += 10;
        
        if (currentPost.excerpt && currentPost.excerpt.length >= 120 && currentPost.excerpt.length <= 160) score += 20;
        else if (currentPost.excerpt && currentPost.excerpt.length > 0) score += 10;
        
        if (currentPost.content && currentPost.content.length > 1000) score += 25;
        else if (currentPost.content && currentPost.content.length > 500) score += 15;
        else if (currentPost.content && currentPost.content.length > 0) score += 5;
        
        if (currentPost.imageUrl) score += 15;
        if (currentPost.keywords && currentPost.keywords.length > 0) score += 10;
        if (currentPost.metaDescription) score += 10;
        
        setSeoScore(Math.min(score, 100));
    }, [currentPost]);

    useEffect(() => {
        calculateSeoScore();
    }, [calculateSeoScore]);

    // Load Data
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            navigate('/login');
            return;
        }

        const storedPosts = JSON.parse(localStorage.getItem('customArticles') || '[]');
        setPosts(storedPosts);
    }, [navigate]);

    // Auto-save
    useEffect(() => {
        if (currentPost.title || currentPost.content) {
            setAutoSaveStatus('saving');
            const timer = setTimeout(() => {
                setAutoSaveStatus('saved');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentPost]);

    const handleSignOut = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const handleCreateNew = () => {
        setCurrentPost({
            title: '',
            category: 'Technology',
            content: '',
            excerpt: '',
            imageUrl: '',
            status: 'draft',
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        });
        setAutoSaveStatus('saved');
    };

    const handleSelectPost = (post: Article) => {
        setCurrentPost(post);
    };

    const handleSave = (status: 'draft' | 'published') => {
        if (!currentPost.title) return alert('Title is required');

        const newPost = {
            ...currentPost,
            id: currentPost.id || `post-${Date.now()}`,
            date: currentPost.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            status: status
        } as Article;

        let updatedPosts;
        if (currentPost.id) {
            updatedPosts = posts.map(p => p.id === currentPost.id ? newPost : p);
        } else {
            updatedPosts = [newPost, ...posts];
        }

        setPosts(updatedPosts);
        localStorage.setItem('customArticles', JSON.stringify(updatedPosts));
        setCurrentPost(newPost);
    };

    const handleDelete = () => {
        if (!currentPost.id || !window.confirm('Are you sure you want to delete this post?')) return;

        const updatedPosts = posts.filter(p => p.id !== currentPost.id);
        setPosts(updatedPosts);
        localStorage.setItem('customArticles', JSON.stringify(updatedPosts));
        handleCreateNew();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentPost(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenGenerationOptions = () => {
        if (!currentPost.title) return alert('Please enter a topic in the Title field first.');
        if (!apiKey) {
            setShowApiKeyInput(true);
            return alert('Please enter your Gemini API Key first.');
        }
        setShowGenerationOptions(true);
    };

    const handleAIGenerate = async () => {
        if (!currentPost.title) return alert('Please enter a topic in the Title field first.');
        if (!apiKey) {
            setShowApiKeyInput(true);
            return alert('Please enter your Gemini API Key first.');
        }

        setShowGenerationOptions(false);
        setIsGenerating(true);
        try {
            console.log("🚀 Starting generation with options:", generationOptions);
            const generated = await generateBlogPost(currentPost.title, apiKey, generationOptions);
            setCurrentPost(prev => ({
                ...prev,
                title: generated.title,
                content: generated.content,
                excerpt: generated.excerpt,
                category: generated.category,
                keywords: generated.tags,
                imageUrl: generated.imageUrl,
            }));
        } catch (error) {
            console.error("AI Generation failed", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            alert(`Failed to generate content: ${errorMessage}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUpdateImage = async () => {
        if (!imageEditPrompt) return;
        if (!apiKey) {
            alert('Please enter your Gemini API Key first to use Nano Banana Pro image generation.');
            setShowApiKeyInput(true);
            return;
        }

        setIsRegeneratingImage(true);
        try {
            let newImageUrl: string;

            // Check if we're editing an existing image or generating a new one
            if (imageEditMode === 'edit' && editingImageSrc) {
                // Edit existing image with Nano Banana Pro
                console.log("✏️ Editing existing image with instructions:", imageEditPrompt);
                newImageUrl = await editImageWithNanoBanana(editingImageSrc, imageEditPrompt, apiKey);
            } else {
                // Generate a completely new image
                console.log("🎨 Generating new image with prompt:", imageEditPrompt);
                newImageUrl = await regenerateImage(imageEditPrompt, apiKey);
            }

            if (editingFeaturedImage) {
                // Update featured image
                setCurrentPost(prev => ({ ...prev, imageUrl: newImageUrl }));
            } else if (editingImageSrc) {
                // Update inline image in content
                const newContent = currentPost.content?.replace(editingImageSrc, newImageUrl);
                setCurrentPost(prev => ({ ...prev, content: newContent }));
            }

            setShowImageEditor(false);
            setEditingImageSrc(null);
            setEditingImageIndex(null);
            setEditingFeaturedImage(false);
            setImageEditPrompt('');
            setImageEditMode('edit');
        } catch (error) {
            console.error("Failed to process image with Nano Banana Pro", error);
            const errorMsg = error instanceof Error ? error.message : "Unknown error";
            alert(`Failed to process image: ${errorMsg}`);
        } finally {
            setIsRegeneratingImage(false);
        }
    };

    // Handle clicking on an image in the content to edit it
    const handleImageClick = (imageSrc: string, prompt?: string, index?: number) => {
        setEditingImageSrc(imageSrc);
        setEditingImageIndex(index ?? null);
        setEditingFeaturedImage(false);
        setImageEditPrompt(prompt || '');
        setShowImageEditor(true);
    };

    // Handle clicking on featured image to edit it
    const handleFeaturedImageEdit = () => {
        setEditingImageSrc(currentPost.imageUrl || null);
        setEditingFeaturedImage(true);
        setEditingImageIndex(null);
        setImageEditPrompt(`Featured image for article about ${currentPost.title || 'technology'}`);
        setShowImageEditor(true);
    };

    // Generate a new featured image with Nano Banana Pro
    const handleGenerateFeaturedImage = async () => {
        if (!apiKey) {
            alert('Please enter your Gemini API Key first.');
            setShowApiKeyInput(true);
            return;
        }

        setIsRegeneratingImage(true);
        try {
            const prompt = `Hero image for tech blog article about ${currentPost.title || 'technology'}, futuristic, cinematic, professional photography style`;
            const newImageUrl = await regenerateImage(prompt, apiKey);
            setCurrentPost(prev => ({ ...prev, imageUrl: newImageUrl }));
        } catch (error) {
            console.error("Failed to generate featured image", error);
            const errorMsg = error instanceof Error ? error.message : "Unknown error";
            alert(`Failed to generate image: ${errorMsg}`);
        } finally {
            setIsRegeneratingImage(false);
        }
    };

    const categories = ['Technology', 'AI', 'Innovation', 'Hardware', 'Software', 'Security', 'Startups', 'Reviews'];

    // Generation options configurations
    const lengthOptions = [
        { value: 'short', label: 'Short (~500 words)', description: '3 paragraphs, 2 sections' },
        { value: 'medium', label: 'Medium (~1,000 words)', description: '5 paragraphs, 3 sections' },
        { value: 'long', label: 'Long (~1,500 words)', description: '8 paragraphs, 4 sections' },
        { value: 'very-long', label: 'Very Long (~2,000 words)', description: '10 paragraphs, 5 sections' },
        { value: 'epic', label: 'Epic (~3,000 words)', description: '15 paragraphs, 7 sections' }
    ];

    const imageCountOptions = [
        { value: 1, label: '1 Image', description: 'Featured image only' },
        { value: 2, label: '2 Images', description: 'Featured + 1 inline' },
        { value: 3, label: '3 Images', description: 'Featured + 2 inline' },
        { value: 4, label: '4 Images', description: 'Featured + 3 inline' },
        { value: 5, label: '5 Images', description: 'Featured + 4 inline' },
        { value: 6, label: '6 Images', description: 'Featured + 5 inline' },
        { value: 8, label: '8 Images', description: 'Featured + 7 inline' },
        { value: 10, label: '10 Images', description: 'Featured + 9 inline' }
    ];

    const postTypeOptions = [
        { value: 'how-to', label: '📚 How-To / Tutorial', description: 'Step-by-step guide with instructions' },
        { value: 'review', label: '⭐ Product Review', description: 'Pros, cons, and verdict' },
        { value: 'news', label: '📰 News / Update', description: 'Latest developments and announcements' },
        { value: 'opinion', label: '💭 Opinion / Analysis', description: 'Thought leadership and insights' },
        { value: 'listicle', label: '📋 Listicle', description: 'Numbered list format' },
        { value: 'case-study', label: '📊 Case Study', description: 'In-depth analysis with results' }
    ];

    const aiSuggestions = [
        { icon: Lightbulb, title: 'Improve Introduction', description: 'Make your opening more engaging and hook readers instantly', action: 'Apply' },
        { icon: Target, title: 'Add Call-to-Action', description: 'Include a compelling CTA to increase engagement', action: 'Generate' },
        { icon: Hash, title: 'Optimize Keywords', description: 'Add relevant keywords for better SEO performance', action: 'Suggest' },
        { icon: MessageSquare, title: 'Expand Content', description: 'Add more depth and examples to your article', action: 'Expand' },
    ];

    return (
        <div className="min-h-screen bg-dark-950 pt-20">
            {/* Generation Options Modal */}
            {showGenerationOptions && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm" onClick={() => setShowGenerationOptions(false)} />
                    <div className="relative glass rounded-2xl p-6 w-full max-w-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-xl font-display font-bold text-white flex items-center gap-2">
                                    <Sparkles className="h-6 w-6 text-primary-400" />
                                    AI Blog Generator
                                </h4>
                                <p className="text-sm text-dark-400 mt-1">Configure your blog post settings before generation</p>
                            </div>
                            <button onClick={() => setShowGenerationOptions(false)} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Topic Display */}
                        <div className="mb-6 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                            <div className="flex items-center gap-2 text-sm text-dark-400 mb-1">
                                <FileText className="h-4 w-4" />
                                Topic
                            </div>
                            <p className="text-white font-medium">{currentPost.title}</p>
                        </div>

                        {/* Post Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-white mb-3 flex items-center gap-2">
                                <Layers className="h-4 w-4 text-primary-400" />
                                Post Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {postTypeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setGenerationOptions(prev => ({ ...prev, postType: option.value as BlogGenerationOptions['postType'] }))}
                                        className={`p-4 rounded-xl text-left transition-all ${
                                            generationOptions.postType === option.value
                                                ? 'bg-primary-500/20 border-2 border-primary-500'
                                                : 'glass border border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="text-sm font-medium text-white mb-1">{option.label}</div>
                                        <div className="text-xs text-dark-400">{option.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Post Length Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-white mb-3 flex items-center gap-2">
                                <Type className="h-4 w-4 text-accent-cyan" />
                                Post Length
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                                {lengthOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setGenerationOptions(prev => ({ ...prev, length: option.value as BlogGenerationOptions['length'] }))}
                                        className={`p-3 rounded-xl text-center transition-all ${
                                            generationOptions.length === option.value
                                                ? 'bg-accent-cyan/20 border-2 border-accent-cyan'
                                                : 'glass border border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="text-sm font-medium text-white">{option.label.split(' ')[0]}</div>
                                        <div className="text-xs text-dark-400">{option.label.match(/\(([^)]+)\)/)?.[1]}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image Count Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-white mb-3 flex items-center gap-2">
                                <span className="text-lg">🍌</span>
                                Nano Banana Pro Images
                            </label>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                                {imageCountOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setGenerationOptions(prev => ({ ...prev, imageCount: option.value }))}
                                        className={`p-3 rounded-xl text-center transition-all ${
                                            generationOptions.imageCount === option.value
                                                ? 'bg-accent-amber/20 border-2 border-accent-amber'
                                                : 'glass border border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="text-lg font-bold text-white">{option.value}</div>
                                        <div className="text-xs text-dark-400">img{option.value > 1 ? 's' : ''}</div>
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-dark-500 mt-2">
                                Each image is generated by Nano Banana Pro (gemini-3-pro-image-preview)
                            </p>
                        </div>

                        {/* Summary */}
                        <div className="mb-6 p-4 rounded-xl glass border border-white/10">
                            <h5 className="text-sm font-medium text-white mb-3">Generation Summary</h5>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary-400">
                                        {lengthOptions.find(o => o.value === generationOptions.length)?.label.match(/~([\d,]+)/)?.[1] || '1,000'}
                                    </div>
                                    <div className="text-xs text-dark-400">words</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-accent-cyan">
                                        {generationOptions.imageCount}
                                    </div>
                                    <div className="text-xs text-dark-400">images</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-accent-amber">
                                        {postTypeOptions.find(o => o.value === generationOptions.postType)?.label.split(' ')[0]}
                                    </div>
                                    <div className="text-xs text-dark-400">type</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowGenerationOptions(false)}
                                className="px-5 py-2.5 text-dark-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAIGenerate}
                                disabled={isGenerating}
                                className="btn-primary text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-5 w-5" />
                                        Generate Blog Post
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Nano Banana Pro Image Editor Modal */}
            {showImageEditor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm" onClick={() => setShowImageEditor(false)} />
                    <div className="relative glass rounded-2xl p-6 w-full max-w-lg animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                <span className="text-2xl">🍌</span>
                                Nano Banana Pro Image Editor
                            </h4>
                            <button onClick={() => setShowImageEditor(false)} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Model Info */}
                        <div className="mb-4 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-primary-400 font-medium">Model:</span>
                                <code className="text-xs bg-dark-800 px-2 py-1 rounded text-accent-cyan font-mono">gemini-3-pro-image-preview</code>
                            </div>
                            <p className="text-xs text-dark-400 mt-1">State-of-the-art image generation and editing</p>
                        </div>

                        {/* Mode Toggle - Edit vs Generate New */}
                        {editingImageSrc && (
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-dark-400 mb-2">Mode</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setImageEditMode('edit')}
                                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            imageEditMode === 'edit'
                                                ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                                                : 'glass text-dark-400 hover:text-white'
                                        }`}
                                    >
                                        ✏️ Edit This Image
                                    </button>
                                    <button
                                        onClick={() => setImageEditMode('generate')}
                                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            imageEditMode === 'generate'
                                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                : 'glass text-dark-400 hover:text-white'
                                        }`}
                                    >
                                        🎨 Generate New
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Current Image Preview */}
                        {editingImageSrc && (
                            <div className="mb-6">
                                <img src={editingImageSrc} alt="Current" className="w-full h-48 object-cover rounded-xl border border-white/10" />
                                <p className="text-xs text-center text-dark-500 mt-2">
                                    {editingFeaturedImage ? 'Current Featured Image' : `Inline Image ${editingImageIndex !== null ? editingImageIndex + 1 : ''}`}
                                    {imageEditMode === 'edit' && <span className="text-accent-cyan ml-2">• Edit mode</span>}
                                </p>
                            </div>
                        )}

                        {/* Prompt Input */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-dark-400 mb-2">
                                {imageEditMode === 'edit' && editingImageSrc
                                    ? '✏️ What would you like to change?'
                                    : '🎨 Describe the image you want'}
                            </label>
                            <textarea
                                value={imageEditPrompt}
                                onChange={(e) => setImageEditPrompt(e.target.value)}
                                placeholder={imageEditMode === 'edit' && editingImageSrc
                                    ? "e.g., 'Make the background blue', 'Add more contrast', 'Remove the text', 'Make it more futuristic'..."
                                    : "Describe the image you want Nano Banana Pro to generate..."
                                }
                                className="w-full input-glass rounded-xl p-4 text-white resize-none"
                                rows={4}
                                autoFocus
                            />
                            <p className="text-xs text-dark-600 mt-2">
                                {imageEditMode === 'edit' && editingImageSrc
                                    ? "Tip: Describe what you want to change about the current image. Be specific!"
                                    : "Tip: Be specific about style, colors, composition, and mood for best results."
                                }
                            </p>
                        </div>

                        {/* Quick Edit Suggestions (for edit mode) */}
                        {imageEditMode === 'edit' && editingImageSrc && (
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-dark-400 mb-2">Quick Edits</label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Make it brighter',
                                        'Add more contrast',
                                        'Make it more colorful',
                                        'Make it darker/moodier',
                                        'Add a blue tint',
                                        'Make it more futuristic',
                                        'Simplify the background',
                                        'Add tech elements'
                                    ].map((edit) => (
                                        <button
                                            key={edit}
                                            onClick={() => setImageEditPrompt(edit)}
                                            className="px-3 py-1.5 rounded-lg glass text-xs text-dark-300 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            {edit}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Styles (for generate mode) */}
                        {(imageEditMode === 'generate' || !editingImageSrc) && (
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-dark-400 mb-2">Quick Styles</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Futuristic', 'Minimalist', 'Cinematic', 'Abstract', 'Professional'].map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => setImageEditPrompt(prev => `${prev} ${style.toLowerCase()} style`.trim())}
                                            className="px-3 py-1.5 rounded-lg glass text-xs text-dark-300 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowImageEditor(false);
                                    setEditingImageSrc(null);
                                    setEditingFeaturedImage(false);
                                    setImageEditPrompt('');
                                    setImageEditMode('edit');
                                }}
                                className="px-4 py-2.5 text-dark-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateImage}
                                disabled={isRegeneratingImage || !imageEditPrompt.trim()}
                                className="btn-primary text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
                            >
                                {isRegeneratingImage ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {imageEditMode === 'edit' && editingImageSrc ? 'Editing...' : 'Generating...'}
                                    </>
                                ) : (
                                    <>
                                        <span>🍌</span>
                                        {imageEditMode === 'edit' && editingImageSrc ? 'Apply Edit' : 'Generate Image'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex h-[calc(100vh-5rem)]">
                {/* Sidebar */}
                <AdminSidebar
                    posts={posts}
                    selectedPostId={currentPost.id || null}
                    onSelectPost={handleSelectPost}
                    onCreateNew={handleCreateNew}
                    isOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <div className="glass-dark border-b border-white/5 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${autoSaveStatus === 'saved' ? 'bg-accent-emerald' : 'bg-accent-amber animate-pulse'}`} />
                                    <span className="text-xs text-dark-500 font-medium">
                                        {autoSaveStatus === 'saved' ? 'All changes saved' : 'Saving...'}
                                    </span>
                                </div>
                                
                                {/* SEO Score */}
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass">
                                    <Target className={`h-4 w-4 ${seoScore >= 70 ? 'text-accent-emerald' : seoScore >= 40 ? 'text-accent-amber' : 'text-accent-rose'}`} />
                                    <span className="text-xs font-medium text-dark-300">SEO: {seoScore}%</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* API Key Toggle */}
                                <button
                                    onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                                    className={`p-2.5 rounded-xl transition-colors ${apiKey ? 'bg-accent-emerald/20 text-accent-emerald' : 'glass text-dark-400 hover:text-white'}`}
                                    title={apiKey ? 'API Key Set' : 'Set API Key'}
                                >
                                    <Zap className="h-4 w-4" />
                                </button>

                                {currentPost.id && (
                                    <button
                                        onClick={handleDelete}
                                        className="p-2.5 rounded-xl glass text-dark-400 hover:text-accent-rose hover:bg-accent-rose/10 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}

                                <button
                                    onClick={() => handleSave('draft')}
                                    className="px-4 py-2.5 rounded-xl glass text-dark-300 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Draft
                                </button>

                                <button
                                    onClick={() => handleSave('published')}
                                    className="btn-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                                >
                                    <Globe className="h-4 w-4" />
                                    {currentPost.id && currentPost.status === 'published' ? 'Update' : 'Publish'}
                                </button>

                                <button
                                    onClick={handleSignOut}
                                    className="p-2.5 rounded-xl glass text-dark-400 hover:text-white transition-colors"
                                >
                                    <Settings className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* API Key Input */}
                        {showApiKeyInput && (
                            <div className="mt-4 flex items-center gap-3 animate-slide-down">
                                <div className="flex-1 relative">
                                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-500" />
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="Enter your Google Gemini API Key..."
                                        className="w-full pl-11 pr-4 py-3 input-glass rounded-xl text-sm text-white placeholder-dark-500"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowApiKeyInput(false)}
                                    className="p-3 rounded-xl glass text-dark-400 hover:text-white transition-colors"
                                >
                                    <Check className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Main Editor */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                            <div className="max-w-4xl mx-auto space-y-6">
                                {/* Title Input */}
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={currentPost.title}
                                            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                            placeholder="Enter your article title..."
                                            className="flex-1 bg-transparent text-4xl font-display font-bold text-white placeholder-dark-600 outline-none border-b-2 border-transparent focus:border-primary-500 transition-colors pb-2"
                                        />
                                        <button
                                            onClick={handleOpenGenerationOptions}
                                            disabled={isGenerating}
                                            className="btn-primary text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 h-fit"
                                            title="Generate with AI"
                                        >
                                            {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                                            <span className="hidden sm:inline">AI Write</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Metadata Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-dark-400 mb-2">Category</label>
                                        <select
                                            value={currentPost.category}
                                            onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                                            className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-dark-400 mb-2">Status</label>
                                        <select
                                            value={currentPost.status || 'draft'}
                                            onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as 'draft' | 'published' })}
                                            className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-dark-400 mb-2">Featured Image</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={currentPost.imageUrl}
                                                onChange={(e) => setCurrentPost({ ...currentPost, imageUrl: e.target.value })}
                                                placeholder="Image URL or generate with AI..."
                                                className="flex-1 input-glass rounded-xl px-4 py-3 text-white text-sm"
                                            />
                                            <button
                                                onClick={handleGenerateFeaturedImage}
                                                disabled={isRegeneratingImage}
                                                className="p-3 rounded-xl btn-primary text-white transition-colors flex items-center gap-1"
                                                title="Generate with Nano Banana Pro"
                                            >
                                                {isRegeneratingImage ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>🍌</span>}
                                            </button>
                                            {currentPost.imageUrl && (
                                                <button
                                                    onClick={handleFeaturedImageEdit}
                                                    className="p-3 rounded-xl glass text-dark-400 hover:text-white transition-colors"
                                                    title="Edit featured image"
                                                >
                                                    <Wand2 className="h-5 w-5" />
                                                </button>
                                            )}
                                            <label className="p-3 rounded-xl glass text-dark-400 hover:text-white cursor-pointer transition-colors">
                                                <ImageIcon className="h-5 w-5" />
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-xs font-medium text-dark-400 mb-2">Excerpt / Summary</label>
                                    <textarea
                                        value={currentPost.excerpt}
                                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                        rows={2}
                                        className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm resize-none"
                                        placeholder="Brief summary for search results and previews..."
                                    />
                                    <div className="text-right text-xs text-dark-600 mt-1">
                                        {currentPost.excerpt?.length || 0}/160 characters
                                    </div>
                                </div>

                                {/* Rich Text Editor */}
                                <div>
                                    <label className="block text-xs font-medium text-dark-400 mb-2">Content</label>
                                    <RichTextEditor
                                        value={currentPost.content || ''}
                                        onChange={(val) => setCurrentPost({ ...currentPost, content: val })}
                                        onImageUpload={handleImageUpload}
                                    />
                                </div>

                                {/* SEO Settings */}
                                <div className="glass rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setActiveTab(activeTab === 'seo' ? 'editor' : 'seo')}
                                        className="w-full flex justify-between items-center p-5 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent-emerald/20">
                                                <Target className="h-4 w-4 text-accent-emerald" />
                                            </div>
                                            <div className="text-left">
                                                <span className="text-white font-medium">SEO Settings</span>
                                                <p className="text-xs text-dark-500">Optimize for search engines</p>
                                            </div>
                                        </div>
                                        {activeTab === 'seo' ? <ChevronUp className="h-5 w-5 text-dark-400" /> : <ChevronDown className="h-5 w-5 text-dark-400" />}
                                    </button>

                                    {activeTab === 'seo' && (
                                        <div className="p-5 border-t border-white/5 space-y-4 animate-slide-down">
                                            <div>
                                                <label className="block text-xs font-medium text-dark-400 mb-2">Meta Description</label>
                                                <textarea
                                                    value={currentPost.metaDescription || ''}
                                                    onChange={(e) => setCurrentPost({ ...currentPost, metaDescription: e.target.value })}
                                                    rows={2}
                                                    className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm resize-none"
                                                    placeholder="Description for search engines..."
                                                />
                                                <div className="text-right text-xs text-dark-600 mt-1">
                                                    {currentPost.metaDescription?.length || 0}/160
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-dark-400 mb-2">Focus Keywords</label>
                                                <input
                                                    type="text"
                                                    value={currentPost.keywords?.join(', ') || ''}
                                                    onChange={(e) => setCurrentPost({ ...currentPost, keywords: e.target.value.split(',').map(k => k.trim()) })}
                                                    className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm"
                                                    placeholder="Comma separated keywords..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-dark-400 mb-2">URL Slug</label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-dark-500 text-sm">/article/</span>
                                                    <input
                                                        type="text"
                                                        value={currentPost.slug || currentPost.title?.toLowerCase().replace(/\s+/g, '-') || ''}
                                                        onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                                        className="flex-1 input-glass rounded-xl px-4 py-3 text-white text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Scheduling */}
                                <div className="glass rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setActiveTab(activeTab === 'settings' ? 'editor' : 'settings')}
                                        className="w-full flex justify-between items-center p-5 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent-amber/20">
                                                <Calendar className="h-4 w-4 text-accent-amber" />
                                            </div>
                                            <div className="text-left">
                                                <span className="text-white font-medium">Scheduling</span>
                                                <p className="text-xs text-dark-500">Set publish date and time</p>
                                            </div>
                                        </div>
                                        {activeTab === 'settings' ? <ChevronUp className="h-5 w-5 text-dark-400" /> : <ChevronDown className="h-5 w-5 text-dark-400" />}
                                    </button>

                                    {activeTab === 'settings' && (
                                        <div className="p-5 border-t border-white/5 animate-slide-down">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-dark-400 mb-2">Publish Date</label>
                                                    <input
                                                        type="date"
                                                        value={currentPost.scheduledDate || ''}
                                                        onChange={(e) => setCurrentPost({ ...currentPost, scheduledDate: e.target.value })}
                                                        className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-dark-400 mb-2">Publish Time</label>
                                                    <input
                                                        type="time"
                                                        className="w-full input-glass rounded-xl px-4 py-3 text-white text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Live Preview Panel */}
                        {showPreview && (
                            <div className="hidden xl:flex flex-col w-[500px] border-l border-white/5 bg-dark-900/50">
                                <div className="flex items-center justify-between p-4 border-b border-white/5">
                                    <h3 className="text-sm font-semibold text-white">Live Preview</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 p-1 rounded-lg glass">
                                            <button
                                                onClick={() => setPreviewMode('desktop')}
                                                className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'}`}
                                            >
                                                <Monitor className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setPreviewMode('mobile')}
                                                className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'}`}
                                            >
                                                <Smartphone className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setShowPreview(false)}
                                            className="p-1.5 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className={`mx-auto bg-dark-950 rounded-2xl overflow-hidden shadow-2xl ${previewMode === 'mobile' ? 'max-w-[375px]' : 'w-full'}`}>
                                        {/* Preview Header Image - Clickable to edit */}
                                        <div
                                            className="relative h-48 bg-dark-800 group cursor-pointer"
                                            onClick={() => currentPost.imageUrl && handleFeaturedImageEdit()}
                                            title={currentPost.imageUrl ? "Click to edit this image" : ""}
                                        >
                                            {currentPost.imageUrl ? (
                                                <>
                                                    <img src={currentPost.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                                                    {/* Edit overlay */}
                                                    <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <div className="bg-dark-900/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                                                            <span className="text-lg">🍌</span>
                                                            <span className="text-white text-sm font-medium">Click to Edit Image</span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-dark-600">
                                                    <ImageIcon className="h-12 w-12" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
                                            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                                                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                                                    {currentPost.category}
                                                </span>
                                                <h2 className="text-xl font-display font-bold text-white mt-1 line-clamp-2">
                                                    {currentPost.title || 'Your Title Here'}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Preview Content - with clickable images */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4 text-xs text-dark-500">
                                                <span>{currentPost.date}</span>
                                                <span>•</span>
                                                <span>5 min read</span>
                                            </div>

                                            {currentPost.excerpt && (
                                                <p className="text-dark-300 mb-4 text-sm italic border-l-2 border-primary-500 pl-3">
                                                    {currentPost.excerpt}
                                                </p>
                                            )}

                                            <div
                                                className="prose-custom text-sm preview-content-clickable"
                                                onClick={(e) => {
                                                    // Check if clicked on an image
                                                    const target = e.target as HTMLElement;
                                                    if (target.tagName === 'IMG') {
                                                        const imgSrc = (target as HTMLImageElement).src;
                                                        const figure = target.closest('figure');
                                                        const prompt = figure?.getAttribute('data-prompt') || '';
                                                        const indexStr = figure?.getAttribute('data-image-index');
                                                        const index = indexStr ? parseInt(indexStr) : undefined;
                                                        handleImageClick(imgSrc, prompt, index);
                                                    }
                                                }}
                                                dangerouslySetInnerHTML={{ __html: currentPost.content || '<p class="text-dark-600">Start writing to see your content here...</p>' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AI Assistant Panel */}
                        {showAIAssistant && (
                            <div className="hidden lg:flex flex-col w-80 border-l border-white/5 bg-dark-900/50">
                                <div className="flex items-center justify-between p-4 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Bot className="h-5 w-5 text-primary-400" />
                                        <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowAIAssistant(false)}
                                        className="p-1.5 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    <div className="p-4 border-b border-white/5">
                                        <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Suggestions</h4>
                                        <div className="space-y-1">
                                            {aiSuggestions.map((suggestion, idx) => (
                                                <AISuggestion
                                                    key={idx}
                                                    {...suggestion}
                                                    onClick={() => {}}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Ask AI</h4>
                                        <textarea
                                            value={aiPrompt}
                                            onChange={(e) => setAiPrompt(e.target.value)}
                                            placeholder="Ask anything about your content..."
                                            className="w-full input-glass rounded-xl p-3 text-sm text-white resize-none"
                                            rows={3}
                                        />
                                        <button className="w-full btn-primary text-white py-2.5 rounded-xl font-medium text-sm mt-3 flex items-center justify-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Generate Response
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Toolbar */}
                    <div className="glass-dark border-t border-white/5 px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-dark-500">
                                <span>{currentPost.content?.length || 0} characters</span>
                                <span>•</span>
                                <span>{currentPost.content?.split(/\s+/).filter(Boolean).length || 0} words</span>
                                <span>•</span>
                                <span>~{Math.ceil((currentPost.content?.split(/\s+/).filter(Boolean).length || 0) / 200)} min read</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowAIAssistant(!showAIAssistant)}
                                    className={`p-2 rounded-lg transition-colors ${showAIAssistant ? 'bg-primary-500/20 text-primary-400' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
                                    title="AI Assistant"
                                >
                                    <Bot className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setShowPreview(!showPreview)}
                                    className={`p-2 rounded-lg transition-colors ${showPreview ? 'bg-primary-500/20 text-primary-400' : 'text-dark-400 hover:text-white hover:bg-white/5'}`}
                                    title="Toggle Preview"
                                >
                                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
