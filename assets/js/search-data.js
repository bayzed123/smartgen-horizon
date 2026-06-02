// Comprehensive search index for all SmartGen tools

// AUTO_INJECT_SEARCH_START
const TOOLS_INDEX = [
    {
        "id": "master-html-playground-snippet-library",
        "title": "Live HTML Editor & Code Library",
        "category": "Developer Tools",
        "keywords": [
            "master-html-playground-snippet-library",
            "tool",
            "beta"
        ],
        "description": "Generate, edit, and preview HTML codes instantly. Access a huge library of HTML generators, text codes, tables, marquees, and more.",
        "url": "./master-html-playground-snippet-library/",
        "icon": "💻"
    },
    {
        "id": "txt-to-markdown-generate",
        "title": "Plain Text to Markdown",
        "category": "Beta Testing",
        "keywords": [
            "txt-to-markdown-generate",
            "tool",
            "beta"
        ],
        "description": "Beta testing tool under development.",
        "url": "./txt-to-markdown-generate/",
        "icon": "🔧"
    }
];
// AUTO_INJECT_SEARCH_END

// Search function
function searchTools(query) {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    
    return TOOLS_INDEX.filter(tool => {
        // Search in title
        if (tool.title && tool.title.toLowerCase().includes(lowerQuery)) return true;
        
        // Search in description
        if (tool.description && tool.description.toLowerCase().includes(lowerQuery)) return true;
        
        // Search in keywords
        if (tool.keywords && tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))) return true;
        
        // Search in category
        if (tool.category && tool.category.toLowerCase().includes(lowerQuery)) return true;
        
        return false;
    }).sort((a, b) => {
        // Prioritize title matches
        const aTitle = a.title && a.title.toLowerCase().includes(lowerQuery);
        const bTitle = b.title && b.title.toLowerCase().includes(lowerQuery);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
    });
}