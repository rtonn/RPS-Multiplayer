console.log("hello"); 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQ1e20iAyDftbjiVhaz9ddSCItC6paJ3Q",
    authDomain: "rpg-game-9fc89.firebaseapp.com",
    databaseURL: "https://rpg-game-9fc89.firebaseio.com",
    projectId: "rpg-game-9fc89",
    storageBucket: "",
    messagingSenderId: "806498249201"
  };

  firebase.initializeApp(config);

  var player1; 
  var p1Name;
  var p1Choice;
  var p1Wins;
	var p1Losses;	

  var player2;   
  var p2Name;
  var p2Choice;
  var p2Wins;
  var p2Losses;	
  
  var playerTurn; 

  //create var to reference database
  var database = firebase.database(); 

  // Attach an event handler to the "Submit" button to add a new user to the database
$("#add-name").on("click", function(event) {
  event.preventDefault();
  
    // Add player1
    if ( ($("#name-input").val().trim() !== "") && !(player1 && player2) ) {
        
      if (player1 === null) {
            console.log("Adding Player 1");            
          yourPlayerName = $("#name-input").val().trim();
          player1 = {
            name: yourPlayerName,
            win: 0,
            loss: 0,
            tie: 0,
            choice: ""
          }; 
        
        database.ref().child("/players/player1").set(player1); 
        database.ref().child("/playerTurn").set(1);
        database.ref("/players/player1").onDisconnect().remove();

       //add player2   
		  } else if( (player1 !== null) && (player2 === null) ) {			
			      console.log("Adding Player 2");

        yourPlayerName = $("#name-input").val().trim();
        player2 = {
          name: yourPlayerName,
          win: 0,
          loss: 0,
          tie: 0,
          choice: ""
        };

			
			database.ref().child("/players/player2").set(player2);			
      database.ref("/players/player2").onDisconnect().remove();
      }
    }
}); 

// Check for existence of player 1 in the database
// Check for existence of player 2 in the database
// If both players are now present, it's player1's turn
// Update the display if both players are in the game
// Attach a listener to the database /outcome/ node to be notified of the game outcome
// Record player1 choice into the database
// Record player2 choice into the database

// Create function with logic to see which player wins
function Compare() {
	  if (player1.choice === "Rock") {
		if (player2.choice === "Rock") {		
			    //console.log("tie");
			database.ref().child("/outcome/").set("Tie game!");
			database.ref().child("/players/player1/tie").set(player1.tie + 1);
      database.ref().child("/players/player2/tie").set(player2.tie + 1);
      
		} else if (player2.choice === "Paper") {			
			  //console.log("paper wins");
			database.ref().child("/outcome/").set("Paper wins!");
			database.ref().child("/players/player1/loss").set(player1.loss + 1);
      database.ref().child("/players/player2/win").set(player2.win + 1);
      
		} else { 			
			  //console.log("rock wins");
			database.ref().child("/outcome/").set("Rock wins!");
			database.ref().child("/players/player1/win").set(player1.win + 1);
			database.ref().child("/players/player2/loss").set(player2.loss + 1);
		}

	} else if (player1.choice === "Paper") {
		if (player2.choice === "Rock") {		
			  //console.log("paper wins");
			database.ref().child("/outcome/").set("Paper wins!");
			database.ref().child("/players/player1/win").set(player1.win + 1);
      database.ref().child("/players/player2/loss").set(player2.loss + 1);
      
		} else if (player2.choice === "Paper") {			
			  //console.log("tie");
			database.ref().child("/outcome/").set("Tie game!");
			database.ref().child("/players/player1/tie").set(player1.tie + 1);
			database.ref().child("/players/player2/tie").set(player2.tie + 1);
    
    } else { 		
			  //console.log("scissors win");
			database.ref().child("/outcome/").set("Scissors win!");
			database.ref().child("/players/player1/loss").set(player1.loss + 1);
			database.ref().child("/players/player2/win").set(player2.win + 1);
		}

	} else if (player1.choice === "Scissors") {
      if (player2.choice === "Rock") {       
        //console.log("rock wins");
			database.ref().child("/outcome/").set("Rock wins!");
			database.ref().child("/players/player1/loss").set(player1.loss + 1);
      database.ref().child("/players/player2/win").set(player2.win + 1);
      
		} else if (player2.choice === "Paper") {			
			  //console.log("scissors win");
			database.ref().child("/outcome/").set("Scissors win!");
			database.ref().child("/players/player1/win").set(player1.win + 1);
      database.ref().child("/players/player2/loss").set(player2.loss + 1);
      
		} else {		
			  //console.log("tie");
			database.ref().child("/outcome/").set("Tie game!");
			database.ref().child("/players/player1/tie").set(player1.tie + 1);
			database.ref().child("/players/player2/tie").set(player2.tie + 1);
		}
	}

	turn = 1;
	database.ref().child("/turn").set(1);
}; 