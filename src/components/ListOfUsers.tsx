import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAppSelector } from "../hooks/store";
import { useUsersActions } from "../hooks/useUsersActions";
import { UserId } from "../store/users/slices";
import { CreateNewUser } from "./CreateNewUser";

export const ListOfUsers = ({ currentUser }) => {
	const navigate = useNavigate();
	const users = useAppSelector((state) => state.users);
	const { removeUser } = useUsersActions();

	const handleRedirect = (id: UserId) => {
		if (currentUser.role === "admin") {
			navigate(`/user/${id}`);
		} else {
			console.log(
				"El usuario no puede acceder a editar un user porque no es ADMIN",
			);
		}
	};

	const handleRemove = (id: UserId) => {
		if (currentUser.role === "admin") {
			removeUser(id);
		} else {
			console.log("El usuario no puede eliminar un user porque no es ADMIN");
		}
	};

	return (
		<>
			<Card
				style={{
					backgroundColor: "#fff",
					marginTop: "16px",
					border: "solid 1px #eee",
					boxShadow: "3px 3px 3px 3px rgb(0,0,0,0.9)",
				}}
			>
				<Title>
					Usuarios
					<Badge style={{ marginLeft: "8px" }}> {users.length} </Badge>
				</Title>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Id</TableHeaderCell>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Email</TableHeaderCell>
							<TableHeaderCell>Github</TableHeaderCell>
							<TableHeaderCell>Acciones</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.id}
								className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
							>
								<TableCell> {user.id} </TableCell>
								<TableCell style={{ display: "flex", alignItems: "center" }}>
									<img
										style={{
											width: "32px",
											height: "32px",
											borderRadius: "50%",
											marginRight: "8px",
										}}
										src={`https://unavatar.io/github/${user.github}`}
										alt={`${user.name}`}
									/>
									{user.name}
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.github}</TableCell>
								<TableCell>
									<button type="button" onClick={() => handleRedirect(user.id)}>
										<svg
											aria-label="Edit element"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
											/>
										</svg>
									</button>
									<button type="button" onClick={() => handleRemove(user.id)}>
										<svg
											aria-label="Remove element"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
			{currentUser.role === "admin" && <CreateNewUser />}
		</>
	);
};
