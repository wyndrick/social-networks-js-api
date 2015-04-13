function SnsVK(){	
	this.initialize = function (appID) {
		  VK.init(function() { 
			 // API initialization succeeded 
			 // Your code here 
				initApp();		
		  }, function() { 
			 // API initialization failed 
			 // Can reload page here 
				alert('not auth');
		}, '5.29'); 
	};
	this.getUserInfo =	function (){
		VK.Api.call(
			'users.get', 
			{fields: 'first_name,last_name,photo_50,uid'}, 	
			function(r) { 
				if(r.response) {
					var result = {
						FirstName:r.response[0].first_name,
						LastName:r.response[0].last_name,
						Photo:r.response[0].photo_50,
						uid:""+r.response[0].uid
					}				
					getUserInfoCallback(result);
				}
			}
		);
	};
		
	this.getFriendsSids = function (){
		VK.Api.call(
			'friends.getAppUsers', 
			{}, 	
			function(r) { 
				if(r.response) { 								
					getFriendsSidsCallback(r.response);
				}
			}
		);
	};
	/*	
		function loadFriendsInfo(){
			VK.Api.call('friends.get', {uid: localStorage['uid'],
						fields: "uid, " +
						"first_name, " +
						"last_name, " +
						"photo"}, 	
			function(r) { 
				if(r.response) { 								
					flash.loadFriendsInfoCallback(r.response);
				}
			});
		}
		*/
		
	this.getUsersInfo = function(uids,respondID){						
		VK.api(
			"users.get",
			{
				uids:uids,
				fields: "uid, " +
				"first_name, " +
				"last_name, " +					
				"photo_50"
			},				
			function(r) { 
				if(r.response) {
					var result = new Array();
					for(var i=0;i<r.response.length;i++){
						result[i] = {
							FirstName:r.response[i].first_name,
							LastName:r.response[i].last_name,
							Photo:r.response[i].photo_50,
							uid:r.response[i].uid							
						}
					}						
					getUsersInfoCallback(result,respondID);
				}
			}
		);
		
	};

	this.navigateToProfile = function (uid){
		 window.open("https://vk.com/id" + uid, '_blank'); 
	};
}