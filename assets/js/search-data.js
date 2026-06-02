// Comprehensive search index for all SmartGen tools

// AUTO_INJECT_SEARCH_START
const TOOLS_INDEX = [];
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