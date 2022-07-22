var number1 = "";
var number2 = "";
var operator = "";

// Auxiliary variable for us to know if we should concatenate the value
// on the display after we pressed any operator
var isFirstDigitAfterOperator = true;

function insert(value) {
    // We pressed an operation

    // We only allow one . per number and always at the end
    if (value === '.' && !document.getElementById('result').innerHTML.includes('.')) {
        document.getElementById('result').innerHTML += '.';
        return;
    }

    if (operator === "") {
        document.getElementById('result').innerHTML += value;
        number1 = document.getElementById('result').innerHTML;
    } else if (isFirstDigitAfterOperator) {
        isFirstDigitAfterOperator = false;
        document.getElementById('result').innerHTML = value;
        number2 = document.getElementById('result').innerHTML
    } else {
        document.getElementById('result').innerHTML += value;
        number2 = document.getElementById('result').innerHTML;
    }
}

function clean() {
    document.getElementById('result').innerHTML = "";
    number1 = "";
    number2 = "";
    operator = "";
    isFirstDigitAfterOperator = true;
}

function back() {
    var result = document.getElementById('result').innerHTML;
    document.getElementById('result').innerHTML = result.substring(0, result.length - 1);
}

function addOperator(op) {
    operator = op;
    number1 = document.getElementById('result').innerHTML;
}

function calc() {

    // Division by zero results in an error, so we prevent it
    if (operator === '/' && number2 === 0) {
        document.getElementById('result').innerHTML = "Zero division error!";
        return; 
    }

    // Javascript does not interpret .1 as 0.1, so we manually add the zero
    // to the beginning if the first character is a .
    if (number1.startsWith(".")) {
        number1 = "0" + number1;
    }

    if (number2.startsWith(".")) {
        number2 = "0" + number2;
    }

    var result = operate(operator, number1, number2);
    
    document.getElementById('result').innerHTML = result;

    // After doing the math, we clear all variables
    operator = "";
    number1 = result;
    number2 = "";
    isFirstDigitAfterOperator = true;
}

function percentage() {
    //we don't do percentage if we don't have at least 1 number
    if (number1 === "") {
        return ;
    } else if (number2 === "") { // if we do percentage having only one number, we assume the percentage over 100        
        document.getElementById('result').innerHTML = (parseFloat(number1)/100).toString();
    } else {
        const percentValue = parseFloat(number2) / 100 * parseFloat(number1);
        number1 = operate(operator, number1 , percentValue);
        number2 = "";
        operator = "";
        isFirstDigitAfterOperator = true;

        document.getElementById('result').innerHTML = number1;
    }
    
}

function operate(operator, number1, number2) {
    let result = 0

    switch(operator) {
        case "+":
            result = parseFloat(number1) + parseFloat(number2);
            break;
        case "-":
            result = parseFloat(number1) - parseFloat(number2);
            break;
        case "*":
            result = parseFloat(number1) * parseFloat(number2);
            break;
        case "/":
            result = parseFloat(number1) / parseFloat(number2);
            break;
        default:
            // if it falls here, it is an invalid operator and we just store 0 in the result
            result = 0;
            break;
    }
    return result;
}