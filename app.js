function randomRecipe() {
    const randomRecipeImage = document.querySelector('#api-image');
    const randomRecipeName = document.querySelector("#api-name");

    // Function to show the popup with ingredients
    function showIngredientsPopup(meal) {
        // Call the function to display ingredients
        displayMealDetails(meal);
        // Show the popup
        popup.style.display = 'block';
    }

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((data) => data.json())
        .then((res) => {
            console.log(res);
            randomRecipeImage.innerHTML = `<img src="${res.meals[0].strMealThumb}" alt="mealImage" id="randomRecipeImage">`;
            randomRecipeName.textContent = res.meals[0].strMeal;

            // Remove existing click event listeners
            randomRecipeImage.removeEventListener('click', null);

            // Attach a click event listener to the random image
            randomRecipeImage.addEventListener('click', function () {
                // Call the function to show the popup with ingredients
                showIngredientsPopup(res.meals[0]);
            });
        })
        .catch((error) => {
            console.log("Fetch error", error);
        });
}


randomRecipe();

function latestRecipe() {
    const latestRecipeImage = document.querySelector('#latestRecipeImage');
    const latestRecipeName = document.querySelector("#latestRecipeName");

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((data) => data.json())
        .then((res) => {
            console.log(res);
            latestRecipeImage.innerHTML = `<img src="${res.meals[0].strMealThumb}" alt="latestRecipeImage" id="latestRecipeImage">`;
            latestRecipeName.textContent = res.meals[0].strMeal;
            displayMealDetails(res.meals[0].strMeal)
        })
        .catch((error) => {
            console.log("Fetch error", error);
        });
}
latestRecipe();

function searchRecipes() {
    const searchInput = document.querySelector('#searchInput').value;
    const searchResultsContainer = document.querySelector('#searchResultsContainer');

    searchResultsContainer.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then((data) => data.json())
        .then((res) => {
            console.log(res);

            if (res.meals) {
                for (let i = 0; i < res.meals.length; i++) {
                    const recipe = res.meals[i];

                    const recipeDiv = document.createElement('div');
                    recipeDiv.classList.add('searchResultItem');

                    const imgElement = document.createElement('img');
                    imgElement.src = recipe.strMealThumb;
                    imgElement.alt = `searchResultImage${i}`;

                    const nameElement = document.createElement('p');
                    nameElement.textContent = recipe.strMeal;

                    recipeDiv.appendChild(imgElement);
                    recipeDiv.appendChild(nameElement);

                    searchResultsContainer.appendChild(recipeDiv);
                }
            } else {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'No results found.';
                searchResultsContainer.appendChild(noResultsMessage);
            }
        })
        .catch((error) => {
            console.log("Fetch error", error);
        });
}

document.getElementById('hometag').addEventListener('click', function (event) {
    if (event.target.classList.contains('home')) {
        reloadPage();
    }
});
function reloadPage() {
    location.reload();
}

function displayMealDetails(meal) {
    const ingredients = document.getElementById("ingred");
    // Display ingredients
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        items.push(`• ${ingredient} - ${measure}`);
      }
    }
    const ingredientsText = items.join("<br>");
    ingredients.innerHTML = `<br>${ingredientsText}`;

}

document.getElementById("api-image").addEventListener( "click", ()=>{
    document.getElementById("popup").style.visibility = "visible";
})



document.getElementById("exit").addEventListener('click', () => {
    document.getElementById("popup").style.visibility = "hidden";
    
})