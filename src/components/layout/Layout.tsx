import { Outlet } from 'react-router-dom';
import { ReactNode } from 'react';

import Navbar from './Navbar';
import Alert from './Alert';

interface LayoutProps {
	children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<main className='min-h-screen pb-10 pt-[104px] md:pt-[64px] bg-gradient-to-r from-bluebg to-greenbg'>
				<Alert />
				<div className='container px-2 mx-auto'>{children ?? <Outlet />}</div>
			</main>
		</>
	);
};

export default Layout;
