import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: 1,
		name: "Federico",
		email: "redolfofederico@gmail.com",
		password: "123456",
		role: "admin",
	},
	{
		id: 2,
		name: "Juan Cruz",
		email: "juancruz@gmail.com",
		password: "123456",
		role: "admin",
	},
];

interface AuthState {
	user: {
		id: number;
		name: string;
		email: string;
		password: string;
		role: "admin" | "user";
	} | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: DEFAULT_STATE,
	isAuthenticated: false,
};
/*

const initialState: AuthState = () => {
	const persistedState = localStorage.getItem("__redux__auth__");
	if (persistedState) {
		return JSON.parse(persistedState).auth;
	}
	return DEFAULT_STATE;
};*/

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
			state.user = action.payload;
			state.isAuthenticated = true;

			localStorage.setItem("__redux__auth__", JSON.stringify(state));
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;

			localStorage.setItem("__redux__auth__", JSON.stringify(state));
		},
		register: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {},
	},
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
