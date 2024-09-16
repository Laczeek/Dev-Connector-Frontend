import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useHTTP from '../hooks/useHTTP';
import { RootState } from '../store/store';
import { IPost } from '../interfaces/mongoose-models';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import PostItem from '../components/post/PostItem';
import Button from '../components/button/Button';
import PostCommentForm from '../components/post/PostCommentForm';
import CommentItem from '../components/post/CommentItem';

const Post = () => {
	const params = useParams();
	const postId = params.pid!;

	const [post, setPost] = useState<IPost | null>(null);
	const { errorMsg, isLoading, sendRequest } = useHTTP();
	const { jwt } = useSelector((state: RootState) => state.auth);

	const addPostToState = (post: IPost) => {
		setPost(post);
	};

	const removeCommentFromState = (commentId: string) => {
		setPost(prevPost => {
			if (!prevPost) return null;
			const filteredComments = post!.comments.filter(comment => comment._id !== commentId);

			return {
				...prevPost,
				comments: filteredComments,
			};
		});
	};

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const resData = await sendRequest(`/api/posts/${postId}`, {
					method: 'GET',
					headers: { Authorization: `Bearer ${jwt}` },
				});
				setPost(resData);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message);
				}
			}
		};
		fetchPost();
	}, [sendRequest, jwt, postId]);

	return (
		<section className='max-w-[900px] mx-auto'>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Post</h2>
			<Button href='/posts' style='outlined-dark' styles='text-white border-white'>
				Go Back
			</Button>
			{isLoading && <LoadingSpinner />}
			{!isLoading && errorMsg && <p className='text-white text-center text-md mt-8'>{errorMsg}</p>}
			{!isLoading && !errorMsg && post && (
				<>
					<PostItem post={post} />
					<PostCommentForm forPost={false} postId={post._id} jwt={jwt} addPostToState={addPostToState} />
					{post.comments.length > 0 && (
						<section className='mt-4 bg-black bg-opacity-40 text-black rounded-lg py-4 px-6 max-w-[900px]'>
							<h3 className='text-white'>Comments:</h3>
							<ul>
								{post.comments.map(comment => (
									<CommentItem key={comment._id} comment={comment} postId={post._id} removeCommentFromState={removeCommentFromState}/>
								))}
							</ul>
						</section>
					)}
				</>
			)}
		</section>
	);
};

export default Post;
