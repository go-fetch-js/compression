var Stream  = require('stream');
var zlib    = require('zlib');

/**
 * Handle compressed responses from the server
 * @returns {function(HttpClient)}
 */
module.exports = function() {
	return function(client) {

		client.on('before', function(request, response) {

			//indicate to the server that we would like to use gzip
			request.setHeader('Accept-Encoding', 'gzip');

		});

		client.on('after', function(request, response) {
			var
				encoding  = response.getHeader('Content-Encoding'),
				stream    = response.getBody()
			;

			//ensure response is a stream
			if (!(stream instanceof Stream)) {
				return next();
			}

			//pass through stream
			if (encoding === 'gzip') {
				response.setBody(stream.pipe(zlib.createGunzip()));
			}

		});

	};
};