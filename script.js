const rowCount = 16; //initial value for testing
const columnCount = rowCount;

// create rows
const gridContainer = document.querySelector(".container");
for (i = 0; i < rowCount; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  gridContainer.appendChild(row);
}

// crete colums
const rows = document.querySelectorAll(".row");
rows.forEach((div) => {
  for (i = 0; i < columnCount; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    div.appendChild(column);
  }
});
