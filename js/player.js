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
  	$('#removeHiddenCode').removeAttr("hidden");
  	$('.removeHiddenSingOut').removeAttr("hidden");
    $('#fbName').html(user.displayName);
  } else {
    console.log('nope');
  }
});


function queryStartingCode(){
	userData = $('#userCode').val();
	ref = database.ref("game");
	ref.orderByKey().equalTo(userData.toString()).on("child_added", function(snapshot) {
		data = snapshot.key;
		if (data == userData) {
			$('#removeHiddenSend').removeAttr("hidden");
		}
	});
}
function sendPlayer(){
	$toastContent = $('<span>Espera un momento</span>');
	Materialize.toast($toastContent, 5000);
	auth.onAuthStateChanged(function(user) {
  		if (user) {
			players = database.ref('game/'+data+'/players');
			players.push
			({
				uid : user.uid,
				fbName: user.displayName,
				fbPhoto: user.photoURL,
				state: 1,
			});
			$('#empty').empty();
			$('#removeHiddenPlayer').removeAttr("hidden");
			$('#containerGlobo').removeAttr('hidden');
		
		} else {
    		console.log('nope');
 		}
	});	
}

var width = 85;
var height = 105;
var audio = {};
var loadAudio = false;
audio['soplo'] = new Audio();
audio['soplo'].src = '../sounds/soplo.mp3';
audio['soplo'].load();
function inflar(){
	width += 1
	height += 1
	$('#globo').css('width',width.toString()+'px');
	$('#globo').css('height',height.toString()+'px');
	loadAudio = true;
	if (loadAudio == true) {
		audio['soplo'].play();
	}
	if (width >= 200) {
		$('#botonInflar').empty();
		$('#globo').html('<img id="sizeImagen" src="img/copa.png">');
		$('#globo').removeAttr('onclick')
		auth.onAuthStateChanged(function(user) {
	  		if (user) {
				players = database.ref('game/'+data+'/winners/');
				players.push
				({
					uid : user.uid,
					fbPhoto: user.photoURL,
					fbName: user.displayName
				});
			}
		});	
	}
}
