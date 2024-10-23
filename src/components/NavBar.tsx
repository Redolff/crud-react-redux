import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ isAuthenticated, currentUser, logoutUser }) => {
	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<h1> Crud React Redux </h1>
				<span> Logo CRUD </span>
			</div>
			<div className="navbar-search">
				<input type="text" placeholder="Buscar github..." />
				<button onClick={() => console.log("buscar")}> Buscar </button>
			</div>

			<div className="navbar-menu">
				{isAuthenticated ? (
					<>
						<img
							style={{
								width: "32px",
								height: "32px",
								borderRadius: "50%",
							}}
							src={`https://unavatar.io/github/${currentUser.name}`}
							alt={`${currentUser.name}`}
						/>
						<span style={{ marginRight: "8px" }}> {currentUser.name} </span>
						<button className="navbar-button login" onClick={logoutUser}>
							Cerrar sesion
						</button>
					</>
				) : (
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
				)}
			</div>
		</nav>
	);
};
