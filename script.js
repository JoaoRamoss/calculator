let currentOperation = null; //Records the last selected operation button 
let firstOperand;
let secondOperand;
let screenClear = false; //Tells if it's necessary to clear the screen


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsBtn = document.getElementById('equalsBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');
const pointBtn = document.getElementById('pointBtn');
const lastScreen = document.getElementById('lastOperation');
const currentScreen = document.getElementById('currentOperation');


numberButtons.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
operationButtons.forEach(button => button.addEventListener('click', () => setOperand(button.textContent)))
equalsBtn.addEventListener('click', evaluate);
pointBtn.addEventListener('click', appendPoint);



function appendNumber(num) {
    if (currentScreen.textContent === '0' || screenClear)
        resetScreen();
    currentScreen.textContent += num;
}

function setOperand(op) {
    if (currentOperation !== null) return;
    firstOperand = currentScreen.textContent;
    currentOperation = op;
    lastScreen.textContent = `${firstOperand} ${currentOperation}`
    screenClear = true;
}


function evaluate (e) {
    if (currentOperation == null || screenClear) return;
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        alert("You can't divide by zero!");
        return;
    }
    secondOperand = currentScreen.textContent
    currentScreen.textContent = roundResult(operation(currentOperation, firstOperand, secondOperand));
    lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
    currentOperation = null;
}

function resetScreen () {
    currentScreen.textContent = '';
    screenClear = false;
}

function appendPoint() {
    if(screenClear) resetScreen();
    if (currentScreen.textContent.includes('.')) return;
    currentScreen.textContent += '.';
}

function roundResult (result) {
    return Math.round(result * 1000) / 1000;
}

function add (a, b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operation(op, a, b) {
    a = Number(a);
    b = Number(b);
    switch(op) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x': 
            return multiply(a,b);
        case '÷':
            return divide(a,b);
        default:
            return null;
    }
}
