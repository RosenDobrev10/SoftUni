const routes = {};

function register(method, path, handler) {
	if (routes[path] == undefined) {
		routes[path] = {};
	}
	routes[path][method] = handler;
}

function match(req, res) {
	const url = new URL(req.url, `http://${req.headers.host}`);

	let handler;
	const actions = routes[url.pathname];
	if (actions != undefined) {
		handler = actions[req.method];
	}

    if (typeof handler == 'function') {
        handler(req, res);
    } else {
		routes.default['GET'](req, res);
	}
}

module.exports = {
	register,
    get: register.bind(null, 'GET'),
    post: register.bind(null, 'POST'),
	match,
};
