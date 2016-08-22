var config = {
	apiKey: "AIzaSyBmazDVr3SY7HQIUV9yD8Vv4A6xCUgQjk8",
	authDomain: "meetupfirebase.firebaseapp.com",
	databaseURL: "https://meetupfirebase.firebaseio.com",
	storageBucket: "meetupfirebase.appspot.com",
};
firebase.initializeApp(config);
var auth = firebase.auth();
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('public_profile');

function SignIn(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
	});
}

function SignOut(){
	firebase.auth().signOut().then(function() {
		location.reload();
	}, function(error) {
	  // An error happened.
	});
}


auth.onAuthStateChanged(function(user) {
  if (user) {
  	$('#signIn').empty();
  	$('#signOut').removeAttr("hidden");
    document.getElementById('fbName').innerHTML = user.displayName;
  } else {
    console.log('nope');
  }
});
