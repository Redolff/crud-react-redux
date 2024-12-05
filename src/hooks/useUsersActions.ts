import {
	UserId,
	addNewUser,
	deleteUserById,
	editUserById,
} from "../store/users/slices";
import { useAppDispatch, useAppSelector } from "./store";

interface Props {
	name: string;
	email: string;
	github: string;
}

export const useUsersActions = () => {
	const dispatch = useAppDispatch();
	const users = useAppSelector((state) => state.users);

	const addUser = ({ name, email, github }: Props) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const editUser = (id: UserId, { name, email, github }: Props) => {
		dispatch(editUserById({ id, name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { users, addUser, editUser, removeUser };
};
