app.controller('findImagesCtrl',  function($scope,userServices,$state, $stateParams){
	console.log("sss")

	userServices.KeyWordsFromDB().then((success)=>{
        console.log("bbb",JSON.stringify(success))

        if(success.data.responseCode==200){
          $scope.dataArray = success.data.result;

           }else if(success.responseCode==400){
                    console.log(success.responseMessage);
                    }
    }).catch((err)=>{
      console.log("error==>>",err);
    })
	
});