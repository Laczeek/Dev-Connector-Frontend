import Button from '../button/Button';

const DashboardActions = () => {
	return (
		<nav aria-label='Profie Actions Navigation'>
			<ul className='flex flex-col gap-y-2 text-center sm:flex-row  sm:gap-x-10 md:gap-x-20'>
				<li className='sm:grow'>
					<Button href='/edit-profile' style='dark' styles='w-full'>
						Edit Profile
					</Button>
				</li>
				<li className='sm:grow'>
					<Button href='/add-experience' style='dark' styles='w-full'>
						Add Experience
					</Button>
				</li>
				<li className='sm:grow'>
					<Button href='/add-education' style='dark' styles='w-full'>
						Add Education
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default DashboardActions;
