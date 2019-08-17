let addRecipeToDom = (recipe) => {
  let recipesUl = document.getElementById('recipes-list');
  let recipeLi = document.createElement('li');
  recipeLi.className = 'recipes-list__item';

  let recipeName = document.createElement('h4');
  recipeName.innerText = recipe.name;
  recipeName.className = 'recipe-title'

  let recipeComplexity = document.createElement('div');
  recipeComplexity.className = 'complexity';
  for (let i = 0; i < recipe.complexity; i++) {
    let img = document.createElement('img');
    img.src = "images/star.png";
    recipeComplexity.appendChild(img);
  }
  recipeLi.appendChild(recipeName);
  recipeLi.appendChild(recipeComplexity);
  recipesUl.appendChild(recipeLi);
}

let getRecipes = (color) => {
  let recipesUl = document.getElementById('recipes-list');
  recipesUl.innerHTML = '';
  axios.get('http://localhost:8080/recipes')
    .then(response => {
      for (recipe of response.data) {
        if (color.id == recipe.color_id) {
          addRecipeToDom(recipe);
        }
      }
    });
}

let showColors = (color) => {
  let colorsContainer = document.getElementById('colors');
  let colorDiv = document.createElement('div');
  let colorName = document.createElement('p');
  colorName.innerText = color.name;
  colorName.className = 'color-block__title';
  colorDiv.className = 'color-block';
  colorDiv.style.backgroundColor = `#${color.hex_code}`;
  colorDiv.onclick = () => {
    getRecipes(color);
  }
  colorDiv.appendChild(colorName);
  colorsContainer.appendChild(colorDiv);
}

axios.get('http://localhost:8080/colors')
  .then(response => {
    for (color of response.data) {
      showColors(color);
    }
  });


// class ColorDivFactory {
//   constructor(id, name, hexCode) {
//     this.id = id;
//     this.name = name;
//     this.hexCode = hexCode;
//   }
//
//   createColorDiv() {
//     let div = document.createElement("div");
//     retirn div;
//
//   }
// }


// let arr = [{
//   ingredient: "strawberries",
//   amount: "1/2 cup"
// }, {
//   ingredient: 'blueberries',
//   amount: "1/4 cup"
// }, {
//   ingredient: "raw spinach",
//   amount: "1 cup"
// }, {
//   ingredient: "water",
//   amount: "1 cup"
// }];
//
// axios.post('http://localhost:8080/recipes', {
//   name: "Purple Passion Smoothie",
//   description: "This Purple Passion Green Smoothie recipe is a spinach smoothie recipe that’s full of antioxidants thanks to the strawberries and blueberries. The flavors all blend perfectly into a really delicious, mellow, creamy weight loss smoothie that’s also got a fun purple color.",
//   image_url: "images/purple-smoothie.png",
//   time: "10",
//   servings: 1,
//   complexity: 2,
//   ingredients: JSON.stringify(arr),
//   color_id: 4
// });

// axios.post('http://localhost:8080/colors', {
//   name: "white",
//   hex_code: 1684949
// });
axios.get('http://localhost:8080/recipes')
  .then(response => {
    for (recipe of response.data) {
      console.log(recipe);
    }
  });






// axios.delete('http://localhost:8080/colors/7');