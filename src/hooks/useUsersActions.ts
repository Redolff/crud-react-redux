import {
	UserId,
	addNewUser,
	deleteUserById,
	editUserById,
} from "../store/users/slices";
import { useAppDispatch, useAppSelector } from "./store";

export const useUsersActions = () => {
	const dispatch = useAppDispatch();
	const users = useAppSelector((state) => state.users);

	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const editUser = (id, { name, email, github }) => {
		dispatch(editUserById({ id, name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { users, addUser, editUser, removeUser };
};
