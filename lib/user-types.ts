export type Role = "Estudiante" | "Funcionario"
export type User = { 
	id: number,
	email: string,
	full_name: string,
	first_name: string,
	last_name: string,
	role: Role
}
