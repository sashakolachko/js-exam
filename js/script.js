axios.get('http://localhost:8080/colors')
  .then(response => {
    let colorsContainer = document.getElementById('colors');
    for (color of response.data) {
      let colorNode = new ColorDivFactory(color.id, color.name, color.hex_code);
      colorsContainer.appendChild(colorNode.createColorDiv());
    }
  });


class ColorDivFactory {
  constructor(id, name, hex_code) {
    this.id = id;
    this.name = name;
    this.hex_code = hex_code;
  }

  createColorDiv() {
    let colorDiv = document.createElement('div');
    let link = document.createElement('a');
    link.href = "#colors";
    colorDiv.className = 'color-block';
    colorDiv.style.backgroundColor = `#${color.hex_code}`;
    colorDiv.onclick = () => {
      this.getRecipes();
    };
    colorDiv.appendChild(this.createName());
    link.appendChild(colorDiv);
    return link;
  }

  createName() {
    let colorName = document.createElement('p');
    colorName.innerText = this.name;
    colorName.className = 'color-block__title';
    return colorName;
  }

  getRecipes() {
    let recipesUl = document.getElementById('recipes-list');
    recipesUl.innerHTML = '';
    axios.get('http://localhost:8080/recipes')
      .then(response => {
        let count = 0;
        for (let recipe of response.data) {
          if (this.id == recipe.color_id) {
            let recipesUl = document.getElementById('recipes-list');
            let recipeNode = new RecipesDivFactory(recipe.id, recipe.name, recipe.description, recipe.image_url, recipe.time, recipe.servings, recipe.complexity, JSON.parse(recipe.ingredients), recipe.color_id);
            recipesUl.appendChild(recipeNode.createTitleDiv());
            count++;
          }
        }
        if (count == 0) {
          this.noDataDiv();
        }
      })
      .catch(error => {
        this.noDataDiv();
      });
  }

  noDataDiv() {
    let recipesUl = document.getElementById('recipes-list');
    let div = document.createElement('div');
    div.className = 'no-data';
    let p = document.createElement('p');
    p.innerText = "No recipes in this category.";
    p.className = "no-data__text";
    let link = document.createElement('a');
    link.innerText = "You can add recipe here."
    link.href = "pages/add-new-recipe.html";
    link.className = "no-data__link";
    div.appendChild(p);
    div.appendChild(link);
    recipesUl.appendChild(div);
  }
}

class RecipesDivFactory {
  constructor(id, name, description, image_url, time, servings, complexity, ingredients, colorId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image_url = image_url;
    this.time = time;
    this.servings = servings;
    this.complexity = complexity;
    this.ingredients = ingredients;
    this.color_id = colorId;
  }

  createTitleDiv() {
    let recipeLi = document.createElement('li');
    recipeLi.className = 'recipes-list__item';
    recipeLi.appendChild(this.createName());
    recipeLi.appendChild(this.createRecipeInfo());
    return recipeLi;
  }

  fillDescriptionDiv() {
    let recipesUl = document.getElementById('recipes-list');
    recipesUl.innerHTML = '';
    let descDiv = document.createElement('div');
    descDiv.className = 'recipe-container';

    let infoDiv = document.createElement('div');
    infoDiv.className = 'recipe-container__info';
    infoDiv.appendChild(this.createRecipeInfo());
    infoDiv.appendChild(this.createSettingsDiv());

    let imageAndList = document.createElement('div');
    imageAndList.className = 'recipe-head';
    imageAndList.appendChild(this.createImgage());
    imageAndList.appendChild(this.createIngredientsUl());

    descDiv.appendChild(infoDiv);
    descDiv.appendChild(imageAndList);
    descDiv.appendChild(this.createDescription());
    recipesUl.appendChild(descDiv);
  }

