/** @format */

import { Router, Request, Response } from 'express';
import { GraphicData } from '../classes/graphics';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/sockets';

/**
 * Router utilizado para crear los endpoints.
 */
const router = Router();

/**
 * Instancia de nuestro clase gráfica
 */

const graphics = new GraphicData();

/**
 * Ruta para obtener nuestra gráfica.
 */

router.get('/grafica', (req: Request, res: Response) => {
	res.json(graphics.getGraphicData());
});

/**
 * Ruta para modificar nuestra gráfica.
 */

router.post('/grafica', (req: Request, res: Response) => {
	const { month, values } = req.body;
	const server = Server.instance;
	graphics.changeValue(month, Number(values));
	server.io.emit('graphic-change', graphics.getGraphicData());
	res.json(graphics.getGraphicData());
});

/**
 * Ruta para mensajes públicos.
 */

router.get('/mensajes', (req: Request, res: Response) => {
	res.json({ ok: true, mensaje: 'GET - Ready' });
});

/**
 * Ruta para mensajes públicos.
 */

router.post('/mensajes', (req: Request, res: Response) => {
	const { body, from } = req.body;
	const server = Server.instance;
	const payload = {
		from,
		body,
	};
	server.io.emit('new-message', payload);
	res.json({ ok: true, body, from });
});

/**
 * Ruta para mensajes privados.
 */

router.post('/mensajes/:id', (req: Request, res: Response) => {
	const { body, from } = req.body;
	const id = req.params.id;
	const payload = {
		from,
		body,
	};
	const server = Server.instance;
	server.io.in(id).emit('private-message', payload);
	res.json({ ok: true, body, from, id });
});

/**
 * Ruta para obtener los ids de los usuarios.
 */

router.get('/usuarios', (req: Request, res: Response) => {
	const server = Server.instance;
	server.io
		.allSockets()
		.then((clients) => {
			res.json({
				ok: true,
				cients: Array.from(clients),
			});
		})
		.catch((err) => {
			res.json({
				ok: false,
				err,
			});
		});
});

/**
 * Obtener usuarios y sus nombres.
 */

router.get('/usuarios/detalle', (req: Request, res: Response) => {
	res.json({
		ok: true,
		clients: connectedUsers.getList(),
	});
});

/**
 * Exportamos nuestro router para poder utilizarlo.
 */
export default router;
