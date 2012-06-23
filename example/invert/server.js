var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var shoe = require('../../');
var es = require('event-stream');

var server = http.createServer(ecstatic);
server.listen(9999);

var sock = shoe.createServer();
sock.on('connection', function (stream) {
    var iv = setInterval(function () {
        stream.write(Math.floor(Math.random() * 2));
    }, 250);
    
    stream.on('end', function () {
        clearInterval(iv);
    });
    
    stream.pipe(process.stdout, { end : false });
});
sock.installHandlers(server, { prefix : '/invert' });
