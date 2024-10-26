import { useEffect } from "react";
import {
	goToNextPage,
	goToPreviousPage,
	totalPages,
} from "../store/pagination/paginationSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const usePagination = () => {
	const users = useAppSelector((state) => state.users);
	const dispatch = useAppDispatch();
	const pagination = useAppSelector((state) => state.pagination);

	const { currentPage, usersPerPage, indexOfLastUser, indexOfFirstUser } =
		pagination;

	useEffect(() => {
		dispatch(totalPages(users.length));
		// Calculamos los índices iniciales cuando `totalPages` cambia
		dispatch({
			type: "pagination/setInitialIndices",
			payload: {
				indexOfLastUser: currentPage * usersPerPage,
				indexOfFirstUser: currentPage * usersPerPage - usersPerPage,
			},
		});
	}, [users.length, usersPerPage, dispatch]);

	const nextPage = () => {
		dispatch(goToNextPage());
	};

	const previousPage = () => {
		dispatch(goToPreviousPage());
	};

	return {
		currentPage,
		totalPages: pagination.totalPages,
		indexOfLastUser,
		indexOfFirstUser,
		nextPage,
		previousPage,
	};
};
