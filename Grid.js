const Grid = {
  gridContainer: document.querySelector(".grid-container"),
  GenerateGridBtn: document.querySelector(".generate-grid-btn"),
  colorPicker: document.querySelector(".color-picker"),
  rainbowBtn: document.querySelector(".rainbow-mode-btn"),
  defaultGridSize: 16,
  minimumGridSize: 1,
  maximumGridSize: 100,

  // helper functions to randomly generate values for rgb selection
  randomRgbNumber() {
    return (Math.floor(Math.random() * 256) + 1).toString(16).padStart(2, "0");
  },

  getRandomRGB() {
    return `#${this.randomRgbNumber()}${this.randomRgbNumber()}${this.randomRgbNumber()}`;
  },

  gridDraw() {
    let drawing = false;
    let rainbowMode = false;
    let color = "#000000";

    this.rainbowBtn.addEventListener("click", () => {
      rainbowMode = true;
    });

    this.colorPicker.addEventListener("change", (event) => {
      color = event.target.value;
      rainbowMode = false;
    });

    this.gridContainer.addEventListener("pointerdown", (event) => {
      drawing = true;
      event.target.style.backgroundColor = `${color}`;
    });
    this.gridContainer.addEventListener("pointerup", () => (drawing = false));
    this.gridContainer.addEventListener("mouseover", (event) => {
      if (drawing && event.target.classList.contains("grid-item")) {
        event.target.style.backgroundColor = rainbowMode
          ? this.getRandomRGB()
          : `${color}`;
      }
    });
  },

  createGrid(gridSize = this.defaultGridSize) {
    this.gridContainer.innerHTML = ""; // Clear any previously created grids

    // Dynamically create grids e.g a 16 x 16 grid repeats 256 times
    for (let i = 0; i < gridSize * gridSize; i++) {
      const createGridItem = document.createElement("div");
      createGridItem.classList.add("grid-item");
      // Calculate the grid size to ensure that they fit inside the container
      createGridItem.style.width = `calc(100%/${gridSize})`;
      createGridItem.style.height = `calc(100%/${gridSize})`;
      // Append a new grid item to the parent container
      this.gridContainer.appendChild(createGridItem);
    }
    this.gridDraw();
  },

  validUserInput(input) {
    //check value entered is a valid integer
    const isInt = parseInt(input);
    // return only the input if valid type and within the specified range
    return !isNaN(isInt) &&
      isInt >= this.minimumGridSize &&
      isInt <= this.maximumGridSize
      ? true
      : false;
  },

  // Allow the user to create a grid of a specified size between 1 - 100.
  CreateNewGridFromPrompt() {
    this.GenerateGridBtn.addEventListener("click", () => {
      let userInput = prompt(
        "Please enter a new size for the Etch-A-Sketch. Valid range is 1 - 100"
      );
      this.createGrid(userInput);
    });
  },
};

export default Grid;
