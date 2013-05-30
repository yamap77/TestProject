/*
 * login using facebook, using facebook API
 */
//facebook intialize

//mode="production";
mode="test";
//alert(window.location.hostname);
function appId(){
	if(window.location.hostname=="localhost"){
		appId='307366382730986';
		//alert(appId);
		
	}
	else appId='518199254908287';
	
	return appId;
}
appId=appId();
window.fbAsyncInit = function() {
	FB.init({
		appId :appId, // App ID
		channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml : true
	// parse XFBML
	});

	//FB.Event.subscribe('auth.statusChange', handleStatusChange);
};

// Load the SDK Asynchronously
(function(d) {
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement('script');
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));
//after user click the login using facebook button, call this function to login
function loginUser() {
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('Welcome!  Fetching your information.... ');
			FB.api('/me', function(response) {
				console.log('Good to see you, ' + response.name + '.');
				if(mode=="test"){
					alert(session.getState());
				//top.location.href = "http://localhost:8888/index.html";
				}
				else{
				 top.location.href="http://yamaptest.appspot.com/index.html"
				}
			});
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {
		scope : 'email',
		display : 'touch'
	});
}
/*
 * login using google+ API
 */
//load google api javascript
(function() {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/client:plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();

//callback function is a JavaScript function you write that is triggered after the user authorizes or declines access to the information requested by your app. 
//The function is passed an object that represents the authorization result.
function signinCallback(authResult) {
	access_token = authResult['access_token'];
	if (authResult['access_token']) {
		// alert(authResult['access_token']);//

		// Successfully authorized
		// Hide the sign-in button now that the user is authorized, for example:
		document.getElementById('signinButton').setAttribute('style',
				'display: none');
		if(mode=="test"){
		top.location.href = "http://localhost:8888/index.html";
		}
		else{
		top.location.href="http://yamaptest.appspot.com/index.html";
		}
	} else if (authResult['error']) {
		

		// There was an error.
		// Possible error codes:
		//   "access_denied" - User denied access to your app
		//   "immediate_failed" - Could not automatically log in the user
		console.log('There was an error: ' + authResult['error']);
	}
}
//make up data call back which is used for logout
function signinCallback2(authResult) {
	access_token = authResult['access_token'];
	//alert(access_token);
	if (authResult['access_token']) {
		// alert(authResult['access_token']);//

		// Successfully authorized
		// Hide the sign-in button now that the user is authorized, for example:
		//document.getElementById('signinButton2').setAttribute('style', 'display: none');
		// top.location.href="http://localhost:8888/index.html";
		//top.location.href="http://yamaptest.appspot.com/index.html";
	} else if (authResult['error']) {

		// There was an error.
		// Possible error codes:
		//   "access_denied" - User denied access to your app
		//   "immediate_failed" - Could not automatically log in the user
		// console.log('There was an error: ' + authResult['error']);
	}
}
//call this function when user login using google account and want to logout
function disconnectUser(access_token) {
	  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
	      access_token;
    // alert("test");
	  // Perform an asynchronous GET request.
	  $.ajax({
	    type: 'GET',
	    url: revokeUrl,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    success: function(nullResponse) {
	    	//alert("dis");
	      // Do something now that user is disconnected
	      // The response is always undefined.
	    },
	    error: function(e) {
	      // Handle the error
	      // console.log(e);
	      // You could point users to manually disconnect if unsuccessful
	      // https://plus.google.com/apps
	    }
	  });
	}
// Could trigger the disconnect on a button click
//$(".revokeButton").click(disconnectUser);

function logout() {
	disconnectUser(access_token);

	FB.logout(function(response) {
		//alert("disconnected");
		// user is now logged out
	});
	setTimeout("location.href='http://localhost:8888'", 500);
	//top.location.href = "http://localhost:8888";
	
}
