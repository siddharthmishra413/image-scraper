app.controller('allKeyCtrl', function($scope,userServices){
    console.log("serff")
  
      userServices.KeyWordsFromDB().then((success)=>{
          console.log("bbb",JSON.stringify(success))
  
          if(success.data.responseCode==200){
            $scope.dataArray = success.data.result;
            console.log("============",$scope.dataArray);
  
             }else if(success.responseCode==400){
                      console.log(success.responseMessage);
                      }
      }).catch((err)=>{
        console.log("error==>>",err);
      })

     $scope.findImages = function(data){
       var obj = {};
       obj.key = data;
       console.log("=0-0-0-",data);
      userServices.findImages(obj).then((success)=>{
        console.log("bbb",JSON.stringify(success))

        if(success.data.responseCode==200){
          console.log("======================",success.data.result[0].image);
          $scope.dataArray1 = success.data.result[0].image;
          $scope.dataArray2 = $scope.dataArray1;

           }else if(success.responseCode==400){
                    console.log(success.responseMessage);
                    }
    }).catch((err)=>{
      console.log("error==>>",err);
    })
  }
    
  
  });