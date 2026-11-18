import LegalPage from '../components/LegalPage';
import { privacyNotice } from '../data';

// /privacy: linked from the footer and from the consent checkbox in the contact form.
export default function Privacy() {
	return <LegalPage doc={privacyNotice} path="/privacy" />;
}
