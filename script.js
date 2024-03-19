const hex = document.getElementsByClassName("hex")[0];
const body = document.querySelector("body");
const colorOutput = document.getElementsByClassName("color-output")[0];

const hexColorCodeInput = hex.children[1];

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
  setColor();
});

// Function to set color when manually Entering values
const setColor = () => {
  colorOutput.style.backgroundColor = hexColorCodeInput.value;
};

// Function to set color on paste of HEX code
hexColorCodeInput.addEventListener("paste", (e) => {
  colorOutput.style.backgroundColor = e.clipboardData.getData("text/plain");
});
