// Get all inputs
const fields = document.querySelectorAll('form input');
const submitBtn = document.querySelector('.main-form .submit-btn');

fields.forEach(inp => {
  if (inp.type === 'checkbox') {
    inp.addEventListener('change', activateSubmitBtn);
  } else {
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
  console.log(formData);
  fetch('https://p40.laywagif.com/preorders', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(res => console.log(res));
}
