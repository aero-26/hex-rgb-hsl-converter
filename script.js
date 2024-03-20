const hex = document.getElementsByClassName("hex")[0];
const rgb = document.getElementsByClassName("rgb")[0];
const hsl = document.getElementsByClassName("hsl")[0];
const body = document.querySelector("body");
const colorOutput = document.getElementsByClassName("color-output")[0];
const hexColorCodeInput = hex.children[1];
const hexCode = hex.children[2];
const rgbColorCodeInput = rgb.children[1];
const rgbCode = rgb.children[2];
const hslColorCodeInput = hsl.children[1];
const hslCode = hsl.children[2];

// Adding restrictions on input of HEX code
hexColorCodeInput.addEventListener("keypress", function (e) {
  let validCharacters = [
    "a",
    "A",
    "b",
    "B",
    "c",
    "C",
    "d",
    "D",
    "e",
    "E",
    "f",
    "F",
    "#",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "backspace",
    "ctrlKey",
  ];
  if (!validCharacters.find((element) => element === e.key)) {
    e.preventDefault();
  }
});

// Clearing Text Fields of RGB and HSL
hexColorCodeInput.addEventListener("click", () => {
  rgbColorCodeInput.value = "";
  hslColorCodeInput.value = "";
});

// Calculation of RBG from HEX
const rgbCodeCal = () => {
  // Getting every CSS value
  const getBackgroundProp = window.getComputedStyle(colorOutput);
  // Getting the specific CSS
  return getBackgroundProp.getPropertyValue("background-color");
};

// Calculation of HSL from RGB
const hslCodeCal = () => {
  const rgbVal = rgbCodeCal();

  // Extracting the RGB from the string
  let rgbArr;
  if (rgbVal[3] === "a") {
    rgbArr = rgbVal.replace("rgba(", "").replace(")", "").split(",");
  } else {
    rgbArr = rgbVal.replace("rgb(", "").replace(")", "").split(",");
  }
  // Changing the range from 0 to 1 of rgb and also getting max and min values
  const r = rgbArr[0] / 255;
  const g = rgbArr[1] / 255;
  const b = rgbArr[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculation of L
  const l = (((max + min) / 2) * 100).toFixed(0);

  // Calculation of S
  let s;
  if (Number(l) < 50) {
    s = (((max - min) / (max + min)) * 100).toFixed(0);
  } else if (Number(l) >= 50) {
    s = (((max - min) / (2 - max - min)) * 100).toFixed(0);
  }

  // Calculation of H
  let h;
  if (max === r) {
    h = ((g - b) / max) * 60;
  } else if (max === g) {
    h = (2 + (b - r) / (max - min)) * 60;
  } else if (max === b) {
    h = (4 + (r - g) / (max - min)) * 60;
  }
  // Converting H if negative
  if (h < 0) {
    h += 360;
  }
  // Final value of H
  h = h?.toFixed(0);

  // Calculation of A
  let a;
  if (rgbArr[3]) {
    a = rgbArr[3];
    return `hsla(${h},${s}%,${l}%,${a})`;
  } else {
    return `hsl(${h},${s}%,${l}%)`;
  }
};

// Function to set color when manually Entering values
const setColor = () => {
  colorOutput.style.backgroundColor = hexCode.innerHTML;
  if (hexColorCodeInput.value) {
    hexCode.textContent = hexColorCodeInput.value;
    rgbCode.textContent = rgbCodeCal();
    hslCode.textContent = hslCodeCal();
  }
};

setInterval(setColor, 100);
