/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import useHTTP from '../../hooks/useHTTP';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { EyeOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface ProfileReposProps {
	name: string;
}

const ProfileRepos = ({ name }: ProfileReposProps) => {
	const [repos, setRepos] = useState<any[] | []>([]);
	const { errorMsg, isLoading, sendRequest } = useHTTP();


	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const resData = await sendRequest(`/api/profiles/github/${name}`);
				setRepos(resData);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message);
				}
			}
		};
		fetchRepos();
	}, [sendRequest, name]);

	return (
		<section className='rounded-lg border-2 border-grey p-2 mt-2'>
			<h4 className='font-semibold text-lg'>Github Repos</h4>
			{isLoading && <LoadingSpinner />}
			{!isLoading && !errorMsg && repos.length > 0 && (
				<ul>
					{repos.map(repo => (
						<li key={repo.id} className='mt-2 bg-greenbg rounded-lg p-2 text-grey'>
							<article className='flex justify-between'>
								<div>
									<Link
										to={repo.svn_url}
										target='_blank'
										className='underline text-white hover:text-green transition-colors duration-300'>
										<h5 className='text-md font-semibold '>{repo.name}</h5>
									</Link>
									<p className='text-xs'>
										<strong>Created At: </strong>
										{new Date(repo.created_at).toLocaleDateString()}
									</p>
								</div>
								<div>
									<p>
										<StarOutlined /> {repo.stargazers_count}
									</p>
									<p>
										<EyeOutlined /> {repo.watchers}
									</p>
								</div>
							</article>
						</li>
					))}
				</ul>
			)}
			{!isLoading && !errorMsg && repos.length === 0 && (
				<p>The user does not have repositories on their github profile.</p>
			)}
		</section>
	);
};

export default ProfileRepos;
