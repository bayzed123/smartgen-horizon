from flask import Flask, request, jsonify, render_template_string
import requests
import subprocess
import json
import re
from bs4 import BeautifulSoup

app = Flask(__name__)

# --- SMARTGEN FRONTEND (HTML, CSS, JS) ---
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartGen Pinterest Raw Extractor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #0f172a; color: #f8fafc; }
        .loader { border-top-color: #3b82f6; -webkit-animation: spinner 1.5s linear infinite; animation: spinner 1.5s linear infinite; }
        @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center p-4">

    <div class="max-w-2xl w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white mb-2">🚀 SmartGen Tools</h1>
            <p class="text-slate-400">Pinterest Raw HD Downloader (Image, GIF, Video)</p>
        </div>

        <div class="flex flex-col gap-4">
            <input type="url" id="pin-url" placeholder="Paste Pinterest URL here (e.g., https://pin.it/...)" 
                class="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-500">
            
            <button onclick="extractMedia()" id="extract-btn"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                <span>Extract Raw File</span>
            </button>
        </div>

        <!-- Loading State -->
        <div id="loading" class="hidden mt-8 flex flex-col items-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-slate-600 h-10 w-10 mb-4"></div>
            <p class="text-slate-400">Bypassing CDN and extracting HD file...</p>
        </div>

        <!-- Result Container -->
        <div id="result-container" class="hidden mt-8 text-center bg-slate-900 p-6 rounded-lg border border-slate-700">
            <h3 class="text-xl font-bold text-green-400 mb-4">✅ Extraction Successful!</h3>
            
            <div id="media-preview" class="mb-6 flex justify-center"></div>
            
            <a id="download-link" href="#" target="_blank" 
                class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Open / Download Raw File
            </a>
            <p class="text-xs text-slate-500 mt-3">Right-click the link/button and select "Save As" if it opens in browser.</p>
        </div>

        <!-- Error Container -->
        <div id="error-container" class="hidden mt-8 text-center bg-red-900/30 border border-red-500/50 p-4 rounded-lg text-red-400">
        </div>
    </div>

    <script>
        async function extractMedia() {
            const urlInput = document.getElementById('pin-url').value;
            const loading = document.getElementById('loading');
            const resultDiv = document.getElementById('result-container');
            const errorDiv = document.getElementById('error-container');
            const btn = document.getElementById('extract-btn');

            if (!urlInput) {
                alert("Please enter a Pinterest URL.");
                return;
            }

            resultDiv.classList.add('hidden');
            errorDiv.classList.add('hidden');
            loading.classList.remove('hidden');
            btn.disabled = true;
            btn.classList.add('opacity-50');

            try {
                const response = await fetch('/api/extract', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: urlInput })
                });

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                document.getElementById('download-link').href = data.raw_url;
                const previewDiv = document.getElementById('media-preview');
                
                if (data.type === 'video') {
                    previewDiv.innerHTML = '<span class="text-5xl">🎥</span><br><span class="text-sm text-slate-400 mt-2">HD Video File</span>';
                } else {
                    previewDiv.innerHTML = `<img src="${data.preview}" class="max-h-64 rounded-md shadow-md border border-slate-600">`;
                }

                loading.classList.add('hidden');
                resultDiv.classList.remove('hidden');

            } catch (err) {
                loading.classList.add('hidden');
                errorDiv.innerText = "Error: " + err.message;
                errorDiv.classList.remove('hidden');
            } finally {
                btn.disabled = false;
                btn.classList.remove('opacity-50');
            }
        }
    </script>
</body>
</html>
"""

# --- BACKEND LOGIC ---

def get_raw_pinterest_image(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        meta_image = soup.find('meta', property='og:image')
        if not meta_image:
            return {"error": "Could not find an image on this page. It might be a private pin."}
            
        img_url = meta_image['content']
        raw_hd_url = re.sub(r'/[0-9]+x/', '/originals/', img_url)
        
        return {"type": "image", "raw_url": raw_hd_url, "preview": img_url}
    except Exception as e:
        return {"error": str(e)}

def get_raw_pinterest_video(url):
    try:
        cmd = ['yt-dlp', '-j', '--no-warnings', url]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        video_data = json.loads(result.stdout)
        best_video_url = video_data.get('url')
        
        if not best_video_url:
            return {"error": "yt-dlp extracted data but found no raw video URL."}
            
        return {"type": "video", "raw_url": best_video_url, "title": video_data.get('title')}
    except subprocess.CalledProcessError:
        return {"error": "Video extraction failed."}

# --- ROUTES ---

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/extract', methods=['POST'])
def extract_api():
    data = request.json
    url = data.get('url')
    
    if not url or ('pinterest.com' not in url and 'pin.it' not in url):
        return jsonify({"error": "Invalid Pinterest URL"}), 400

    video_result = get_raw_pinterest_video(url)
    
    if "error" not in video_result:
        return jsonify(video_result)
        
    image_result = get_raw_pinterest_image(url)
    return jsonify(image_result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)