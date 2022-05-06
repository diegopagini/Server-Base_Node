/** @format */

import socketIO, { Socket } from 'socket.io';
import { User } from '../classes/user';
import { UserList } from '../classes/user-list';

/**
 * Instancia de mi lista de usuarios.
 */

export const connectedUsers = new UserList();

/**
 * Para desconectar al cliente.
 * @param {Socket} client
 */
export const disconnect = (client: Socket) => {
	client.on('disconnect', () => {
		connectedUsers.deleteUser(client.id);
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
			 * Cuando se recibe un mensaje.
			 */
			console.log('Mensaje recibido', payload);

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

			callback({
				ok: true,
				message: `Usuario ${payload.name} configurado.`,
			});
		}
	);
};

/**
 * Método para agregar un cliente a nuestra lista de conectados.
 * @param {Socket} client
 */
export const connectClient = (client: Socket) => {
	const user = new User(client.id);
	connectedUsers.add(user);
};
