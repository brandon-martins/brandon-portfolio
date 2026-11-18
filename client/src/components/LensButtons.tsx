import { lenses } from '../data';
import { useLens } from '../hooks/useLens';

interface Props {
	/** Always stack full-width (the mobile menu). Otherwise they stack on phones and sit in a row from `sm` up. */
	stacked?: boolean;
	/** Id of the element that labels the group. */
	labelledBy: string;
	/** Called after a lens is chosen (the mobile menu closes itself here so the new order is visible straight away). */
	onSelect?: () => void;
}

// The three lens choices as toggle pills. Shared by the hero card and the mobile menu so they can't drift apart.
// Full width on phones: a big, easy tap target, and the longer labels ("Just look around") never wrap awkwardly.
export default function LensButtons({ stacked = false, labelledBy, onSelect }: Props) {
	const { lens, setLens } = useLens();
	return (
		<div
			role="group"
			aria-labelledby={labelledBy}
			className={`flex flex-col gap-2 ${stacked ? '' : 'sm:flex-row sm:flex-wrap'}`}
		>
			{lenses.map((l) => (
				<button
					key={l.id}
					type="button"
					aria-pressed={l.id === lens.id}
					onClick={() => {
						setLens(l.id);
						onSelect?.();
					}}
					className={`btn btn-toggle btn-toggle-accent w-full ${stacked ? '' : 'sm:w-auto'}`}
				>
					{l.label}
				</button>
			))}
		</div>
	);
}
