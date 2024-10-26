import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PaginationState {
	currentPage: number;
	usersPerPage: number;
	totalPages: number;
	indexOfLastUser: number;
	indexOfFirstUser: number;
}

const initialState: PaginationState = {
	currentPage: 1,
	usersPerPage: 5,
	totalPages: 0,
	indexOfLastUser: 0,
	indexOfFirstUser: 0,
};

const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		goToNextPage(state) {
			if (state.currentPage < state.totalPages) {
				state.currentPage += 1;
				state.indexOfLastUser = state.currentPage * state.usersPerPage;
				state.indexOfFirstUser = state.indexOfLastUser - state.usersPerPage;
			}
		},
		goToPreviousPage(state) {
			if (state.currentPage > 1) {
				state.currentPage -= 1;
				state.indexOfLastUser = state.currentPage * state.usersPerPage;
				state.indexOfFirstUser = state.indexOfLastUser - state.usersPerPage;
			}
		},
		totalPages(state, action: PayloadAction<number>) {
			state.totalPages = Math.ceil(action.payload / state.usersPerPage);
		},
		setInitialIndices(
			state,
			action: PayloadAction<{
				indexOfLastUser: number;
				indexOfFirstUser: number;
			}>,
		) {
			state.indexOfLastUser = action.payload.indexOfLastUser;
			state.indexOfFirstUser = action.payload.indexOfFirstUser;
		},
	},
});

export const { goToNextPage, goToPreviousPage, totalPages } =
	paginationSlice.actions;
export default paginationSlice.reducer;
