const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const searchDataPath = path.join(rootDir, 'assets', 'js', 'search-data.js');
const indexPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'assets', 'js', 'app.js');

// যেসব ফোল্ডার টুল নয়, সেগুলোকে স্ক্যান থেকে বাদ দেওয়া হলো
const ignoreDirs = ['assets', 'scripts', '.github', 'blog', 'node_modules', '.git', 'updates', 'cookies'];

console.log('🔍 Scanning folders for new testing tools...');
const tools = [];

const items = fs.readdirSync(rootDir);
items.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    
    if (fs.statSync(folderPath).isDirectory() && !ignoreDirs.includes(folder)) {
        const toolIndexPath = path.join(folderPath, 'index.html');
        
        if (fs.existsSync(toolIndexPath)) {
            const html = fs.readFileSync(toolIndexPath, 'utf8');
            
            // HTML থেকে ট্যাগ এক্সট্র্যাক্ট করা
            const titleMatch = html.match(/<title>(.*?)<\/title>/i);
            const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
            const iconMatch = html.match(/<meta\s+name="tool-icon"\s+content="(.*?)"/i);
            const catMatch = html.match(/<meta\s+name="tool-category"\s+content="(.*?)"/i);

            const name = titleMatch ? titleMatch[1].split('-')[0].trim() : folder;
            const description = descMatch ? descMatch[1] : 'Beta testing tool under development.';
            const icon = iconMatch ? iconMatch[1] : '🔧';
            const category = catMatch ? catMatch[1] : 'Beta Testing';

            tools.push({
                id: folder,
                name,
                description,
                icon,
                category,
                url: `./${folder}/` // সার্চের জন্য আপনার সেটিং অনুযায়ী রিলেটিভ লিংক
            });
            console.log(`✅ Detected: ${name}`);
        }
    }
});

if (tools.length === 0) {
    console.log('⚠️ No tools found! Make sure you added tool-icon meta tags.');
    process.exit(0);
}

// ১. search-data.js আপডেট করা (সার্চ বক্সের জন্য)
const searchDataObj = tools.map(t => ({
    id: t.id,
    title: t.name,
    category: t.category,
    keywords: [t.id, 'tool', 'beta', t.category.toLowerCase()],
    description: t.description,
    url: t.url,
    icon: t.icon
}));

const searchContent = `// AUTO_INJECT_SEARCH_START\nconst TOOLS_INDEX = ${JSON.stringify(searchDataObj, null, 4)};\n// AUTO_INJECT_SEARCH_END`;

if (fs.existsSync(searchDataPath)) {
    let searchFile = fs.readFileSync(searchDataPath, 'utf8');
    searchFile = searchFile.replace(/\/\/ AUTO_INJECT_SEARCH_START[\s\S]*?\/\/ AUTO_INJECT_SEARCH_END/, searchContent);
    fs.writeFileSync(searchDataPath, searchFile);
    console.log('✅ Updated search-data.js (Live Search Working)');
}

// ২. index.html আপডেট করা (হোমপেজ গ্রিড)
let indexHtml = '';
tools.forEach(tool => {
    indexHtml += `
            <a href="${tool.url}" class="tool-card" style="text-decoration: none; padding: 1.5rem; border: 1px solid var(--border-color, #e5e7eb); border-radius: 8px; display: block; transition: all 0.2s; background: var(--bg-card, #fff); text-align: left;">
                <div class="tool-icon" style="font-size: 2rem; margin-bottom: 1rem;">${tool.icon}</div>
                <h3 style="color: var(--text-primary, #2d3748); margin-bottom: 0.5rem; font-size: 1.1rem;">${tool.name}</h3>
                <p style="color: var(--text-secondary, #4a5568); font-size: 0.9rem; margin: 0; line-height: 1.5;">${tool.description}</p>
            </a>`;
});

if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    const newInjection = `<!-- AUTO_INJECT_INDEX_START -->\n        <div class="tool-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">\n${indexHtml}\n        </div>\n        <!-- AUTO_INJECT_INDEX_END -->`;
    indexContent = indexContent.replace(/<!-- AUTO_INJECT_INDEX_START -->[\s\S]*?<!-- AUTO_INJECT_INDEX_END -->/, newInjection);
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Updated index.html (Homepage Cards Added)');
}

// ৩. app.js আপডেট করা (মোবাইল সাইডবার)
let sidebarHtml = '';
tools.forEach(tool => {
    sidebarHtml += `\n                <a href="${tool.url}" class="nav-item" style="color: var(--text-primary); padding: 8px 0; text-decoration: none; display: block; font-size: 0.95rem;">&nbsp;&nbsp;${tool.icon} ${tool.name}</a>`;
});

if (fs.existsSync(appJsPath)) {
    let appContent = fs.readFileSync(appJsPath, 'utf8');
    appContent = appContent.replace(/<!-- AUTO_INJECT_SIDEBAR_START -->[\s\S]*?<!-- AUTO_INJECT_SIDEBAR_END -->/, `<!-- AUTO_INJECT_SIDEBAR_START -->${sidebarHtml}\n                <!-- AUTO_INJECT_SIDEBAR_END -->`);
    fs.writeFileSync(appJsPath, appContent);
    console.log('✅ Updated app.js (Sidebar Links Added)');
}

console.log('🚀 Fully Automated Workflow Complete! All systems green.');
