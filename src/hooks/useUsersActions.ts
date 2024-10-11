import { UserId, deleteUserById } from "../store/users/slices";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
	// Hacerlo en un custom hook
	const dispatch = useAppDispatch();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { removeUser };
};
