app.controller('imageUploadCtrl', function($scope,userServices){
    
         $scope.data = {};
       $scope.variavle=[]
         $scope.googleImages = function(){
             console.log("data",$scope.data.image)
            var data ={
               "keyword":$scope.data.image
           }
    
           userServices.downloadImage(data).then((success)=>{
            //console.log("bbb",JSON.stringify(success))
               if(success.data.responseCode==200){
                   // console.log("ssss",JSON.stringify(success))
                   $scope.storingImages = success.data.data
                   console.log('$scope.storingImages==>>',$scope.storingImages)
                   $scope.variavle= []
                  $scope.storingImages.filter(function(file){
                    console.log("file",file)
                        var url = file.url;
                        //console.log("url",url)
                        var  output_format = 'jpg';
                     $scope.convertImgToBase64URL(url, output_format,file);
                 
                   })
    
               }else if(success.responseCode==400){
                        console.log(success.responseMessage);
                        }
            }).catch((err)=>{
                console.log("error==>>",err);
            })
        }   
    
        $scope.saveimage = function(){
          let data = {
            images:$scope.variavle,
            key:$scope.data.image
    
          }
    
          console.log("$scope.variavle",$scope.variavle)
          userServices.imageupload(data).then((success)=>{
            console.log("bbb",JSON.stringify(success))
            if(success.data.responseCode==200){
    
               }else if(success.responseCode==400){
                        console.log(success.responseMessage);
                        }
        }).catch((err)=>{
          console.log("error==>>",err);
        })
    
    
        }
    
    
    
    
          $scope.convertImgToBase64URL  =  function(url,  outputFormat, file){
            console.log("url",url);
            console.log("outputFormat",outputFormat);
            console.log("file",file);
                var canvas = document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    img = new Image;
                //img.crossOrigin = 'anonymous';
                img.onload = function(){
                    // var dataURL;
                    // canvas.height = img.height;
                    // canvas.width = img.width;
                    // ctx.drawImage(img, 0, 0);
                    // dataURL = canvas.toDataURL(outputFormat);
                    $scope.callback(file);
                    canvas = null; 
                };
                img.src = url;
            }
    
    
    
    
    
    
     $scope.callback = function(file){
              var src = jic.compress(file,50,'jpeg').src;  
              console.log("Done with compressing")
              var vay = src.split(',');
             $scope.variavle.push(vay[1])
             console.log("$scope.variavle.push(vay[1])",$scope.variavle)
                }
    
    
                 var jic = {   
            compress: function(source_img_obj, quality, output_format){
                 var mime_type = "image/jpeg";
                 if(typeof output_format !== "undefined" && output_format=="png"){
                    mime_type = "image/png";
                 }
             var cvs = document.createElement('canvas');
                 cvs.width = source_img_obj.thumb_width;
                 cvs.height = source_img_obj.thumb_height;
    //             var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
                 var newImageData = cvs.toDataURL(mime_type, quality/100);
                 var result_image_obj = new Image();
                 result_image_obj.src = newImageData;
                 return result_image_obj;
            }
        }  
    
    });