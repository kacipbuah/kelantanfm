// Current + recent songs for a station, read from the playlist block that
// radioonline.my renders (song recognition by ACRCloud). Cached at the edge
// for 30s so many listeners result in one upstream request.

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

function parse(html) {
  const items = [];
  const re =
    /class="playlist__item[^"]*"[^>]*>[\s\S]*?<img class="playlist__img" src="([^"]*)"[\s\S]*?playlist__song-name">([^<]*)<[\s\S]*?playlist__artist-name">([^<]*)</g;
  let m;
  while ((m = re.exec(html))) {
    const img = m[1];
    // ad-insertion markers sometimes leak into the title field
    if (/adContext=|^\s*$/.test(m[2])) continue;
    items.push({
      title: decode(m[2]),
      artist: decode(m[3]),
      // the station logo is used as a placeholder when there is no cover art
      cover: img.includes("/images/logos/") ? null : img,
    });
  }
  return items;
}

export default async function handler(req, res) {
  const slug = String(req.query.slug || "");
  if (!/^[a-z0-9-]{1,60}$/.test(slug)) {
    res.status(400).json({ error: "bad slug" });
    return;
  }
  try {
    // their CDN caches the page for days unless the URL is unique; one bucket per 30s
    const bucket = Math.floor(Date.now() / 30000);
    const r = await fetch(`https://radioonline.my/${slug}/?np=${bucket}`, {
      headers: { "User-Agent": "Mozilla/5.0 (kelantanfm.vercel.app)" },
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    const items = parse(await r.text());
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    res.status(200).json({ current: items[0] || null, previous: items.slice(1) });
  } catch (e) {
    res.setHeader("Cache-Control", "public, s-maxage=15");
    res.status(502).json({ error: String(e.message || e) });
  }
}
