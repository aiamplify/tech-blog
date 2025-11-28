import React, { useRef, useState } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, 
    Image as ImageIcon, Code, Heading1, Heading2, Heading3, Quote, 
    Wand2, AlignLeft, AlignCenter, AlignRight, Minus, Undo, Redo,
    Sparkles, Loader2, Type, Palette, Table, Video, FileCode,
    CheckSquare, Strikethrough, Subscript, Superscript
} from 'lucide-react';
import { generateImage } from '../services/aiService';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ToolbarButtonProps {
    icon: React.ElementType;
    onClick: () => void;
    active?: boolean;
    title: string;
    disabled?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon: Icon, onClick, active, title, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-lg transition-all ${
            active 
                ? 'bg-primary-500 text-white' 
                : 'text-dark-400 hover:text-white hover:bg-white/10'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={title}
    >
        <Icon className="h-4 w-4" />
    </button>
);

const ToolbarDivider: React.FC = () => (
    <div className="w-px h-6 bg-white/10 mx-1" />
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, onImageUpload }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showImagePrompt, setShowImagePrompt] = useState(false);
    const [imagePrompt, setImagePrompt] = useState('');
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showAIMenu, setShowAIMenu] = useState(false);

    const insertFormat = (startTag: string, endTag: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + startTag + selection + endTag + after;
        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + startTag.length + selection.length + endTag.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const insertAtCursor = (text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const before = value.substring(0, start);
        const after = value.substring(start);

        onChange(before + text + after);

        setTimeout(() => {
            textarea.focus();
            const newPos = start + text.length;
            textarea.setSelectionRange(newPos, newPos);
        }, 0);
    };

    const handleGenerateImage = async () => {
        if (!imagePrompt) return;

        setIsGeneratingImage(true);
        try {
            const imageUrl = await generateImage(imagePrompt);
            const imageHtml = `
<figure class="my-8 group relative">
    <img src="${imageUrl}" alt="${imagePrompt}" class="w-full rounded-xl shadow-lg border border-white/10" />
    <figcaption class="text-center text-sm text-dark-500 mt-3">
        <span class="text-primary-400">AI Generated</span> • ${imagePrompt}
    </figcaption>
</figure>
`;
            insertAtCursor(imageHtml);
            setShowImagePrompt(false);
            setImagePrompt('');
        } catch (error) {
            console.error("Image generation failed", error);
            alert("Failed to generate image.");
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleInsertLink = () => {
        if (linkUrl) {
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selection = value.substring(start, end) || 'Link text';
            
            insertFormat(`<a href="${linkUrl}" class="text-primary-400 hover:underline">`, '</a>');
            setShowLinkInput(false);
            setLinkUrl('');
        }
    };

    const aiActions = [
        { label: 'Improve Writing', icon: Sparkles, action: () => alert('AI improvement coming soon!') },
        { label: 'Fix Grammar', icon: CheckSquare, action: () => alert('Grammar fix coming soon!') },
        { label: 'Make Shorter', icon: Minus, action: () => alert('Shortening coming soon!') },
        { label: 'Make Longer', icon: Type, action: () => alert('Expansion coming soon!') },
        { label: 'Change Tone', icon: Palette, action: () => alert('Tone change coming soon!') },
    ];

    const wordCount = value.split(/\s+/).filter(Boolean).length;
    const charCount = value.length;

    return (
        <div className="glass rounded-2xl overflow-hidden">
            {/* AI Image Generator Modal */}
            {showImagePrompt && (
                <div className="absolute top-16 left-4 z-50 glass rounded-xl p-5 shadow-glass w-80 animate-scale-in">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-primary-500/20">
                            <Wand2 className="h-4 w-4 text-primary-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white">AI Image Generator</h4>
                            <p className="text-xs text-dark-500">Describe your image</p>
                        </div>
                    </div>
                    <textarea
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="A futuristic cityscape at sunset..."
                        className="w-full input-glass rounded-xl p-3 text-sm text-white mb-4 resize-none"
                        rows={3}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowImagePrompt(false)}
                            className="px-4 py-2 text-sm text-dark-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleGenerateImage}
                            disabled={isGeneratingImage || !imagePrompt}
                            className="btn-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                        >
                            {isGeneratingImage ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="h-4 w-4" />
                            )}
                            {isGeneratingImage ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                </div>
            )}

            {/* Link Input Modal */}
            {showLinkInput && (
                <div className="absolute top-16 left-4 z-50 glass rounded-xl p-4 shadow-glass w-72 animate-scale-in">
                    <label className="block text-xs font-medium text-dark-400 mb-2">URL</label>
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full input-glass rounded-lg px-3 py-2 text-sm text-white mb-3"
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowLinkInput(false)}
                            className="px-3 py-1.5 text-xs text-dark-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleInsertLink}
                            className="btn-primary text-white px-3 py-1.5 rounded-lg text-xs font-medium"
                        >
                            Insert Link
                        </button>
                    </div>
                </div>
            )}

            {/* AI Menu */}
            {showAIMenu && (
                <div className="absolute top-16 right-4 z-50 glass rounded-xl p-2 shadow-glass w-48 animate-scale-in">
                    {aiActions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                action.action();
                                setShowAIMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-dark-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <action.icon className="h-4 w-4 text-primary-400" />
                            {action.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/5 bg-dark-900/50">
                {/* Text Formatting */}
                <ToolbarButton icon={Bold} onClick={() => insertFormat('<strong>', '</strong>')} title="Bold (Ctrl+B)" />
                <ToolbarButton icon={Italic} onClick={() => insertFormat('<em>', '</em>')} title="Italic (Ctrl+I)" />
                <ToolbarButton icon={Underline} onClick={() => insertFormat('<u>', '</u>')} title="Underline" />
                <ToolbarButton icon={Strikethrough} onClick={() => insertFormat('<s>', '</s>')} title="Strikethrough" />
                
                <ToolbarDivider />
                
                {/* Headings */}
                <ToolbarButton icon={Heading1} onClick={() => insertFormat('<h2 class="text-2xl font-display font-bold text-white mt-8 mb-4">', '</h2>')} title="Heading 1" />
                <ToolbarButton icon={Heading2} onClick={() => insertFormat('<h3 class="text-xl font-display font-semibold text-white mt-6 mb-3">', '</h3>')} title="Heading 2" />
                <ToolbarButton icon={Heading3} onClick={() => insertFormat('<h4 class="text-lg font-semibold text-dark-200 mt-4 mb-2">', '</h4>')} title="Heading 3" />
                
                <ToolbarDivider />
                
                {/* Lists */}
                <ToolbarButton icon={List} onClick={() => insertFormat('<ul class="list-disc list-inside space-y-2 my-4">\n  <li>', '</li>\n</ul>')} title="Bullet List" />
                <ToolbarButton icon={ListOrdered} onClick={() => insertFormat('<ol class="list-decimal list-inside space-y-2 my-4">\n  <li>', '</li>\n</ol>')} title="Numbered List" />
                <ToolbarButton icon={CheckSquare} onClick={() => insertFormat('<div class="flex items-start gap-2 my-2"><input type="checkbox" class="mt-1" /><span>', '</span></div>')} title="Checklist" />
                
                <ToolbarDivider />
                
                {/* Block Elements */}
                <ToolbarButton icon={Quote} onClick={() => insertFormat('<blockquote class="border-l-4 border-primary-500 pl-4 py-2 my-6 italic text-dark-300 bg-primary-500/5 rounded-r-lg">', '</blockquote>')} title="Quote" />
                <ToolbarButton icon={Code} onClick={() => insertFormat('<pre class="bg-dark-900 rounded-xl p-4 my-4 overflow-x-auto"><code>', '</code></pre>')} title="Code Block" />
                <ToolbarButton icon={Minus} onClick={() => insertAtCursor('<hr class="my-8 border-white/10" />')} title="Horizontal Rule" />
                
                <ToolbarDivider />
                
                {/* Media */}
                <ToolbarButton icon={LinkIcon} onClick={() => setShowLinkInput(true)} title="Insert Link" />
                <label className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Upload Image">
                    <ImageIcon className="h-4 w-4" />
                    <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
                </label>
                <ToolbarButton 
                    icon={Wand2} 
                    onClick={() => setShowImagePrompt(!showImagePrompt)} 
                    active={showImagePrompt}
                    title="AI Image Generator" 
                />
                
                <div className="flex-grow" />
                
                {/* AI Actions */}
                <button
                    onClick={() => setShowAIMenu(!showAIMenu)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        showAIMenu 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
                    }`}
                >
                    <Sparkles className="h-4 w-4" />
                    AI Tools
                </button>
            </div>

            {/* Editor Area */}
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full min-h-[400px] p-6 bg-transparent text-dark-200 focus:outline-none font-mono text-sm resize-y leading-relaxed"
                    placeholder="Start writing your masterpiece...

You can use HTML tags for formatting:
• <strong>Bold text</strong>
• <em>Italic text</em>
• <h2>Headings</h2>
• <blockquote>Quotes</blockquote>
• <ul><li>Lists</li></ul>

Or use the toolbar above for quick formatting!"
                />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 bg-dark-900/50">
                <div className="flex items-center gap-4 text-xs text-dark-500">
                    <span>{charCount} characters</span>
                    <span>•</span>
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>~{Math.ceil(wordCount / 200)} min read</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-500">
                    <span className="flex items-center gap-1">
                        <FileCode className="h-3 w-3" />
                        HTML + Markdown
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RichTextEditor;
