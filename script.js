gridGen(16); //initial grid of 16x16 size

//gridLine button
const gridLine = document.querySelector("#gridLine");
gridLine.addEventListener("click", () => {
  const gridBoxes = document.querySelectorAll("div.column");
  gridBoxes.forEach((box) => {
    box.classList.toggle("gridLine");
  });
});

//reload button
const reload = document.querySelector("#reload");
reload.addEventListener("click", () => document.location.reload());

//resize button
const resize = document.querySelector("#resizeGrid");
resize.addEventListener("click", () => {
  let newSize = prompt("new grid size?\n(max: 100)", 16);
  if (newSize === null) return; //no change
  if (newSize > 100) {
    alert("Warning!\nmax grid size: 100");
    newSize = 100;
  }
  gridGen(newSize);
});

function rowGen(count) {
  const gridContainer = document.querySelector(".container");
  gridContainer.innerHTML = ""; //reset
  // create rows
  for (i = 0; i < count; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gridContainer.appendChild(row);
  }
}

function coloumnGen(count) {
  const rows = document.querySelectorAll(".row");
  // create colums
  rows.forEach((div) => {
    for (i = 0; i < count; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      div.appendChild(column);
    }
  });
}

function gridGen(gridSize) {
  rowGen(gridSize);
  coloumnGen(gridSize);
  //start painting when mouseover
  const pixels = document.querySelectorAll(".column");
  pixels.forEach((block) => {
    block.addEventListener("mouseover", paint);
  });
}

function paint() {
  if (
    this.classList.contains("initialColor") &&
    !isRGBA(this.style.backgroundColor)
  )
    return; //stop after one cycle
  if (!this.classList.contains("initialColor")) {
    this.classList.add("initialColor");
    this.style.backgroundColor = colorPick; //selected color
  }
  updatePaint(this);
}

// update color
function updatePaint(pixel) {
  let pixColor = pixel.style.backgroundColor;
  if (rgbValue(pixColor) != rgbValue(colorPick)) {
    //replace color if it's has diffrent rgb values
    pixColor = colorPick;
  }
  pixColor = toRGBA(pixColor);
  let alphaString = pixColor.slice(-4, -1); //get alpha value
  let alpha = parseFloat(alphaString);
  alpha += 0.1;
  let newColor = pixColor.replace(alphaString, alpha);
  pixel.style.backgroundColor = newColor;
}

//rgb color string to rgba color string
function toRGBA(color) {
  if (isRGBA(color)) return color; //return existing
  if (!isRGBA(color)) {
    let rgbaColor = color.replace("rgb", "rgba").replace(")", ", 0.0)");
    return rgbaColor;
  }
}

// check if it's rgba color string
function isRGBA(testColor) {
  let testColorString = testColor.slice(0, 4);
  if (testColorString != "rgba") return false;
  return true;
}

//color picker
const color = document.querySelector("#colorPicker");
color.addEventListener("input", pickColor);
let colorPick = "rgb(0, 0, 0)"; //initial color
function pickColor() {
  colorPick = hexToRGB(this.value); //convert to rgb insted of hex
}

function rgbValue(color) {
  if (!isRGBA(color)) {
    colorValue = color.replace("rgb(", ""); //remove head
    colorValue = colorValue.replace(")", ""); //remove tail
  }

  if (isRGBA(color)) {
    colorValue = color.replace("rgba(", ""); //remove head
    colorValue = colorValue.replace(/,\s...\)/, ""); //remove tail ["," followed by space(\s),then 3 ch(...) & ")" ]
  }
  return colorValue;
}

function hexToRGB(color) {
  if (!(color.slice(0, 1) == "#" && color.length == 7)) return; //abort if not valid format
  //numbers with "0x" prefix are regarded as hexadecimal and is auto converted to decimal
  const r = parseInt("0x" + color.slice(1, 3));
  const g = parseInt("0x" + color.slice(3, 5));
  const b = parseInt("0x" + color.slice(5, 7));
  return `rgb(${r}, ${g}, ${b})`;
}
