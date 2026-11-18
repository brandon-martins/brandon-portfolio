import { Head } from 'vite-react-ssg';

// Per-page <head> tags (title, description, canonical, Open Graph, optional JSON-LD). vite-react-ssg writes them
// into each pre-rendered HTML file, so crawlers and link previews see them without running JavaScript.
const SITE = import.meta.env.VITE_SITE_URL || 'https://brandonmartins.co.za';

interface SeoProps {
	title: string;
	description: string;
	path?: string;
	jsonLd?: object;
}

export default function Seo({ title, description, path = '/', jsonLd }: SeoProps) {
	const url = `${SITE}${path}`;
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={`${SITE}/og-default.png`} />
			<meta name="twitter:card" content="summary_large_image" />
			{jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
		</Head>
	);
}
