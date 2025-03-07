import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsersActions } from "../hooks/useUsersActions";

export const EditUser = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { users, editUser } = useUsersActions();
	const usuarioId = users.find((user) => user.id === id);

	const [values, setValues] = useState({
		id: usuarioId?.id,
		name: usuarioId?.name,
		email: usuarioId?.email,
		github: usuarioId?.github,
	});
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(null);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		//Validaciones para el form
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		//Validar que no sean vacios
		if (!name || !email || !github) {
			setError("Los campos son incompletos");
			return;
		}
		//Validar que sea un email el input
		if (!regex.test(email)) {
			setError("El email no es valido");
			return;
		}

		if (id) {
			editUser(id, { name, email, github });
			setError(null);
			navigate("/");
		}
		setError(null);
	};

	return (
		<Card
			style={{
				backgroundColor: "#fff",
				marginTop: "62px",
				border: "solid 1px #eee",
				boxShadow: "3px 3px 3px 3px rgb(0,0,0,0.9)",
			}}
		>
			<Title> Edit user </Title>
			<form onSubmit={handleSubmit} className="">
				<TextInput
					placeholder="Ingrese un nombre"
					name="name"
					value={values.name}
					onChange={(e) => setValues({ ...values, name: e.target.value })}
				/>

				<TextInput
					placeholder="Ingrese un email"
					name="email"
					value={values.email}
					onChange={(e) => setValues({ ...values, email: e.target.value })}
				/>
				<TextInput
					placeholder="Ingrese un github"
					name="github"
					value={values.github}
					onChange={(e) => setValues({ ...values, github: e.target.value })}
				/>
				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Editar usuario
					</Button>
					<span>
						{error && (
							<Badge style={{ marginLeft: "8px", color: "red" }}>{error}</Badge>
						)}
					</span>
				</div>
			</form>
			<div>
				<Link
					style={{
						marginTop: "16px",
						textDecoration: "underline",
					}}
					to="/"
				>
					Volver al home
				</Link>
			</div>
		</Card>
	);
};
