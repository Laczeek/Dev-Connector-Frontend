import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

const ProtectedRoute = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (!isAuthenticated) return <Navigate to='/login' replace={true} />;

	return <Outlet />;
};

export default ProtectedRoute;
