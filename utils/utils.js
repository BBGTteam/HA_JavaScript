module.exports = {
    splitMessage: function(io, data){
        this.io = io;
    if (data.includes("Tomi")){
        msgSplitted = data.split(",");
        io.emit('data', msgSplitted);
        
        }
    }
}