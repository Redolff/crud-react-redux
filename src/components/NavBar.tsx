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
					<a href="/"> Crud React Redux </a>
				</h1>
				<span> Logo CRUD </span>
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
