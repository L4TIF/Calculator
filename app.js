let numkey = document.querySelectorAll(".numkey");
let funkey = document.querySelectorAll(".funkey");
let oprtrkey = document.querySelectorAll(".oprtrkey");
let display = document.querySelector(".expression-display");
let sign = document.querySelector(".sign");
let equal = document.querySelector(".equal");
let displayArr = [];
let maxDigit = 9;
let num1 = 0;
let num2 = 0;
let operator;
let result;
let tempN2;
// get nums , limit max digit and display 
numkey.forEach((keys) => keys.addEventListener("click", displayData))

oprtrkey.forEach((oprtr) => {
    oprtr.addEventListener("click", (optr) => {
        operate();
        clearArray();
        sign.textContent = optr.target.textContent;
        toggle(numkey, false)
    })
})

equal.addEventListener("click", () => {
    operate();
    clearArray();
})

function operate() {
    getData();
    console.log(num1, num2)
    if (num1 && operator && !isNaN(num2)) {
        switch (operator) {
            case "+": result = add();
                break;
            case "-": result = subtract();
                break;
            case "/": result = divide();
                break;
            case "*": result = multiply();
                break;
        }
        console.log(result)
        num1 = result;
        tempN2 = num2;
        display.textContent = result;
    }
}



function clearArray() {
    displayArr.splice(0, displayArr.length)

    maxDigit = 9;
}

function displayData(elem) {
    if (!isNaN(elem.target.textContent)) {
        displayArr.push(elem.target.textContent);
        display.textContent = displayArr.join("");
        maxDigit--;
    }
    if (maxDigit === 0) toggle(numkey, true);
}

function getData() {
    console.log(displayArr)
    if (num1) {
        operator = sign.textContent;
        num2 = parseInt(displayArr.join(""));
    }
    else
        num1 = parseInt(displayArr.join(""));
}



function add() { return num1 + num2 }
function subtract() { return num1 - num2 }
function divide() {
    if (num2 === 0) return "Error";
    return num1 / num2;
}
function multiply() { return num1 * num2 }



function toggle(name, bool) {
    bool ? name.forEach(e => e.disabled = true) : name.forEach(e => e.disabled = false);
}
