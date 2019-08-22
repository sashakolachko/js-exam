let showForm = () => {
  let recipe = JSON.parse(localStorage.getItem('recipe'));
  document.getElementById('recipe-id').value = recipe.id;
  document.getElementById('name').value = recipe.name;
  document.getElementById('time').value = recipe.time;
  document.getElementById('img').value = recipe.image_url;
  document.getElementById(recipe.complexity).selected = true;
  document.getElementById('servings').value = recipe.servings;
  document.getElementById('description').value = recipe.description;
}
showForm();

let checkInputs = (name, time, img, servings, description) => {
  let warningMessage = "Can't be empty!";

  if (!name.value) {
    name.placeholder = warningMessage;
    return false;
  };
  if (!time.value) {
    time.placeholder = warningMessage;
    return false;
  }
  if (!servings.value) {
    servings.placeholder = warningMessage;
    return false;
  }
  if (!description.value) {
    description.placeholder = warningMessage;
    return false;
  }
  if (!img.value) {
    img.placeholder = warningMessage;
    return false;
  }
  return true;

}
document.getElementById('save').onclick = () => {
  let id = document.getElementById('recipe-id').value;
  let name = document.getElementById('name');
  let time = document.getElementById('time');
  let img = document.getElementById('img');
  let complexitySelect = document.getElementById('complexity');
  let complexity = complexitySelect.options[complexitySelect.selectedIndex].text;
  let servings = document.getElementById('servings');
  let description = document.getElementById('description');

  if (checkInputs(name, time, img, servings, description) == false) {
    return;
  };

  axios.patch(`http://localhost:8080/recipes/${id}`, {
      name: name.value,
      time: time.value,
      image_url: img.value,
      servings: parseInt(servings.value),
      complexity: parseInt(complexity),
      description: description.value
    })
    .then(showLink => {
      let form = document.getElementById('update-form');
      form.style.display = "none";
      let message = document.getElementById('success-info');
      message.style.display = "block";
    })
    .then(cleanLocalStorage => localStorage.removeItem("recipe"));
}