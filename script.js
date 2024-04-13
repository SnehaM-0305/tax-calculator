// Function to validate number inputs
function validateNumberInput(id, value) {
    // Regular expression to check if the value is a valid number
    if (!/^[\d]+(\.[\d]+)?$/.test(value.trim())) {
        // If the input is invalid, show error message
        document.getElementById(id + 'Error').classList.add('visible');
        return false; // Return false to indicate validation failure
    } else {
        // If the input is valid, hide error message
        document.getElementById(id + 'Error').classList.remove('visible');
        return true; // Return true to indicate validation success
    }
}

// Function to validate age input
function validateAgeInput() {
    var ageSelect = document.getElementById('age');
    var ageError = document.getElementById('ageError');
    if (ageSelect.value === "") {
        // If age is not selected, show error message
        ageError.classList.add('visible');
        return false; // Return false to indicate validation failure
    } else {
        // If age is selected, hide error message
        ageError.classList.remove('visible');
        return true; // Return true to indicate validation success
    }
}

// Function to clear form inputs
function clearForm() {
    // Clear input values and reset age dropdown to default option
    document.getElementById('grossIncome').value = '';
    document.getElementById('extraIncome').value = '';
    document.getElementById('deductions').value = '';
    document.getElementById('age').selectedIndex = 0; 
}

// Event listener for form submission
document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Retrieve input values
    var grossIncome = parseFloat(document.getElementById('grossIncome').value.trim());
    var extraIncome = parseFloat(document.getElementById('extraIncome').value.trim());
    var deductions = parseFloat(document.getElementById('deductions').value.trim());
    var ageGroup = document.getElementById('age').value.trim();

    // Validate input fields
    var isGrossIncomeValid = validateNumberInput('grossIncome', document.getElementById('grossIncome').value.trim());
    var isExtraIncomeValid = validateNumberInput('extraIncome', document.getElementById('extraIncome').value.trim());
    var isDeductionsValid = validateNumberInput('deductions', document.getElementById('deductions').value.trim());
    var isAgeValid = validateAgeInput();

    // If all inputs are valid, calculate tax and display result
    if (isGrossIncomeValid && isExtraIncomeValid && isDeductionsValid && isAgeValid) {
        var taxableIncome = grossIncome + extraIncome - deductions;
        var tax = 0;
        if (taxableIncome > 800000) {
            switch(ageGroup) {
                case 'under40':
                    tax = 0.30 * (taxableIncome - 800000);
                    break;
                case 'between40and60':
                    tax = 0.40 * (taxableIncome - 800000);
                    break;
                case '60plus':
                    tax = 0.10 * (taxableIncome - 800000);
                    break;
            }
        }
        var overall = taxableIncome - tax; // Calculate overall income after tax
        var resultContainer = document.getElementById('result');
        resultContainer.innerHTML = "<p>₹" + overall.toFixed(2) + "</p>"; // Display result
        
        // Display modal with result
        document.getElementById('myModal').classList.add('modal-after');
    }
});

// Event listener for closing modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').classList.remove('modal-after');
    clearForm();
});
