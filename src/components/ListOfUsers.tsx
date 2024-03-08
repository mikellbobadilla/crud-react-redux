import { useAppSelector } from "../hooks/store";
import { EditIcon } from "./icons/EditIcon";
import { TrashIcon } from "./icons/TrashIcon";

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

import { useUserAction } from "../hooks/useUserAction";

export function ListOfUsers() {
	/* Lectura del store de use reducer toolkit */
	const users = useAppSelector((state) => state.users);
	/* Custom hook para usar los dispatch de este slice user */
	const { removeUser } = useUserAction();

	return (
		<Card>
			<Title>
				Usuarios
				<Badge className="ml-2">{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell> Id </TableHeaderCell>
						<TableHeaderCell> Nombre </TableHeaderCell>
						<TableHeaderCell> Email </TableHeaderCell>
						<TableHeaderCell> Acciones </TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map((item) => (
						<TableRow key={item.name}>
							<TableCell>{item.id}</TableCell>
							<TableCell style={{ display: "flex", alignItems: "center" }}>
								<img
									style={{
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										marginRight: "8px",
									}}
									src={`https://unavatar.io/github/${item.github}`}
									alt={item.name}
								/>
								{item.name}
							</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>
								<button type="button">
									<EditIcon />
								</button>

								<button type="button" onClick={() => removeUser(item.id)}>
									<TrashIcon />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
