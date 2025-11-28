import React, { useState } from 'react';
import { 
    Search, FileText, Plus, ChevronRight, ChevronLeft, Clock, 
    CheckCircle2, CircleDashed, Folder, Tag, TrendingUp, 
    LayoutDashboard, Settings, HelpCircle, Sparkles, Filter
} from 'lucide-react';
import { Article } from '../types';

interface AdminSidebarProps {
    posts: Article[];
    selectedPostId: string | null;
    onSelectPost: (post: Article) => void;
    onCreateNew: () => void;
    isOpen: boolean;
    toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
    posts,
    selectedPostId,
    onSelectPost,
    onCreateNew,
    isOpen,
    toggleSidebar
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');

    const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const publishedCount = posts.filter(p => p.status === 'published').length;
    const draftCount = posts.filter(p => p.status === 'draft').length;

    // Collapsed State
    if (!isOpen) {
        return (
            <div className="w-20 h-full glass-dark border-r border-white/5 flex flex-col items-center py-6 gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-3 rounded-xl glass hover:bg-white/10 text-dark-400 hover:text-white transition-all"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
                
                <div className="w-10 h-px bg-white/10" />
                
                <button
                    onClick={onCreateNew}
                    className="p-3 rounded-xl bg-primary-500 text-white shadow-glow hover:shadow-glow-lg transition-all"
                    title="Create New Post"
                >
                    <Plus className="h-5 w-5" />
                </button>

                <div className="flex-1" />

                <div className="flex flex-col items-center gap-3">
                    <button className="p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-colors" title="Dashboard">
                        <LayoutDashboard className="h-5 w-5" />
                    </button>
                    <button className="p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-colors" title="Settings">
                        <Settings className="h-5 w-5" />
                    </button>
                    <button className="p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-colors" title="Help">
                        <HelpCircle className="h-5 w-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-80 h-full glass-dark border-r border-white/5 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-white/5">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/20">
                            <Sparkles className="h-5 w-5 text-primary-400" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold text-white">Content</h2>
                            <p className="text-xs text-dark-500">{posts.length} articles</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-white/5 text-dark-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                </div>

                {/* Create Button */}
                <button
                    onClick={onCreateNew}
                    className="w-full btn-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4"
                >
                    <Plus className="h-5 w-5" />
                    New Article
                </button>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-500" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full input-glass rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-dark-500"
                    />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 p-4 border-b border-white/5">
                <button
                    onClick={() => setStatusFilter(statusFilter === 'published' ? 'all' : 'published')}
                    className={`p-3 rounded-xl transition-all ${
                        statusFilter === 'published' 
                            ? 'bg-accent-emerald/20 border border-accent-emerald/30' 
                            : 'glass hover:bg-white/5'
                    }`}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className={`h-4 w-4 ${statusFilter === 'published' ? 'text-accent-emerald' : 'text-dark-400'}`} />
                        <span className={`text-lg font-bold ${statusFilter === 'published' ? 'text-accent-emerald' : 'text-white'}`}>
                            {publishedCount}
                        </span>
                    </div>
                    <span className="text-xs text-dark-500">Published</span>
                </button>
                <button
                    onClick={() => setStatusFilter(statusFilter === 'draft' ? 'all' : 'draft')}
                    className={`p-3 rounded-xl transition-all ${
                        statusFilter === 'draft' 
                            ? 'bg-accent-amber/20 border border-accent-amber/30' 
                            : 'glass hover:bg-white/5'
                    }`}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <CircleDashed className={`h-4 w-4 ${statusFilter === 'draft' ? 'text-accent-amber' : 'text-dark-400'}`} />
                        <span className={`text-lg font-bold ${statusFilter === 'draft' ? 'text-accent-amber' : 'text-white'}`}>
                            {draftCount}
                        </span>
                    </div>
                    <span className="text-xs text-dark-500">Drafts</span>
                </button>
            </div>

            {/* Category Filter */}
            <div className="px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                                categoryFilter === cat
                                    ? 'bg-primary-500 text-white'
                                    : 'text-dark-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Post List */}
            <div className="flex-1 overflow-y-auto">
                {filteredPosts.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-dark-600" />
                        </div>
                        <p className="text-sm text-dark-500 mb-2">No articles found</p>
                        <p className="text-xs text-dark-600">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="p-3 space-y-2">
                        {filteredPosts.map(post => (
                            <div
                                key={post.id}
                                onClick={() => onSelectPost(post)}
                                className={`p-3 rounded-xl cursor-pointer transition-all group ${
                                    selectedPostId === post.id 
                                        ? 'bg-primary-500/10 border border-primary-500/30' 
                                        : 'hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <div className="flex gap-3">
                                    {/* Thumbnail */}
                                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-dark-800">
                                        {post.imageUrl ? (
                                            <img 
                                                src={post.imageUrl} 
                                                alt="" 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-dark-600">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-sm font-medium line-clamp-1 mb-1 transition-colors ${
                                            selectedPostId === post.id ? 'text-primary-400' : 'text-white group-hover:text-primary-400'
                                        }`}>
                                            {post.title || 'Untitled'}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] text-dark-500">{post.date}</span>
                                            <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md ${
                                                post.status === 'published' 
                                                    ? 'bg-accent-emerald/20 text-accent-emerald' 
                                                    : 'bg-accent-amber/20 text-accent-amber'
                                            }`}>
                                                {post.status === 'published' ? (
                                                    <CheckCircle2 className="h-2.5 w-2.5" />
                                                ) : (
                                                    <CircleDashed className="h-2.5 w-2.5" />
                                                )}
                                                {post.status === 'published' ? 'Live' : 'Draft'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-dark-400">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors" title="Dashboard">
                            <LayoutDashboard className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors" title="Settings">
                            <Settings className="h-4 w-4" />
                        </button>
                    </div>
                    <button className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-colors" title="Help">
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
