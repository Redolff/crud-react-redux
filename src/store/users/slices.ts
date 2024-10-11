import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface userWithId extends User {
	id: string;
}

const initialState: userWithId[] = [
	{
		id: "1",
		name: "Miguel Angel Rodriguez",
		email: "midudev@gmail.com",
		github: "midudev",
	},
	{
		id: "2",
		name: "Federico Redolfo",
		email: "redolfofederico@gmail.com",
		github: "Redolff",
	},
	{
		id: "3",
		name: "Lautaro Nievas",
		email: "lautaronievas@gmail.com",
		github: "Nievas100",
	},
];

export const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById } = usersSlice.actions;
