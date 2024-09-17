import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store.ts';
import { fetchUserBasedOnToken } from './store/auth-slice.ts';

// PAGES
import Layout from './components/layout/Layout.tsx';
import Landing from './pages/Landing.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CreateProfile from './pages/CreateProfile.tsx';
import EditProfile from './pages/EditProfile.tsx';
import AddEducation from './pages/AddEducation.tsx';
import AddExperience from './pages/AddExperience.tsx';
import Developers from './pages/Developers.tsx';
import Developer from './pages/Developer.tsx';
import Posts from './pages/Posts.tsx';
import Post from './pages/Post.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

import ProtectedRoute from './components/layout/ProtectedRoute.tsx';
import './index.css';


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: (
			<Layout>
				<ErrorPage />
			</Layout>
		),
		loader: async () => {
			if (localStorage.getItem('jwt')) {
				await store.dispatch(fetchUserBasedOnToken());
			}
			return null;
		},
		children: [
			{ index: true, element: <Landing /> },
			{ path: '/sign-up', element: <Signup /> },
			{ path: '/login', element: <Login /> },
			{ path: '/developers', element: <Developers /> },
			{ path: '/developer/:uid', element: <Developer /> },

			// protected routes
			{
				element: <ProtectedRoute />,
				children: [
					{ path: '/dashboard', element: <Dashboard /> },
					{ path: '/create-profile', element: <CreateProfile /> },
					{ path: '/edit-profile', element: <EditProfile /> },
					{ path: '/add-education', element: <AddEducation /> },
					{ path: '/add-experience', element: <AddExperience /> },
					{ path: '/posts', element: <Posts /> },
					{ path: '/post/:pid', element: <Post /> },
				],
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
