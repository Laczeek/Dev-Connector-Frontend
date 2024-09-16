import { useState } from 'react';
import { CommentOutlined, DeleteOutlined, LikeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { IPost } from '../../interfaces/mongoose-models';
import { AppDispatch, RootState } from '../../store/store';
import Button from '../button/Button';
import useHTTP from '../../hooks/useHTTP';
import { setAlertWithTimeout } from '../../store/alert-slice';

interface PostItemProps {
	post: IPost;
	removePostFromState: (postId: string) => void;
}

const PostItem = ({ post, removePostFromState }: PostItemProps) => {
	const [usersLikes, setUsersLikes] = useState(post.likes);
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	const { sendRequest } = useHTTP();
	const { sendRequest: sendRequest2, isLoading: isLoading2 } = useHTTP();

	const maxTextLength = 200;
	const abbreviatedText =
		post.text.length > maxTextLength ? post.text.slice(0, maxTextLength) + '...' : post.text;

	const isLiked = usersLikes.findIndex(like => like === auth.user?._id) === -1 ? false : true;

	const toggleLikeHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const resData = await sendRequest(`/api/posts/${post._id}/like`, {
				method: 'PUT',
				headers: { Authorization: `Bearer ${auth.jwt}` },
			});
			setUsersLikes(resData);
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	const deletePostHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const isConfirmed = window.confirm('Are you sure?');
		if (isConfirmed) {
			try {
				await sendRequest2(`/api/posts/${post._id}`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${auth.jwt}` },
				});
				removePostFromState(post._id);
				dispatch(setAlertWithTimeout({ type: 'success', message: 'Post has been deleted.' }));
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message);
				}
			}
		}
	};

	return (
		<li className='mt-6'>
			<Link className='block' to={`/post/${post._id}`}>
				<motion.article
					className='bg-black bg-opacity-20 flex flex-col items-center text-center sm:flex-row  sm:text-left sm:gap-x-6 gap-y-2 text-white rounded-lg py-4 px-6'
					whileHover={{ scale: 1.06 }}
					transition={{ type: 'spring', bounce: 0.65 }}>
					<header className='text-center'>
						<figure>
							<img
								src={`${import.meta.env.VITE_API_PREFIX}/${post.avatar}`}
								alt='User image'
								width={120}
								height={120}
								className='rounded-full object-cover'
							/>
							<figcaption className='invisible absolute'>Creator {post.name} image.</figcaption>
						</figure>
						<h3 className='text-xl font-extrabold mt-1'>{post.name}</h3>
					</header>

					<div className='w-[80%]'>
						<p className='text-sm'>{abbreviatedText}</p>
						<p className='text-grey text-xs'>Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
						<div className='mt-4 flex gap-x-6  items-center text-sm'>
							<Button type='button' style='light' styles={isLiked ? '' : 'bg-grey'} onClick={toggleLikeHandler}>
								<LikeFilled /> {usersLikes.length}
							</Button>
							<p>
								<CommentOutlined /> {post.comments.length}
							</p>
						</div>
					</div>

					{auth.user?._id === post.user && (
						<Button
							type='button'
							style='danger'
							isLoading={isLoading2}
							isDisabled={isLoading2}
							onClick={deletePostHandler}>
							<DeleteOutlined />
						</Button>
					)}
				</motion.article>
			</Link>
		</li>
	);
};

export default PostItem;
