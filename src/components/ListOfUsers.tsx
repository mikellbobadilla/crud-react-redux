import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";

const users: {
	id: string;
	name: string;
	email: string;
	github: string;
}[] = [
	{
		id: "1",
		name: "Yazman Rodriguez",
		email: "yazman@gmai.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "Juan Perez",
		email: "leo@gmail.com",
		github: "juanito",
	},
	{
		id: "3",
		name: "Haakon Dahlberg",
		email: "haakon@gmai.com",
		github: "haakonito",
	},
];

export function ListOfUsers() {
	return (
		<Card className="rounded-lg">
			<Table>
				<TableHead>
					<TableHeaderCell> Id </TableHeaderCell>
					<TableHeaderCell> Nombre </TableHeaderCell>
					<TableHeaderCell> Email </TableHeaderCell>
					<TableHeaderCell> Acciones </TableHeaderCell>
				</TableHead>

				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell className="flex items-center">
								<img
									className="size-8 rounded-full mr-2"
									src={`https://unavatar.io/github/${user.github}`}
									alt={user.name}
								/>
								{user.name}
							</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>Acciones</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
