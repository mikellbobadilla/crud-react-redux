import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import React from "react";
import { useUserAction } from "../hooks/useUserAction";

export function CreateNewUser() {
	const { addUser } = useUserAction();
	const [result, setResult] = React.useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const formData = new FormData(event.currentTarget);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		/* Aquí las validaciones antes de agregar al usuario */
		if (!name || !email || !github) return setResult("ko");

		addUser({ name, email, github });
		setResult("ok");
		/* Reset form */
		event.currentTarget.reset();
	};

	return (
		<Card className="mt-4">
			<Title className="mb-5">Create New User</Title>

			<form className="" onSubmit={handleSubmit}>
				<TextInput name="name" placeholder="Aquí el nombre" className="mb-5" />

				<TextInput name="email" placeholder="Aquí el email" className="mb-5" />

				<TextInput
					name="github"
					placeholder="Aquí el usuario de github"
					className="mb-5"
				/>

				<div>
					<Button className="mt-4" type="submit">
						Create usuario
					</Button>
					<span className="ml-3">
						{result === "ok" && (
							<Badge color="green">Guardado correctamente</Badge>
						)}
						{result === "ko" && <Badge color="red">Error al guardar</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
