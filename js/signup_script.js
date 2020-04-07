function init() {
    "use strict";

    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');


    //Functions

    //Show Error
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;

    }


    //Show Success
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }


    //Check Required fields
    function checkRequired(inputArr) {
        inputArr.forEach(function (input) {
            return input.value.trim() === '' ? showError(input, `${getFieldName(input)} is required`) : showSuccess(input);
        });
    }

    //Check Length

    function checkLength(input, min, max) {
        return input.value.length < min ? showError(input, `${getFieldName(input)} must be at least ${min} characters`) :
            input.value.length > max ? showError(input, `${getFieldName(input)} must be less than ${max} characters`) :
            showSuccess(input);
    }

    //Check Email is Valid

    function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(input.value.trim()) ? showSuccess(input) : showError(input, 'Email is not valid');

    }

    //Compare Passwords

    function comparePasswords(input1, input2) {
        if (input1.value !== input2.value) {
            showError(input2, 'Passwords do not match');
        }
    }

    //Get FieldName

    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
    //Event Listerns


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        checkRequired([username, email, password, password2]);
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        comparePasswords(password, password2);
    });
}

window.onload = init;