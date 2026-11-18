import { Link } from 'react-router-dom';

// Shown by the router when a route throws while rendering, instead of a blank screen.
export default function RouteError() {
	return (
		<section className="mx-auto w-full max-w-[640px] px-5 sm:px-8 py-24">
			<h1 className="text-4xl">Something went wrong.</h1>
			<p className="mt-4 text-muted">Reload the page, or head back home.</p>
			<Link
				to="/"
				className="btn btn-primary mt-8 inline-flex items-center justify-center no-underline"
			>
				Back to home
			</Link>
		</section>
	);
}
