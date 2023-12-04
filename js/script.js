$(document).ready(function () {
    let countryDropdown = document.getElementById('country');
    countries.forEach(function (country) {
        let option = document.createElement('option');
        option.value = country.code;
        option.text = country.name;
        countryDropdown.appendChild(option);
    });

    let form = document.getElementById('registration'); // Remove the '#' from the ID
    let subBtn = document.getElementById('submit');
    
    subBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let elements = form.elements; // Get form elements

        let user = elements.fname.value;
        let checkRadio = document.getElementsByName('check');
        let ok = false;
        let course;

        for (let i = 0; i < checkRadio.length; i++) {
            if (checkRadio[i].checked) {
                ok = true;
                course = checkRadio[i].value;
            }
        }

        let msg = `Welcome ${user}! You are registered for ${course} course.`;
        parMsg.textContent = msg;
        form.appendChild(parMsg);
    });

    let welcomeMessage = document.getElementById('welcomeMessage');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let termsCheckbox = document.getElementById('terms');

    const validation = function () {
        if (username.value === '') {
            alert('Please enter a username');
            username.focus();
            return false;
        }
        if (password.value === '' || password.value.length < 8) {
            alert('Please enter a valid password with at least 8 characters');
            password.focus();
            return false;
        }

        if (password.value !== confirmPassword.value) {
            alert('Please re-enter your password');
            confirmPassword.focus();
            return false;
        }
        if (!termsCheckbox.checked) {
            alert('You must agree to the Terms and Conditions.');
            termsCheckbox.focus();
            return false;
        }

        let selectedCountry = countryDropdown.options[countryDropdown.selectedIndex].value;
        if (selectedCountry === '') {
            alert('Please select the country');
            countryDropdown.focus();
            return false;
        }
        return true;
    };

    subBtn.classList.remove('enabled');
    subBtn.disabled = true;
    subBtn.classList.add('disabled');

    let inputs = document.querySelectorAll('#registration input');

    for (let i = 0; i < inputs.length; i++) {
        let checkValid = function () {
            if (!validation()) {
                subBtn.disabled = true;
                subBtn.classList.add('disabled');
            } else {
                subBtn.disabled = false;
                subBtn.classList.remove('disabled');
            }
        };
        inputs[i].addEventListener('change', checkValid);
    }
});
