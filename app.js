let numkey = document.querySelectorAll(".numkey");
let funkey = document.querySelectorAll(".funkey");
let oprtrkey = document.querySelectorAll(".oprtrkey");
let display = document.querySelector(".expression-display");
let sign = document.querySelector(".sign");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let clear = document.querySelector(".Clear");
let Back = document.querySelector(".Back");
let displayScreen = document.querySelector(".display");
let displayArr = [];
let maxDigit = 9;
let num1 = null;
let num2 = null;
let operator;
let result;
// get nums , limit max digit and display 
numkey.forEach((keys) => keys.addEventListener("click", displayData))

oprtrkey.forEach((oprtr) => {
    oprtr.addEventListener("click", (optr) => {
        operate();
        clearArray();
        sign.textContent = optr.target.textContent;
        toggle(numkey, false);
    })
})

equal.addEventListener("click", () => {
    operate();
    clearArray();
    sign.textContent = "";
})
clear.addEventListener("click", () => {
    console.log(num1, num2, operator, result)
    clearArray();
    display.textContent = "000000000";
    num1 = null;
    num2 = null;
    operator = "";
})
Back.addEventListener("click", () => {
    if (displayArr.length > 0) {
        displayArr.pop();
        display.textContent = displayArr.join("");
    }
})

function operate() {
    getData();
    console.log(num1, num2)
    if (!isNaN(num1) && operator && !isNaN(num2)) {
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

        Number.isInteger(result) ? display.textContent = result : (display.textContent = result.toPrecision());
        if (!isNaN(result)) num1 = result;
    }
}


function clearArray() {
    displayArr.splice(0, displayArr.length);
    toggle(decimal, false);
    maxDigit = 9;
}

function displayData(elem) {
    if (!isNaN(elem.target.textContent) || ".") {
        displayArr.push(elem.target.textContent);
        maxDigit--;
        if (maxDigit === 0) toggle(numkey, true);
        if (displayArr.includes(".")) toggle(decimal, true);
        display.textContent = displayArr.join("");

    }

}

function getData() {
    if (num1) {
        operator = sign.textContent;
        num2 = parseFloat(displayArr.join(""));
    }
    else
        num1 = parseFloat(displayArr.join(""));
}



function add() { return num1 + num2 }
function subtract() { return num1 - num2 }
function divide() { return num1 / num2 }
function multiply() { return num1 * num2 }



function toggle(name, bool) {
    name.length > 1 ? (bool ? name.forEach(e => e.disabled = true) : name.forEach(e => e.disabled = false)) : (bool ? name.disabled = true : name.disabled = false);
}
