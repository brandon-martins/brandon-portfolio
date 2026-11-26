import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { pageTitle } from '../utils/seo';

// Rendered for unknown URLs and unknown project slugs. postbuild.mjs also copies it to dist/404.html for the host.
export default function NotFound() {
	return (
		<section className="mx-auto w-full max-w-[640px] px-5 sm:px-8 py-24">
			<Seo
				title={pageTitle('Page not found')}
				description="This page does not exist."
				path="/404"
			/>
			<p className="meta">404</p>
			<h1 className="mt-3 text-5xl">That page doesn’t exist.</h1>
			<p className="mt-4 text-muted">The link may be old, or the address mistyped.</p>
			<Link
				to="/"
				className="btn btn-accent mt-8 inline-flex w-full items-center justify-center no-underline sm:w-auto"
			>
				Back to home
			</Link>
		</section>
	);
}
