var http = require('http');

http.createServer(function(request, response){
	//send http header
	//200: ok
	//content type: text/plain
	response.writeHead(200, { 'Content-Type': 'text/plain'});
	//send response message
	response.end('Hello world\n');
}).listen(4000);

//server console
console.log('Server is running at http://127.0.0.1:4000/');