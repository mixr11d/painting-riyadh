/**
 * Core Architectural Engine & Google Ads Tracking Architecture
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 * Developer Number: 0578539687
 */

// 1. إعدادات الحسابات والإحالات المعتمدة
const CONFIG = {
  adsId: 'AW-17812962041',
  labels: {
    call: '14RnCMm-nfgcEPn18K1C',
    whatsapp: '3iEbCMy-nfgcEPn18K1C',
    form: 'T-M8CLi2pPgcEPn18K1C'
  },
  clientPhoneClean: '966534953831'
};

// 2. تهيئة مصفوفة dataLayer فوراً في الذاكرة
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', CONFIG.adsId);

// 3. حقن سكربت قوقل الرسمي في ترويسة الصفحة فوراً دون أي تأخير ليتعرف عليه Tag Assistant
(function() {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.adsId}`;
  document.head.appendChild(script);
})();

// 4. إزالة أي حظر سابق تلقائياً لضمان نجاح الفحص
try {
  localStorage.removeItem('block_ads_tracking');
} catch (e) {}

// فحص الجلسة (يسمح دائماً بالتتبع أثناء وجود أداة Tag Assistant)
function isDeveloperSession() {
  const urlParams = new URLSearchParams(window.location.search);
  // إذا كانت أداة فحص قوقل تعمل، لا تقم بالحظر أبداً
  if (urlParams.has('gtm_debug') || urlParams.has('tag_assistant') || window.location.href.includes('google')) {
    return false;
  }
  // الحظر يعمل فقط إذا أضفت الرابط يدوياً بـ ?dev_preview=true
  return urlParams.get('dev_preview') === 'true';
}

// 5. دالة تسجيل الإحالة المحصنة والخالية من الأخطاء
function reportConversion(conversionType, targetUrl) {
  if (isDeveloperSession()) {
    console.info('[Tracking Blocked]: وضع المعاينة التجريبي مفعّل.');
    if (targetUrl) window.location.href = targetUrl;
    return;
  }

  let label = CONFIG.labels.whatsapp;
  if (conversionType === 'call') label = CONFIG.labels.call;
  if (conversionType === 'form') label = CONFIG.labels.form;

  const sendToTag = `${CONFIG.adsId}/${label}`;
  console.log('--> جاري إرسال الإحالة إلى قوقل:', sendToTag);

  let callbackExecuted = false;
  const executeCallback = () => {
    if (!callbackExecuted) {
      callbackExecuted = true;
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  };

  // صمام أمان زمني 600ms
  const safetyTimeout = setTimeout(executeCallback, 600);

  try {
    gtag('event', 'conversion', {
      send_to: sendToTag,
      event_callback: () => {
        clearTimeout(safetyTimeout);
        executeCallback();
      }
    });
  } catch (err) {
    clearTimeout(safetyTimeout);
    executeCallback();
  }
}

// 6. تشغيل القوائم والتفاعل والأزرار بعد جاهزية الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // قائمة الجوال
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.toggle('active');
    drawerBackdrop.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileDrawer && drawerBackdrop) {
    menuToggle.addEventListener('click', toggleMenu);
    drawerBackdrop.addEventListener('click', closeMenu);
  }

  // أكورديون الخدمات بدرج الجوال
  const accordionToggle = document.getElementById('mobileServicesToggle');
  const accordionContent = document.getElementById('mobileServicesList');
  if (accordionToggle && accordionContent) {
    accordionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      accordionContent.classList.toggle('open');
    });
  }

  // زر الصعود للأعلى
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      scrollBtn && scrollBtn.classList.add('visible');
    } else {
      scrollBtn && scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // أكورديون الأسئلة الشائعة
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.parentElement;
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
      if (!isOpen) {
        card.classList.add('open');
      }
    });
  });

  // حاسبة ونموذج التسعير السريع المربوط بالواتساب
  const quoteForm = document.getElementById('quickQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('formService') ? document.getElementById('formService').value : 'دهانات عامة';
      const area = document.getElementById('formArea') ? document.getElementById('formArea').value : 'غير محدد';
      const district = document.getElementById('formDistrict') ? document.getElementById('formDistrict').value : 'الرياض';

      const messageText = `مرحباً، أود طلب تسعيرة فورية للمتر من مؤسسة الأول للدهانات:\n- نوع الخدمة: ${service}\n- المساحة التقديرية: ${area} متر\n- الحي المستهدف: ${district}\nيرجى التواصل معي بالتفاصيل والتكلفة.`;
      
      const encodedMsg = encodeURIComponent(messageText);
      const waUrl = `https://wa.me/${CONFIG.clientPhoneClean}?text=${encodedMsg}`;

      reportConversion('form', waUrl);
    });
  }
});

// 7. الدوال العامة المربوطة بأزرار الاتصال والواتساب
window.handleTrackedWhatsApp = function(event, defaultText) {
  if (event) event.preventDefault();
  const text = defaultText || 'مرحباً، أود الاستفسار عن خدمات الدهانات بالرياض وطلب معاينة مجانية';
  const url = `https://wa.me/${CONFIG.clientPhoneClean}?text=${encodeURIComponent(text)}`;
  reportConversion('whatsapp', url);
};

window.handleTrackedCall = function(event) {
  if (event) event.preventDefault();
  const url = `tel:+${CONFIG.clientPhoneClean}`;
  reportConversion('call', url);
};

// 8. مشغل الخدمة PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration skipped: ', err);
    });
  });
}
