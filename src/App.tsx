import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfusers";

function App() {
	
	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors position="top-center" />
		</>
	);
}

export default App;
