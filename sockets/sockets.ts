/** @format */

import socketIO, { Socket } from 'socket.io';

/**
 * Para desconectar al cliente.
 * @param {Socket} client
 */
export const disconnect = (client: Socket) => {
	client.on('disconnect', () => {
		// console.log('Cliente desconectado.');
	});
};

/**
 * Para escuchar mensajes.
 * @param {Socket} client
 *  @param {socketIO.Server} io
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
			/**
			 * Cuando se logea un usuario.
			 */
			console.log('Configurando usuario', payload.name);

			callback({
				ok: true,
				message: `Usuario ${payload.name} configurado.`,
			});
		}
	);
};
