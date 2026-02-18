// =====================
// Recipe Data (Part 1)
// =====================

const recipes = [
    { id: 1, title: "Classic Spaghetti Carbonara", time: 25, difficulty: "easy", description: "Creamy Italian pasta with eggs and cheese.", category: "pasta" },
    { id: 2, title: "Chicken Tikka Masala", time: 45, difficulty: "medium", description: "Tender chicken in spiced tomato sauce.", category: "curry" },
    { id: 3, title: "Homemade Croissants", time: 180, difficulty: "hard", description: "Buttery, flaky French pastries.", category: "baking" },
    { id: 4, title: "Greek Salad", time: 15, difficulty: "easy", description: "Fresh vegetables with feta and olives.", category: "salad" },
    { id: 5, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Beef fillet wrapped in puff pastry.", category: "meat" },
    { id: 6, title: "Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Quick mixed vegetables in sauce.", category: "vegetarian" },
    { id: 7, title: "Pad Thai", time: 30, difficulty: "medium", description: "Thai rice noodles with shrimp.", category: "noodles" },
    { id: 8, title: "Margherita Pizza", time: 60, difficulty: "medium", description: "Classic pizza with mozzarella and basil.", category: "pizza" }
];

// =====================
// State (Part 2)
// =====================

let currentFilter = "all";
let currentSort = "none";

// =====================
// DOM Selection
// =====================

const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// =====================
// Rendering (Part 1)
// =====================

const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">
                ${recipe.difficulty}
            </span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender
        .map(createRecipeCard)
        .join("");
};

// =====================
// Pure Filter Functions
// =====================

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return recipes.filter(r => r.difficulty === filterType);
        case "quick":
            return recipes.filter(r => r.time < 30);
        default:
            return recipes;
    }
};

// =====================
// Pure Sort Functions
// =====================

const applySort = (recipes, sortType) => {
    const recipesCopy = [...recipes];

    switch (sortType) {
        case "name":
            return recipesCopy.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        case "time":
            return recipesCopy.sort((a, b) =>
                a.time - b.time
            );
        default:
            return recipesCopy;
    }
};

// =====================
// Main Update Function
// =====================

const updateDisplay = () => {
    let updatedRecipes = applyFilter(recipes, currentFilter);
    updatedRecipes = applySort(updatedRecipes, currentSort);
    renderRecipes(updatedRecipes);
    updateActiveButtons();
};

// =====================
// Active Button Handling
// =====================

const updateActiveButtons = () => {
    filterButtons.forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.filter === currentFilter
        );
    });

    sortButtons.forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.sort === currentSort
        );
    });
};

// =====================
// Event Listeners
// =====================

filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        currentFilter = e.target.dataset.filter;
        updateDisplay();
    });
});

sortButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        currentSort = e.target.dataset.sort;
        updateDisplay();
    });
});

// =====================
// Initialize App
// =====================

updateDisplay();
