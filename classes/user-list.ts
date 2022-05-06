/** @format */

import { User } from './user';

export class UserList {
	private list: User[] = [];

	constructor() {}

	/**
	 * Agregar un usuario.
	 * @param {User} user
	 * @returns {User}
	 */
	add(user: User): User {
		this.list.push(user);
		return user;
	}

	/**
	 * Método para actualizar el nombre del usuario.
	 * @param {string} id
	 * @param {string} name
	 */

	updateName(id: string, name: string): void {
		for (let user of this.list) {
			if (user.id === id) user.name = name;
			break;
		}
		console.log(this.list);
	}

	/**
	 * Método para obtener el listado de usuarios.
	 * @returns User[]
	 */

	getList(): User[] {
		return this.list;
	}

	/**
	 * Método para obtener un usuario específico.
	 * @param {string} id
	 * @returns User
	 */
	getUser(id: string): User | undefined {
		return this.list.find((user: User) => user.id === id);
	}

	/**
	 * Método para obtener los usuarios de una sala específica.
	 * @param {string} room
	 * @returns User[]
	 */
	getUsersRoom(room: string): User[] {
		return this.list.filter((user: User) => user.room === room);
	}

	/**
	 * Método para eliminar un usuario de la lista.
	 * @param {string} id
	 * @returns User
	 */

	deleteUser(id: string): User | undefined {
		const tempUser = this.getUser(id);
		this.list = this.list.filter((user: User) => user.id !== id);
		return tempUser;
	}
}
