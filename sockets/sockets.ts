/** @format */

import socketIO, { Socket } from 'socket.io';

/**
 * Para desconectar al cliente.
 * @param {Socket} client
 */
export const disconnect = (client: Socket) => {
	client.on('disconnect', () => {
		console.log('Cliente desconectado.');
	});
};

/**
 * Para escuchar mensajes.
 * @param {Socket} client
 */
export const message = (client: Socket, io: socketIO.Server) => {
	client.on('message', (payload: { from: string; body: string }, callback) => {
		/**
		 * Cuando se recibe un mensaje.
		 */
		console.log('Mensaje recibido', payload);

		/**
		 * Para emitir nuestro último mensaje.
		 */
		io.emit('new-message', payload);
	});
};
