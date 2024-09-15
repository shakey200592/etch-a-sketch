const Grid = {
  gridContainer: document.querySelector(".grid-container"),
  GenerateGridBtn: document.querySelector(".generate-grid-btn"),
  defaultGridSize: 16,
  minimumGridSize: 1,
  maximumGridSize: 100,

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
      while (this.validUserInput(userInput) === false) {
        userInput = prompt(
          "Invalid Input Please enter a valid size between 1 - 100"
        );
      }
      console.log(userInput);
    });
  },

  gridDraw() {
    let drawing = false;
    const gridItems = document.querySelectorAll(".grid-item");
    this.gridContainer.addEventListener("mousedown", (event) => {
      drawing = true;
      event.target.style.backgroundColor = "blue";
    });
    this.gridContainer.addEventListener("mouseup", () => (drawing = false));
    this.gridContainer.addEventListener("mouseover", (event) => {
      if (drawing && event.target.classList.contains("grid-item")) {
        event.target.style.backgroundColor = "blue";
      }
    });
  },
};

export default Grid;
