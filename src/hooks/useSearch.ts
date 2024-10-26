import { setSearch } from "../store/search/searchSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useSearch = () => {
	const users = useAppSelector((state) => state.users);
	const dispatch = useAppDispatch();
	const search = useAppSelector((state) => state.search.search);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearch(e.target.value));
	};

	const filteredUsers = users.filter((user) =>
		user.github.toLowerCase().startsWith(search.toLowerCase()),
	);

	return { search, handleInputChange, filteredUsers };
};
