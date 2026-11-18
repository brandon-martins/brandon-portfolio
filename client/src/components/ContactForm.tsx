import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, CircleCheck, Send } from 'lucide-react';
import { contactSchema } from '@portfolio/shared';
import { contactService } from '../services/contact.service';
import { siteConfig, type EnquiryType } from '../data';
import { useLens } from '../hooks/useLens';
import Turnstile from './Turnstile';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const types: { id: EnquiryType; label: string }[] = [
	{ id: 'job', label: 'Job opportunity' },
	{ id: 'project', label: 'Project enquiry' },
	{ id: 'other', label: 'Something else' },
];

// Label + control + optional hint, so every input has a real <label> (accessibility requirement).
function Field({
	id,
	label,
	hint,
	children,
}: {
	id: string;
	label: string;
	hint?: string;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id} className="text-sm font-medium">
				{label}
			</label>
			{children}
			{hint && <span className="text-xs text-muted">{hint}</span>}
		</div>
	);
}

// Three-step enquiry form: 1) what it's about, 2) details for that type, 3) your contact details.
// "Something else" skips step 2. Validation uses the same zod schema shape as the server.
export default function ContactForm() {
	const { lens } = useLens();
	const [type, setType] = useState<EnquiryType>(lens.enquiry);
	const [step, setStep] = useState(1);
	const [fields, setFields] = useState<Record<string, string>>({});
	const [common, setCommon] = useState({
		name: '',
		email: '',
		message: '',
		website: '',
	});
	const [consent, setConsent] = useState(false);
	const [token, setToken] = useState('');
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState('');

	// Keep the enquiry type in step with the chosen lens (until the visitor edits it).
	useEffect(() => {
		setType(lens.enquiry);
	}, [lens.enquiry]);
	// Stable callback so the Turnstile widget isn't re-rendered on every keystroke.
	const onToken = useCallback((t: string) => setToken(t), []);

	const setField = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));
	const lastStep = 3;
	const next = () => setStep((s) => (s === 1 && type === 'other' ? 3 : s + 1));
	const back = () => setStep((s) => (s === 3 && type === 'other' ? 1 : s - 1));

	async function submit(e: FormEvent) {
		e.preventDefault();
		setError('');
		const parsed = contactSchema.safeParse({
			...common,
			type,
			fields,
			consent,
			turnstileToken: token || undefined,
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? 'Check the form and try again.');
			// Send the visitor back to the step that holds the invalid field.
			if (parsed.error.issues[0]?.path[0] === 'fields') setStep(2);
			return;
		}
		setStatus('sending');
		try {
			await contactService.send(parsed.data);
			setStatus('sent');
		} catch (err) {
			setStatus('error');
			setError(err instanceof Error ? err.message : 'Something went wrong.');
		}
	}

	if (status === 'sent') {
		return (
			<div className="card flex flex-col gap-4" role="status">
				<CircleCheck className="size-8 text-ok" aria-hidden />
				<h3 className="text-2xl">Message sent</h3>
				<p className="text-muted">
					Thanks, I’ve emailed you an acknowledgement. I reply within {siteConfig.responseTime}.
				</p>
				<a
					className="btn btn-accent inline-flex w-full items-center justify-center no-underline sm:w-auto sm:self-start"
					href={siteConfig.bookingUrl}
				>
					Book a 20-minute call
				</a>
			</div>
		);
	}

	return (
		<form onSubmit={submit} className="card relative flex flex-col gap-4" noValidate>
			<span className="meta">
				Step {step} of {lastStep}
			</span>

			{step === 1 && (
				<fieldset className="flex flex-col gap-3">
					<legend className="mb-3 font-display text-2xl font-bold">What’s this about?</legend>
					<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
						{types.map((t) => (
							<button
								key={t.id}
								type="button"
								className="btn btn-toggle w-full sm:w-auto"
								aria-pressed={type === t.id}
								onClick={() => setType(t.id)}
							>
								{t.label}
							</button>
						))}
					</div>
				</fieldset>
			)}

			{step === 2 && type === 'job' && (
				<div className="flex flex-col gap-4">
					<Field id="f-role" label="Role">
						<input
							id="f-role"
							type="text"
							placeholder="e.g. Senior full-stack developer"
							value={fields.role ?? ''}
							onChange={(e) => setField('role', e.target.value)}
						/>
					</Field>
					<Field id="f-company" label="Company">
						<input
							id="f-company"
							type="text"
							placeholder="Company name"
							value={fields.company ?? ''}
							onChange={(e) => setField('company', e.target.value)}
						/>
					</Field>
					<Field id="f-location" label="Location or remote">
						<input
							id="f-location"
							type="text"
							value={fields.location ?? ''}
							onChange={(e) => setField('location', e.target.value)}
						/>
					</Field>
					<Field id="f-source" label="How did you find me?">
						<input
							id="f-source"
							type="text"
							value={fields.source ?? ''}
							onChange={(e) => setField('source', e.target.value)}
						/>
					</Field>
				</div>
			)}
			{step === 2 && type === 'project' && (
				<div className="flex flex-col gap-4">
					<Field id="f-scope" label="What are you building?">
						<input
							id="f-scope"
							type="text"
							placeholder="Short description"
							value={fields.scope ?? ''}
							onChange={(e) => setField('scope', e.target.value)}
						/>
					</Field>
					<Field id="f-budget" label="Budget range">
						<input
							id="f-budget"
							type="text"
							placeholder="e.g. R50k–R100k"
							value={fields.budget ?? ''}
							onChange={(e) => setField('budget', e.target.value)}
						/>
					</Field>
					<Field id="f-timeline" label="Timeline">
						<input
							id="f-timeline"
							type="text"
							placeholder="e.g. Launch by March"
							value={fields.timeline ?? ''}
							onChange={(e) => setField('timeline', e.target.value)}
						/>
					</Field>
				</div>
			)}

			{step === 3 && (
				<div className="flex flex-col gap-4">
					<Field id="f-name" label="Your name">
						<input
							id="f-name"
							type="text"
							autoComplete="name"
							value={common.name}
							onChange={(e) => setCommon({ ...common, name: e.target.value })}
						/>
					</Field>
					<Field id="f-email" label="Email">
						<input
							id="f-email"
							type="email"
							autoComplete="email"
							value={common.email}
							onChange={(e) => setCommon({ ...common, email: e.target.value })}
						/>
					</Field>
					<Field id="f-message" label="Message">
						<textarea
							id="f-message"
							rows={5}
							value={common.message}
							onChange={(e) => setCommon({ ...common, message: e.target.value })}
						/>
					</Field>
					{/* Honeypot: hidden from people, tempting to bots. The server drops any submission that fills it. */}
					<div aria-hidden className="absolute -left-[9999px]">
						<label htmlFor="f-website">Website</label>
						<input
							id="f-website"
							type="text"
							tabIndex={-1}
							autoComplete="off"
							value={common.website}
							onChange={(e) => setCommon({ ...common, website: e.target.value })}
						/>
					</div>
					{/* POPIA: explicit consent is required before anything is stored. */}
					<label className="flex items-start gap-2.5 text-sm text-muted">
						<input
							type="checkbox"
							className="mt-1 size-4 accent-[var(--acc)]"
							checked={consent}
							onChange={(e) => setConsent(e.target.checked)}
						/>
						{/* The notice opens in a new tab on purpose: navigating away would throw away what the visitor has typed. */}
						<span>
							I agree that my details are stored and used only to reply to this message, in line
							with the{' '}
							<a href="/privacy" target="_blank" rel="noopener noreferrer" className="link">
								POPIA privacy notice
								<span className="sr-only"> (opens in a new tab)</span>
							</a>
							.
						</span>
					</label>
					<Turnstile onToken={onToken} />
				</div>
			)}

			{error && (
				<p role="alert" className="text-sm text-err">
					{error}
					{status === 'error' && (
						<>
							{' '}
							You can also email{' '}
							<a className="link" href={`mailto:${siteConfig.email}`}>
								{siteConfig.email}
							</a>
							.
						</>
					)}
				</p>
			)}

			{/* Phones: full-width buttons with the main action on top (flex-col-reverse), Back underneath. */}
			<div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:flex-wrap">
				{step > 1 && (
					<button type="button" className="btn btn-secondary w-full sm:w-auto" onClick={back}>
						Back
					</button>
				)}
				{/* Distinct keys matter: without them React reuses one <button> and flips its type to "submit"
            mid-click, so pressing Continue on the last details step would submit the form early. */}
				{step < lastStep ? (
					<button
						key="next"
						type="button"
						className="btn btn-accent inline-flex w-full items-center justify-center gap-2 sm:w-auto"
						onClick={next}
					>
						Continue
						<ArrowRight className="size-4" aria-hidden />
					</button>
				) : (
					<button
						key="submit"
						type="submit"
						className="btn btn-accent inline-flex w-full items-center justify-center gap-2 sm:w-auto"
						disabled={status === 'sending'}
					>
						{status === 'sending' ? (
							'Sending…'
						) : (
							<>
								Send message
								<Send className="size-4" aria-hidden />
							</>
						)}
					</button>
				)}
			</div>
		</form>
	);
}
