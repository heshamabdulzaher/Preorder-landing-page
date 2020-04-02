// Get all inputs
const fields = document.querySelectorAll('#userData .fields-container input');
const submitBtn = document.querySelector('.main-form .submit-btn');
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

submitBtn.addEventListener('click', submitForm);
function submitForm() {
  let formData = { color: 'black' };
  [].forEach.call(fields, inp => {
    if (inp.type !== 'checkbox') {
      formData[inp.getAttribute('name')] = inp.value;
    }
  });
  if (formData.mobile.substr(0, 1) !== '+') {
    formData.mobile = '+' + formData.mobile;
  }
  fetch('https://p40.laywagif.com/api/preorders', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        alert('Thanks'); // TODO Show success message
        // TODO clear form
      } else {
        alert(res.message || 'Request error'); // TODO Show error message
      }
    })
    .catch(e => {
      alert(e.message || 'Request error'); // TODO Show error message
    });
}
