import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: 1,
		name: "Federico",
		email: "redolfofederico@gmail.com",
		github: "Redolff",
		password: "123456",
		role: "admin",
	},
];

const DEFAULT_AUTH_STATE = {
	users: DEFAULT_STATE,
	currentUser: null,
	isAuthenticated: false,
};

interface User {
	id: number;
	name: string;
	email: string;
	github: string;
	password: string;
	role: "admin" | "user";
}

interface AuthState {
	users: User[];
	currentUser: User | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = (() => {
	const persistedState = localStorage.getItem("__redux__auth__");
	if (persistedState) {
		return JSON.parse(persistedState).auth || DEFAULT_AUTH_STATE;
	}
	return {
		users: DEFAULT_STATE,
		currentUser: null,
		isAuthenticated: false,
	};
})();

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
					github: existingUser.github,
					password: existingUser.password,
					role: existingUser.role,
				};
				state.isAuthenticated = true;
			}
			localStorage.setItem("__redux__auth__", JSON.stringify(state));
		},
		logout: (state) => {
			state.currentUser = null;
			state.isAuthenticated = false;
			localStorage.setItem("__redux__auth__", JSON.stringify(state));
		},
		register: (
			state,
			action: PayloadAction<{
				name: string;
				email: string;
				github?: string;
				password: string;
				repeatPassword: string;
			}>,
		) => {
			const id = crypto.randomUUID();
			const {
				name,
				email,
				github = "",
				password,
				repeatPassword,
			} = action.payload;

			const existingUser = state.users.find((user) => user.email === email);

			const newCurrentUser = {
				id,
				name,
				email,
				github,
				password,
				role: "user",
			};
			console.log("newCurrentUser: ", newCurrentUser);

			if (!existingUser && password === repeatPassword) {
				state.users = [
					...state.users,
					{
						id,
						name,
						email,
						github,
						password,
						role: "user",
					},
				];
				state.currentUser = newCurrentUser;
				state.isAuthenticated = true;
			}
			localStorage.setItem("__redux__auth__", JSON.stringify(state));
		},
	},
});

export default authSlice.reducer;

export const { login, logout, register } = authSlice.actions;
