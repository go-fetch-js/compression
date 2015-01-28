var HttpClient    = require('go-fetch');
var compression   = require('..');
var parseBody     = require('go-fetch-read-body');

HttpClient()
	.use(compression())
	.use(parseBody())
	.get('http://www.digitaledgeit.com.au/', function(error, response) {
		console.log(
			error,
			response.getStatus(),
			response.getHeader('Content-Encoding'),
			response.getBody().substr(0, 25)
		);
	})
;