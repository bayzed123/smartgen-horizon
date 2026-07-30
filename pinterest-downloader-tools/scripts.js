/**
 * pinfetch-worker.js — Cloudflare Worker backend for PinFetch Pro
 * -----------------------------------------------------------------
 * This replaces pinfetch.php for GitHub Pages hosting. GitHub Pages only
 * serves static files (no PHP, no Node), so the fetch-Pinterest-server-side
 * step has to live somewhere that CAN run code — this Worker is that piece.
 * Your HTML stays on GitHub Pages; this small script runs on Cloudflare's
 * free tier and does the one job a static host can't: reach pinterest.com
 * without the browser's CORS rule getting in the way.
 *
 * DEPLOY (dashboard, no CLI needed):
 * 1. dash.cloudflare.com → Workers & Pages → Create application → Hello World
 * 2. Name it (e.g. "pinfetch-worker") → Deploy
 * 3. Edit code → delete the template → paste this whole file → Deploy
 * 4. Copy the *.workers.dev URL it gives you
 * 5. In pinfetch-pro.html, set API_ENDPOINT to that URL (see comment there)
 *
 * If you'd rather use Wrangler: wrangler deploy pinfetch-worker.js
 */

const PIN_URL_RE = /^https?:\/\/([a-z0-9-]+\.)?(pinterest\.[a-z.]{2,10}\/pin\/|pin\.it\/)/i;
const PINIMG_RE = /^https:\/\/([a-z0-9-]+\.)*pinimg\.com\//i;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // tighten to your exact site origin if you want
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const action = url.searchParams.get('action');
    if (action === 'extract') {
      return handleExtract(url);
    }
    if (action === 'download') {
      return handleDownload(url);
    }
    return jsonError(400, 'Unknown action.');
  },
};

async function handleExtract(url) {
  const pinUrl = (url.searchParams.get('url') || '').trim();

  if (!pinUrl || !PIN_URL_RE.test(pinUrl)) {
    return jsonError(400, "That doesn't look like a Pinterest pin link.");
  }

  let res;
  try {
    res = await fetch(pinUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
  } catch (err) {
    return jsonError(502, "Couldn't reach Pinterest. It may be temporarily blocking this server — try again in a minute.");
  }

  if (!res.ok) {
    return jsonError(502, "Couldn't reach Pinterest. It may be temporarily blocking this server — try again in a minute.");
  }

  const html = await res.text();
  const result = { sourceUrl: res.url };

  const titleMatch =
    html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i) ||
    html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) result.title = decodeEntities(titleMatch[1]);

  let videoUrl = null;
  const videoMatch = html.match(/<meta\s+property="og:video(?::url)?"\s+content="([^"]+)"/i);
  if (videoMatch) videoUrl = decodeEntities(videoMatch[1]);

  let imageUrl = null;
  const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  if (imageMatch) {
    imageUrl = upgradeToOriginal(decodeEntities(imageMatch[1]));
  }

  if (videoUrl) {
    result.type = 'video';
    result.media = videoUrl;
    if (imageUrl) result.thumbnail = imageUrl;
  } else if (imageUrl) {
    result.type = 'image';
    result.media = imageUrl;
  } else {
    return jsonError(404, 'No downloadable media found on this pin. It may be private, removed, or Pinterest changed its page format.');
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

async function handleDownload(url) {
  const src = (url.searchParams.get('src') || '').trim();
  const type = url.searchParams.get('type') || 'image';

  // Only ever proxy Pinterest's own CDN — never turn this into an open URL fetcher.
  if (!src || !PINIMG_RE.test(src)) {
    return new Response('Invalid media source.', { status: 400, headers: CORS_HEADERS });
  }

  let res;
  try {
    res = await fetch(src);
  } catch (err) {
    return new Response('Could not download the file from Pinterest right now.', {
      status: 502,
      headers: CORS_HEADERS,
    });
  }
  if (!res.ok || !res.body) {
    return new Response('Could not download the file from Pinterest right now.', {
      status: 502,
      headers: CORS_HEADERS,
    });
  }

  const ext = type === 'video' ? 'mp4' : 'jpg';
  const contentType = res.headers.get('Content-Type') || (type === 'video' ? 'video/mp4' : 'image/jpeg');

  return new Response(res.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="pinfetch-pro.${ext}"`,
      ...CORS_HEADERS,
    },
  });
}

function upgradeToOriginal(imgUrl) {
  return imgUrl.replace(/\/\d{2,4}x(\/|$)/, '/originals$1');
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function jsonError(status, message) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}
