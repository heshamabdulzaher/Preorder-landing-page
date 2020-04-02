let submittedData = {};
const preOrderPhoneSection = document.querySelector('.pre-order-phone-device');

// Let's move to the second step
function moveToSecondStep() {
  let selectedColor = document.querySelector('input[type=radio]#black').checked
    ? 'black'
    : 'silver';
  submittedData.color = selectedColor;
  preOrderPhoneSection.classList.remove('first-step');
  preOrderPhoneSection.classList.add('second-step');
}

// On the second step let's begin with validation
// Get all inputs
const fields = document.querySelectorAll('#userData .fields-container input');
const submitBtn = document.querySelector('#submitUserDataBtn');
const checkbox = document.querySelector('#accept-terms');
checkbox.addEventListener('change', activateSubmitBtn);

fields.forEach(inp => {
  inp.addEventListener('keyup', activateSubmitBtn);
  inp.addEventListener('blur', onBlur);
});

function onBlur(e) {
  if (e.target.checkValidity()) {
    e.target.closest('.form-group').classList.remove('invalid');
    e.target.classList.add('valid');
  } else {
    e.target.closest('.form-group').classList.add('invalid');
    if (e.target.value.trim() == '') {
      e.target.closest('.form-group').querySelector('small').innerHTML =
        'هذا الحقل مطلوب لإتمام الطلب';
    } else {
      e.target
        .closest('.form-group')
        .querySelector('small').innerHTML = e.target.getAttribute(
        'data-err-msg'
      );
    }
  }
}

function activateSubmitBtn(e) {
  // Check if the input valid, if yes add new class 'valid'
  if (e.target.type != 'checkbox') {
    if (e.target.checkValidity()) {
      e.target.closest('.form-group').classList.remove('invalid');
      e.target.classList.add('valid');
    } else {
      e.target.classList.remove('valid');
    }
  }
  let inValidFields = [].some.call(
    fields,
    inp => !inp.classList.contains('valid')
  );
  // If all inputs are valid
  if (!inValidFields && checkbox.checked) {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.add('active');
  } else {
    submitBtn.setAttribute('disabled', '');
    submitBtn.classList.remove('active');
  }
}

submitBtn.addEventListener('click', submitUserData);
function submitUserData() {
  submitBtn.classList.add('btn-spinner');
  [].forEach.call(fields, inp => {
    if (inp.type !== 'checkbox') {
      submittedData[inp.getAttribute('name')] = inp.value;
    }
  });
  if (submittedData.mobile.substr(0, 1) !== '+') {
    submittedData.mobile = '+' + submittedData.mobile;
  }
  console.log(submittedData);
  fetch('https://p40.laywagif.com/api/preorders', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submittedData)
  })
    .then(res => res.json())
    .then(res => {
      submitBtn.classList.remove('btn-spinner');
      document.querySelector('#userData').reset();
      if (res.success) {
        const preOrderSection = document.querySelector(
          '.pre-order-phone-device'
        );
        preOrderSection.classList.remove('second-step');
        preOrderSection.classList.add('congrats');
        document.querySelector('.alert-err-msg').classList.remove('show');
      } else {
        // Show alert error message and desActive submit-btn
        document.querySelector('.alert-err-msg').classList.add('show');
        submitBtn.setAttribute('disabled', '');
        submitBtn.classList.remove('active');
      }
    })
    .catch(e => {
      // Show alert error message and desActive submit-btn
      submitBtn.classList.remove('btn-spinner');
      document.querySelector('.alert-err-msg').classList.add('show');
      submitBtn.setAttribute('disabled', '');
      submitBtn.classList.remove('active');
    });
}
