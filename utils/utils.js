class UtilsWithio{
    constructor(io, port, temp){
        this.io = io;
        this.port = port;
        this.temp = temp;
    }
    
    //Fűtés vezérlése
    heatControl(data){
            switch(data[0]){
                case "Tomi":
                    if (parseFloat(data[1]) < this.temp){
                        this.port.write('0ledCp');
                        console.log("Fűtés bekapcs Tomi")
                    }
                    break
                case "Bazsi":
                    if (parseFloat(data[1]) < 25){
                        console.log("Fűtés bekapcs Bazsi")
                    }
                    break
                    
                }
            }
}
  

module.exports = {
    splitMessage: function(io, data, port, temp){
        this.io = io;
        msgSplitted = data.split(",");
        this.io.emit('data', msgSplitted);
        ut = new UtilsWithio(io, port, temp);
        ut.heatControl(msgSplitted);
    }
}
