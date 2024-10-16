import {
	UserId,
	addNewUser,
	deleteUserById,
	editUserById,
} from "../store/users/slices";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const editUser = (id, { name, email, github }) => {
		dispatch(editUserById({ id, name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, editUser, removeUser };
};
