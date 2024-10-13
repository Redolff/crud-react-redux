import { UserId, addNewUser, deleteUserById } from "../store/users/slices";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
	// Hacerlo en un custom hook
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, removeUser };
};
