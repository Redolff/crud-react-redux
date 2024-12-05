import { Badge, Button, Divider, TextInput } from "@tremor/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUsers } from "../hooks/useAuthUsers";

const GoogleIcon = (props) => (
	<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
		<path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
	</svg>
);

export default function Login() {
	const navigate = useNavigate();
	const { users, loginUser } = useAuthUsers();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email");
		const password = formData.get("password");
		const existingUser = users.find(
			(user) => user.email === email && user.password === password,
		);

		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !password) {
			setError("Los campos son incorrectos");
			return;
		}
		if (!regex.test(email)) {
			setError("El email es invalido");
			return;
		}
		if (!existingUser) {
			setError("El usuario no existe o es incorrecto");
			return;
		}

		loginUser({ email, password });
		navigate("/");
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
					Sig in
				</h3>
				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
					<Button
						type="submit"
						className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-gray-300 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input  dark:hover:bg-dark-tremor-brand-emphasis"
					>
						Sign in
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
				<Divider>or with</Divider>
				<a
					href={"/"}
					className="mt-4 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out disabled:pointer-events-none disabled:shadow-none outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 border-transparent text-white dark:text-white bg-blue-500 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 disabled:bg-blue-300 disabled:text-white disabled:dark:bg-blue-800 disabled:dark:text-blue-400 ewg5g mfup0"
				>
					<GoogleIcon className="size-5" aria-hidden={true} />
					<span className="text-tremor-default font-medium">
						Sign in with Google
					</span>
				</a>
				<Divider>
					¿No tienes cuenta?
					<Link
						style={{ marginLeft: "3px", textDecoration: "underline" }}
						to={"/register"}
					>
						Create account
					</Link>
				</Divider>
			</div>
		</div>
	);
}
