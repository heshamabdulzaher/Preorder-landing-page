const FAQs = {
  en: [
    {
      question: '_________',
      answer: '_____'
    },
    {
      question: '_________',
      answer: '_____'
    },
    {
      question: '_________',
      answer: '_____'
    }
  ],
  ar: [
    {
      question: 'ماذا يحدث لمعلومات نموذج العميل؟',
      answer:
        'يتم إيصالها إلى فريق المبيعات الذي يتصل بالعميل لإكمال طلب الحجز المسبق.'
    },
    {
      question: 'من أين يحصل العميل على جهازه؟',
      answer:
        'سيقوم موظف المبيعات بإرشاد العميل إلى استلام جهازه من أحد الفروع أو توصيله له (بناءً على موقع العميل).'
    },
    {
      question: 'هل تقدم الهدية مع الأجهزة في كل الأحوال؟',
      answer: 'لا، الهدية مع طلبات التسجيل المسبق فقط'
    }
  ]
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
  animatedElements.forEach(el => {
    if (el.offsetTop + 100 < window.scrollY + window.innerHeight) {
      el.classList.add('animated');
      el.classList.remove('has-animation');
    }
  });
}
fireAnimations();
