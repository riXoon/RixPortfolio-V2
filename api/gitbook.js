export default async function handler(req, res) {
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
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
