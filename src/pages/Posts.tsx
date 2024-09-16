import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TeamOutlined } from '@ant-design/icons';

import { IPost } from '../interfaces/mongoose-models';
import useHTTP from '../hooks/useHTTP';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import { RootState } from '../store/store';
import PostsList from '../components/posts/PostsList';
import PostCommentForm from '../components/post/PostCommentForm';

const Posts = () => {
	const [posts, setPosts] = useState<IPost[] | []>([]);
	const { errorMsg, isLoading, sendRequest } = useHTTP();
	const { jwt } = useSelector((state: RootState) => state.auth);

	const removePostFromState = (postId: string) => {
		const filteredPosts = posts.filter(post => post._id !== postId);
		setPosts(filteredPosts);
	};

	const addPostToState = (post: IPost) => {
		setPosts(prevPosts => [post, ...prevPosts]);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const resData = await sendRequest('/api/posts', { method: 'GET', headers: { Authorization: `Bearer ${jwt}` } });
				setPosts(resData);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message);
				}
			}
		};
		fetchPosts();
	}, [sendRequest, jwt]);

	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Posts</h2>
			<p className='text-white text-xl text-center'>
				<TeamOutlined /> Welcome to the community.
			</p>
			{isLoading && <LoadingSpinner />}
			{!isLoading && errorMsg && <p className='text-white text-center text-md mt-8'>{errorMsg}</p>}
			{!isLoading && !errorMsg && (
				<>
					<PostCommentForm jwt={jwt} addPostToState={addPostToState} forPost={true} />
					<PostsList posts={posts || []} removePostFromState={removePostFromState} />
				</>
			)}
		</section>
	);
};

export default Posts;
