import { login, logout, register } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useAuthUsers = () => {
	const users = useAppSelector((state) => state.auth.users);
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const dispatch = useAppDispatch();

	const loginUser = ({ email, password }) => {
		dispatch(login({ email, password }));
	};

	const registerUser = ({ name, email, password, repeatPassword }) => {
		dispatch(register({ name, email, password, repeatPassword }));
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	return {
		users,
		currentUser,
		isAuthenticated,
		loginUser,
		logoutUser,
		registerUser,
	};
};
