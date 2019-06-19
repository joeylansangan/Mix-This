////
//firebase
//
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


// ////
//ajax section
/////
///////

// empty ingredient array
var ingredients = [];
// empty drink array
var cocktails = [];
// empty beer array
var beers = [];


// add on click event that adds drink buttons to the array
$("#add-drink").on("click", function(e){
    // empty buttons so you dont get duplicate ones
    $(".genCocktail").empty();
    // prevent form from refreshing
    e.preventDefault();
    // create variable that takes user input value
    var userDrink = $("#drink-search").val().trim();
    // push userButton to array
    cocktails.push(userDrink);
    var recentDrink = {
        drinkRecent: userDrink,
    };
    var arrayDrink = {
        drinkSearch: userDrink,
    }
    database.ref("/recentDrink").set(recentDrink);
    database.ref("/cocktailsSearch").push(arrayDrink);
    $("#drink-search").val("");
    
    // this will populate the screen with ALL COCKTAILS that has user-input keyword
    // ex: user input = margarita, page will populate with cocktails with the name margarita on it
    var drinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userDrink;
  
    // ajax call
    $.ajax({
        url: drinkQuery,
        method: "GET"
    }).then(function(res){
       console.log(res);
    // console.log(res.drinks[0].strDrink)

            for(var i = 0; i < res.drinks.length; i++){
            var genCocktail = $("<button>");
            genCocktail.text(res.drinks[i].strDrink)
            genCocktail.addClass("user-drinkbtn");
            genCocktail.attr("data-drinkbtn", res.drinks[i].strDrink)
            $(".genCocktail").append(genCocktail);
        }
    
    });


})

// add on click event that adds ingredient buttons to the array
$("#add-ingr").on("click", function(event){
    // empty buttons so you dont get duplicate ones
    $(".genDrink").empty();
    // prevent form from refreshing
    event.preventDefault();
    // create variable that takes user input value
    var userIngr = $("#ing-search").val().trim();
    // push userButton to array
    ingredients.push(userIngr);
 
    // create object that will hold ingredient data for firebase
    var newIngr = {
        ingredientSearch: userIngr,
    };
    database.ref("/recentIngr").set(newIngr);
    console.log("fb object: " + newIngr);
    $("#ing-search").val("");
    
    // ajax call when press search  
    var ingrQuery = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngr;
  
    // ajax call
    // this will populate the screen with ALL DRINKS user can make with chosen ingredient
    $.ajax({
        url: ingrQuery,
        method: "GET"
    }).then(function(res){
       console.log(res);
    // console.log(res.drinks[0].strDrink)

            for(var k = 0; k < res.drinks.length; k++){
            var genDrink = $("<button>");
            genDrink.text(res.drinks[k].strDrink)
            genDrink.addClass("user-drinkbtn");
            genDrink.attr("data-drinkbtn", res.drinks[k].strDrink)
            $(".genDrink").append(genDrink);
        }
    });
});


// on click event for user generated drink button
// this will populate the screen with drink name, image, instructions, and ingredients 
$(document).on("click", ".user-drinkbtn", function(){
    console.log(this);
    var drinkName = $(this).attr("data-drinkbtn")
    console.log("onclick: " + drinkName)
    var drinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
    // var drinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"

    $.ajax({
        url: drinkQuery,
        method: "GET"
    }).then(function(drinkRes){
        console.log(drinkRes.drinks[0]);

   
        // new div
        var drinkDiv = $("<div>");
        var ingredients = [];

        // drink instructions location
        var drinkInstruct = (drinkRes.drinks[0].strInstructions);
       
        // drink image location
        var drinkImg = (drinkRes.drinks[0].strDrinkThumb);
 
        // image tag for clicked drink
        var thisDrink = $("<img>");
        thisDrink.attr("style", "width: 200px")
        thisDrink.attr("src", drinkImg);
        thisDrink.addClass("drink")
         
        drinkDiv.append(thisDrink, drinkName, drinkInstruct);

        if (drinkRes.drinks[0].strIngredient1 !== "" && drinkRes.drinks[0].strIngredient1 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient1)
            if(drinkRes.drinks[0].strMeasure1 !== "" && drinkRes.drinks[0].strMeasure1 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure1);
            }   
        }
        if (drinkRes.drinks[0].strIngredient2 !== "" && drinkRes.drinks[0].strIngredient2 !==null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient2)
            if(drinkRes.drinks[0].strMeasure2 !== "" && drinkRes.drinks[0].strMeasure2 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure2);
            }  
        }
        if (drinkRes.drinks[0].strIngredient3 !== "" && drinkRes.drinks[0].strIngredient3 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient3)
            if(drinkRes.drinks[0].strMeasure3 !== "" && drinkRes.drinks[0].strMeasure3 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure3);
            }  
        }
        if (drinkRes.drinks[0].strIngredient4 !== "" && drinkRes.drinks[0].strIngredient4 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient4)
            if(drinkRes.drinks[0].strMeasure4 !== "" && drinkRes.drinks[0].strMeasure4 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure4);
            }
        }
        if (drinkRes.drinks[0].strIngredient5 !== "" && drinkRes.drinks[0].strIngredient5 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient5)
            if(drinkRes.drinks[0].strMeasure5 !== "" && drinkRes.drinks[0].strMeasure5 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure5);
            } ;
        }
        if (drinkRes.drinks[0].strIngredient6 !== "" && drinkRes.drinks[0].strIngredient6 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient6)
            if(drinkRes.drinks[0].strMeasure6 !== "" && drinkRes.drinks[0].strMeasure6 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure6);
            }   
        }
        if (drinkRes.drinks[0].strIngredient7 !== "" && drinkRes.drinks[0].strIngredient7 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient7)
            if(drinkRes.drinks[0].strMeasure7 !== "" && drinkRes.drinks[0].strMeasure7 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure7);
            }   
        }
        if (drinkRes.drinks[0].strIngredient8 !== "" && drinkRes.drinks[0].strIngredient8 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient8)
            if(drinkRes.drinks[0].strMeasure8 !== "" && drinkRes.drinks[0].strMeasure8 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure8);
            }   
        }
        if (drinkRes.drinks[0].strIngredient9 !== "" && drinkRes.drinks[0].strIngredient9 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient9)
            if(drinkRes.drinks[0].strMeasure9 !== "" && drinkRes.drinks[0].strMeasure9 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure9);
            }   
        }
        if (drinkRes.drinks[0].strIngredient10 !== "" && drinkRes.drinks[0].strIngredient10 !== null) {
            drinkDiv.append(drinkRes.drinks[0].strIngredient10)
            if(drinkRes.drinks[0].strMeasure10 !== "" && drinkRes.drinks[0].strMeasure10 !== " "){
                drinkDiv.append(drinkRes.drinks[0].strMeasure10);
            }   
        }
        
        $("#result-div").empty();
        $("#result-div").prepend(drinkDiv);
    })
})

/////
///firebase listeners
////

database.ref("/recentDrink").on("child_added", function(drinkSnap){
    console.log("firebase drink: " + drinkSnap.val());
})

database.ref("/recentIngr").on("child_added", function(ingrSnap){
    console.log("firebase ingr: " + ingrSnap.val());
})