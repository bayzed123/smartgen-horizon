// Comprehensive search index for all SmartGen tools
const TOOLS_INDEX = [
    {
        id: 'qr-generator',
        title: 'QR Code Generator',
        category: 'Developer & Technical',
        keywords: ['qr', 'code', 'barcode', 'generator', 'scanner', 'wifi'],
        description: 'Create custom QR codes for URLs, WiFi, and more.',
        url: './qr-generator/',
        icon: '📱'
    },
    {
        id: 'utm-builder',
        title: 'UTM Link Builder',
        category: 'Marketing & Social Media',
        keywords: ['utm', 'tracking', 'link', 'campaign', 'marketing', 'analytics'],
        description: 'Generate tracking links for your marketing campaigns.',
        url: './utm-builder/',
        icon: '🔗'
    },
    {
        id: 'whatsapp-link',
        title: 'WhatsApp Link',
        category: 'Marketing & Social Media',
        keywords: ['whatsapp', 'link', 'chat', 'message', 'direct'],
        description: 'Create direct chat links for WhatsApp.',
        url: './whatsapp-link/',
        icon: '💬'
    },
    {
        id: 'mailto-generator',
        title: 'Mailto Generator',
        category: 'Marketing & Social Media',
        keywords: ['mailto', 'email', 'link', 'generator'],
        description: 'Generate professional email links with ease.',
        url: './mailto-generator/',
        icon: '📧'
    },
    {
        id: 'meta-tag-generator',
        title: 'Meta Tag Generator',
        category: 'Developer & Technical',
        keywords: ['meta', 'tag', 'seo', 'html', 'generator'],
        description: 'Boost your SEO with perfect meta tags.',
        url: './meta-tag-generator/',
        icon: '🏷️'
    },
    {
        id: 'robots-txt-generator',
        title: 'Robots.txt Generator',
        category: 'Developer & Technical',
        keywords: ['robots', 'txt', 'seo', 'crawler', 'generator'],
        description: 'Create robots.txt files for search engines.',
        url: './robots-txt-generator/',
        icon: '🤖'
    },
    {
        id: 'keyword-density-checker',
        title: 'Keyword Density Checker',
        category: 'SEO & Content',
        keywords: ['keyword', 'density', 'checker', 'seo', 'analysis'],
        description: 'Analyze keyword frequency in your content.',
        url: './keyword-density-checker/',
        icon: '📊'
    },
    {
        id: 'schema-generator',
        title: 'Schema Generator',
        category: 'Developer & Technical',
        keywords: ['schema', 'json-ld', 'structured', 'data', 'seo'],
        description: 'Generate JSON-LD schema markup for SEO.',
        url: './schema-generator/',
        icon: '📜'
    },
    {
        id: 'word-counter',
        title: 'Word Counter',
        category: 'SEO & Content',
        keywords: ['word', 'counter', 'character', 'count', 'text'],
        description: 'Count words, characters, and reading time.',
        url: './word-counter/',
        icon: '📝'
    },
    {
        id: 'text-case-converter',
        title: 'Text Case Converter',
        category: 'SEO & Content',
        keywords: ['text', 'case', 'converter', 'uppercase', 'lowercase'],
        description: 'Convert text to UPPER, lower, or Title Case.',
        url: './text-case-converter/',
        icon: '🔠'
    },
    {
        id: 'hashtag-generator',
        title: 'Hashtag Generator',
        category: 'Marketing & Social Media',
        keywords: ['hashtag', 'social', 'media', 'trending', 'generator'],
        description: 'Generate trending social media hashtags.',
        url: './hashtag-generator/',
        icon: '#️⃣'
    },
    {
        id: 'lorem-ipsum-generator',
        title: 'Lorem Ipsum Generator',
        category: 'SEO & Content',
        keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generator'],
        description: 'Generate placeholder text for designs.',
        url: './lorem-ipsum-generator/',
        icon: '🖋️'
    },
    {
        id: 'password-generator',
        title: 'Password Generator',
        category: 'Daily Utilities & Calculators',
        keywords: ['password', 'generator', 'secure', 'random', 'generator'],
        description: 'Create secure, random passwords instantly.',
        url: './password-generator/',
        icon: '🔒'
    },
    {
        id: 'age-calculator',
        title: 'Age Calculator',
        category: 'Daily Utilities & Calculators',
        keywords: ['age', 'calculator', 'date', 'birth', 'difference'],
        description: 'Calculate exact age and date differences.',
        url: './age-calculator/',
        icon: '📅'
    },
    {
        id: 'image-to-base64',
        title: 'Image to Base64',
        category: 'Developer & Technical',
        keywords: ['image', 'base64', 'converter', 'encode', 'decode'],
        description: 'Convert images to Base64 strings.',
        url: './image-to-base64/',
        icon: '🖼️'
    },
    {
        id: 'picture-url-generator',
        title: 'Picture URL Generator',
        category: 'Developer & Technical',
        keywords: ['picture', 'url', 'generator', 'image', 'link'],
        description: 'Upload images and get direct live links instantly.',
        url: './picture-url-generator/',
        icon: '📸'
    },
    {
        id: 'cpm-roi-calculator',
        title: 'CPM ROI Calculator',
        category: 'Daily Utilities & Calculators',
        keywords: ['cpm', 'roi', 'calculator', 'cost', 'investment'],
        description: 'Calculate Cost Per Mille and Return on Investment.',
        url: './cpm-roi-calculator/',
        icon: '💰'
    },
    {
        id: 'color-palette-extractor',
        title: 'Color Palette Extractor',
        category: 'Daily Utilities & Calculators',
        keywords: ['color', 'palette', 'extractor', 'hex', 'rgb'],
        description: 'Extract dominant colors from images as HEX and RGB.',
        url: './color-palette-extractor/',
        icon: '🎨'
    },
    {
        id: 'blog-title-generator',
        title: 'Blog Title Generator',
        category: 'Marketing & Social Media',
        keywords: ['blog', 'title', 'generator', 'headline', 'seo'],
        description: 'Generate SEO-friendly blog titles and headlines.',
        url: './blog-title-generator/',
        icon: '✍️'
    },
    {
        id: 'emi-calculator',
        title: 'EMI Calculator',
        category: 'Daily Utilities & Calculators',
        keywords: ['emi', 'loan', 'calculator', 'installment', 'interest'],
        description: 'Calculate monthly installments and total interest.',
        url: './emi-calculator/',
        icon: '🏦'
    },
    {
        id: 'serp-preview-tool',
        title: 'SERP Preview Tool',
        category: 'SEO & Content',
        keywords: ['serp', 'preview', 'google', 'search', 'snippet'],
        description: 'Preview how your page appears in Google search.',
        url: './serp-preview-tool/',
        icon: '🔍'
    },
    {
        id: 'image-compressor',
        title: 'Image Compressor',
        category: 'Daily Utilities & Calculators',
        keywords: ['image', 'compressor', 'reduce', 'size', 'optimize'],
        description: 'Reduce image size locally without uploading.',
        url: './image-compressor/',
        icon: '📉'
    },
    {
        id: 'percentage-calculator',
        title: 'Percentage Calculator',
        category: 'Daily Utilities & Calculators',
        keywords: ['percentage', 'calculator', 'discount', 'math'],
        description: 'Calculate percentages, discounts, and differences.',
        url: './percentage-calculator/',
        icon: '%'
    },
    {
        id: 'pomodoro-timer',
        title: 'Pomodoro Timer',
        category: 'Daily Utilities & Calculators',
        keywords: ['pomodoro', 'timer', 'focus', 'productivity', 'work'],
        description: '25/5 focus timer with start, pause, and reset.',
        url: './pomodoro-timer/',
        icon: '⏱️'
    },
    {
        id: 'secure-notepad',
        title: 'Secure Notepad',
        category: 'Daily Utilities & Calculators',
        keywords: ['notepad', 'notes', 'secure', 'privacy', 'storage'],
        description: 'Auto-save notes to browser storage with privacy.',
        url: './secure-notepad/',
        icon: '📔'
    },
    {
        id: 'fancy-font-generator',
        title: 'Fancy Font Generator',
        category: 'Daily Utilities & Calculators',
        keywords: ['font', 'fancy', 'unicode', 'text', 'style'],
        description: 'Convert text to cool Unicode styles and fonts.',
        url: './fancy-font-generator/',
        icon: '✨'
    },
    {
        id: 'unit-converter',
        title: 'Unit Converter',
        category: 'Daily Utilities & Calculators',
        keywords: ['unit', 'converter', 'length', 'weight', 'temperature'],
        description: 'Convert length, weight, and temperature instantly.',
        url: './unit-converter/',
        icon: '📏'
    },
    {
        id: 'youtube-thumbnail-downloader',
        title: 'YouTube Thumbnail Downloader',
        category: 'Marketing & Social Media',
        keywords: ['youtube', 'thumbnail', 'downloader', 'video', 'image'],
        description: 'Download HD thumbnails from any YouTube video.',
        url: './youtube-thumbnail-downloader/',
        icon: '🎬'
    },
    {
        id: 'bmi-bmr-calculator',
        title: 'BMI BMR Calculator',
        category: 'Daily Utilities & Calculators',
        keywords: ['bmi', 'bmr', 'calculator', 'health', 'fitness'],
        description: 'Calculate Body Mass Index and metabolic rate.',
        url: './bmi-bmr-calculator/',
        icon: '⚖️'
    },
    {
        id: 'url-encoder-decoder',
        title: 'URL Encoder-Decoder',
        category: 'Developer & Technical',
        keywords: ['url', 'encoder', 'decoder', 'encode', 'decode'],
        description: 'Encode and decode URLs securely and instantly.',
        url: './url-encoder-decoder/',
        icon: '🔐'
    },
    {
        id: 'css-gradient-generator',
        title: 'CSS Gradient Generator',
        category: 'Developer & Technical',
        keywords: ['css', 'gradient', 'generator', 'color', 'design'],
        description: 'Create beautiful CSS gradients with color pickers.',
        url: './css-gradient-generator/',
        icon: '🎨'
    },
    {
        id: 'random-choice-picker',
        title: 'Random Choice Picker',
        category: 'Developer & Technical',
        keywords: ['random', 'choice', 'picker', 'decision', 'generator'],
        description: 'Make random decisions from a list of choices.',
        url: './random-choice-picker/',
        icon: '🎲'
    },
    {
        id: 'facebook-id-finder',
        title: 'Facebook ID Finder',
        category: 'Marketing & Social Media',
        keywords: ['facebook', 'id', 'finder', 'profile', 'numeric'],
        description: 'Extract numeric Facebook IDs from profile links.',
        url: './facebook-id-finder/',
        icon: '👤'
    },
    {
        id: 'privacy-policy-generator',
        title: 'Privacy Policy Generator',
        category: 'Marketing & Social Media',
        keywords: ['privacy', 'policy', 'generator', 'legal', 'compliance'],
        description: 'Generate professional privacy policies for your site.',
        url: './privacy-policy-generator/',
        icon: '📜'
    },
    {
        id: 'terms-conditions-generator',
        title: 'Terms & Conditions Generator',
        category: 'Marketing & Social Media',
        keywords: ['terms', 'conditions', 'tos', 'legal', 'agreement'],
        description: 'Create custom terms of service agreements instantly.',
        url: './terms-conditions-generator/',
        icon: '⚖️'
    },
    {
        id: 'disclaimer-generator',
        title: 'Disclaimer Generator',
        category: 'Marketing & Social Media',
        keywords: ['disclaimer', 'generator', 'legal', 'protection'],
        description: 'Generate legal disclaimers to protect your business.',
        url: './disclaimer-generator/',
        icon: '⚠️'
    },
    {
        id: 'uuid-generator',
        title: 'UUID / GUID Generator',
        category: 'Developer & Technical',
        keywords: ['uuid', 'guid', 'generator', 'random', 'id'],
        description: 'Generate random version 4 UUIDs instantly.',
        url: './uuid-generator/',
        icon: '🆔'
    },
    {
        id: 'json-formatter-validator',
        title: 'JSON Formatter & Validator',
        category: 'Developer & Technical',
        keywords: ['json', 'formatter', 'validator', 'beautify', 'fix'],
        description: 'Format, beautify, and validate JSON code.',
        url: './json-formatter-validator/',
        icon: 'JSON'
    },
    {
        id: 'text-to-changelog-json-generator',
        title: 'Text to Changelog JSON Generator',
        category: 'Developer & Technical',
        keywords: ['json', 'changelog', 'text to json', 'generator', 'update', 'release notes', 'developer'],
        description: 'Convert text into structured JSON for changelogs.',
        url: './text-to-changelog-json-generator/',
        icon: '📝'
    },
    {
        id: 'base64-to-image',
        title: 'Base64 to Image Decoder',
        category: 'Developer & Technical',
        keywords: ['base64', 'image', 'decoder', 'convert', 'decode'],
        description: 'Decode Base64 strings back into image files.',
        url: './base64-to-image/',
        icon: '🖼️'
    },
    {
        id: 'hash-generator',
        title: 'MD5/SHA Hash Generator',
        category: 'Developer & Technical',
        keywords: ['hash', 'md5', 'sha1', 'sha256', 'generator', 'secure'],
        description: 'Generate MD5, SHA-1, and SHA-256 hashes.',
        url: './hash-generator/',
        icon: '🔒'
    },
    {
        id: 'ip-address-lookup',
        title: 'IP Address Lookup',
        category: 'Developer & Technical',
        keywords: ['ip', 'address', 'lookup', 'my ip', 'network'],
        description: 'Find your public IP and network information.',
        url: './ip-address-lookup/',
        icon: '🌐'
    },
    {
        id: 'sitemap-finder-and-downloader',
        title: 'Sitemap Finder & Custom XML Downloader',
        category: 'Developer & Technical',
        keywords: ['sitemap', 'finder', 'downloader', 'xml', 'seo', 'extract', 'urls'],
        description: 'Extract URLs, modify lastmod dates, and download custom XML sitemaps.',
        url: './sitemap-finder-and-downloader/',
        icon: '🗺️'
    },
	    {
	        id: 'html-code-preview',
	        title: 'Live HTML Previewer',
	        category: 'Developer & Technical',
	        keywords: ['html', 'css', 'js', 'preview', 'editor', 'live', 'code'],
	        description: 'Write HTML/CSS/JS and see live results instantly.',
	        url: './html-code-preview/',
	        icon: '💻'
	    },
	    {
	        id: 'voice-remover',
	        title: 'AI Vocal Remover',
	        category: 'Daily Utilities & Calculators',
	        keywords: ['vocal', 'remover', 'voice', 'music', 'splitter', 'stems', 'ai', 'karaoke'],
	        description: 'Separate vocals and music with 100% free AI.',
	        url: './voice-remover/',
        icon: '🎤'
    },
    {
        id: 'blog',
        title: 'SmartGen Blog',
        category: 'Resources',
        keywords: ['blog', 'news', 'article', 'tutorial', 'insights', 'smartgen blog'],
        description: 'Explore the SmartGen blog for the latest tutorials and insights.',
        url: './blog/',
        icon: '📝'
    }
	];

// Search function
function searchTools(query) {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    
    return TOOLS_INDEX.filter(tool => {
        // Search in title
        if (tool.title.toLowerCase().includes(lowerQuery)) return true;
        
        // Search in description
        if (tool.description.toLowerCase().includes(lowerQuery)) return true;
        
        // Search in keywords
        if (tool.keywords.some(keyword => keyword.includes(lowerQuery))) return true;
        
        // Search in category
        if (tool.category.toLowerCase().includes(lowerQuery)) return true;
        
        return false;
    }).sort((a, b) => {
        // Prioritize title matches
        const aTitle = a.title.toLowerCase().includes(lowerQuery);
        const bTitle = b.title.toLowerCase().includes(lowerQuery);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
    });
}