var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('/dev/ttyUSB0',{ 
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io')(app, {
    allowEIO3: true // false by default
  });

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
    socket.on("message", (data) => {
        console.log(data);
    });
});

parser.on('data', function(data) {
    
    console.log(data);
    splitMessage(data)
});

app.listen(3000);

function splitMessage(data){
    if (data.includes("Tomi")){
        msgSplitted = data.split(",");
        io.emit('data', msgSplitted);
        
        }

}