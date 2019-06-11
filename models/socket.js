var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var SocketSchema = Schema({

    socketId     : { type: String, required: true, unique: false },
   



});

module.exports = mongoose.model('Socket', SocketSchema);

