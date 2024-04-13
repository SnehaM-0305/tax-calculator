function validateNumberInput(id, value) {
   
    if (!/^[\d]+(\.[\d]+)?$/.test(value.trim())) {
        document.getElementById(id + 'Error').classList.add('visible');
        return false;  
    } else {
        document.getElementById(id + 'Error').classList.remove('visible');
        return true; 
    }
}

function validateAgeInput() {
    var ageSelect = document.getElementById('age');
    var ageError = document.getElementById('ageError');
    if (ageSelect.value === "") {
        ageError.classList.add('visible');
        return false; 
    } else {
        ageError.classList.remove('visible');
        return true;  
    }
}
function clearForm() {
    document.getElementById('grossIncome').value = '';
    document.getElementById('extraIncome').value = '';
    document.getElementById('deductions').value = '';
    document.getElementById('age').selectedIndex = 0; 
}

document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Use trim() to eliminate leading/trailing spaces
    var grossIncome = parseFloat(document.getElementById('grossIncome').value.trim());
    var extraIncome = parseFloat(document.getElementById('extraIncome').value.trim());
    var deductions = parseFloat(document.getElementById('deductions').value.trim());
    var ageGroup = document.getElementById('age').value.trim();

    var isGrossIncomeValid = validateNumberInput('grossIncome', document.getElementById('grossIncome').value.trim());
    var isExtraIncomeValid = validateNumberInput('extraIncome', document.getElementById('extraIncome').value.trim());
    var isDeductionsValid = validateNumberInput('deductions', document.getElementById('deductions').value.trim());
    var isAgeValid = validateAgeInput();

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
            }}
        var overall = taxableIncome - tax; 
        var resultContainer = document.getElementById('result');
        resultContainer.innerHTML = "<p>₹" + overall.toFixed(2) + "</p>";
        document.getElementById('myModal').style.display = "block";
        document.getElementById('myModal').style.textAlign = "center";
    }
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = "none";
    clearForm() ; 

})
