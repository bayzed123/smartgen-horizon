const fs = require("fs");

function extractLinks(html) {
  const regex = /href=["'](.*?)["']/g;
  let match;
  const links = [];

  while ((match = regex.exec(html)) !== null) {
    let url = match[1].trim();

    // ignore empty / anchors / javascript links
    if (
      !url ||
      url.startsWith("#") ||
      url.startsWith("javascript:") ||
      url === "/"
    ) continue;

    links.push(url);
  }

  return links;
}

if (!fs.existsSync("html-files.txt")) {
  console.log("No html files list found");
  process.exit(0);
}

const files = fs.readFileSync("html-files.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

let allLinks = [];

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, "utf-8");
    const links = extractLinks(content);
    allLinks.push(...links);
  } catch (e) {
    console.log("Skip:", file);
  }
});

// 🔥 REMOVE DUPLICATES
allLinks = [...new Set(allLinks)].sort();

console.log("Total unique links:", allLinks.length);

// 🔥 GENERATE HTML PAGE
const htmlPage = `
<!DOCTYPE html>
<html>
<head>
  <title>All Links Index</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    a { display: block; margin: 5px 0; }
  </style>
</head>
<body>
  <h1>All Unique Links</h1>
  <p>Total: ${allLinks.length}</p>
  <hr>
  ${allLinks.map(l => `<a href="${l}" target="_blank">${l}</a>`).join("\n")}
</body>
</html>
`;

fs.writeFileSync("links.html", htmlPage);

console.log("links.html generated successfully");