import { IPost } from '../../interfaces/mongoose-models';

interface PostProps {
	post: IPost;
}

const PostItem = ({ post }: PostProps) => {
	return (
		<section className='mt-4 bg-black bg-opacity-50 flex flex-col items-center text-center sm:flex-row  sm:text-left sm:gap-x-6 gap-y-2 text-white rounded-lg py-4 px-6 max-w-[900px]'>
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
				<p className='text-sm'>{post.text}</p>
				<p className='text-grey text-xs'>Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
			</div>
		</section>
	);
};

export default PostItem;
