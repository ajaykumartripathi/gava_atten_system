var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var swaggerUI = require('swagger-ui-express');
var swaggerjsDoc = require('swagger-jsdoc');

var db = require("./models/db")

var app = express();

// Swagger setup

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'test API',
      version: '1.0.0',
      description:'It is a basic apis'
    },
    servers:[
      {
        url:"http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        }
      }
  
    },
    security: [{
      jwt: []
    }],
  },
  apis: ['./routes/*']
  // apis: ['./src/routes*.js'], // files containing annotations as above
};

const spec = swaggerjsDoc(options)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users/v1', usersRouter);
app.use('/',swaggerUI.serve,swaggerUI.setup(spec))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
