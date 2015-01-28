var assert      = require('assert');
var HttpClient  = require('go-fetch');
var compression   = require('..');

describe('compression', function() {

	it('should add a `User-Agent` header with the value of `go-fetch`', function() {

		var client    = new HttpClient();
		var request   = new HttpClient.Request('GET', 'https://api.github.com/users/digitaledgeit/repos', {'Content-Type': 'application/json'});
		var response  = new HttpClient.Response();

		client.use(compression('go-fetch'));

		client.emit('before', request, response, function(error, request, response) {
			assert.equal(request.getHeader('User-Agent'), 'go-fetch');
		});

	});

});