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
$(document).on("click", ".ingrBtn", function(){
    // assign button name
    var ingrName = $(this).attr("data-ingr");
    
    var ingrQuery = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingrName;
  

    // ajax call
    $.ajax({
        url: ingrQuery,
        method: "GET"
    }).then(function(res){
    //    console.log(res);
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

$(document).on("click", ".user-drinkbtn", function(){
    console.log(this);
    var drinkName = $(this).attr("data-drinkbtn")
    
    var drinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
    // var drinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"
    
    $.ajax({
        url: drinkQuery,
        method: "GET"
    }).then(function(drinkRes){
        console.log(drinkRes.drinks[0]);
        
        if (drinkRes.drinks[0].strIngredient1 !== "" && drinkRes.drinks[0].strIngredient1 !== null) {
            console.log(drinkRes.drinks[0].strIngredient1)
            if(drinkRes.drinks[0].strMeasure1 !== "" && drinkRes.drinks[0].strMeasure1 !== " "){
                console.log(drinkRes.drinks[0].strMeasure1);
            }   
        }
        if (drinkRes.drinks[0].strIngredient2 !== "" && drinkRes.drinks[0].strIngredient2 !==null) {
            console.log(drinkRes.drinks[0].strIngredient2)
            if(drinkRes.drinks[0].strMeasure2 !== "" && drinkRes.drinks[0].strMeasure2 !== " "){
                console.log(drinkRes.drinks[0].strMeasure2);
            }  
        }
        if (drinkRes.drinks[0].strIngredient3 !== "" && drinkRes.drinks[0].strIngredient3 !== null) {
            console.log(drinkRes.drinks[0].strIngredient3)
            if(drinkRes.drinks[0].strMeasure3 !== "" && drinkRes.drinks[0].strMeasure3 !== " "){
                console.log(drinkRes.drinks[0].strMeasure3);
            }  
        }
        if (drinkRes.drinks[0].strIngredient4 !== "" && drinkRes.drinks[0].strIngredient4 !== null) {
            console.log(drinkRes.drinks[0].strIngredient4)
            if(drinkRes.drinks[0].strMeasure4 !== "" && drinkRes.drinks[0].strMeasure4 !== " "){
                console.log(drinkRes.drinks[0].strMeasure4);
            }
        }
        if (drinkRes.drinks[0].strIngredient5 !== "" && drinkRes.drinks[0].strIngredient5 !== null) {
            console.log(drinkRes.drinks[0].strIngredient5)
            if(drinkRes.drinks[0].strMeasure5 !== "" && drinkRes.drinks[0].strMeasure5 !== " "){
                console.log(drinkRes.drinks[0].strMeasure5);
            } ;
        }
        if (drinkRes.drinks[0].strIngredient6 !== "" && drinkRes.drinks[0].strIngredient6 !== null) {
            console.log(drinkRes.drinks[0].strIngredient6)
            if(drinkRes.drinks[0].strMeasure6 !== "" && drinkRes.drinks[0].strMeasure6 !== " "){
                console.log(drinkRes.drinks[0].strMeasure6);
            }   
        }
        if (drinkRes.drinks[0].strIngredient7 !== "" && drinkRes.drinks[0].strIngredient7 !== null) {
            console.log(drinkRes.drinks[0].strIngredient7)
            if(drinkRes.drinks[0].strMeasure7 !== "" && drinkRes.drinks[0].strMeasure7 !== " "){
                console.log(drinkRes.drinks[0].strMeasure7);
            }   
        }
        if (drinkRes.drinks[0].strIngredient8 !== "" && drinkRes.drinks[0].strIngredient8 !== null) {
            console.log(drinkRes.drinks[0].strIngredient8)
            if(drinkRes.drinks[0].strMeasure8 !== "" && drinkRes.drinks[0].strMeasure8 !== " "){
                console.log(drinkRes.drinks[0].strMeasure8);
            }   
        }
        if (drinkRes.drinks[0].strIngredient9 !== "" && drinkRes.drinks[0].strIngredient9 !== null) {
            console.log(drinkRes.drinks[0].strIngredient9)
            if(drinkRes.drinks[0].strMeasure9 !== "" && drinkRes.drinks[0].strMeasure9 !== " "){
                console.log(drinkRes.drinks[0].strMeasure9);
            }   
        }
        if (drinkRes.drinks[0].strIngredient10 !== "" && drinkRes.drinks[0].strIngredient10 !== null) {
            console.log(drinkRes.drinks[0].strIngredient10)
            if(drinkRes.drinks[0].strMeasure10 !== "" && drinkRes.drinks[0].strMeasure10 !== " "){
                console.log(drinkRes.drinks[0].strMeasure10);
            }   
        }
    })
})

