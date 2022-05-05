/** @format */

import { Router, Request, Response } from 'express';

/**
 * Router utilizado para crear los endpoints.
 */
const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
	res.json({ ok: true, mensaje: 'GET - Ready' });
});

router.post('/mensajes', (req: Request, res: Response) => {
	const body = req.body.body;
	const from = req.body.from;
	res.json({ ok: true, body, from });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
	const body = req.body.body;
	const from = req.body.from;
	const id = req.params.id;
	res.json({ ok: true, body, from, id });
});

/**
 * Exportamos nuestro router para poder utilizarlo.
 */
export default router;
