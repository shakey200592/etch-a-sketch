const gridContainer = document.querySelector(".grid-container");
const gridSize = 100;
const numberOfGrids = gridSize * gridSize;

for (let i = 0; i < numberOfGrids; i++) {
  const createGridItem = document.createElement("div");
  createGridItem.classList.add("grid-item");
  createGridItem.style.width = `calc(100%/${gridSize})`;
  createGridItem.style.height = `calc(100%/${gridSize})`;
  gridContainer.appendChild(createGridItem);
}
