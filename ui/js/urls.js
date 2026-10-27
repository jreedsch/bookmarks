// Only http(s) URLs are put into links and frames, so data can't inject javascript: URLs.
export function isWebUrl(url) {
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

// Returns the YouTube embed URL for a YouTube video URL, or null if it isn't one.
export function youtubeEmbedUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^(www\.|m\.)/, '');
  let id = null;

  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1);
  } else if (host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      id = parsed.searchParams.get('v');
    } else {
      const match = parsed.pathname.match(/^\/(embed|shorts|live)\/([^/]+)/);
      if (match) id = match[2];
    }
  }

  return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
}
