const grid = {
  gridContainer: document.querySelector(".grid-container"),
  GenerateGridBtn: document.querySelector(".generate-grid-btn"),
  defaultGridSize: 16,
  maximumGridSize: 100,

  createGrid(gridSize = this.defaultGridSize) {
    this.gridContainer.innerHTML = ""; // Clear any previously created grids

    // Dynamically create grids e.g a 16 x 16 grid repeats 256 times
    for (let i = 0; i < gridSize * gridSize; i++) {
      const createGridItem = document.createElement("div");
      createGridItem.classList.add("grid-item");
      createGridItem.style.width = `calc(100%/${gridSize})`;
      createGridItem.style.height = `calc(100%/${gridSize})`;
      this.gridContainer.appendChild(createGridItem);
    }
  },

  validUserInput(input) {
    //check value entered is a valid integer
    const isInt = parseInt(input);
    return !isNaN(isInt) ? true : false;
  },

  CreatenewGridFromPrompt() {
    this.GenerateGridBtn.addEventListener("click", () => {
      let userInput = prompt(
        "Please enter a new size for the Etch-A-Sketch. Valid range is 1 - 100"
      );
      while (this.validUserInput(userInput) === false) {
        userInput = prompt(
          "Please enter a new size for the Etch-A-Sketch. Valid range is 1 - 100"
        );
      }
      console.log(userInput);
    });
  },
};

grid.createGrid();
grid.CreatenewGridFromPrompt();
