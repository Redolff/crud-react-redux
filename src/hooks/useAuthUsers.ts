import { login, loginGoogle, logout, register } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./store";

interface Props {
	name?: string;
	email: string;
	password: string;
	github?: string;
	repeatPassword?: string;
}

export const useAuthUsers = () => {
	const users = useAppSelector((state) => state.auth.users);
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const dispatch = useAppDispatch();

	const loginUser = ({ email, password }: Props) => {
		dispatch(login({ email, password }));
	};

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const loginGoogleUser = ({ email }: string | null | any) => {
		dispatch(loginGoogle(email));
	};

	const registerUser = ({
		name,
		email,
		password,
		github,
		repeatPassword,
	}: Props) => {
		dispatch(register({ name, email, password, github, repeatPassword }));
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	return {
		users,
		currentUser,
		isAuthenticated,
		loginUser,
		loginGoogleUser,
		logoutUser,
		registerUser,
	};
};
