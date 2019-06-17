// empty ingredient array
var ingredients = [];
// empty drink array
var cocktails = [];

// renderdrinkbuttons function
function displayDrink(){
    // clear div before rendering new buttons
    $(".newDrink").empty();

    // loop through the new array and generate a button for each index
    for (var i = 0; i < cocktails.length; i++){
        // make new button tag
        var newDrinkBtn = $("<button>");
        // assign value of button index as newButton's text
        newDrinkBtn.text(cocktails[i]);
        // add class for all generated buttons
        newDrinkBtn.addClass("drinkBtn");
        // add custom attribute for newly generated buttons and set value of the button's index as the custom attribute's value
        newDrinkBtn.attr("data-drink", cocktails[i]);
        // append newly generated buttons to its div
        console.log(newDrinkBtn)
        $(".newDrink").append(newDrinkBtn);
        // console.log(newButton);

    }

}

// add on click event that adds drink buttons to the array
$("#add-drink").on("click", function(e){
    // prevent form from refreshing
    e.preventDefault();

    // create variable that takes user input value
    var userDrink = $("#drink-search").val().trim();

    // push userButton to array
    cocktails.push(userDrink);
    displayDrink();
    
})

// renderingrbuttons function
function displayIngr(){
    // clear div before rendering new buttons
    $(".newIngr").empty();

    // loop through the new array and generate a button for each index
    for (var j = 0; j < ingredients.length; j++){
        // make new button tag
        var newIngrBtn = $("<button>");
        // assign value of button index as newButton's text
        newIngrBtn.text(ingredients[j]);
        // add class for all generated buttons
        newIngrBtn.addClass("ingrBtn");
        // add custom attribute for newly generated buttons and set value of the button's index as the custom attribute's value
        newIngrBtn.attr("data-ingr", ingredients[j]);
        // append newly generated buttons to its div
        
        $(".newIngr").append(newIngrBtn);
        // console.log(newButton);

    }

}

// add on click event that adds ingredient buttons to the array
$("#add-ingr").on("click", function(event){
    // prevent form from refreshing
    event.preventDefault();

    // create variable that takes user input value
    var userIngr = $("#ing-search").val().trim();

    // push userButton to array
    ingredients.push(userIngr);
    displayIngr();
    
})



// on click event for user generated ingredient button
// this will populate the screen with ALL drinks user can make with chosen ingredient
$(document).on("click", ".ingrBtn", function(){
    // assign button name
    var ingrName = $(this).attr("data-ingr");
    
    var ingrQuery = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingrName;
  

    // ajax call
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
    })
})

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

