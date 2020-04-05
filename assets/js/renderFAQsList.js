const FAQs = {
  en: [
    {
      question: 'I sent my Pre-registration form, what’s next?',
      answer:
        'We will contact you using the contact details in the form to complete your order.',
    },
    {
      question: 'When and where can I get my device?',
      answer:
        'The devices will be available starting April 15 2020, and we will deliver the device to the customer or advise himher to pick it up from one of our stores (based on the customer location).',
    },
    {
      question: 'Is the gift coming with the devices any ways?',
      answer: 'No, the gift is with the pre-registration orders only.',
    },
  ],
  ar: [
    {
      question: 'قمت بإرسال طلب حجز الجهاز، ما هي الخطوة القادمة؟',
      answer:
        'سنقوم بالتواصل معك من خلال معلومات الاتصال المقدمة في طلب حجز الجهاز لإتمام الطلب و تأكيد الحجز',
    },
    {
      question: 'متى و كيف احصل على جهازي؟',
      answer:
        'سيكون الجهاز متوفرا ابتداء من تاريخ 15 ابريل 2020 ، و سيتم توصيل الجهاز للعميل او ارساله لاحد الفروع لاستلامه من الفرع (حسب موقع العميل)',
    },
    {
      question: 'هل تقدم الهدية مع الأجهزة في كل الأحوال؟',
      answer: 'لا، الهدية مع طلبات التسجيل المسبق فقط',
    },
  ],
};

let lang;
if (window.location.pathname === '/en/') {
  lang = 'en';
} else {
  lang = 'ar';
}

const FAQsListContainer = document.querySelector('.FAQs-list');

// Render FAQs list
function render() {
  FAQsListContainer.innerHTML = FAQs[lang]
    .map((li, i) => {
      return `
              <li style="animation-delay: ${i * 0.1 + 0.3}s">
                  <div class="question" onclick="toggleExpandingPanels(event)">
                      <div>${li.question}</div>
                      
                      <div class="arrow-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF375E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                  </div>
                  <p class="answer">${li.answer}</p>
              </li>
              `;
    })
    .join('');
}
render();

function toggleExpandingPanels(e) {
  e.target.closest('li').classList.toggle('expand');
}

// Animations
const animatedElements = document.querySelectorAll('.has-animation');
document.addEventListener('scroll', fireAnimations);

function fireAnimations() {
  animatedElements.forEach((el) => {
    if (el.offsetTop + 100 < window.scrollY + window.innerHeight) {
      el.classList.add('animated');
      el.classList.remove('has-animation');
    }
  });
}
fireAnimations();
