/** @format */

import express from 'express';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/sockets';

/**
 * Definimos nuestra clase servidor.
 */

export default class Server {
	public app: express.Application; // aplicación donde ejecutaremos nuestro server.
	public port: number; // Puerto donde se va a levantar nuestro server.
	public io: socketIO.Server; // Agregamos la libreria de socketIo a nuestro server.
	private httpServer: http.Server; // interceptor para poder utilizar los sockets.
	private static _instance: Server; // Propiedad estatica para llamar a la clase.

	private constructor() {
		this.app = express();
		this.port = SERVER_PORT;
		this.httpServer = new http.Server(this.app);
		this.io = new socketIO.Server(this.httpServer, {
			cors: { origin: true, credentials: true },
		});
		this.listenSockets();
	}

	/**
	 * Getter para obtener la instancia de la clase si existe, y si no se crea una nueva instancia.
	 */

	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	/**
	 * Método para inicializar el servidor.
	 * @param {Function} callback
	 */
	start(callback: Function | any): void {
		this.httpServer.listen(this.port, callback);
	}

	/**
	 * Método para escuchar nuestros sockets.
	 */
	private listenSockets(): void {
		console.log('Escuchando conexiones - sockets');
		/**
		 * Cuando se produzca una conección.
		 */
		this.io.on('connection', (cliente: Socket) => {
			console.log('Cliente conectado.');

			/**
			 * Cuando se reciba un mensaje.
			 */
			socket.message(cliente, this.io);

			/**
			 * Cuando se produzca una desconección.
			 */
			socket.disconnect(cliente);
		});
	}
}
