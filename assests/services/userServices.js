app.service('userServices',function($http){
	return {
		'downloadImage':(data)=>{
			console.log('logindata in userServices==>>',data)
			return $http.post('user/images',data);
		},
		'imageupload':(data)=>{
			console.log('logindata in userServices==>>',data)
			return $http.post('user/imageUpload',data);
		},
		'KeyWordsFromDB':()=>{
			return $http.get('user/KeyWordsFromDB');
		},
		'gettingImages':(data)=>{
			console.log('logindata in userServices==>>',data)
			return $http.post('user/imageUpload',data);
		},
		'findImages':(data)=>{
			console.log('logindata in userServices==>>',data)
			return $http.post('user/getAllImages',data);
		},
	};
});



