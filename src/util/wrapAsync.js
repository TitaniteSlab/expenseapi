export default function(fn, doNext) {
	return function(req, res, next) {
		fn(req, res).then(() => doNext && next()).catch(next);
	};
};