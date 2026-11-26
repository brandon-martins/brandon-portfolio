import { siteConfig } from '../data';
import Seo from '../components/Seo';
import ContactForm from '../components/ContactForm';
import { pageTitle } from '../utils/seo';

// Standalone contact page (the home page has its own panel). Useful as a direct link for recruiters.
export default function Contact() {
	return (
		<section className="mx-auto w-full max-w-[640px] px-5 sm:px-8 pt-16">
			<Seo
				title={pageTitle('Contact')}
				description="Send a job opportunity, a project enquiry or a message."
				path="/contact"
			/>
			<h1 className="text-5xl">Get in touch</h1>
			<p className="mb-8 mt-3 text-muted">I typically reply within {siteConfig.responseTime}.</p>
			<ContactForm />
		</section>
	);
}
