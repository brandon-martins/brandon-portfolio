// API calls for the contact form. The axios interceptor already unwraps `data`, hence the explicit return type.
import client from '../lib/axiosClient';
import { CONTACT_PATHS } from './apiPaths/contact.paths';
import type { ContactPayload } from '@portfolio/shared';

export const contactService = {
	send: (payload: ContactPayload) => client.post<never, { ok: true }>(CONTACT_PATHS.SEND, payload),
};
