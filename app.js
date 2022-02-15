var utils = require('./utils/utils');
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
        if (data == '0ledCp') port.write(data);
        else getTemp();
    });
});

parser.on('data', function(data) {
    
    utils.splitMessage(io, data, port, temp);
});

app.listen(3000);

function getTemp(){
    const dataFromJSONFile = fs.readFileSync('./data/db.json');
    const dataFromJSON = JSON.parse(dataFromJSONFile);
    const temp = parseFloat(dataFromJSON.users[0].temp);
    return temp;
}

var temp = getTemp();
