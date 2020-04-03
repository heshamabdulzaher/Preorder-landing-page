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
const fields = document.querySelectorAll(
  '#userInfoForm .fields-container input[name]'
);
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
  if (submittedData.cityId) {
    submittedData.cityId = Number.parseInt(submittedData.cityId);
  } else {
    submittedData.cityId = null;
  }
  if (submittedData.districtId) {
    submittedData.districtId = Number.parseInt(submittedData.districtId);
  } else {
    submittedData.districtId = null;
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
      document.querySelector('#userInfoForm').reset();
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

/* Geo Dropdowns */

function activateSubmitBtnSimple() {
  let inValidFields = [].some.call(
    fields,
    inp => !inp.classList.contains('valid')
  );
  if (!inValidFields && checkbox.checked) {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.add('active');
  } else {
    submitBtn.setAttribute('disabled', '');
    submitBtn.classList.remove('active');
  }
}

function loadGetDropdown(dropdown, endpoint, callback) {
  let lang = dropdown.dataset.lang;
  let wrap = dropdown.querySelector('.dropdown-wrap');
  wrap.innerHTML = '';
  dropdown.classList.add('disabled');
  dropdown.classList.remove('empty');
  let btn = dropdown.querySelector('button');
  btn.innerText = btn.dataset.default;
  let input = dropdown.querySelector('input[type=hidden]');
  input.value = '';
  input.classList.remove('valid');
  fetch('https://p40.laywagif.com/api/' + endpoint, {
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*'
    }
  })
    .then(res => res.json())
    .then(data => {
      data.data.map(item => {
        let a = document.createElement('a'),
          id = item.id,
          name = lang === 'ar' ? item.nameAr : item.nameEn;
        a.innerText = name;
        a.addEventListener('click', e => {
          e.stopPropagation();
          input.value = id;
          input.classList.add('valid');
          btn.innerText = name;
          dropdown.classList.remove('open');
          if (callback) {
            callback(id);
          }
          activateSubmitBtnSimple();
          return false;
        });
        wrap.append(a);
      });
      if (data.data.length > 0) {
        dropdown.classList.remove('disabled');
      } else {
        dropdown.classList.remove('disabled');
        dropdown.classList.add('empty'); // Dropdown is empty
        input.classList.add('valid');
      }
    });
}

const geoDropdowns = document.querySelectorAll('.dropdown-geo');

geoDropdowns.forEach(item => {
  const btn = item.querySelector('button');
  btn.innerText = btn.dataset.default;
  btn.addEventListener('click', e => {
    item.classList.toggle('open');
    item.querySelector('input').value = '';
    item.querySelectorAll('.dropdown-wrap a').forEach(a => {
      a.classList.remove('hide');
    });
    e.stopPropagation();
    e.preventDefault();
    return false;
  });
  item.querySelector('input[type=text]').addEventListener('keyup', e => {
    const val = e.target.value.toString().trim(),
      regexp = new RegExp(val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
    item.querySelectorAll('.dropdown-wrap a').forEach(a => {
      if (!val || regexp.test(a.innerHTML)) {
        a.classList.remove('hide');
      } else {
        a.classList.add('hide');
      }
    });
  });
});

const cityDropdown = document.querySelector('.dropdown-geo[data-param=city]'),
  districtDropdown = document.querySelector(
    '.dropdown-geo[data-param=district]'
  );
loadGetDropdown(cityDropdown, 'cities', id => {
  loadGetDropdown(districtDropdown, 'districts?city=' + id);
});
