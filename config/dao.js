const mongoose=require('mongoose');
let config= require('./config');
mongoose.Promise = global.Promise;
mongoose.connection.openUri(config.mongoDbUrl);
/*.then(()=>{
	console.log("Successfully connected to mongoDb.==>>")
	 process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
})
.catch((err)=>console.log("err==>>",err));
*/

/************************************ Events of mongoose connection. ******************************************************/
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected',  ()=> {  
  console.log('Mongoose default connection open to ' + config.mongoDbUrl);
}); 
// If the connection throws an error
mongoose.connection.on('error', (err) =>{  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected',  ()=> {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () =>{  
  mongoose.connection.close( ()=> { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});