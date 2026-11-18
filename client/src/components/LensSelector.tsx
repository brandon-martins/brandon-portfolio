import { useLens } from '../hooks/useLens';
import LensButtons from './LensButtons';

// The "I'm here to…" card in the hero. Picking a lens re-orders the page, swaps the main
// call-to-action and pre-selects the matching enquiry type in the contact form.
export default function LensSelector() {
	const { lens } = useLens();
	return (
		<div className="card flex max-w-[560px] flex-col gap-3.5">
			<span id="lens-heading" className="meta">
				I’m here to…
			</span>
			<LensButtons labelledBy="lens-heading" />
			{/* aria-live announces the change to screen reader users, since the re-ordering is visual. */}
			<p className="text-sm leading-[1.55] text-muted" aria-live="polite">
				{lens.note}
			</p>
		</div>
	);
}
