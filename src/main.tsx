import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// PAGES
import Layout from './components/layout/Layout.tsx';
import Landing from './pages/Landing.tsx';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [{ path: '/', element: <Landing /> }],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
