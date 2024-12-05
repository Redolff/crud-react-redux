import { Link } from "react-router-dom";
import logoReact from "../assets/logo-react.png";
import { useAuthUsers } from "../hooks/useAuthUsers";
import { useSearch } from "../hooks/useSearch";
import "../styles/NavBar.css";
import { AuthButtons } from "./AuthButtons";
import { UserProfileLink } from "./UserProfileLink";

export const NavBar = (/*{ search, setSearch }*/) => {
	const { isAuthenticated } = useAuthUsers();
	const { search, handleInputChange } = useSearch();

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<h1>
					<Link to="/"> Crud React Redux </Link>
				</h1>
				<img className="img-logo" src={logoReact} alt="logo-react" />
			</div>
			<div className="navbar-search">
				<input
					type="text"
					value={search}
					onChange={handleInputChange}
					placeholder="Buscar github..."
				/>
				<button type="submit"> Buscar </button>
			</div>

			<div className="navbar-menu">
				{isAuthenticated ? <UserProfileLink /> : <AuthButtons />}
			</div>
		</nav>
	);
};
