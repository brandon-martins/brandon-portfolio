// Entry point. vite-react-ssg pre-renders every route in routes.tsx to static HTML at build time.
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/index.css';

export const createRoot = ViteReactSSG({ routes });
