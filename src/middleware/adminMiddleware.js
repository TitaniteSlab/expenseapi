export default function(req, res, next) {
	if (req.user && req.user.admin === true) {
		next();
	} else {
		res.status(403).end();
	}
}
