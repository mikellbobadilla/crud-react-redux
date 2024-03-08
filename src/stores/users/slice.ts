import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Yazman Rodriguez",
		email: "yazman@gmai.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "Juan Perez",
		email: "leo@gmail.com",
		github: "juanito",
	},
	{
		id: "3",
		name: "Mikell Bobadilla",
		email: "bobadilla@gmail.com",
		github: "mikellbobadilla",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UsersWithId extends User {
	id: UserId;
}

const initialState: UsersWithId[] = (() => {
	const persisteState = localStorage.getItem("__redux__state__");
	if (persisteState) return JSON.parse(persisteState).users;
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UsersWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);

			if (!isUserAlreadyDefined) state.push(action.payload);
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
