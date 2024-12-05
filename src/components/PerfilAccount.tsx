import { Link } from "react-router-dom";
import { useAuthUsers } from "../hooks/useAuthUsers";
import "../styles/PerfilAccount.css";

export const PerfilAccount = () => {
	const { currentUser } = useAuthUsers();

	return (
		<div className="profile-container">
			<img
				className="profile-picture"
				src={`https://unavatar.io/github/${currentUser?.github}`}
				alt={"Github profile"}
			/>
			<h1 className="profile-name"> {currentUser?.name} </h1>
			<p className="profile-email"> {currentUser?.email} </p>
			<Link to="/" className="profile-link">
				Volver al home
			</Link>
		</div>
	);
};
