const express = require('express')
const body_parser = require('body-parser');
const http =  require('http');
let dao  = require('./config/dao')
let user =  require('./routes/user');
// const morgan = require('morgan');


let app=express();
let server=http.createServer(app);
let PORT=process.env.NODE_ENV || 4000;
if(process.env.NODE_ENV=="production"){
  /*NODE_ENV="production" npm start on console to set env.*/
  PORT=3000;
}

app.use(express.static(__dirname + '/assests'));
/*app.get('/',(req,res)=>{
	res.sendFile(__dirname + "/index.html")
})*/
app.use(body_parser.json());
// app.use(morgan('dev'));
app.use('/user',user);
// allow CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
server.listen(PORT,()=>{
	console.log(`server is listen on ${PORT}`);	
});
