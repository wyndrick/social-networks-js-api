
	var app = getMovie('App');
	var sns;
		
		
	function LOG(message){
		console.log(message);
	}	
		
		
		
/*	

	(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ru_RU/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));


*/
		var loc = window.location.toString();
		
		if(loc.indexOf("ok.ru") != -1){
//in OK			
			$.getScript("my_lovely_script.js", function(){
			   alert("Script loaded and executed.");
			});
			
			sns =  new SnsOK();
			var rParams = FAPI.Util.getRequestParameters();
			
			FAPI.init(rParams["api_server"], rParams["apiconnection"],   
				function() {
					initApp();   
				},
				function(error) {
					alert(error);
				}
			);
		}else if (loc.indexOf("vk.com") != -1){
//in VK				
				$.getScript("social_network/vk.js", function(){
					sns =  new SnsVK();
					sns.initialize();
				});
			
				
		}else if(loc.indexOf("facebook.com") != -1){
//in FB, not tested	
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
		}else if(sessionStorage["OKOAuth"]){
// OK OAuth callback
			sns =  new SnsOKOAuth(sessionStorage['access_token']);
			initApp();
		}
		else{	
//show login buttons 
			VK.init({
					apiId: '4819285'
				});	
			FB.init({
					appId      : '630368903761177',
					xfbml      : true,
					version    : 'v2.1'
				});
				var div = document.createElement('div');
				div.id = 'loginButtons';
				div.innerHTML  = '<div id="btnVKlogin" onclick="VK.Auth.login(authInfo);"></div>	<div id="fb-root"><div class="fb-login-button" onlogin="checkLoginState();" data-scope="public_profile,user_friends" data-size="medium" ></div></div>	<a href="http://www.odnoklassniki.ru/oauth/authorize?client_id=1126962432&scope=VALUABLE_ACCESS&response_type=code&redirect_uri=https://localhost/OKOAuth.php">Login OK.ru</a>;'
				document.body.appendChild(div);	
				VK.UI.button('btnVKlogin');	
			
			function authInfo(response) {
					if (response.session) {
						sns =  new SnsVK();
						document.getElementById('loginButtons').style.display = "none";
						initApp();			
					} else {
						alert('not auth');
					}
				}
			
			function checkLoginState() {
				  FB.getLoginStatus(function(response) {
					statusChangeCallback(response);
				  });
				}

				function statusChangeCallback(response){
					if(response.status === 'connected'){
						sns =  new SnsFB();
						document.getElementById('loginButtons').style.display = "none";
						initApp();
					}
				}
			
				
		}
		
		
			
	function getMovie(movieName) {
    return document.getElementById(movieName);
	}	
	
// sns methods	
	
	function getUserInfo(){
		sns.getUserInfo();
	}
	
	function getFriendsSids(){
		sns.getFriendsSids();
	}
	
	function getUsersInfo(uids,respondID){
		sns.getUsersInfo(uids,respondID);
	}
	
	function navigateToProfile(uid){
		sns.navigateToProfile(uid);
	}
	
// sns method callbacks	
	
	function getUserInfoCallback(data){
		/*if(!app){
			app = getMovie("App");	
		}	
		app.getUserInfoCallback(data);*/
		var logs = u.getUnity().SendMessage("BG", "GetUserInfoCallback",JSON.stringify(data));

	}

	function getUsersInfoCallback(data,respondID){
		/*if(!app){
			app = getMovie("App");	
		}	
		app.getUsersInfoCallback(data,respondID);*/
		data.push(respondID);
		var logs = u.getUnity().SendMessage("BG", "GetUsersInfoCallback",JSON.stringify(data));
	}
	
	function getFriendsSidsCallback(data){
	/*	if(!app){
			app = getMovie("App");	
		}		
		app.getFriendsSidsCallback(data);*/
		var logs = u.getUnity().SendMessage("BG", "GetFriendsSidsCallback",JSON.stringify(data));
	}