import { Link } from 'react-router-dom';
import { CodeOutlined } from '@ant-design/icons';

const Navbar = () => {
	return (
		<header className='fixed z-10 bg-white w-full p-2 border-b-4 border-solid border-grey'>
			<nav className='container mx-auto text-center items-center md:flex md:justify-between'>
				<h1 className='text-2xl'>
					<Link to='/'>
						<CodeOutlined /> DevConnector
					</Link>
				</h1>
				<ul className='mt-2 flex md:w-[35%] md:mt-0 md:gap-x-4'>
					<li className='grow'>
						<Link
							to='profiles'
							className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
							Developers
						</Link>
					</li>
					<li className='grow'>
						<Link
							to='register'
							className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
							Register
						</Link>
					</li>
					<li className='grow'>
						<Link
							to='login'
							className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
							Login
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
