let currentOperation = null;
let firstOperand;
let secondOperand;
let screenClear = false;


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
    secondOperand = currentScreen.textContent
    currentScreen.textContent = operation(currentOperation, firstOperand, secondOperand);
    lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`

}

function resetScreen () {
    currentScreen.textContent = '';
    screenClear = false;
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
