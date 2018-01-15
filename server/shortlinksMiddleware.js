import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

function onRoute(req, res, next) {
	const shortlink = Shortlinks.findOne({token: req.params.token});

	if (shortlink) {
		Shortlinks.update({_id: shortlink._id},{$inc: {clicks: 1}});
		res.writeHead(307, { 'Location': shortlink.url });
		res.end();
	} else {

		// Goes to the next middleware, at the end the React application
		next();
	}
}

const middleware = ConnectRoute( function(router) {
	router.get('/s/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);