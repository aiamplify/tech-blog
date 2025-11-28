import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Save, Trash2, Layout, Smartphone, Monitor,
    Settings, Calendar, Globe, ChevronDown, ChevronUp,
    CheckCircle2, AlertCircle, RefreshCw, Sparkles, Loader2, Wand2
} from 'lucide-react';
import { Article } from '../types';
import AdminSidebar from '../components/AdminSidebar';
import RichTextEditor from '../components/RichTextEditor';
import { generateBlogPost } from '../services/aiService';

const Admin: React.FC = () => {
    const navigate = useNavigate();

    // Layout State
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [showSEO, setShowSEO] = useState(false);
    const [showScheduling, setShowScheduling] = useState(false);
    const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [isGenerating, setIsGenerating] = useState(false);
    const [apiKey, setApiKey] = useState('');

    // Image Editing State
    const [showImageEditor, setShowImageEditor] = useState(false);
    const [editingImageSrc, setEditingImageSrc] = useState<string | null>(null);
    const [imageEditPrompt, setImageEditPrompt] = useState('');
    const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);

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

    // Load Data
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            navigate('/login');
            return;
        }

        const storedPosts = JSON.parse(localStorage.getItem('customArticles') || '[]');

        // User requested to keep only the last 3 posts (which are at the top of the list)
        if (storedPosts.length > 3) {
            const recentPosts = storedPosts.slice(0, 3);
            localStorage.setItem('customArticles', JSON.stringify(recentPosts));
            setPosts(recentPosts);
        } else {
            setPosts(storedPosts);
        }
    }, [navigate]);

    // Auto-save Simulation
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
        alert(status === 'published' ? (currentPost.id ? 'Post Updated!' : 'Post Published!') : 'Draft Saved!');
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

    const handleAIGenerate = async () => {
        if (!currentPost.title) return alert('Please enter a topic in the Title field first.');
        if (!apiKey) return alert('Please enter your Gemini API Key first.');

        setIsGenerating(true);
        try {
            const generated = await generateBlogPost(currentPost.title, apiKey);
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
            alert("Failed to generate content. Please check your API Key and try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        // Check if clicked element is an image or inside the featured image container
        if (target.tagName === 'IMG') {
            const img = target as HTMLImageElement;
            setEditingImageSrc(img.src);
            setImageEditPrompt('');
            setShowImageEditor(true);
        } else if (target.closest('.group') && target.closest('.group')?.querySelector('img')) {
            // Fallback for overlay clicks
            const img = target.closest('.group')?.querySelector('img') as HTMLImageElement;
            if (img) {
                setEditingImageSrc(img.src);
                setImageEditPrompt('');
                setShowImageEditor(true);
            }
        }
    };

    const handleUpdateImage = async () => {
        if (!imageEditPrompt || !editingImageSrc) return;

        setIsRegeneratingImage(true);
        try {
            const { generateImage } = await import('../services/aiService');
            const newImageUrl = await generateImage(imageEditPrompt);

            // Check if it's the featured image
            if (currentPost.imageUrl === editingImageSrc) {
                setCurrentPost(prev => ({ ...prev, imageUrl: newImageUrl }));
            } else {
                // It's in the content
                const newContent = currentPost.content?.replace(editingImageSrc, newImageUrl);
                setCurrentPost(prev => ({ ...prev, content: newContent }));
            }

            setShowImageEditor(false);
            setEditingImageSrc(null);
            setImageEditPrompt('');
        } catch (error) {
            console.error("Failed to regenerate image", error);
            alert("Failed to regenerate image");
        } finally {
            setIsRegeneratingImage(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex pt-16 relative">
            {/* Image Editor Modal */}
            {showImageEditor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-surface-dark border border-gray-600 p-6 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles size={20} className="text-yellow-400" />
                                NanoBanana Pro Image Editor
                            </h4>
                            <button onClick={() => setShowImageEditor(false)} className="text-gray-400 hover:text-white">
                                <Trash2 size={20} className="rotate-45" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <img src={editingImageSrc || ''} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-700 opacity-50" />
                            <p className="text-xs text-center text-gray-500 mt-2">Current Image</p>
                        </div>

                        <textarea
                            value={imageEditPrompt}
                            onChange={(e) => setImageEditPrompt(e.target.value)}
                            placeholder="Describe the new image you want..."
                            className="w-full bg-background-dark border border-gray-700 rounded-lg p-3 text-white mb-4 focus:ring-1 focus:ring-yellow-400 outline-none resize-none"
                            rows={3}
                            autoFocus
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowImageEditor(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateImage}
                                disabled={isRegeneratingImage}
                                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isRegeneratingImage ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
                                {isRegeneratingImage ? 'Generating...' : 'Regenerate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
            <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">

                {/* Editor Area */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 border-r border-gray-700 scrollbar-thin scrollbar-thumb-gray-700">

                    {/* Top Bar */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${autoSaveStatus === 'saved' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                                    {autoSaveStatus === 'saved' ? 'Auto-Saved' : 'Saving...'}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                {currentPost.id && (
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                )}
                                <button
                                    onClick={() => handleSave('draft')}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <Save size={16} /> Save Draft
                                </button>
                                <button
                                    onClick={() => handleSave('published')}
                                    className={`px-6 py-2 rounded-lg text-sm font-bold text-white shadow-lg transition-all flex items-center gap-2 ${currentPost.id && currentPost.status === 'published'
                                        ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                                        : 'bg-[#00C853] hover:bg-[#00C853]/90 shadow-[#00C853]/20'
                                        }`}
                                >
                                    <Globe size={16} />
                                    {currentPost.id && currentPost.status === 'published' ? 'Update Post' : 'Publish Post'}
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        {/* API Key Input */}
                        <div className="bg-surface-dark border border-gray-700 p-3 rounded-lg flex items-center gap-3">
                            <Sparkles size={16} className="text-purple-400" />
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter Google Gemini API Key for AI Features..."
                                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
                            />
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="space-y-6 max-w-3xl mx-auto">

                        {/* Title & Slug */}
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={currentPost.title}
                                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                    placeholder="Enter Topic or Title..."
                                    className="flex-1 bg-transparent text-4xl font-display font-bold text-white placeholder-gray-600 outline-none border-b border-transparent focus:border-gray-700 transition-colors pb-2"
                                />
                                <button
                                    onClick={handleAIGenerate}
                                    disabled={isGenerating}
                                    className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/50 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed h-fit self-center"
                                    title="Generate with Gemini 3 Pro"
                                >
                                    {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                                    <span className="hidden sm:inline font-bold">Auto-Write</span>
                                </button>
                            </div>
                            {showSEO && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-800/50 p-2 rounded">
                                    <Globe size={14} />
                                    <span>techpulse.news/posts/</span>
                                    <input
                                        type="text"
                                        value={currentPost.slug || currentPost.title?.toLowerCase().replace(/\s+/g, '-') || ''}
                                        onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                        className="bg-transparent text-primary outline-none flex-1"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Metadata Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                                <select
                                    value={currentPost.category}
                                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                                    className="w-full bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-primary outline-none"
                                >
                                    <option>Technology</option>
                                    <option>AI</option>
                                    <option>Innovation</option>
                                    <option>Hardware</option>
                                    <option>Software</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Featured Image</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentPost.imageUrl}
                                        onChange={(e) => setCurrentPost({ ...currentPost, imageUrl: e.target.value })}
                                        placeholder="Image URL..."
                                        className="flex-1 bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-primary outline-none"
                                    />
                                    <label className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg cursor-pointer transition-colors">
                                        <Layout size={16} />
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Excerpt</label>
                            <textarea
                                value={currentPost.excerpt}
                                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                rows={2}
                                className="w-full bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-primary outline-none resize-none"
                                placeholder="Brief summary for search results..."
                            />
                        </div>

                        {/* Rich Text Editor */}
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Content</label>
                            <RichTextEditor
                                value={currentPost.content || ''}
                                onChange={(val) => setCurrentPost({ ...currentPost, content: val })}
                                onImageUpload={handleImageUpload}
                            />
                        </div>

                        {/* SEO Module */}
                        <div className="border border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setShowSEO(!showSEO)}
                                className="w-full flex justify-between items-center p-4 bg-surface-dark hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center gap-2 text-white font-medium">
                                    <Settings size={18} className="text-primary" /> SEO Settings
                                </div>
                                {showSEO ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {showSEO && (
                                <div className="p-4 bg-background-dark space-y-4 border-t border-gray-700">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Meta Description</label>
                                        <textarea
                                            value={currentPost.metaDescription || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, metaDescription: e.target.value })}
                                            rows={2}
                                            className="w-full bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                                            placeholder="Description for search engines..."
                                        />
                                        <div className="text-right text-xs text-gray-500 mt-1">
                                            {(currentPost.metaDescription?.length || 0)}/160
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Focus Keywords</label>
                                        <input
                                            type="text"
                                            value={currentPost.keywords?.join(', ') || ''}
                                            onChange={(e) => setCurrentPost({ ...currentPost, keywords: e.target.value.split(',').map(k => k.trim()) })}
                                            className="w-full bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                                            placeholder="Comma separated keywords..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Scheduling Module */}
                        <div className="border border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setShowScheduling(!showScheduling)}
                                className="w-full flex justify-between items-center p-4 bg-surface-dark hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center gap-2 text-white font-medium">
                                    <Calendar size={18} className="text-green-400" /> Scheduling
                                </div>
                                {showScheduling ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {showScheduling && (
                                <div className="p-4 bg-background-dark space-y-4 border-t border-gray-700">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Publish Date</label>
                                            <input
                                                type="date"
                                                value={currentPost.scheduledDate || ''}
                                                onChange={(e) => setCurrentPost({ ...currentPost, scheduledDate: e.target.value })}
                                                className="w-full bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                                            <select
                                                value={currentPost.status || 'draft'}
                                                onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as 'draft' | 'published' })}
                                                className="w-full bg-surface-dark border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="h-20" /> {/* Bottom spacer */}
                </div>

                {/* Live Preview */}
                <div className={`bg-black border-l border-gray-800 flex flex-col transition-all duration-300 ${previewMode === 'mobile' ? 'w-[400px]' : 'w-1/2'
                    } hidden lg:flex`}>
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-surface-dark">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Preview</h3>
                        <div className="flex bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setPreviewMode('desktop')}
                                className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Monitor size={16} />
                            </button>
                            <button
                                onClick={() => setPreviewMode('mobile')}
                                className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Smartphone size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-black p-8">
                        <div
                            className={`mx-auto bg-background-dark min-h-[800px] shadow-2xl overflow-hidden ${previewMode === 'mobile' ? 'max-w-[375px] rounded-[3rem] border-8 border-gray-800' : 'w-full rounded-xl'}`}
                            onClick={handlePreviewClick}
                        >
                            {/* Preview Content */}
                            <div className="relative h-64 w-full bg-gray-800 group cursor-pointer">
                                {currentPost.imageUrl ? (
                                    <img src={currentPost.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <Layout size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                    <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">Click to Edit Featured Image</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 pointer-events-none">
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {currentPost.category}
                                    </span>
                                    <h1 className="text-2xl font-display font-bold text-white leading-tight">
                                        {currentPost.title || 'Your Title Here'}
                                    </h1>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-6 text-xs text-gray-400">
                                    <span>{currentPost.date}</span>
                                    <span>•</span>
                                    <span>5 min read</span>
                                </div>

                                <div className="prose prose-invert prose-sm max-w-none">
                                    <p className="lead text-lg text-gray-300 mb-6 font-light">
                                        {currentPost.excerpt || 'Your summary will appear here...'}
                                    </p>
                                    <div
                                        className="space-y-4 text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: currentPost.content || 'Start writing to see your content here...' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
