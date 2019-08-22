let colors = [{
  name: "Green",
  hex_code: "356b1c"
}, {
  name: "Red",
  hex_code: "d72212"
}, {
  name: "Orange",
  hex_code: "ff551f"
}, {
  name: "Purple",
  hex_code: "77075e"
}, {
  name: "Yellow",
  hex_code: "f7bf1a"
}];

let ingredients = [{
  ingredient: "strawberries",
  amount: "1/2 cup"
}, {
  ingredient: 'blueberries',
  amount: "1/4 cup"
}, {
  ingredient: "raw spinach",
  amount: "1 cup"
}, {
  ingredient: "water",
  amount: "1 cup"
}];

let recipes = [{
  name: "Passion Smoothie",
  description: "This Purple Passion Green Smoothie recipe is a spinach smoothie recipe that’s full of antioxidants thanks to the strawberries and blueberries. The flavors all blend perfectly into a really delicious, mellow, creamy weight loss smoothie that’s also got a fun purple color.",
  image_url: "images/purple-smoothie.png",
  time: "10min",
  servings: 1,
  complexity: 2,
  ingredients: JSON.stringify(ingredients),
  color_id: 1
}, {
  name: "Brown Butter Gemelli",
  description: "Bring a medium pot of salted water to a boil. Wash and dry all produce. Trim and discard woody bottoms from asparagus; cut stalks crosswise into 1-inch pieces. Zest and quarter lemon. Mince garlic. Trim and thinly slice scallions, separating whites from greens. Cut 3 TBSP butter into cubes (6 TBSP for 4 servings).",
  image_url: "images/gemily.jpg",
  time: "30min",
  servings: 2,
  complexity: 4,
  ingredients: JSON.stringify(ingredients),
  color_id: 2
}, {
  name: "Sweet Potato and Black Bean ",
  description: "Wash and dry all produce. Adjust rack to middle position and preheat oven to 400 degrees. Cut sweet potatoes into ½-inch cubes. Toss on a baking sheet with 1 TBSP olive oil and a pinch of salt and pepper. Roast in oven until tender and lightly browned, about 20 minutes.",
  image_url: "images/potato.jpg",
  time: "20min",
  servings: 2,
  complexity: 3,
  ingredients: JSON.stringify(ingredients),
  color_id: 3
}, {
  name: "Apricot Balsamic-Glazed Pork",
  description: "WaWash and dry all produce. Halve and peel shallot, then mince until you have 3 TBSP (use the rest as you like). Peel, then mince or grate ginger. Pat pork dry with a paper towel.\nMelt 1 TBSP butter in a small pot over medium-high heat. Add ginger and cook until softened, 1-2 minutes. Add 1 stock concentrate and ¾ cup water. Bring to a boil, then add rice. Cover, lower heat, and reduce to a gentle simmer. Cook until tender, about 15 minutes.\nHeat a large drizzle of oil in a medium pan over medium heat. Season pork all over with salt, pepper, and 2 tsp fry seasoning (we sent more). Add to pan and cook, turning occasionally, until blackened all over and desired doneness is reached, 15-20 minutes. Set aside to rest on a plate.",
  image_url: "images/pancake.jpg",
  time: "1h 50min",
  servings: 2,
  complexity: 5,
  ingredients: JSON.stringify(ingredients),
  color_id: 4
}, {
  name: '"Little Ears" Pasta',
  description: "Wash and dry all produce. Bring a large pot of salted water to a boil. Trim woody bottom ends from baby broccoli, then cut stalks and florets into 1-inch pieces. Remove sausage from casings.\nOnce water is boiling, add orecchiette to pot. Cook, stirring occasionally, until al dente, 9-12 minutes. Carefully scoop out and reserve ½ cup pasta cooking water, then drain.\nHeat a large drizzle of olive oil in a large pan over medium heat. Add baby broccoli and 4 tsp water. Cover and steam 3 minutes. Uncover and increase heat to medium high. Cook, tossing occasionally, until browned and tender, 3-6 minutes more. Season with salt and pepper. Remove from pan and set aside.\nHeat another large drizzle of olive oil in same pan over medium-high heat. Add sausage, breaking up meat into pieces. Cook, tossing, until crisp at edges and no longer pink, 4-5 minutes. Add a pinch of chili flakes (to taste) and cook another 30 seconds. TIP: Skip the chili flakes if anyone at your table isn’t a fan of spicy heat—you can always add them at the end.",
  image_url: "images/salad.jpg",
  time: "1h",
  servings: 2,
  complexity: 4,
  ingredients: JSON.stringify(ingredients),
  color_id: 5
}, {
  name: "One more pasta",
  description: "Wash and dry all produce. Bring a large pot of salted water to a boil. Trim woody bottom ends from baby broccoli, then cut stalks and florets into 1-inch pieces. Remove sausage from casings.\nOnce water is boiling, add orecchiette to pot. Cook, stirring occasionally, until al dente, 9-12 minutes. Carefully scoop out and reserve ½ cup pasta cooking water, then drain.\nHeat a large drizzle of olive oil in a large pan over medium heat. Add baby broccoli and 4 tsp water. Cover and steam 3 minutes. Uncover and increase heat to medium high. Cook, tossing occasionally, until browned and tender, 3-6 minutes more. Season with salt and pepper. Remove from pan and set aside.\nHeat another large drizzle of olive oil in same pan over medium-high heat. Add sausage, breaking up meat into pieces. Cook, tossing, until crisp at edges and no longer pink, 4-5 minutes. Add a pinch of chili flakes (to taste) and cook another 30 seconds. TIP: Skip the chili flakes if anyone at your table isn’t a fan of spicy heat—you can always add them at the end.",
  image_url: "images/pasta.jpg",
  time: "1h",
  servings: 2,
  complexity: 4,
  ingredients: JSON.stringify(ingredients),
  color_id: 5
}];



let fillColors = () => {
  for (color of colors) {
    axios.post('http://localhost:8080/colors', color);
  }
}

let fillRecipes = () => {
  for (recipe of recipes) {
    axios.post('http://localhost:8080/recipes', recipe);
  }
}

let checkData = () => {
  axios.get('http://localhost:8080/colors')
    .catch(error => {
      fillColors();
      setTimeout(fillRecipes, 3000);
      console.log(error);
    });
}
checkData();