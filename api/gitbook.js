// In-memory cache for serverless function hot invocations
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

export default async function handler(req, res) {
  // Add Cache-Control headers so Vercel CDN and the browser can cache the response
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const apiKey = process.env.VITE_GITBOOK_API_KEY || process.env.GITBOOK_API_KEY;
  const spaceId = process.env.VITE_GITBOOK_SPACE_ID || process.env.GITBOOK_SPACE_ID;

  if (!apiKey || !spaceId) {
    return res.status(500).json({ error: 'Missing GitBook API Key or Space ID in environment variables.' });
  }

  const { path, pageId } = req.query;
  
  let endpoint = `https://api.gitbook.com/v1/spaces/${spaceId}/content`;
  if (pageId) {
    endpoint = `https://api.gitbook.com/v1/spaces/${spaceId}/content/page/${pageId}`;
  } else if (path) {
    endpoint = `https://api.gitbook.com/v1/spaces/${spaceId}/content/path/${path}`;
  }

  // Check in-memory cache first
  const cacheKey = endpoint;
  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
    return res.status(200).json(cachedEntry.data);
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.error?.message || 'Failed to fetch from GitBook API' });
    }

    const data = await response.json();
    
    // Save to in-memory cache
    cache.set(cacheKey, { timestamp: Date.now(), data });
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
