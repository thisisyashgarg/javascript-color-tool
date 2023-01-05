//checking whether the input hex code is valid or not
//1. #000000 or 000000
//2. check the lenght to be 3 or 6
function validHex(hex) {
  if (!hex) {
    return false;
  }
  let strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
}

//CHALLENGE
//Get a reference to hexInput and inputColor DOM elements
//Create a keyup event handler for hexInput
//Check if hex color is valid
//If hex color is valid, update the background color of inputColor

const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!validHex(hex)) {
    return;
  }
  let strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = `#${strippedHex}`;
  reset();
});

//Create a function to convert Hex to RGB
//this should work with 3 or 6 character hex values
//Hint - useParseInt(16) to convert a hex value to a decimal value
//should return an object with 3 properties - r,g, and b
//Test your function with a few different use cases

function convertHexToRGB(hex) {
  if (!validHex(hex)) {
    return null;
  }
  let strippedHex = hex.replace("#", "");
  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
}
// console.log(convertHexToRGB('ffe'));

//create the function converRGBToHex
//take in 3 parameters - r,g, and b
//for each (r,g,b) - create a hex pair that is two characters long
//return hex value starting with a hashtag
//example - r.toString(16)

function convertRGBToHex(r, g, b) {
  const hex12 = ("0" + r.toString(16)).slice(-2);
  const hex34 = ("0" + g.toString(16)).slice(-2);
  const hex56 = ("0" + b.toString(16)).slice(-2);
  const hexCode = "#" + hex12 + hex34 + hex56;
  return hexCode;
}
console.log(convertRGBToHex(0, 675, 987));

//get a reference to the slider and sliderText DOM elements
//create an input event listener for slider element
//display the value of the slider

const sliderLabel = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const alteredColor = document.getElementById("alteredColor");
const alteredColoredText = document.getElementById("alteredColoredText");

slider.addEventListener("input", () => {
  if (!validHex(hexInput.value)) return;
  sliderLabel.textContent = `${slider.value}%`;
  const valueAddition = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;
  alteredColor.style.backgroundColor = alterColor(
    hexInput.value,
    valueAddition
  );
  alteredColoredText.innerText = `Altered Color : ${alterColor(
    hexInput.value,
    valueAddition
  )}`;
});

//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

function alterColor(hexCode, percentage) {
  let { r, g, b } = convertHexToRGB(hexCode);
  const incrementer = Math.floor((percentage / 100) * 255);
  const newR = inRGBRange(r, incrementer);
  const newG = inRGBRange(g, incrementer);
  const newB = inRGBRange(b, incrementer);
  console.log(newR, newG, newB);
  return convertRGBToHex(newR, newG, newB);
}
console.log(alterColor("000", -10));

function inRGBRange(number, amount) {
  if (number + amount < 0) return 0;
  if (number + amount > 255) return 255;
  return number + amount;
}

//lightenText, darkenText, toggleBtn
//click event listener to the toggle btn
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  reset();
});

//Set slider value to 0 and slider text to 0%
//Set altered color to original input color
//Reset alteredColorText to original input
// call reset in toggleBtn click handler
// call reset in hexInput keyup handler

const reset = () => {
  slider.value = 0;
  sliderText.innerText = `0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color: ${hexInput.value}`;
};
