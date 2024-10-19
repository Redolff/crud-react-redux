import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { EditUser } from "./components/EditUser";
import { ListOfUsers } from "./components/ListOfUsers";
import Login from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Register";
import { useAppSelector } from "./hooks/store";
import { useAuthUsers } from "./hooks/useAuthUsers";

function App() {
	const { isAuthenticated } = useAuthUsers();
	const users = useAppSelector((state) => state.auth.user);

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
