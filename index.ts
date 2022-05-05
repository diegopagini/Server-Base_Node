/** @format */

import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

/**
 * Llamamos a nuestra instancia del servidor.
 */
const server = Server.instance;

/**
 * Configuramos nuestro bodyParser.
 */
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

/**
 * Configuramos el CORS.
 */
server.app.use(cors({ origin: true, credentials: true }));

/**
 * Utilizamos nuestro router en el servidor.
 */
server.app.use('/', router);

/**
 * Inicializamos el servidor.
 */
server.start(() => {
	console.log(`servidor inicializado en puerto ${server.port}`);
});
