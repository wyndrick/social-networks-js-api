//show login buttons 
			VK.init({
				apiId: '4874580'
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