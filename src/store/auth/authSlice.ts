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
	users: {
		id: number;
		name: string;
		email: string;
		password: string;
		role: "admin" | "user";
	}[];
	currentUser: {
		id: number;
		name: string;
		email: string;
		password: string;
		role: "admin" | "user";
	} | null;
	isAuthenticated: boolean;
}

/*
const initialState: AuthState = {
	users: DEFAULT_STATE,
	currentUser: null,
	isAuthenticated: false,
}; */

/*
const initialState: AuthState = {
	user: (() => {
		const persistedState = localStorage.getItem("__redux__auth__");
		if (persistedState) {
			return JSON.parse(persistedState).auth;
		}
		return DEFAULT_STATE; // Siempre inicializamos como array
	})(),
	isAuthenticated: false,
}; */

const initialState: AuthState = () => {
	const persistedState = localStorage.getItem("__redux__auth__");
	if (persistedState) {
		return JSON.parse(persistedState).auth;
	}
	return DEFAULT_STATE;
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ email: string; password: string }>,
		) => {
			const { email, password } = action.payload;
			const existingUser = state.users.find(
				(user) => user.email === email && user.password === password,
			);

			if (existingUser) {
				state.currentUser = {
					id: existingUser.id,
					name: existingUser.name,
					email: existingUser.email,
					password: existingUser.password,
					role: existingUser.role,
				};
				state.isAuthenticated = true;
			}
		},
		logout: (state) => {
			state.currentUser = null;
			state.isAuthenticated = false;
		},
		register: (
			state,
			action: PayloadAction<{
				name: string;
				email: string;
				password: string;
				repeatPassword: string;
			}>,
		) => {
			const id = crypto.randomUUID();
			const { name, email, password, repeatPassword } = action.payload;

			const existingUser = state.users.find((user) => user.email === email);

			const newCurrentUser = {
				id,
				name,
				email,
				password,
				role: "user",
			};

			if (!existingUser && password === repeatPassword) {
				state.users = [
					...state.users,
					{
						id,
						name,
						email,
						password,
						role: "user",
					},
				];
				state.currentUser = newCurrentUser;
				state.isAuthenticated = true;
			}
		},
	},
});

export default authSlice.reducer;

export const { login, logout, register } = authSlice.actions;
