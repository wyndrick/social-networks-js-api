<?php
	session_start();
	
	//если редирект с приложения получаем токен
	if($_GET["code"]){
		$client_id = '1126962432'; 
		$client_secret = '9DE653024015EEAC28F48FE7'; 
		$redirect_uri = 'https://localhost/OKOAuth.php'; 
	  
	  $param = array(
		'code' => $_GET["code"],
        'client_id' => $client_id,
        'client_secret' => $client_secret,
		'redirect_uri' => $redirect_uri,
		'grant_type'=>'authorization_code',   	
		);
		
	$request = "http://api.odnoklassniki.ru/oauth/token.do?".urldecode(http_build_query($param));
	$opts = array('http' =>	array('method'  => 'POST'));                       
	$context  = stream_context_create($opts);
	$response = file_get_contents($request,false,$context);
	$info = json_decode($response,true);

	echo '<script type="text/javascript">
          sessionStorage["OKOAuth"] = true;
		  sessionStorage["access_token"] = "'.$info['access_token'].'";
      </script>'; 

	//редирект в основное окно
	echo '<script type="text/javascript">
           window.location =  "https://localhost/Assets.html"
      </script>'; 
	exit();	  
	}

?>
