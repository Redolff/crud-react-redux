import { useAuthUsers } from "../hooks/useAuthUsers";
import "../styles/NavBar.css";
import { AuthButtons } from "./AuthButtons";
import { UserProfileLink } from "./UserProfileLink";

export const NavBar = ({ searchTerm, setSearchTerm }) => {
	const { isAuthenticated } = useAuthUsers();

	const handleInputChange = (e: HTMLFormElement) => {
		setSearchTerm(e.target.value);
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<h1>
					<a href="/"> Crud React Redux </a>
				</h1>
				<span> Logo CRUD </span>
			</div>
			<div className="navbar-search">
				<input
					type="text"
					value={searchTerm}
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
