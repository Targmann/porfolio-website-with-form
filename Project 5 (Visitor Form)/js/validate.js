/* Project 5 Template */

let phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form=null;
let successMsg=null;

function initValidation(formId, successId) {
    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);
    let inputs = form.querySelectorAll("input"); // scoped to form
    for (input of inputs) {
        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm );
}

function inputChanged(ev) {
    let el = ev.currentTarget;
    validateForm();

    el.classList.add("was-validated");
}

function submitForm(ev) {
    console.log("in submit");
    let form = ev.currentTarget;

    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    if (!form.checkValidity()) {
        let inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            input.classList.add("was-validated");
        });
    }
    else {
        form.style.display = "none";
        successMsg.style.display = "block";
    }
}

function validateForm() {
    checkRequired("first", "First Name is Required");
    checkRequired("last", "Last Name is Required");
    checkRequired("address1", "Address Line 1 is Required");
    checkRequired("city", "City is Required");
  
    if(checkRequired("state", "State is Required")){
        validateState("state", "Not a valid State, enter two digit code (e.g., UT)");
    }
    
    if (checkRequired("email", "Email Address is required")) {
        checkFormat("email", "email format is bad", emailRegex)
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
    }
    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "phone format is bad", phoneRegex)
    }
    checkRequired("source", "you must select at least one!");
}

function validateState(id, msg) {
    let el = form.elements[id]; // changed
    let valid = false;
    //TODO
    for (state of stateAbbreviations) {
        if (el.value == state) {
            valid = true;
            break;
        }
    }
    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    let el = form.elements[id]; // changed
    //TODO-get element value and test it against the regex that was passed in
    let valid = regex.test(el.value);
    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, message) {
    let group = form.querySelectorAll(`[name="${id}"]`);
    let valid = false;

    let type = group[0].type;

    switch (type) {
        case 'text':
        case 'password':
        case 'email':
        case 'tel':
        case 'textarea':
            valid = group[0].value.trim() !== "";
            break;

        case 'checkbox':
        case 'radio': {
            let container = group[0].closest("li");
            let inputs = container.querySelectorAll('input[type="checkbox"], input[type="radio"]');

            valid = [...inputs].some(input => input.checked);
            break;
        }
    }

    setElementValidity(id, valid, message);
    return valid;
}

function setElementValidity(id, valid, message) {
    let el = form.elements[id];

    let group = form.querySelectorAll(`[name="${id}"]`);

    if (valid) {
        group.forEach(input => input.setCustomValidity(''));
    } else {
        group.forEach(input => input.setCustomValidity(message));
    }

    // Get a single input to locate the label container
    let input = group[0];
    let container = input.closest("li");
    let errorDiv = container ? container.querySelector(".errorMsg") : null;

    if (errorDiv) {
        errorDiv.textContent = valid ? "" : message;
    }
}
