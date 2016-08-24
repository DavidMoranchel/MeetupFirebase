//Materialize 
$(document).ready(function(){
	$(".button-collapse").sideNav();
});


var config = {
	apiKey: "AIzaSyBmazDVr3SY7HQIUV9yD8Vv4A6xCUgQjk8",
	authDomain: "meetupfirebase.firebaseapp.com",
	databaseURL: "https://meetupfirebase.firebaseio.com",
	storageBucket: "meetupfirebase.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();
var data = Math.floor(Math.random()*9000) + 1000;
var random, game;

function randomNumber(){  
  return data
}
function empty(){
  $('#empty').empty();
  $('#empty').removeClass('top');
}

function generateStartingCode(){
	name = $('#name').val();
	random = randomNumber();
	if (name == '') {
    	var $toastContent = $('<span>Pon un nombre de partida</span>');
    	Materialize.toast($toastContent, 300);
  	}else{
    	game = database.ref('game/'+random);
        game.set({
     		 name:name
    	});
   		empty();
    	$('#cardRandom').removeAttr("hidden");
   		// var modal = $('#random').html(random);
    }
}

function emptyOnName(){
  var $toastContent = $('<span>Espere un momento</span>');
  Materialize.toast($toastContent, 5000);
  $('#cardRandom').empty();
  playersList();
  $('#randomDiv').removeAttr("hidden");
  $('#random').html(random);
}

players = database.ref('game/' + data + '/players');
function playersList(){
  players.on('value', function(snapshot) {
    playersOnBoard = snapshot.val();
    noPlayer = 1;
    cardsPlayers = '';
    $.each(playersOnBoard, function (key, object) {
      cardsPlayers += '<div id="globo" class="balloon"><img id="sizeImagen" src="'+object['fbPhoto']+'"></div>';
      noPlayer++;
    })
    $('#cardsPlayers').html(cardsPlayers);

  });
  winnersList();
}


winners = database.ref('game/' + data + '/winners');
function winnersList(){
  winners.on('value', function(snapshot) {
    var winnersOnBoard = snapshot.val();
    var noWinner = 1;
    var cardsWinners = '';
    $.each(winnersOnBoard, function (key, object) {
      if (noWinner ==1) {
        cardsWinners += '<a id="player'+noWinner+'" class="btn blue">GANASTE! '+object['fbName']+'</a><br>';
      }else{
        cardsWinners += '<a id="player'+noWinner+'" class="btn blue">'+object['fbName']+'</a><br>';
      }
      noWinner++;
    })
    $('#cardsWinners').html(cardsWinners);
    });
}