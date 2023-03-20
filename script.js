const display = document.querySelector('.calculator-input');
const keys  = document.querySelector('.calculator-keys');


let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingSecondValue = false;


updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener('click', function(e){

        const element  = e.target;
        let value  = element.value;

        if(!element.matches('button')) return;

        switch(value){
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                    handleOperator(value);
                    break;
            case '.':
                    inputDecimal();
                    break;
            case 'clear': 
                    clear();
                    break;
            default: 
                inputNumber(value);
        }
        updateDisplay()

});


function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

        if(operator && waitingSecondValue){
            operator = nextOperator;
            return;
        }

        if(firstValue === null){
            firstValue = value;
        } else if(operator){
            const result = calculate(firstValue, value, operator)

            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitingSecondValue = true;
        operator = nextOperator;

        console.log(displayValue, firstValue, operator ,waitingSecondValue)
}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }else if(operator === '-'){
        return first- second;
    }else if(operator === '*'){
        return first * second;
    }else if(operator === '/'){
        return first / second;
    }

    return second;
}


function inputNumber(num){
    if(waitingSecondValue){
        displayValue = num;
        waitingSecondValue = false;
    }else {
        displayValue = displayValue === '0' ?  num : displayValue + num ;
    }

console.log(displayValue, firstValue, operator, waitingSecondValue);

}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
}

function clear(){
    displayValue = '0';
}


