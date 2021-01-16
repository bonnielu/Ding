var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
const http = require('http')

require('dotenv').config();

// routers
var apiRouter = require('./routes/api');

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors({origin: '*'}));
const server = http.createServer(app);
const port = process.env.PORT || '5000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRouter);

server.listen(port, () => {
  console.log("listening on *:" + port)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json("404 not found")
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
