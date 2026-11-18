// Runs after `vite-react-ssg build`: writes dist/404.html and dist/sitemap.xml.
import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Hosts serve /404.html for unknown URLs, so the pre-rendered 404 page is copied to that name.
const SITE = process.env.VITE_SITE_URL || 'https://brandonmartins.co.za';
// fileURLToPath, not `.pathname`: on Windows `.pathname` yields "/C:/...", which resolves to "C:\C:\...".
const dist = fileURLToPath(new URL('../dist', import.meta.url));

if (existsSync(join(dist, '404', 'index.html')))
	copyFileSync(join(dist, '404', 'index.html'), join(dist, '404.html'));

// Discover pages by walking dist for folders containing index.html, so new routes join the sitemap automatically.
const routes = [];
(function walk(dir, rel = '') {
	for (const name of readdirSync(dir)) {
		const full = join(dir, name);
		if (!statSync(full).isDirectory()) continue;
		if (['assets', 'static-loader-data', '404'].includes(name) && rel === '') continue;
		const next = `${rel}/${name}`;
		if (existsSync(join(full, 'index.html'))) routes.push(next);
		walk(full, next);
	}
})(dist);

const urls = ['/', ...routes].map((r) => `  <url><loc>${SITE}${r}</loc></url>`).join('\n');
writeFileSync(
	join(dist, 'sitemap.xml'),
	`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`[postbuild] 404.html + sitemap.xml (${routes.length + 1} urls)`);
