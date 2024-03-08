import { Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import userReducer, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		/* Guardar en el local storage */
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDataBase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previusState = store.getState();

	next(action);

	if (type === "users/deleteUserById") {
		const userToRemove = previusState.users.find((user) => user.id === payload);

		const urlToFetch = `https://jsonplaceholder.typicode.com/users/${payload}`;

		fetch(urlToFetch, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) toast.success("Usuario eliminado");

				if (!res.ok) throw new Error("Error al eliminar el usuario");
			})
			.catch((err) => {
				toast.error("Error al eliminar el usuario");
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
			});
	}
};

export const store = configureStore({
	reducer: {
		users: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistanceLocalStorageMiddleware,
			syncWithDataBase,
		),
});

/* Permite tipar  */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
