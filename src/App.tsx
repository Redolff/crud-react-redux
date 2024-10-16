import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { EditUser } from "./components/EditUser";
import { ListOfUsers } from "./components/ListOfUsers";

function App() {
	return (
		<>
			<h1 style={{ fontSize: "24px", color: "black" }}> Crud React Redux </h1>
			<Routes>
				<Route path="/" element={<ListOfUsers />} />
				<Route path="/user/:id" element={<EditUser />} />
			</Routes>
			<Toaster richColors />
		</>
	);
}

export default App;
