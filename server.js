var express = require('express');
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//function compile(str, path){
//    return stylus(str).set('filename', path);
//}
app.configure(function() {
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    //app.use(stylus.middleware(
    //    {
    //       src: __dirname + '/public',
    //        compile: compile
    //    }
    //));
    app.use(express.static(__dirname + '/public'));
});

mongoose.connect('mongodb://localhost/canvas');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error...'));
db.once('open', function callback(){
    console.log('canvas db opened');
});

var messageSchema = mongoose.Schema({message: String});
var message = mongoose.model('Message', messageSchema);
var mongoMessage;
message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
})

//app.get('/partials/:partialPath', function(reg, res){
//    res.render('partials/' + reg.params.partialPath);
//});

app.get('*', function(req,res){
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = 3030;
app.listen(port);

console.log('listening on port' + port +'...');