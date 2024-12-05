import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { EditUser } from "./components/EditUser";
import { ListOfUsers } from "./components/ListOfUsers";
import Login from "./components/Login";
import { NavBar } from "./components/NavBar";
import { PerfilAccount } from "./components/PerfilAccount";
import { Register } from "./components/Register";
import { useAuthUsers } from "./hooks/useAuthUsers";

function App() {
	const { isAuthenticated } = useAuthUsers();

	return (
		<>
			<NavBar />
			<Routes>
				{!isAuthenticated ? (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</>
				) : (
					<>
						<Route path="/" element={<ListOfUsers />} />
						<Route path="/perfil" element={<PerfilAccount />} />
						<Route path="/user/:id" element={<EditUser />} />
						<Route path="*" element={<Navigate to={"/"} />} />
					</>
				)}
			</Routes>
			<Toaster richColors />
		</>
	);
}

export default App;
