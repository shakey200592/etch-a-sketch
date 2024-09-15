const Grid = {
  // Select DOM elements that will be used for interactions
  gridContainer: document.querySelector(".grid-container"),
  GenerateGridBtn: document.querySelector(".generate-grid-btn"),
  colorPicker: document.querySelector(".color-picker"),
  rainbowBtn: document.querySelector(".rainbow-mode-btn"),
  eraserBtn: document.querySelector(".eraser-mode-btn"),

  // Default grid size and range constraints
  defaultGridSize: 16,
  minimumGridSize: 1,
  maximumGridSize: 100,

  // Helper function to generate a random RGB color
  randomRgbNumber() {
    // Generate a random number between 0 and 255, convert to hex, and ensure it is two characters long
    return (Math.floor(Math.random() * 256) + 1).toString(16).padStart(2, "0");
  },

  // Combine three random RGB values into a single hex color
  getRandomRGB() {
    return `#${this.randomRgbNumber()}${this.randomRgbNumber()}${this.randomRgbNumber()}`;
  },

  // Function to handle drawing on the grid
  gridDraw() {
    let rainbowMode = false; // Track if rainbow mode is enabled
    let color = "#000000"; // Default color

    // Toggle rainbow mode on button click
    this.rainbowBtn.addEventListener("click", () => {
      rainbowMode = true; // Set rainbowMode to true
    });

    // Update the color based on color picker input and disable rainbow mode
    this.colorPicker.addEventListener("change", (event) => {
      color = event.target.value; // Get the selected color
      rainbowMode = false; // Disable rainbow mode
    });

    // Change color to white for eraser mode
    this.eraserBtn.addEventListener("click", () => {
      color = "#ffffff"; // Set color to white
    });

    // Update grid item color and opacity on mouseover
    this.gridContainer.addEventListener("mouseover", (event) => {
      // Check if the hovered element is a grid item
      if (event.target.classList.contains("grid-item")) {
        let opacity = parseFloat(event.target.style.opacity) || 0.1; // Get the current opacity or default to 0.1
        opacity += 0.1; // Increase opacity
        event.target.style.backgroundColor = rainbowMode
          ? this.getRandomRGB() // Set color to random RGB if in rainbow mode
          : `${color}`; // Otherwise, use the selected color
        event.target.style.opacity = opacity.toString(); // Update opacity
      }
    });
  },

  // Create a new grid with specified size
  createGrid(gridSize = this.defaultGridSize) {
    this.gridContainer.innerHTML = ""; // Clear any existing grid items

    // Dynamically create grid items
    for (let i = 0; i < gridSize * gridSize; i++) {
      const createGridItem = document.createElement("div");
      createGridItem.classList.add("grid-item"); // Add grid-item class
      // Set width and height based on grid size to ensure items fit the container
      createGridItem.style.width = `calc(100%/${gridSize})`;
      createGridItem.style.height = `calc(100%/${gridSize})`;
      this.gridContainer.appendChild(createGridItem); // Add grid item to the container
    }
    this.gridDraw(); // Initialize drawing functionality
  },

  // Validate user input for grid size
  validUserInput(input) {
    const isInt = parseInt(input); // Convert input to integer
    // Check if input is a valid number within the specified range
    return (
      !isNaN(isInt) &&
      isInt >= this.minimumGridSize &&
      isInt <= this.maximumGridSize
    );
  },

  // Prompt user for new grid size and create grid
  CreateNewGridFromPrompt() {
    this.GenerateGridBtn.addEventListener("click", () => {
      let userInput = prompt(
        "Please enter a new size for the Etch-A-Sketch. Valid range is 1 - 100"
      );
      if (this.validUserInput(userInput)) {
        // Validate user input
        this.createGrid(userInput); // Create a new grid with the specified size
      } else {
        alert("Invalid input. Please enter a number between 1 and 100."); // Alert if input is invalid
      }
    });
  },
};

export default Grid;
