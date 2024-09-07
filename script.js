const previousOperation = document.querySelector("#previous_operation")
const currentOperation = document.querySelector("#current_operation")
const buttons = document.querySelectorAll("#buttons_container button")
let clickSound = new Audio("./sound/click.wav")

console.log(buttons)

//create class
class Calculator {
    constructor(previousOperation, currentOperation) {
        this.previousOperation = previousOperation
        this.currentOperation = currentOperation
        this.currentOperationNow = ""
    }

    //method to process digit to calculator screen
    addDigit(digit) {
        // console.log(digit)
        //check if current operation already has dot
        if (digit === "." && this.currentOperation.innerText.includes(".")) {
            return;
        }

        this.currentOperationNow = digit
        //method to atualizar screen
        this.updateScreen()
    }

      //method to process all calculator operations
      processOperation(operation){
        // console.log(operation)
        //check if current is empty
        if (this.currentOperation.innerText === "" && operation != "C") {
            //change operation
            if (this.previousOperation.innerText !== "") {
                    this.changeOperation(operation);
                
            }
            return;
        }

        //get current and previous value
        let operationValue = "";
        const previous = +this.previousOperation.innerText.split(" ")[0];
        const current = +this.currentOperation.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;    
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
            break;
            case "DEL":
                this.processDelOperator();
            break;
            case "CE":
                this.processClearCurrentOperation();
            break;
            case "C":
                this.processClearAllOperation();
            break;
            case "=":
                this.processEqualOperator();
            break;
            default:
                return;
        }
    }

    //change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null  
    ) 
    {
        console.log(operationValue, operation, current, previous)
        
        if(operationValue === null) {
            this.currentOperation.innerText += this.currentOperationNow
        } else {
            //check if value is zero, if it is just add current value
            if(previous === 0 ) {
                operationValue = current
            }

            //add current value to previous
            this.previousOperation.innerText = `${operationValue} ${operation}`;
            this.currentOperation.innerText = ""
        }       
    } 
    //change math operation  
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperation.innerText = this.previousOperation.innerText.slice(0, -1) + operation
    }

    //delete the last digit
    processDelOperator(){
        this.currentOperation.innerText = this.currentOperation.innerText.slice(0, -1)
    }

    //clear current operation
    processClearCurrentOperation(){
        this.currentOperation.innerText = ""
    }

    //clear all operations
    processClearAllOperation(){
        this.currentOperation.innerText = ""
        this.previousOperation.innerText = ""
    }

    //process an operation
    processEqualOperator(){
        const operation = previousOperation.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

//instantiate object
const calc = new Calculator(previousOperation, currentOperation)

//get the innertext of the buttons
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        clickSound.play()
        // console.log(value)

        //if number
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        //if operator    
        } else {
            calc.processOperation(value)
        }
    })
})



