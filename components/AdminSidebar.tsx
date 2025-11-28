import React, { useState } from 'react';
import { Search, FileText, Plus, Filter, ChevronRight, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
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

    const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (!isOpen) {
        return (
            <div className="w-16 h-[calc(100vh-4rem)] bg-surface-dark border-r border-gray-700 flex flex-col items-center py-6 gap-4 sticky top-16 transition-all duration-300">
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
                <button
                    onClick={onCreateNew}
                    className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                    title="Create New Post"
                >
                    <Plus size={24} />
                </button>
            </div>
        );
    }

    return (
        <div className="w-80 h-[calc(100vh-4rem)] bg-surface-dark border-r border-gray-700 flex flex-col sticky top-16 transition-all duration-300">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="font-display font-bold text-white text-lg">Post Repository</h2>
                <button
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronRight className="rotate-180" size={20} />
                </button>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
                <button
                    onClick={onCreateNew}
                    className="w-full bg-primary hover:bg-primary-dark text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                    <Plus size={18} /> New Post
                </button>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background-dark border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${categoryFilter === cat
                                ? 'bg-gray-700 text-white border border-gray-600'
                                : 'bg-transparent text-gray-500 hover:text-gray-300 border border-transparent'
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
                    <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                        <FileText size={48} className="mb-2 opacity-20" />
                        <p className="text-sm">No posts found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800">
                        {filteredPosts.map(post => (
                            <div
                                key={post.id}
                                onClick={() => onSelectPost(post)}
                                className={`p-4 cursor-pointer hover:bg-gray-800/50 transition-colors flex gap-3 group ${selectedPostId === post.id ? 'bg-gray-800 border-l-2 border-primary' : 'border-l-2 border-transparent'
                                    }`}
                            >
                                <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                                    {post.imageUrl ? (
                                        <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <FileText size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-medium truncate ${selectedPostId === post.id ? 'text-primary' : 'text-gray-200 group-hover:text-white'}`}>
                                        {post.title || 'Untitled Post'}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">{post.date}</span>
                                        <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${post.status === 'published' ? 'bg-green-900/20 text-green-400 border-green-900/50' : 'bg-yellow-900/20 text-yellow-400 border-yellow-900/50'}`}>
                                            {post.status === 'published' ? <CheckCircle2 size={10} /> : <CircleDashed size={10} />}
                                            {post.status === 'published' ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSidebar;
