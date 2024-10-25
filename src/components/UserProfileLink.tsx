import { useAuthUsers } from "../hooks/useAuthUsers";
import "../styles/UserProfileLink.css";

export const UserProfileLink = () => {
	const { currentUser, logoutUser } = useAuthUsers();

	return (
		<>
			<div className="dropdown-item">
				<div className="navbar-link-perfil">
					<a href="/perfil">
						<img
							style={{
								width: "32px",
								height: "32px",
								borderRadius: "50%",
								cursor: "pointer",
							}}
							src={`https://unavatar.io/github/${currentUser?.name}`}
							alt={`${currentUser?.name}`}
						/>
					</a>
				</div>
			</div>
			<button className="navbar-button login" onClick={logoutUser}>
				Cerrar sesion
			</button>
		</>
	);
};
