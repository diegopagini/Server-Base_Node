/** @format */

import { Socket } from 'socket.io';

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
export const message = (client: Socket) => {
	client.on('message', (payload: { from: string; body: string }, callback) => {
		console.log('Mensaje recibido', payload);
	});
};
