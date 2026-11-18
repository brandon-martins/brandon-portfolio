// Route table. `getStaticPaths` tells the pre-renderer which project pages to generate.
import type { RouteRecord } from 'vite-react-ssg';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CV from './pages/CV';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import RouteError from './pages/RouteError';
import { projects } from './data';

export const routes: RouteRecord[] = [
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <RouteError />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'projects', element: <Projects /> },
			{
				path: 'projects/:slug',
				element: <ProjectDetail />,
				getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
			},
			{ path: 'cv', element: <CV /> },
			{ path: 'contact', element: <Contact /> },
			{ path: 'privacy', element: <Privacy /> },
			{ path: 'terms', element: <Terms /> },
			{ path: '404', element: <NotFound /> },
			{ path: '*', element: <NotFound /> },
		],
	},
];
