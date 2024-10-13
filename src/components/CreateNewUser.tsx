import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUsersActions } from "../hooks/useUsersActions";

export const CreateNewUser = () => {
	const { addUser } = useUsersActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			//Validaciones
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title> Create new user </Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput placeholder="Ingresa el nombre" name="name" />
				<TextInput placeholder="Ingresa el email" name="email" />
				<TextInput placeholder="Ingresa el github" name="github" />
				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge style={{ marginLeft: "8px", color: "green" }}>
								Guardado correctamente
							</Badge>
						)}
					</span>
					<span>
						{result === "ko" && (
							<Badge style={{ marginLeft: "8px", color: "red" }}>
								Error con los campo
							</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
};
