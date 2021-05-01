const form = document.getElementById('form');
const username = document.getElementById('username'); // input username
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    // console.log(input.value);
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} Field required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}


// Get field name
function getFieldName(input) {
  // Nota: Se extrae el primer caracter y se convierte a mayúscula
  // y se concatena con el resto de la palabra a la cual se le elimina el primer char
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Nota: Se pasa un array con todos los campos de la form a validar
  checkRequired([username, email, password, password2]);
  // Nota: Se valida el campo con las opciones (campoInput, longMin, longMax)
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  /* 
  // Nota: Validaciones sin refactor, usando if

  // Nota: Valida campo username
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }

  // Nota: Valida campo email
  if (email.value === '') {
    showError(email, 'email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Valid email is required');
  } else {
    showSuccess(email);
  }

  // Nota: Valida campo password
  if (password.value === '') {
    showError(password, 'password is required');
  } else {
    showSuccess(password);
  }

  // Nota: Valida campo password2
  if (password2.value === '') {
    showError(password2, 'password2 is required');
  } else {
    showSuccess(password2);
  }
  */

})