import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store/store';

const Alert = () => {
	const alert = useSelector((state: RootState) => state.alert);

	const alertColor =
		alert?.type === 'success' ? 'bg-greenAlert ' : alert?.type === 'warning' ? 'bg-yellowAlert' : 'bg-redAlert';

	return (
		<AnimatePresence>
			{alert && (
				<motion.section
					key='alert'
					initial={{
						translateY: -100,
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					exit={{
						translateY: -100,
						opacity: 0,
					}}
					transition={{
						type: 'spring',
					}}
					role='alert'
					className={`${alertColor} fixed z-10 text-center w-full md:max-w-[50%] md:left-[25%] p-2 font-semibold text-lg rounded shadow-2xl shadow-black`}>
					<p>{alert.message}</p>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Alert;
