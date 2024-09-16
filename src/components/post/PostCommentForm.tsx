import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../input/Input';
import Button from '../button/Button';
import useHTTP from '../../hooks/useHTTP';
import { IPost } from '../../interfaces/mongoose-models';
import { AppDispatch } from '../../store/store';
import { setAlertWithTimeout } from '../../store/alert-slice';

interface FormProps {
	addPostToState: (post: IPost) => void;
	postId?: string;
	forPost: boolean;
	jwt: string | null;
}

const PostCommentForm = ({ addPostToState, jwt, postId, forPost }: FormProps) => {
	const [text, setText] = useState('');
	const { errorsObject, errors, isLoading, removeValidationError, sendRequest } = useHTTP();
	const dispatch = useDispatch<AppDispatch>();

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		removeValidationError(event.target.name);
		setText(event.target.value);
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const requestPath = forPost ? '/api/posts' : `/api/posts/${postId}/comment`;
		try {
			const resData = await sendRequest(requestPath, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
				body: JSON.stringify({ text }),
			});
			addPostToState(resData);
			dispatch(setAlertWithTimeout({ type: 'success', message: `The ${forPost ? 'post' : 'comment'} was added.` }));
			setText('');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	return (
		<section
			className={`bg-black bg-opacity-40 p-4 rounded-lg mt-4 ${forPost ? 'max-w-[800px]' : 'max-w-[900px]'} mx-auto`}>
			<h3 className='text-lg mb-2 text-white'>{forPost ? 'Say something...' : 'Write a comment...'}.</h3>
			<form onSubmit={submitHandler}>
				<Input
					type='textarea'
					id='text'
					label=''
					value={text}
					changeInputHandler={changeInputHandler}
					styles='min-h-[80px] bg-darkgreen text-white border-black'
					error={errorsObject?.text}
					required
				/>
				<Button
					type='submit'
					style='light'
					styles='block ml-auto'
					isLoading={isLoading}
					isDisabled={Boolean(errors || isLoading)}>
					Submit
				</Button>
			</form>
		</section>
	);
};

export default PostCommentForm;
