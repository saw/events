var express = require('express');
// sessions are hard to scale, but work fine for a demo :)
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var routes = require('./routes/index.js')(router);

var app = express();

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;


var api = require('./api/api.js');
var storage = require('./api/storage.js');
storage.init().then(function() {
    console.log('Storage engine ready');
});


//Authentication stuff
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000'
  },
  function(identifier, profile, done) {

    api.callMethod('user', 'get', {id:identifier}).then(
            function(user) {
                if(user) {
                    done(null, user);
                } else {
                    var data = profile;
                    data._id = identifier;
                    api.callMethod('user', 'post', data)
                        .then(function(user) {
                            console.log('done');
                            done(null, user);
                        })
                }
            },
            function(err) {
                done(err);
            }
        );
  }
));

passport.serializeUser(function(user, done) {
      done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    api.callMethod('user', 'get', {id:id})
        .then(function(user){
            done(null, user);
        },
        function(err){
            done(err);
        });
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
app.use('/login', passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('jsx', require('./lib/react-render.js')(app));
app.set('view engine', 'jsx'); // register the template engine
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./lib/app-context.js')(app));

app.use('/api', require('./api/index.js'));

var head = fs.readFileSync('./views/head.html', 'utf-8');
app.use('/', function(req, res, next) {
    var data = head;
    console.log(head);
    res.write(head);
    // res.end();
    next();
})
app.use('/', router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
