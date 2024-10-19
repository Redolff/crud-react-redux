import { login, logout } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useAuthUsers = () => {
	const user = useAppSelector((state) => state.auth.user);
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const dispatch = useAppDispatch();

	const loginUser = ({ email, password }) => {
		dispatch(login({ email, password }));
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	/*const registerUser = ({ name, email, password, repeatPassword }) => {
		dispatch(register(name, email, password, repeatPassword));
	};*/

	return { user, isAuthenticated, loginUser, logoutUser /*registerUser*/ };
};
