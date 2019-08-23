let fillColors = () => {
  let colorsSelect = document.getElementById('color');
  axios.get('http://localhost:8080/colors')
    .then(response => {
      for (color of response.data) {
        let colorOption = document.createElement('option');
        colorOption.innerText = color.name;
        colorOption.className = "color-option";
        colorOption.value = `${color.id}`;
        colorOption.style.backgroundColor = `#${color.hex_code}`;
        colorsSelect.appendChild(colorOption);
      }
    });
}

document.getElementById('amount-ingredients').onclick = () => {
  let amount = document.getElementById('amount');
  if (!amount.value) {
    amount.placeholder = "Can't be empty!";
    return;
  }
  document.getElementById('amount-container').style.display = "none";
  document.getElementById('update-form').style.display = "flex";
  let inputsContainer = document.getElementById('generated-inputs');
  inputsContainer.style.display = "block";
  for (let i = 1; i <= parseInt(amount.value); i++) {
    let divObj = document.createElement('div');
    divObj.className = 'generated-inputs__item';
    let inputKey = document.createElement('input');
    let inputValue = document.createElement('input');
    inputKey.id = `key-${i}`;
    inputKey.placeholder = 'Input ingredient name';
    inputKey.className = 'generated-inputs__input';
    inputValue.id = `value-${i}`;
    inputValue.placeholder = 'Input ingredient amount';
    inputValue.className = 'generated-inputs__input';
    divObj.appendChild(inputKey);
    divObj.appendChild(inputValue);
    inputsContainer.appendChild(divObj);
  }
  fillColors();
}

let checkData = (name, time, img, servings, description, amount) => {
  let warningMessage = "Can't be empty!";

  for (let i = 1; i <= amount; i++) {
    let inputKey = document.getElementById(`key-${i}`);
    let inputValue = document.getElementById(`value-${i}`);
    if (!inputKey.value) {
      inputKey.placeholder = warningMessage;
      return false;
    }
    if (!inputValue.value) {
      inputValue.placeholder = warningMessage;
      return false;
    }
  }
  if (!name.value) {
    name.placeholder = warningMessage;
    return false;
  }
  if (!time.value) {
    time.placeholder = warningMessage;
    return false;
  }
  if (!img.value) {
    img.placeholder = warningMessage;
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
  return true;
}

document.getElementById('add-recipe').onclick = () => {
  let name = document.getElementById('name');
  let time = document.getElementById('time');
  let img = document.getElementById('img');
  let servings = document.getElementById('servings');
  let description = document.getElementById('description');
  let amount = document.getElementById('amount').value;

  if (checkData(name, time, img, servings, description, amount) == false) {
    return;
  }

  let complexitySelect = document.getElementById('complexity');
  let complexity = complexitySelect.options[complexitySelect.selectedIndex].value;
  let colorSelect = document.getElementById('color');
  let colorId = colorSelect.options[colorSelect.selectedIndex].value;
  let ingredients = [];

  for (let i = 1; i <= amount; i++) {
    let inputKey = document.getElementById(`key-${i}`).value;
    let inputValue = document.getElementById(`value-${i}`).value;
    ingredients.push({
      ingredient: inputKey,
      amount: inputValue
    });
  }
  console.log(ingredients);

  axios.post('http://localhost:8080/recipes', {
      name: name.value,
      time: time.value,
      image_url: img.value,
      servings: parseInt(servings.value),
      description: description.value,
      complexity: parseInt(complexity),
      color_id: parseInt(colorId),
      ingredients: JSON.stringify(ingredients)
    })
    .then(refresh => {
      document.getElementById('success-info').style.display = "block";
      document.getElementById('generated-inputs').style.display = "none";
      document.getElementById('update-form').style.display = "none";

    });

}