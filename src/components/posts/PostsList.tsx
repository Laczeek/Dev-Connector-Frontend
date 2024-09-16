import { IPost } from '../../interfaces/mongoose-models';
import PostItem from './PostItem';

interface PostsListProps {
	posts: IPost[] | [];
    removePostFromState: (postId: string) => void
}

const PostsList = ({ posts, removePostFromState }: PostsListProps) => {
	return (
		<>
			{posts.length > 0 && (
				<ul className='max-w-[800px] mx-auto'>
					{posts.map(post => (
						<PostItem key={post._id} post={post} removePostFromState={removePostFromState} />
					))}
				</ul>
			)}
			{posts.length === 0 && <p className='text-white text-center text-md mt-8'>There are no posts yet.</p>}
		</>
	);
};

export default PostsList;
