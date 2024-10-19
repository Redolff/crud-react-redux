import { useAuthUsers } from "../hooks/useAuthUsers";

export const NavBar = () => {
	const { isAuthenticated, logoutUser } = useAuthUsers();
	console.log("isAuthenticated", isAuthenticated);

	return (
		<div
			style={{
				width: "100%",
				backgroundColor: "lightblue",
			}}
		>
			<h1 style={{ fontSize: "24px", color: "black" }}> Crud React Redux </h1>
			<ul
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					gap: "16px",
					marginRight: "4px",
				}}
			>
				{isAuthenticated ? (
					<h3>
						<a href={"/login"} onClick={logoutUser}>
							Cerrar sesion
						</a>
					</h3>
				) : (
					<h3>
						<a href={"/login"}>Iniciar sesion</a>
					</h3>
				)}
			</ul>
		</div>
	);
};
