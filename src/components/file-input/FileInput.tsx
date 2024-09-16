import { useRef, useState } from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import Button from '../button/Button';

interface FileInputProps {
	label: string;
	id: string;
	changeFileHandler: (file: File) => void;
	error?: string;
}

const FileInput = ({ id, label, changeFileHandler, error }: FileInputProps) => {
	const [imageURL, setImageURL] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const chooseFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files[0]) {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(files[0]);

			fileReader.onload = () => {
				setImageURL(fileReader.result as string);
			};

			changeFileHandler(files[0]);
		}
	};

	return (
		<div className='text-center'>
			<label htmlFor={id} className='text-lg text-darkgreen font-extrabold'>
				{label}
			</label>

			<figure className='my-2'>
				{imageURL && (
					<img
						src={imageURL}
						alt='Your avatar preview.'
						className='mx-auto w-[120px] h-[120px] object-cover rounded-full border-2 border-black p-1'
					/>
				)}

				<figcaption className='invisible absolute'>Your avatar preview.</figcaption>
			</figure>

			<input
				type='file'
				ref={fileInputRef}
				onChange={chooseFileHandler}
				name={id}
				id={id}
				className='absolute w-1 h-1 ml-6 mt-8'
				required
			/>
			<Button type='button' style='light' onClick={() => fileInputRef.current?.click()}>
				<FileAddOutlined />
			</Button>
			<p className='text-sm pl-2 mt-1 text-lightred'>{error}</p>
		</div>
	);
};

export default FileInput;
