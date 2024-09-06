import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout = () => {
	return (
		<>
			<Navbar />
			<main className='min-h-screen pb-4 pt-[104px] md:pt-[64px] bg-gradient-to-r from-bluebg to-greenbg'>
				<div className='container px-2 mx-auto'>
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default Layout;
