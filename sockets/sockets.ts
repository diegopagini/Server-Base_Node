/** @format */

import socketIO, { Socket } from 'socket.io';
import { User } from '../classes/user';
import { UserList } from '../classes/user-list';

/**
 * Instancia de mi lista de usuarios.
 */

export const connectedUsers = new UserList();

/**
 * Método para agregar un cliente a nuestra lista de conectados.
 * @param {Socket} client
 * @param {socketIO.Server} io
 */
export const connectClient = (client: Socket, io: socketIO.Server) => {
	const user = new User(client.id);
	connectedUsers.add(user);
};

/**
 * Para desconectar al cliente.
 * @param {Socket} client
 * @param {socketIO.Serve} io
 *
 */
export const disconnect = (client: Socket, io: socketIO.Server) => {
	client.on('disconnect', () => {
		connectedUsers.deleteUser(client.id);
		/**
		 * Cuando se realice una desconeccíon emitimos el valor actualizado de la lista de usuarios.
		 */
		io.emit('active-users', connectedUsers.getList());
	});
};

/**
 * Para escuchar mensajes.
 * @param {Socket} client
 * @param {socketIO.Server} io
 */
export const message = (client: Socket, io: socketIO.Server) => {
	client.on(
		'message',
		(payload: { from: string; body: string }, callback: Function) => {
			/**
			 * Para emitir nuestro último mensaje.
			 */
			io.emit('new-message', payload);
		}
	);
};

/**
 * Para esuchar logins.
 * @param {Socket} client
 * @param {socketIO.Server} io
 */

export const configureUser = (client: Socket, io: socketIO.Server) => {
	client.on(
		'configure-user',
		(payload: { name: string }, callback: Function) => {
			connectedUsers.updateName(client.id, payload.name);

			/**
			 * Cuando se conecte un usuario enviamos la lista de usuarios.
			 */
			setTimeout(() => {
				io.emit('active-users', connectedUsers.getList());
			}, 50);

			callback({
				ok: true,
				message: `Usuario ${payload.name} configurado.`,
			});
		}
	);
};

/**
 * Para esuchar la lista de usuarios.
 * @param {Socket} client
 * @param {socketIO.Server} io
 */

export const getUsers = (client: Socket, io: socketIO.Server) => {
	client.on('get-users', () => {
		/**
		 * Cuando se conecte un usuario enviamos la lista de usuarios.
		 */
		io.to(client.id).emit('active-users', connectedUsers.getList());
	});
};
