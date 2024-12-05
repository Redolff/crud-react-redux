import { Badge, Button, Divider, TextInput } from "@tremor/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUsers } from "../hooks/useAuthUsers";

export const Register = () => {
	const navigate = useNavigate();
	const { users, registerUser } = useAuthUsers();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;
		const password = formData.get("password") as string;
		const repeatPassword = formData.get("repeatPassword") as string;

		const existingUser = users.find((user) => user.email === email);

		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!name || !email || !password || !repeatPassword) {
			setError("Los campos son invalidos");
			return;
		}
		if (!regex.test(email)) {
			setError("El email es invalido");
			return;
		}
		if (!github) {
			setError("El github es invalido");
			return;
		}
		if (password !== repeatPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}
		if (existingUser) {
			setError("El usuario ya existe");
			return;
		}

		if (!existingUser) {
			console.log("Usuario creado");
			registerUser({ name, email, github, password, repeatPassword });
			navigate("/");
		}
	};

	return (
		<div
			className="justify-center py-10 lg:px-6"
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "8px",
			}}
		>
			<div
				style={{
					backgroundColor: "#fff",
					boxShadow: "3px 3px 3px 3px rgb(0,0,0,0.9)",
					padding: "8px",
				}}
				className="sm:mx-auto sm:w-full sm:max-w-sm"
			>
				<h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
					Create account
				</h3>
				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label
							htmlFor="email"
							className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
						>
							Name
						</label>
						<TextInput name="name" placeholder="Name" className="mt-2" />
					</div>
					<div>
						<label
							htmlFor="email"
							className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
						>
							Email
						</label>
						<TextInput
							name="email"
							placeholder="john@company.com"
							className="mt-2"
						/>
					</div>
					<div>
						<label
							htmlFor="github"
							className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
						>
							Github
						</label>
						<TextInput name="github" placeholder="github" className="mt-2" />
					</div>
					<div>
						<label
							htmlFor="password"
							className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
						>
							Password
						</label>
						<TextInput
							type="password"
							name="password"
							placeholder="password"
							className="mt-2"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
						>
							Password
						</label>
						<TextInput
							type="password"
							name="repeatPassword"
							placeholder="password"
							className="mt-2"
						/>
					</div>
					<Button
						type="submit"
						className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-gray-300 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input  dark:hover:bg-dark-tremor-brand-emphasis"
					>
						Create account
					</Button>
					<span>
						{error && (
							<Badge
								style={{
									display: "flex",
									justifyContent: "flex-start",
									marginTop: "8px",
									color: "red",
								}}
							>
								{error}
							</Badge>
						)}
					</span>
				</form>
				<Divider>
					¿Ya tienes cuenta?
					<Link
						style={{ marginLeft: "3px", textDecoration: "underline" }}
						to={"/login"}
					>
						Sig In
					</Link>
				</Divider>
			</div>
		</div>
	);
};
