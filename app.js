const RecipeApp = (() => {
  console.log("RecipeApp initializing...");

  // ======= Recipe Data =======
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      difficulty: "medium",
      time: 25,
      ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
      steps: [
        "Boil water and cook spaghetti",
        {
          text: "Prepare sauce",
          substeps: ["Beat eggs and mix with cheese", "Fry pancetta until crisp"]
        },
        "Combine spaghetti and sauce"
      ]
    },
    {
      id: 2,
      title: "Pancakes",
      difficulty: "easy",
      time: 15,
      ingredients: ["Flour", "Eggs", "Milk", "Butter", "Sugar"],
      steps: ["Mix all ingredients", "Heat pan", "Cook pancakes until golden"]
    },
    {
      id: 3,
      title: "Chicken Curry",
      difficulty: "hard",
      time: 50,
      ingredients: ["Chicken", "Onion", "Garlic", "Curry Powder", "Tomatoes"],
      steps: [
        "Marinate chicken",
        "Cook onions and garlic",
        {
          text: "Add spices",
          substeps: ["Add curry powder", "Stir fry for 2 minutes"]
        },
        "Add chicken and simmer"
      ]
    },
    {
      id: 4,
      title: "Salad",
      difficulty: "easy",
      time: 10,
      ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive oil", "Lemon"],
      steps: ["Chop vegetables", "Mix with dressing", "Serve fresh"]
    },
    // Add 4 more recipes as needed
  ];

  // ======= State =======
  let currentFilter = "all";
  let currentSort = "none";

  // ======= DOM References =======
  const recipeContainer = document.getElementById("recipe-container");
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const sortButtons = document.querySelectorAll(".sort-buttons button");

  // ======= Pure Filter Functions =======
  const filterByDifficulty = (arr, level) =>
    arr.filter(recipe => recipe.difficulty === level);

  const filterByTime = (arr, maxTime) =>
    arr.filter(recipe => recipe.time <= maxTime);

  const applyFilter = (arr, filterType) => {
    switch (filterType) {
      case "easy": return filterByDifficulty(arr, "easy");
      case "medium": return filterByDifficulty(arr, "medium");
      case "hard": return filterByDifficulty(arr, "hard");
      case "quick": return filterByTime(arr, 30);
      case "all":
      default: return arr;
    }
  };

  // ======= Pure Sort Functions =======
  const sortByName = arr => [...arr].sort((a, b) => a.title.localeCompare(b.title));
  const sortByTime = arr => [...arr].sort((a, b) => a.time - b.time);
  const applySort = (arr, sortType) => {
    switch (sortType) {
      case "name": return sortByName(arr);
      case "time": return sortByTime(arr);
      case "none":
      default: return arr;
    }
  };

  // ======= Recursive Steps Renderer =======
  const renderSteps = (steps, level = 0) => {
    let html = "<ul>";
    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li>${step}</li>`;
      } else if (step.text && step.substeps) {
        html += `<li>${step.text}${renderSteps(step.substeps, level + 1)}</li>`;
      }
    });
    html += "</ul>";
    return html;
  };

  // ======= Create Recipe Card =======
  const createRecipeCard = recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Difficulty: ${recipe.difficulty}</p>
      <p>Time: ${recipe.time} minutes</p>
      <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">Show Steps</button>
      <div class="steps-container" id="steps-${recipe.id}">${renderSteps(recipe.steps)}</div>
      <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">Show Ingredients</button>
      <div class="ingredients-container" id="ingredients-${recipe.id}">
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>
    `;
    return card;
  };

  // ======= Render Recipes =======
  const renderRecipes = arr => {
    recipeContainer.innerHTML = "";
    arr.forEach(recipe => recipeContainer.appendChild(createRecipeCard(recipe)));
  };

  // ======= Update Active Buttons =======
  const updateActiveButtons = () => {
    filterButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.filter === currentFilter));
    sortButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.sort === currentSort));
  };

  // ======= Main Update Function =======
  const updateDisplay = () => {
    let result = applyFilter(recipes, currentFilter);
    result = applySort(result, currentSort);
    renderRecipes(result);
    updateActiveButtons();
  };

  // ======= Event Handlers =======
  const handleToggleClick = e => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;

    const recipeId = btn.dataset.recipeId;
    const toggleType = btn.dataset.toggle;
    const container = document.getElementById(`${toggleType}-${recipeId}`);
    container.classList.toggle("visible");
    btn.textContent = container.classList.contains("visible")
      ? `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`
      : `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
  };

  const setupEventListeners = () => {
    filterButtons.forEach(btn => btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      updateDisplay();
    }));
    sortButtons.forEach(btn => btn.addEventListener("click", () => {
      currentSort = btn.dataset.sort;
      updateDisplay();
    }));
    recipeContainer.addEventListener("click", handleToggleClick);
  };

  // ======= Initialize =======
  const init = () => {
    updateDisplay();
    setupEventListeners();
    console.log("RecipeApp ready!");
  };

  return { init, updateDisplay };
})();

// Initialize App
RecipeApp.init();
