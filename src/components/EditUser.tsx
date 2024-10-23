import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { useUsersActions } from "../hooks/useUsersActions";

export const EditUser = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const users = useAppSelector((state) => state.users);
	const usuarioId = users.find((user) => user.id === id);

	const [values, setValues] = useState({
		id: usuarioId?.id,
		name: usuarioId?.name,
		email: usuarioId?.email,
		github: usuarioId?.github,
	});
	const [error, setError] = useState<string | null>(null);

	const { editUser } = useUsersActions();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(null);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name");
		const email = formData.get("email");
		const github = formData.get("github");

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
				marginTop: "16px",
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
		</Card>
	);
};
