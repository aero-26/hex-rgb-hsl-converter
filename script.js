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

//------------------------------------------------------------------------------------------
//  For converting HEX to other values
//------------------------------------------------------------------------------------------

// Clearing Text Fields of RGB and HSL
hexColorCodeInput.addEventListener("click", () => {
  hexColorCodeInput.style.color = "#000000";
  if (rgbColorCodeInput.value !== "") {
    hexColorCodeInput.value = "";
    rgbColorCodeInput.value = "";
  }
  hslColorCodeInput.value = "";
});

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
  colorOutput.style.backgroundColor = hexCode.textContent;

  if (hexColorCodeInput.value) {
    if (hexColorCodeInput.value[0] === "#") {
      hexCode.textContent = hexColorCodeInput.value;
      rgbCode.textContent = rgbCodeCal();
      hslCode.textContent = hslCodeCal();
    } else {
      hexCode.textContent = "!nvalid";
      rgbCode.textContent = "!nvalid";
      hslCode.textContent = "!nvalid";
      colorOutput.style.backgroundColor = "#22092c";
    }

    //Checking for NaN
    if (hexCode.textContent.search("NaN") > -1) {
      hexCode.textContent = "!nvalid";
      rgbCode.textContent = "!nvalid";
      hslCode.textContent = "!nvalid";
      colorOutput.style.backgroundColor = "#22092c";
    }
  }
};

// ------------------------------------------------------------------------------------------
//  For converting RGB to other values
// ------------------------------------------------------------------------------------------

// Clearing Text Fields of HEX and HSL
rgbColorCodeInput.addEventListener("click", () => {
  hexColorCode = hexColorCodeInput;
  hexColorCodeInput.value = "";
  hslColorCodeInput.value = "";
});

// Adding restrictions on input of RGB code
rgbColorCodeInput.addEventListener("keypress", function (e) {
  let validCharacters = [
    "r",
    "g",
    "b",
    "a",
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
    ",",
    ".",
    "(",
    ")",
    "backspace",
    "ctrlKey",
  ];
  if (!validCharacters.find((element) => element === e.key)) {
    e.preventDefault();
  }
});

// Function for manual typing
const rgbManualInput = () => {
  if (rgbColorCodeInput.value !== "") {
    let rgbVal = rgbColorCodeInput.value;

    // Checking valid input
    if (
      (rgbVal[0] === "r" && rgbVal[1] === "g" && rgbVal[2] === "b") ||
      (rgbVal[0] === "r" &&
        rgbVal[1] === "g" &&
        rgbVal[2] === "b" &&
        rgbVal[3] === "a")
    ) {
      // Making new Array of input
      let rgba = rgbVal.split(",");

      // Slicing them to run in command when in rgb without alpha
      if ((rgba[0][3] = "(")) {
        // Removing the brackets"("")" from the array
        const newR = rgba[0].slice(4);
        const newG = rgba[2]?.replace(")", "");

        rgba.splice(0, 1);
        rgba.unshift(newR);
        rgba.splice(2, 1);
        rgba.push(newG);

        // Check of NAN
        const checkStr = rgba.join("");
        if (
          checkStr.search("r") !== -1 ||
          checkStr.search("g") !== -1 ||
          checkStr.search("b") !== -1 ||
          checkStr.search("a") !== -1
        ) {
          hexColorCodeInput.value = " ";
        } else if (rgba.length <= 3) {
          // Checking if the length is appropriate and converting the input to HEX code

          // Special case to fix 0
          if (Number(rgba[0]) === 0) {
            rgbToHex(0);
            if (Number(rgba[1])) {
              rgbToHex(0, Number(rgba[1]));
            }
            if (Number(rgba[2])) {
              rgbToHex(0, Number(rgba[1]), Number(rgba[2]));
            }
          }
          // All other cases
          if (Number(rgba[0]) !== 0) {
            rgbToHex(Number(rgba[0]));
            if (Number(rgba[1])) {
              rgbToHex(Number(rgba[0]), Number(rgba[1]));
            }
            if (Number(rgba[2])) {
              rgbToHex(Number(rgba[0]), Number(rgba[1]), Number(rgba[2]));
            }
          }
        } else if (rgba.length > 3) {
          hexColorCodeInput.value = " ";
        }
      }

      // Reassigning rgba for operations with alpha
      rgba = rgbVal.split(",");

      // Slicing them to run in command when in rgb with alpha
      if (rgba[0][3] === "a") {
        // Removing the paranthesis and recreating array
        const newR = rgba[0].slice(5);
        const newZ = rgba[3]?.replace(")", "");
        rgba.splice(0, 1);
        rgba.unshift(newR);
        rgba.pop();
        rgba.push(newZ);

        // Check NaN
        const checkStr = rgba.join("");
        if (
          checkStr.search("r") !== -1 ||
          checkStr.search("g") !== -1 ||
          checkStr.search("b") !== -1 ||
          checkStr.search("a") !== -1
        ) {
          hexColorCodeInput.value = " ";
        }

        // Running conversion
        else if (rgba.length <= 4) {
          if (Number(rgba[0] === 0)) {
            rgbToHex(0);
            if (Number(rgba[1])) {
              rgbToHex(0, Number(rgba[1]));
            }
            if (Number(rgba[2])) {
              rgbToHex(0, Number(rgba[1]), Number(rgba[2]));
            }
            if (Number(rgba[3])) {
              rgbToHex(0, Number(rgba[1]), Number(rgba[2]), Number(rgba[3]));
            }
          }
          if (Number(rgba[0] !== 0)) {
            rgbToHex(0);
            if (Number(rgba[1])) {
              rgbToHex(Number(rgba[0]), Number(rgba[1]));
            }
            if (Number(rgba[2])) {
              rgbToHex(Number(rgba[0]), Number(rgba[1]), Number(rgba[2]));
            }
            if (Number(rgba[3])) {
              rgbToHex(
                Number(rgba[0]),
                Number(rgba[1]),
                Number(rgba[2]),
                Number(rgba[3])
              );
            }
          }
        }
      }
    } else {
      hexColorCodeInput.value = " ";
    }
  }
};