  createIngredientsUl() {
    let indredientsUl = document.createElement('ul');
    indredientsUl.className = 'recipe-head__ingredients';
    for (let ingredient of this.ingredients) {
      let li = document.createElement('li');
      let p = document.createElement('p');
      p.innerText = `${ingredient["ingredient"]} - ${ingredient["amount"]}`;
      li.appendChild(p);
      indredientsUl.appendChild(li);
    }
    return indredientsUl;
  }
  createDescription() {
    let recipeDescription = document.createElement('div');
    recipeDescription.className = 'recipe-body';
    let p = document.createElement('p');
    p.className = 'recipe-body__text';
    p.innerText = this.description;
    recipeDescription.appendChild(p);
    return recipeDescription;
  }

  createImgage() {
    let imageDiv = document.createElement('div');
    imageDiv.className = 'recipe-head__image-container';
    let img = document.createElement('img');
    img.className = 'recipe-head__image';
    img.src = this.image_url;
    imageDiv.appendChild(img);
    return imageDiv;
  }
  createName() {
    let recipeNameLink = document.createElement('a');
    recipeNameLink.className = 'recipe-title-link';
    let recipeName = document.createElement('h4');
    recipeName.innerText = this.name;
    recipeName.className = 'recipe-title';
    recipeName.onclick = () => {
      this.fillDescriptionDiv();
    }
    recipeNameLink.appendChild(recipeName);

    return recipeNameLink;
  }

  createSettingsDiv() {

    let settingsDiv = document.createElement('div');
    settingsDiv.className = 'settings-container';
    let updateLink = document.createElement('a');
    updateLink.href = 'pages/update-recipe.html';
    updateLink.onclick = () => {
      localStorage.setItem('recipe', JSON.stringify(this));
    }
    let imgUpdate = document.createElement('img');
    imgUpdate.src = "images/update.png";
    updateLink.appendChild(imgUpdate);
    let imgDelete = document.createElement('img');
    imgDelete.src = "images/delete.png";
    imgDelete.onclick = () => {
      this.deleteRecipe();
    }
    settingsDiv.appendChild(updateLink);
    settingsDiv.appendChild(imgDelete);
    return settingsDiv;
  }

  createRecipeInfo() {
    let recipeInfo = document.createElement('div');
    recipeInfo.className = 'recipe-info';
    recipeInfo.appendChild(this.createComplexity());
    recipeInfo.appendChild(this.createTime());
    recipeInfo.appendChild(this.createServings());
    return recipeInfo;
  }

  createComplexity() {
    let recipeComplexity = document.createElement('div');
    recipeComplexity.className = 'complexity';
    for (let i = 0; i < this.complexity; i++) {
      let img = document.createElement('img');
      img.src = "images/star.png";
      recipeComplexity.appendChild(img);
    }
    return recipeComplexity;
  }

  createTime() {
    let recipeTime = document.createElement('div');
    recipeTime.className = 'recipe-time';
    let imgTime = document.createElement('img');
    imgTime.src = "images/time.png";
    let textTime = document.createElement('p');
    textTime.className = 'recipe-time__text';
    textTime.innerText = this.time;
    recipeTime.appendChild(imgTime);
    recipeTime.appendChild(textTime);
    return recipeTime;
  }

  createServings() {
    let recipeServings = document.createElement('div');
    recipeServings.className = "recipe-servings";
    let imgServ = document.createElement('img');
    imgServ.src = "images/dinner.png";
    let textServ = document.createElement('p');
    textServ.className = 'recipe-servings__text';
    textServ.innerText = this.servings;
    recipeServings.appendChild(imgServ);
    recipeServings.appendChild(textServ);
    return recipeServings;
  }

  deleteRecipe() {
    let deleteConfirm = confirm("You want to delete this Recipe. Are you sure?");
    if (deleteConfirm) {
      axios.delete(`http://localhost:8080/recipes/${this.id}`)
        .then(refresh => {
          axios.get(`http://localhost:8080/colors/${this.color_id}`)
            .then(response => {
              let colorNode = new ColorDivFactory(response.data.id, response.data.name, response.data.hex_code);
              colorNode.getRecipes();
            })
        });
    }
  }
}