import LegalPage from '../components/LegalPage';
import { termsOfUse } from '../data';

// /terms: linked from the footer and from the privacy notice.
export default function Terms() {
	return <LegalPage doc={termsOfUse} path="/terms" />;
}
