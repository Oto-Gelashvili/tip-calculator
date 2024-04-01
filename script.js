const bill = document.getElementById('bill');
const buttons = document.querySelectorAll('.tip-buttons button');
const custom = document.getElementById('custom');
const people = document.getElementById('people');
const tipAmountElement = document.querySelector('.tip-amount');
const totalAmountElement = document.querySelector('.total-amount');
const reset = document.querySelector(".reset");
var billValue = 0;
var percent = 0;
var peopleAmount = 0;
var lastClicked = null;

bill.addEventListener('input',function(){
    billValue = parseFloat(bill.value);
    tipCalculator();
    if (billValue <= 0) {
        // Create error element
        var error = document.createElement("p");
        error.className = "bill-error";
        error.innerHTML = "Can't be zero";

        // Remove existing error elements
        var existingErrors = document.querySelectorAll(".bill-error");
        for (var i = 0; i < existingErrors.length; i++) {
            existingErrors[i].remove();
        }
        // Append error element to error container
        document.querySelector(".bill-error-container").appendChild(error);
    } else {
        // Hide error message if value is valid
        document.querySelectorAll(".bill-error")[0].remove();
    };
});
document.body.addEventListener("click", function() {
    // Reset the border of the input field to its default (or remove it)
    bill.style.border = ""; // This will remove the border
    people.style.border = "";
    custom.style.border = "";
});
bill.addEventListener("click", function(event) {
    event.stopPropagation();
    // Prevent the click event from bubbling up to the document body
    bill.style.border = "#5DA9A0 solid 2px";
    custom.style.border = "";
    people.style.border = "";
});
custom.addEventListener("click", function(event) {
    event.stopPropagation();
    // Prevent the click event from bubbling up to the document body
    custom.style.border = "#5DA9A0 solid 2px";
    bill.style.border = "";
    people.style.border = "";
    lastClicked.style.backgroundColor = '';
    lastClicked.style.color = ''; // Resetting to default color
    lastClicked = null;
});
people.addEventListener("click", function(event) {
    event.stopPropagation();
    // Prevent the click event from bubbling up to the document body
    people.style.border = "#5DA9A0 solid 2px";
    custom.style.border = "";
    bill.style.border = "";
});


for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",function(){
        if (this === lastClicked) {
            // Toggle the styles to normal (deselected)
            this.style.backgroundColor = '';
            this.style.color = ''; // Resetting to default color
            lastClicked = null; // Reset lastClicked
        }else{
        // Reset the color of the previously clicked item,if there is any
        if (lastClicked !== null) {
            lastClicked.style.backgroundColor = '';
            lastClicked.style.color = ''; // Resetting to default color
        }
        // Update the color of the currently clicked item
        this.style.backgroundColor = '#28C2AE';
        this.style.color = '#2D5352';
        // setting value to lastckicled when something is clicked
        // "this" is same as buttons[i]
        lastClicked = this; 
    }
    percent = parseFloat(this.textContent);
        tipCalculator();
    });
}
custom.addEventListener('input',function(){
    percent = parseFloat(custom.value);
    tipCalculator();
})


people.addEventListener('input',function(){
    peopleAmount = parseInt(people.value);
    tipCalculator();
    if (peopleAmount <= 0) {
        // Create error element
        var error = document.createElement("p");
        error.className = "people-error";
        error.innerHTML = "Can't be zero";

        // Remove existing error elements
        var existingErrors = document.querySelectorAll(".people-error");
        for (var i = 0; i < existingErrors.length; i++) {
            existingErrors[i].remove();
        }
        // Append error element to error container
        document.querySelector(".people-error-container").appendChild(error);
    } else {
        // Hide error message if value is valid
        document.querySelectorAll(".people-error")[0].remove();
    };
})
reset.addEventListener("click", function() {
    // Reset variables to their initial values
    billValue = 0;
    percent = 0;
    peopleAmount = 0;
    bill.value = 0;
    custom.value = 0;
    people.value = 0;
    tipCalculator();
});

function tipCalculator(){
    if(peopleAmount >0 && billValue > 0){
        const tipAmount = (billValue*(percent/100))/peopleAmount;
        tipAmountElement.textContent = '$' + tipAmount.toFixed(2);
        const total = (billValue+(billValue*(percent/100)))/peopleAmount;
        totalAmountElement.textContent = '$'+ total.toFixed(2);
        reset.style.opacity = "1";
    }else{
        tipAmountElement.textContent = '$0.00';
        totalAmountElement.textContent = '$0.00';
    };
};
