let User=require('../handler/mongoHandler');
// import responseHandler from '../middlewares/responseHandler'
const Scraper=require('images-scraper');
const cloudinary=require('cloudinary');
const google = new Scraper.Google();

cloudinary.config({ 
 cloud_name: 'ducixxxyx', 
 api_key: '971481123293634', 
 api_secret: '_nCwcLXMZ2o6t_4zdpgtYSseaBU' 
});



module.exports={
	    'ImagesFromGoogle':(req,res)=>{
	    	console.log("res",req.body)
            google.list({
                keyword: req.body.keyword,     //search keyword
                num: 15,                                    //no of images you want
                detail: true,
                nightmare: {
                    show: false
                }
    	})
        .then(function (response) {
            console.log('first 15 results from google',response);
                        return res.json({responseCode:200,responseMessage:"Success",data:response})
        }).catch(function(err) {
            console.log('err==============+>>>>>>>>>>>>>>>>>>>>', err);
        });
    },

      "uploadFiles": function(req,res) {
      	
      	let images = req.body.images;
     if (!(images === undefined || images == "")) {
         var imageUrl = [];
         var a = 0;
         for (var i = 0; i < images.length; i++) {
                     	// console.log("Running all "+i)

             var img_base64 = images[i];
             var binaryData = new Buffer(img_base64, 'base64');
             require("fs").writeFile("test.jpeg", binaryData, "binary", function(err) {});
             cloudinary.uploader.upload("test.jpeg", function(result,err) {
             	console.log("hello"+result)
                 if (result) {
                 	console.log("image",result.url)
                     imageUrl.push(result.url);
                     a += i;
                     if (a == i * i) {
                     	console.log("Running after all ")
                     	let data = {
                     		key:req.body.key,
                     		image:imageUrl
                     	}
                        console.log("into svaing function",data)
                     	var user = new User(data)
                     	user.save();
                        res.send({result:imageUrl,responseCode:200,responseMessage:"Successfully uploaded"})
                     }
                 } else {
                 	console.log("erererererererererer",err)
                     // callback(null,'http://res.cloudinary.com/ducixxxyx/image/upload/v1480150776/u4wwoexwhm0shiz8zlsv.png')
                 }

             });
         }
         console.log("demoning"+imageUrl);


     } else {
         callback(null,"");
     }
 },

 "KeyWordsFromDB":(req,res)=>{
 	User.find().distinct('key').then((result)=>{
 		return res.send({result:result,responseCode:200,responseMessage:"Success."})
 	}).catch((err)=>{
 		return res.send({responseCode:500,responseMessage:"Error."})
 	})
 },

 "gettingImages":(req,res)=>{
 	console.log("key",req.body)
 	User.find({key:req.body.key}).then((result)=>{
 		return res.send({result:result,responseCode:200,responseMessage:"Successfully uploaded"})
 	}).catch((err)=>{
 		return res.send({responseCode:500,responseMessage:"Internal server error."})

 	})
 },

 "getAllImages":(req,res)=>{
    console.log("key111111111111111111111",req.body)
    User.find({key:req.body.key}).then((result)=>{
        console.log("jhsgjhgsjkdgjkshd",result);
        return res.send({result:result,responseCode:200,responseMessage:"Successfully uploaded"})
    }).catch((err)=>{
        return res.send({responseCode:500,responseMessage:"Internal server error."})

    })
}

}
