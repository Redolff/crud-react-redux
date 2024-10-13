import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUsers";

function App() {
	return (
		<>
			<h1 style={{ fontSize: "24px", color: "black" }}> Crud React Redux </h1>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
