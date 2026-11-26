import { siteConfig } from '../data';

// Every inner page's <title> in one format ("Projects | Brandon Martins": page first, then the site name), so the
// separator is chosen in one place. The home page sets its own title: the name first, then what Brandon does.
export const pageTitle = (page: string): string => `${page} | ${siteConfig.name}`;
