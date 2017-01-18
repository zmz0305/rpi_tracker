var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');

var routes = require('./routes/index');
var users = require('./routes/users');

var serialport = require('serialport');
var app = express();

var allowCrossDomain = function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
}

app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/users', users);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var SerialPort = serialport.SerialPort;
var parsers = serialport.parsers;
var port = new SerialPort('/dev/ttyUSB0', {
    baudrate: 9600,
    parser: parsers.readline('\n'),
    stopBits: 2
});

port.on('open', function () {
    console.log('Port open');
});


port.on('data', function (data) {
    users = {
        '80000AAC80A6': {name: 'David Koenig'},
        '82003CD298F4': {name: 'Jerry Shim'}
    };
    id = data.substr(data.length - 13);
    console.log(users);
    console.log(id);
    console.log(typeof id);
    console.log(users.id);
    for(var x in users){
        console.log(x === id);
    }
    if(users[id]){
        io.emit('valid_user_detected', users[id].name);
    }
});

var gpio = require('rpi-gpio');
gpio.setup(31, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(33, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(37, gpio.DIR_IN, gpio.EDGE_BOTH);

var pinmap = {
    31: {id: 13, prev_state: true},
    33: {id: 14, prev_state: true},
    37: {id: 15, prev_state: true}
};
gpio.on('change', function (channel, value) {
    if (pinmap[channel].prev_state != value) {
        if (value) {
            io.emit('toolReturned', {data: pinmap[channel].id});
            pinmap[channel].prev_state = value;
            console.log('Channel ' + channel + ' value is now ' + value);
        } else {
            io.emit('toolRemoved', {data: pinmap[channel].id});
            pinmap[channel].prev_state = value;
            console.log('Channel ' + channel + ' value is now ' + value);
        }
    }
});

app.get("/initState", function (req, res) {
    async.parallel([function (callback) {
        gpio.read(31, function (err, val) {
            if (err) {throw err;}
            pinmap[31].prev_state = val;
            callback(null, val);
        })
    }, function (callback) {
        gpio.read(33, function (err, val) {
            if(err) {throw err;}
            pinmap[33].prev_state = val;
            callback(null, val);
        })
    }, function (callback) {
        gpio.read(37, function (err, val) {
            if(err) {throw err;}
            pinmap[37].prev_state = val;
            callback(null, val);
        })
    }], function (err, results) {
        var val = 0;
        for(var i = 0; i < results.length; i++){
            var v = results[i] ? 1 : 0;
            val |= v;
            val <<= 1;
        }
        val >>= 1;
        console.log(val);
        res.json({data: {body: {return_value: val}}})
    })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// setInterval(function readInput() {
//   gpio.read(31, function (err, val) {
//     if(err){
//       throw err;
//     }
//       console.log('values at 31: ' + val);
//   });
//   gpio.read(33, function (err, val) {
//     if(err){
//         throw err;
//     }
//     console.log('values at 33: ' + val);
//   });
//   gpio.read(37, function (err, val) {
//     if(err){
//         throw err;
//     }
//     console.log('values at 37: ' + val);
//   });
// }, 1000);
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(port);
module.exports = app;
