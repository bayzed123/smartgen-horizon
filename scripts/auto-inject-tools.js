const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const searchDataPath = path.join(rootDir, 'assets', 'js', 'search-data.js');
const indexPath = path.join(rootDir, 'index.html');

// Non-tool structural folders to skip
const ignoreDirs = ['assets', 'scripts', '.github', 'blog', 'node_modules', '.git', 'updates', 'cookies'];

console.log('🔍 System Scanning Tools Folders...');
const tools = [];

const items = fs.readdirSync(rootDir);
items.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    
    if (fs.statSync(folderPath).isDirectory() && !ignoreDirs.includes(folder)) {
        const toolIndexPath = path.join(folderPath, 'index.html');
        
        if (fs.existsSync(toolIndexPath)) {
            const html = fs.readFileSync(toolIndexPath, 'utf8');
            
            // Regex parse tags from tool page directly
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
                url: `./${folder}/`
            });
            console.log(`✅ Scanned & Connected: ${name}`);
        }
    }
});

// 1. Re-render Search Data File
const searchDataObj = tools.map(t => ({
    id: t.id,
    title: t.name,
    category: t.category,
    keywords: [t.id, 'tool', 'beta'],
    description: t.description,
    url: t.url,
    icon: t.icon
}));

const searchContent = `// AUTO_INJECT_SEARCH_START\nconst TOOLS_INDEX = ${JSON.stringify(searchDataObj, null, 4)};\n// AUTO_INJECT_SEARCH_END`;

if (fs.existsSync(searchDataPath)) {
    let searchFile = fs.readFileSync(searchDataPath, 'utf8');
    searchFile = searchFile.replace(/\/\/ AUTO_INJECT_SEARCH_START[\s\S]*?\/\/ AUTO_INJECT_SEARCH_END/, searchContent);
    fs.writeFileSync(searchDataPath, searchFile);
    console.log('✅ Search Data Synchronized!');
}

// 2. Pure Grid Rendering into index.html Content Main Body
let indexHtml = '\n        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 4rem; text-align: left;">';
tools.forEach(tool => {
    indexHtml += `
            <a href="${tool.url}" style="text-decoration: none; padding: 20px; border: 1px solid #e1e8ed; border-radius: 12px; display: block; background: #ffffff; transition: transform 0.2s;">
                <div style="font-size: 2.2rem; margin-bottom: 12px;">${tool.icon}</div>
                <h3 style="color: #2d3748; margin: 0 0 8px 0; font-size: 1.15rem; font-weight: bold;">${tool.name}</h3>
                <p style="color: #4a5568; font-size: 0.9rem; margin: 0; line-height: 1.5;">${tool.description}</p>
            </a>`;
});
indexHtml += '\n        </div>\n';

if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    indexContent = indexContent.replace(/[\s\S]*?/, `${indexHtml}            `);
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Homepage Grid Render Up-to-date!');
}

console.log('🚀 Staging Automation Engine Complete!');