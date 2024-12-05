import { Link } from "react-router-dom";
import { useAuthUsers } from "../hooks/useAuthUsers";
import "../styles/UserProfileLink.css";

export const UserProfileLink = () => {
	const { currentUser, logoutUser } = useAuthUsers();

	return (
		<>
			<div className="dropdown-item">
				<div className="navbar-link-perfil">
					<Link to="/perfil">
						<img
							style={{
								width: "32px",
								height: "32px",
								borderRadius: "50%",
								cursor: "pointer",
							}}
							src={`https://unavatar.io/github/${currentUser?.github}`}
							alt={`${currentUser?.name}`}
						/>
					</Link>
				</div>
			</div>
			{/* rome-ignore lint/a11y/useButtonType: <explanation> */}
			<button className="navbar-button login" onClick={logoutUser}>
				Cerrar sesion
			</button>
		</>
	);
};
