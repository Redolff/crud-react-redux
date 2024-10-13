import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
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

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface userWithId extends User {
	id: string;
}

const initialState: userWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		//Si el estado persiste en el Local Sotrage
		return JSON.parse(persistedState).users; //Guardamos cuando se haga una accion
	}
	return DEFAULT_STATE; //Si no se retorna el DEFAULT_STATE
})();

export const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [
				...state,
				{
					id,
					...action.payload,
				},
			];
		},
		editUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<userWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (isUserAlreadyDefined) {
				return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
