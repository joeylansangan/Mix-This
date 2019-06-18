$(document).ready(function () {

    src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
    src = "https://www.gstatic.com/firebasejs/6.0.4/firebase-app.js"
    src = "https://www.gstatic.com/firebasejs/6.0.4/firebase-database.js"

    var firebaseConfig = {
        apiKey: "AIzaSyDwn8_nPN3mRDAREJLfpxGEWsArv_zENfE",
        authDomain: "mix-this.firebaseapp.com",
        databaseURL: "https://mix-this.firebaseio.com",
        projectId: "mix-this",
        storageBucket: "mix-this.appspot.com",
        messagingSenderId: "909192849898",
        appId: "1:909192849898:web:3d6e02cc04b967ca"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");
    // connectedRef.onDisconnect().remove();

    connectedRef.on("value", function (snap) {

        if (snap.val()) {
            var con = connectionsRef.push(true);
            con.onDisconnect().remove();
        }
    });

    // var connectionsRef = "";
    // var connectedRef = "";

    var drinkSearch;
    var ingredientSearch;
    var recDrinkSearch; 
    var recIngSearch; 
    // var dailyUsers = counter/day;
    var zip;
    var counter = 0;

    // $("#click-button").on("click", function () {
    //     clickCounter++;

    //     database.ref().set({
    //         users: clickCounter
    //     });
    // });

    $("#user-submit").on("click", function (userInput) {
        drinkSearch = $("#drink-input").val().trim();
        ingredientSearch = $("#ingredient-input").val().trim();
        zip = $("#zipcode-input").val().trim();
        recDrinkSearch = $(input.drink.pop(drinkSearch));
        recIngSearch = $(input.drink.pop(ingredientSearch));
        counter++;
    });


    var input = {
        drink: drinkSearch,
        ingredient: ingredientSearch,
        zipcode: zip,
        users: counter,

    }

    database.ref().push(input);

    

    // function (errorObject) {
    //     console.log("The read failed: " + errorObject.code)
})