import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { EditUser } from "./components/EditUser";
import { ListOfUsers } from "./components/ListOfUsers";
import Login from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Register";
import { useAuthUsers } from "./hooks/useAuthUsers";

function App() {
	const {
		users,
		currentUser,
		isAuthenticated,
		loginUser,
		logoutUser,
		registerUser,
	} = useAuthUsers();

	console.log("isAuthenticated", isAuthenticated);
	console.log("currentUser", { currentUser });
	console.log("users", { users });

	return (
		<>
			<NavBar
				isAuthenticated={isAuthenticated}
				currentUser={currentUser}
				logoutUser={logoutUser}
			/>
			<Routes>
				{!isAuthenticated ? (
					<>
						<Route
							path="/login"
							element={<Login loginUser={loginUser} users={users} />}
						/>
						<Route
							path="/register"
							element={<Register registerUser={registerUser} />}
						/>
						<Route path="*" element={<Navigate to="/login" />} />
					</>
				) : (
					<>
						<Route
							path="/"
							element={<ListOfUsers currentUser={currentUser} />}
						/>
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
