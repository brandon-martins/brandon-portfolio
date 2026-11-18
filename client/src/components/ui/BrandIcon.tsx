import type { CSSProperties } from 'react';

interface Props {
	/** URL of a Simple Icons SVG imported from `assets/icons/tech`. */
	src: string;
	/** Accessible name. Omit when the icon sits next to visible text, so it is hidden from screen readers. */
	label?: string;
	className?: string;
}

/**
 * Renders a single-colour brand SVG through a CSS mask.
 * Why a mask and not <img>: an <img> SVG can't inherit `currentColor`, so the logo would stay black
 * in dark mode. The mask lets it follow the surrounding text colour in both themes, with no extra package.
 */
export default function BrandIcon({ src, label, className = 'size-4' }: Props) {
	const style: CSSProperties = {
		maskImage: `url("${src}")`,
		WebkitMaskImage: `url("${src}")`,
	};
	return (
		<span
			role={label ? 'img' : undefined}
			aria-label={label}
			aria-hidden={label ? undefined : true}
			className={`brand-icon inline-block shrink-0 ${className}`}
			style={style}
		/>
	);
}
