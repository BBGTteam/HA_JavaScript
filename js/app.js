var utils = require('./utils');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( './html/main.html');
var bazsi = fs.readFileSync( './html/bazsi.html');

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

var bazsi_app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(bazsi);
});

var io = require('socket.io')(app, {
    allowEIO3: true // false by default
  });

var io_bazsi = require('socket.io')(bazsi_app, {
    allowEIO3: true // false by default
  });

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
    socket.on("message", (data) => {
        if (data == '0ledCp') port.write(data);
        if (data == 'Get temp') getTemp();
        if (data == 'Set temp') setTemp();
        
    });
});

io_bazsi.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
    socket.on("message", (data) => {
        if (data == '0ledCp') port.write(data);
        if (data == 'Get temp') getTemp();
        if (data == 'Set temp') setTemp();
        
    });
});


function getDataFromArduino(){
    parser.on('data', function(data) {
        utils.splitMessage(io, data, port, temp);
        utils.splitMessage(io_bazsi, data, port, temp);
    });

}

app.listen(3000);
bazsi_app.listen(3001);

function getTemp(){
    const dataFromJSONFile = fs.readFileSync('./data/db.json');
    const dataFromJSON = JSON.parse(dataFromJSONFile);
    const temp = parseFloat(dataFromJSON.users[0].temp);
    console.log(temp);
    return temp;
}

var temp = getTemp();

function setTemp(){
    jsonReader("./data/db.json", (err, customer) => {
      if (err) {
        console.log("Error reading file:", err);
        return;
      }
      // increase customer order count by 1
      customer.users[0].temp += 1;
      console.log(customer.users[0].temp);
      fs.writeFile("./data/db.json", JSON.stringify(customer), err => {
        if (err) console.log("Error writing file:", err);
      });
    });
}

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
  }

  getDataFromArduino();