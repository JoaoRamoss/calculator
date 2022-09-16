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
clearBtn.addEventListener('click', clearCalculator);
deleteBtn.addEventListener('click', deleteLast);

window.addEventListener('keydown', keyboardHandler);

//Adds number to the current screen.
function appendNumber(num) {
    if (currentScreen.textContent === '0' || screenClear)
        resetScreen();
    currentScreen.textContent += num;
}

//Sets up the operation. First operand is defined as the content of the current screen.
function setOperand(op) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentScreen.textContent;
    currentOperation = op;
    lastScreen.textContent = `${firstOperand} ${currentOperation}`
    screenClear = true;
}


//Is used when the equals button is pressed. The second operand is defined as the content of the current screen.
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
    screenClear = true;
}

//Resets the current screen.
function resetScreen () {
    currentScreen.textContent = '';
    screenClear = false;
}

//Includes a decimal point to the input while making sure it can't be repeated when used.
function appendPoint() {
    if(screenClear) resetScreen();
    if (currentScreen.textContent.includes('.')) return;
    currentScreen.textContent += '.';
}

//Clears the calculator. Similar to refreshing the page.
function clearCalculator() {
    currentOperation = null;
    firstOperand = 0;
    secondOperand = undefined;
    screenClear = false;
    lastScreen.textContent = '';
    resetScreen();
    currentScreen.textContent = '0';
}

//Deletes last element of a string
function deleteLast() {
    if (currentScreen.textContent !== '0')
        currentScreen.textContent = currentScreen.textContent.slice(0, -1);
    if (currentScreen.textContent === '') 
        currentScreen.textContent = '0';
}

function keyboardHandler(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key); 
    else switch(e.key) {
        case 'Escape':
            clearCalculator();
            break;
        case 'Backspace':
            deleteLast();
            break;
        case '=':
            evaluate();
            break;
        case 'Enter':
            evaluate();
            break;
        case '.':
            appendPoint();
            break;
        default:
            break;
    }
    if (e.key === '+' || e.key === '*' || e.key === '/' || e.key === '-')
        setOperand(convertOperation(e.key)); 
}

function convertOperation(e) {
    switch (e) {
        case '+':
            return '+';
        case '-':
            return '-';
        case '*':
            return 'x';
        case '/':
            return '÷';
        default:
            return null;
    }
}

//Rounds the result to the point where it's only allowed to have 3 decimals.
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

//Handles the operation.
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
