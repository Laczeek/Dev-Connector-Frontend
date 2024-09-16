import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';

import { AppDispatch, RootState } from '../store/store';
import { deleteAccount, fetchUserProfile } from '../store/profile.slice';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import Button from '../components/button/Button';
import DashboardActions from '../components/dashboard/DashboardActions';
import ExperienceList from '../components/dashboard/experience/ExperienceList';
import EducationList from '../components/dashboard/experience/EducationList';

const Dashboard = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { profile, isLoading } = useSelector((state: RootState) => state.profile);
	const { user } = useSelector((state: RootState) => state.auth);

	const deleteAccountHandler =  () => {
		const isConfirmed = window.confirm('Are you sure you want to delete your account? ');
		if (isConfirmed) {
			 dispatch(deleteAccount());
		}
	};

	useEffect(() => {
		// FETCH PROFILE ONLY FOR FIRST RENDER
		// PROFILE IS UPDATED TRU REDUCERS FOR REDUCE HTTP SERVER TRAFFIC
		if (!profile) {
			dispatch(fetchUserProfile());
		}
	}, [dispatch, profile]);

	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Dashboard</h2>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<>
					<p className='text-xl text-white text-center mb-4'>
						<UserOutlined className='mr-1 mb-4' />
						Welcome {user?.name}
					</p>
					{!profile && (
						<Button
							href='/create-profile'
							style='light'
							styles='mt-6 block w-fit mx-auto text-2xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)] shadow-green'>
							Create Profile
						</Button>
					)}
					{profile && (
						<div className='bg-white text-darkgreen p-4 rounded-lg'>
							<DashboardActions />
							<ExperienceList experiences={profile.experience || []} />
							<EducationList educations={profile.education || []} />
							<Button style='danger' type='button' styles='block mt-8 mx-auto' onClick={deleteAccountHandler}>
							<DeleteOutlined /> Delete Account
							</Button>
						</div>
					)}
				</>
			)}
		</section>
	);
};

export default Dashboard;
