// The visitor's acknowledgement email, kept apart from the transport so a test can read the wording without SMTP.
// The reply time comes from @portfolio/shared, the same constant the website uses.
import { RESPONSE_TIME } from '@portfolio/shared';

export function acknowledgementText(name: string): string {
	return `Hi ${name},\n\nThanks for getting in touch. I typically reply within ${RESPONSE_TIME}.\n\n— Brandon`;
}
