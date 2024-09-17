import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';

import { IComment } from '../../interfaces/mongoose-models';
import Button from '../button/Button';
import { AppDispatch, RootState } from '../../store/store';
import useHTTP from '../../hooks/useHTTP';
import { setAlertWithTimeout } from '../../store/alert-slice';

interface ICommentItemProps {
	comment: IComment;
	postId: string;
	removeCommentFromState: (commentId: string) => void;
}

const CommentItem = ({ comment, postId, removeCommentFromState }: ICommentItemProps) => {
	const auth = useSelector((state: RootState) => state.auth);
	const { isLoading, sendRequest } = useHTTP();
	const dispatch = useDispatch<AppDispatch>();

	const deleteCommentHandler = async () => {
		try {
			await sendRequest(`/api/posts/${postId}/comment/${comment._id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${auth.jwt}` },
			});
			removeCommentFromState(comment._id);
			dispatch(setAlertWithTimeout({ type: 'success', message: 'The comment has been removed.' }));
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.log(err.message);
			}
		}
	};

	return (
		<article className='mt-4 bg-darkgreen bg-opacity-30 flex flex-col items-center text-center text-white sm:flex-row  sm:text-left sm:gap-x-6 gap-y-2 rounded-lg py-4 px-6'>
			<header className='text-center'>
				<figure>
					<img
						src={comment.avatar}
						alt='User image'
						width={60}
						height={60}
						className='rounded-full object-cover'
					/>
					<figcaption className='invisible absolute'>Creator {comment.name} image.</figcaption>
				</figure>
				<h3 className='text-lg font-extrabold mt-1'>{comment.name}</h3>
			</header>
			<div className='w-[80%]'>
				<p className='text-sm'>{comment.text}</p>
				<p className='text-grey text-xs'>Posted on {new Date(comment.createdAt).toLocaleDateString()}</p>
			</div>

			{auth.user?._id === comment.user && (
				<Button
					type='button'
					style='danger'
					isLoading={isLoading}
					isDisabled={isLoading}
					onClick={deleteCommentHandler}>
					<DeleteOutlined />
				</Button>
			)}
		</article>
	);
};

export default CommentItem;
