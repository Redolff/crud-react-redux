import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

export const AuthButtons = () => {
	const navigate = useNavigate();

	return (
		<>
			<button
				className="navbar-button login"
				onClick={() => navigate("/login")}
			>
				Iniciar sesion
			</button>
			<button
				className="navbar-button register"
				onClick={() => navigate("/register")}
			>
				Registrate
			</button>
		</>
	);
};
