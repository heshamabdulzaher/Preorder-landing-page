const FAQs = {
  ar: [
    {
      question: 'كيف أسجل؟',
      answer:
        'حمّل تطبيق مارافون من متجر التطبيقات، وسجّل فيه باستخدام رقم جوالك السعودي، واكتب اسمك الأول واسمك الأخير، وبكذا تكون سجّلت في التطبيق!'
    },
    {
      question: 'كيف أشارك في الهدف الأسبوعي؟',
      answer:
        'يضيفك التطبيق تلقائيًا إلى المنافسة الأسبوعية من خلال تقديم هدف أسبوعي لك لتحققه، ويوصلك إشعار يوم الأحد بهدفك الأسبوعي التالي ومقدار المسافة اللي لازم تمشيها لتحقيق الهدف.'
    },
    {
      question: 'كيف تحدّثون نشاطي وحركتي؟',
      answer:
        'يحصل التطبيق على بيانات نشاطك من تطبيق Health على الـ iPhone ، وتطبيق Google Fit أو Samsung Health على الـ Android، وكل اللي عليك هو انك تفتح التطبيق مرة كل 3 أيام لنتمكن من تحديث بيانات تلقائياً.'
    },
    {
      question: 'متى يبدأ التحدي الأسبوعي ومتى ينتهي؟',
      answer:
        'يبدأ التحدي الأسبوعي يوم الأحد وينتهي يوم السبت من كل أسبوع، ويوصلك إشعار عند بداية التحدي، والنتائج اللي حققتها عند انتهاء التحدي.'
    },
    {
      question: 'كيف تختارون الفائزين أسبوعيًا؟',
      answer:
        'عند نهاية التحدي الأسبوعي، تحصل اللجنة الخاصة بنا على بيانات المشاركين اللي حققوا هدف الأسبوع ويكون هناك سحب عشوائي لاختيار الفائز بالجائزة الأسبوعية.'
    }
  ]
};
const FAQsListContainer = document.querySelector('.FAQs-list');

// Render FAQs list
function render() {
  FAQsListContainer.innerHTML = FAQs.ar
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
