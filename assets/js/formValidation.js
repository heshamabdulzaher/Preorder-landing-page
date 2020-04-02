// Get all inputs
const fields = document.querySelectorAll('form input');
const submitBtn = document.querySelector('.main-form .submit-btn');

fields.forEach(inp => {
  inp.addEventListener('change', activateSubmitBtn);
  if (inp.type !== 'checkbox') {
    inp.addEventListener('keyup', activateSubmitBtn);
  }
});

function activateSubmitBtn(e) {
  // Check if the input valid, if yes add new class 'valid'
  if (e.target.checkValidity()) {
    e.target.classList.add('valid');
  } else {
    e.target.classList.remove('valid');
  }
  console.log(fields);
  let inValidFields = [].some.call(
    fields,
    inp => !inp.classList.contains('valid')
  );
  // If all inputs are valid
  if (!inValidFields) {
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
