import { Middleware, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import authReducer from "./auth/authSlice";
import paginationReducer from "./pagination/paginationSlice";
import searchReducer from "./search/searchSlice";
import usersReducer from "./users/slices";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
		localStorage.setItem("__redux__auth__", JSON.stringify(store.getState()));
	};

const putDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
	next(action);

	if ((action as PayloadAction<{ id: string }>).type === "user/editUserById") {
		const { id } = (action as PayloadAction<{ id: string }>).payload;
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: "PUT",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario ${id} editado`);
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	}
};

const postDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
	next(action);

	if ((action as PayloadAction<{ email: string }>).type === "user/addNewUser") {
		const newUser = (action as PayloadAction<{ email: string }>).payload;
		// rome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
		fetch(`https://jsonplaceholder.typicode.com/posts`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario ${newUser.email} agregado correctamente`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const previousState = store.getState();

	next(action);

	if (
		(action as PayloadAction<{ id: string }>).type === "user/deleteUserById"
	) {
		const userIdToRemove = (action as PayloadAction<{ id: string }>).payload;
		/*const userToRemove = previousState.users.find(
			(user) => user.id === userIdToRemove,
		); */

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
				}
				//throw new Error("Error al eliminar el usuario");
			})
			.catch((error) => {
				/*toast.error(`Error deleting user ${userIdToRemove}`);
				if (userToRemove) {
					store.dispatch(rollbackUser(userToRemove));
				}*/
				console.log(error);
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
		auth: authReducer,
		search: searchReducer,
		pagination: paginationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistanceLocalStorageMiddleware,
			syncWithDatabase,
			postDatabaseMiddleware,
			putDatabaseMiddleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
