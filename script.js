const rowCount = 16; //initial value for testing
const columnCount = rowCount;

//reload button
const reload = document.querySelector("#reload");
reload.addEventListener("click", () => document.location.reload());

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

//start painting when mouseover
const pixels = document.querySelectorAll(".column");
pixels.forEach((block) => {
  block.addEventListener("mouseover", paint);
});

function paint() {
  if (!this.classList.contains("initialColor")) {
    this.classList.add("initialColor");
    this.style.backgroundColor = "rgb(0, 0, 0)"; //initial color
  }
  updatePaint(this);
}
// update color
function updatePaint(pixel) {
  let pixColor = pixel.style.backgroundColor;
  pixColor = toRGBA(pixColor);
  let alphaString = pixColor.slice(-4, -1); //get alpha value
  let alpha = parseFloat(alphaString);
  alpha += 0.1;
  let newColor = pixColor.replace(alphaString, alpha);
  pixel.style.backgroundColor = newColor;
  console.log(pixel.style.backgroundColor);
}

function toRGBA(color, alphaStrength = 0.1) {
  if (isRGBA(color)) return color; //return if it's already rgba
  if (!isRGBA(color)) {
    let rgbaColor = color
      .replace("rgb", "rgba")
      .replace(")", `, ${alphaStrength})`);
    return rgbaColor;
  }
}

// check if it's rgba color
function isRGBA(testColor) {
  let testColorString = testColor.slice(0, 4);
  if (testColorString != "rgba") return false;
  return true;
}
