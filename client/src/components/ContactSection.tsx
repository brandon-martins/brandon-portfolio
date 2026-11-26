import { useState } from 'react';
import { CalendarDays, Mail } from 'lucide-react';
import { getEnquiry, siteConfig, type EnquiryType } from '../data';
import { useLens } from '../hooks/useLens';
import ContactForm from './ContactForm';

// Always-dark panel at the end of the home page. Colours come from the --panel-* tokens,
// so it stays dark in both themes without hard-coded hex values.
// min-h: Contact is the last section, so without it the page ends too soon for "Contact" in the nav to scroll it to the
// top of the screen and the previous section would still show above it. 12rem is roughly the footer's height; the
// two together always fill a screen.
export default function ContactSection() {
	const { lens } = useLens();
	// The enquiry type is owned here so the heading and intro follow it. The lens pre-selects it (ContactForm keeps it in
	// step), and the visitor can still change it with the pills.
	const [type, setType] = useState<EnquiryType>(lens.enquiry);
	const enquiry = getEnquiry(type);
	// Contact always follows the six lens-ordered sections, so its number is derived, not hard-coded.
	const number = String(lens.order.length + 1).padStart(2, '0');
	return (
		<section
			id="contact"
			aria-labelledby="contact-title"
			className="mx-auto min-h-[calc(100svh-12rem)] w-full max-w-[1200px] px-5 pt-[var(--section-gap)] sm:px-8"
		>
			<div className="flex flex-wrap gap-12 rounded-3xl bg-panel p-6 text-panel-ink sm:p-8 md:rounded-[28px] md:p-12">
				<div className="flex flex-[1_1_320px] flex-col gap-5">
					<span className="meta text-panel-muted">{number} — Contact</span>
					<h2 id="contact-title" className="text-[clamp(32px,5vw,48px)] leading-[1.1]">
						{enquiry.title}
					</h2>
					<p className="text-[17px] leading-[1.55] text-panel-muted">
						{enquiry.blurb} I typically reply within {siteConfig.responseTime}. Based in{' '}
						{siteConfig.location}.
					</p>
					<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
						<a
							className="btn btn-accent inline-flex w-full items-center justify-center gap-2 no-underline sm:w-auto"
							href={siteConfig.bookingUrl}
						>
							<CalendarDays className="size-4" aria-hidden />
							Book a 20-minute call
						</a>
						<a
							className="btn inline-flex w-full items-center justify-center gap-2 border-panel-ink text-panel-ink no-underline sm:w-auto"
							href={`mailto:${siteConfig.email}`}
						>
							<Mail className="size-4" aria-hidden />
							Email Brandon
						</a>
					</div>
				</div>
				<div className="flex-[1_1_410px] self-center">
					<ContactForm type={type} onTypeChange={setType} />
				</div>
			</div>
		</section>
	);
}
