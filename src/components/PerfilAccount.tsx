import { useAuthUsers } from "../hooks/useAuthUsers";
import "../styles/PerfilAccount.css";

export const PerfilAccount = () => {
	const { currentUser } = useAuthUsers();

	return (
		<div className="profile-container">
			<img
				className="profile-picture"
				src={`https://unavatar.io/github/${currentUser?.name}`}
				alt={"Github profile"}
			/>
			<h1 className="profile-name"> {currentUser?.name} </h1>
			<p className="profile-email"> {currentUser?.email} </p>
			<a href="/" className="profile-link">
				Volver al home
			</a>
		</div>
	);
};
