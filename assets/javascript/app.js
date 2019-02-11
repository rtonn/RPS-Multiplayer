console.log("hello"); 

  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlO3LPywXaXAAAs7Q6Nx8zuRCJEt0dCwo",
    authDomain: "inclass1-332fa.firebaseapp.com",
    databaseURL: "https://inclass1-332fa.firebaseio.com",
    projectId: "inclass1-332fa",
    storageBucket: "inclass1-332fa.appspot.com",
    messagingSenderId: "172625548890"
  };
  firebase.initializeApp(config);

  //Create var to reference databse
  var database = firebase.database(); 
