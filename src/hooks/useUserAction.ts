import { UserId, addNewUser, deleteUserById } from "../stores/users/slice";
import { useAppDispatch } from "./store";

export function useUserAction() {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { removeUser, addUser };
}
