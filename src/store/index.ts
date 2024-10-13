import { Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer from "./users/slices";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

// Hacerlo con el POST, y el EDIT al Middleware

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;

	const previousState = store.getState();

	next(action);

	if (type === "user/deleteUserById") {
		const userIdToRemove = payload;
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
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistanceLocalStorageMiddleware,
			syncWithDatabase,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