// Converting RGB to HEX and also running it through hexa input
const rgbToHex = (r, g = 0, b = 0, a = 1) => {
  // Invalid Values
  if (r > 255 || g > 255 || b > 255 || a > 1) {
    hexColorCodeInput.value = " ";
  }

  // When the conditions are met
  else {
    const checkNum = (num) => {
      if (num === 10) {
        return "A";
      } else if (num === 11) {
        return "B";
      } else if (num === 12) {
        return "C";
      } else if (num === 13) {
        return "D";
      } else if (num === 14) {
        return "E";
      } else if (num === 15) {
        return "F";
      } else {
        return Math.trunc(num);
      }
    };

    // Calculating HEX numbers
    const hexR = (r) => {
      let r1 = checkNum(Math.trunc(r / 16));
      let r2 = checkNum(Math.trunc(r % 16));
      return `${r1}${r2}`;
    };
    const hexG = (g) => {
      let g1 = checkNum(Math.trunc(g / 16));
      let g2 = checkNum(Math.trunc(g % 16));
      return `${g1}${g2}`;
    };
    const hexB = (b) => {
      let b1 = checkNum(Math.trunc(b / 16));
      let b2 = checkNum(Math.trunc(b % 16));
      return `${b1}${b2}`;
    };
    const hexA = (a) => {
      // Converting Alpha to 255
      const convA = Math.trunc(a * 255);
      let a1 = checkNum(Math.trunc(convA / 16));
      let a2 = checkNum(Math.trunc(convA % 16));
      return `${a1}${a2}`;
    };

    if (a !== 1) {
      hexColorCodeInput.style.color = "#FFFFFF";
      hexColorCodeInput.value = `#${hexR(r)}${hexG(g)}${hexB(b)}${hexA(a)}`;
      rgbCode.textContent = rgbCodeCal();
      hslCode.textContent = hslCodeCal();
    } else {
      hexColorCodeInput.style.color = "#FFFFFF";
      hexColorCodeInput.value = `#${hexR(r)}${hexG(g)}${hexB(b)}`;
      rgbCode.textContent = rgbCodeCal();
      hslCode.textContent = hslCodeCal();
    }
  }
};

//---------------------------------------------

// Running the set Color function, Manual input RGBA in intervals
setInterval(setColor, 100);
setInterval(rgbManualInput, 100);
