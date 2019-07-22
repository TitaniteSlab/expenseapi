import express from 'express';

let router = express.Router();

router.route('/')
	.get((req, res, next) => {
		res.status(200).json({message: '200 OK'});
	});

export default router;