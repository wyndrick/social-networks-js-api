sns =  new SnsFB();
				FB.init({
					appId      : '630368903761177',
					xfbml      : true,
					version    : 'v2.1'
				});
				function checkLoginState() {
				  FB.getLoginStatus(function(response) {
					statusChangeCallback(response);
				  });
				}

				function statusChangeCallback(response){
					if(response.status === 'connected'){
						initApp();
					}
				}
				checkLoginState();				
				
				

		function SnsFB(){
					this.getUserInfo = function (){	
											FB.api("/me", 		
											function(response) { 
												if(response && !response.error) {
													var result ={
														FirstName:response.first_name,
														LastName:response.last_name,
														Photo:response.picture.data.url,
														uid:response.id
													}								
													getUserInfoCallback(result);
													}
												} ,
											{fields:"last_name,first_name,id,picture.height(50).width(50)"}
											)		
										};
							
					this.getFriendsSids = function (){
												FB.api("/me/friends", 
												function(response) { 
													if(response && !response.error) {
														var result = new Array();	
														for	(var i=0;i<response.length;i++){
															result[i]=response[i].id;
														}
														getFriendsSidsCallback(result);
													}
												},
												{fields:"id"}
												)
										};
							/*
							function loadFriendsInfo(){
								FB.api("/me/friends", 
												function(response) { 
													if(response && !response.error) {
														var result = new Array();	
														for	(var i=0;i<response.length;i++){
															result[i]={
																uid:response[i].id,
																FirstName:response[i].first_name,
																LastName:response[i].last_name,
																Photo:response[i].picture.data.url,
															}								
														}
														flash.getFriendsSidsCallback(result);
													}
												}, 
												{fields:"id,first_name,last_name,picture"})
							}
							*/
							
					this.getUsersInfo = function (uids,respondID){
											FB.api(	'?ids='+uids,
											function(response) { 
												if(response && !response.error) {
													var result = new Array();
													var i = 0;								
													for	(var key in response){
														result[i]={
															uid:response[key].id,
															FirstName:response[key].first_name,
															LastName:response[key].last_name,
															Photo:response[key].picture.data.url,										
														}									
													}
													getUsersInfoCallback(result,respondID);
												}
											}, 
											{fields:"id,first_name,last_name,picture.height(50).width(50)"})
										};
//в FB так делать нельзя начиная с версии апи 2.0 (id уникальный для приложения и профиль по нему не найти)
					this.navigateToProfile = function (uid){
						
										//		 window.open("https://www.facebook.com/profile.php?id=" + uid, '_blank'); 
											};
		}
	