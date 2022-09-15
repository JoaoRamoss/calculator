const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsBtn = document.getElementById('equalsBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');
const pointBtn = document.getElementById('pointBtn');
const lastScreen = document.getElementById('lastOperation');
const currentScreen = document.getElementById('currentOperation');


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
