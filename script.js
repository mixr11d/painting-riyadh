/**
 * Core Architectural Engine & Google Ads Tracking Architecture
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 * Developer Number: 0578539687
 */

// 1. إعدادات التتبع والحسابات
const CONFIG = {
  adsId: 'AW-17812962041',
  labels: {
    call: '14RnCMm-nfgcEPn18K1C',
    whatsapp: '3iEbCMy-nfgcEPn18K1C',
    form: 'T-M8CLi2pPgcEPn18K1C'
  },
  clientPhoneClean: '966534953831',
  devPhones: ['0578539687', '966578539687']
};

// 2. تهيئة مصفوفة dataLayer وتجهيز قوقل فورياً في الذاكرة
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', CONFIG.adsId);

// 3. فحص واستثناء المطور برمجياً مع إمكانية فك الحظر للاختبار
function isDeveloperSession() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev_preview') === 'false' || urlParams.get('developer') === '0') {
      localStorage.removeItem('block_ads_tracking');
      console.info('[Tracking Enabled]: تم تفعيل التتبع بنجاح للاختبار.');
      return false;
    }
    if (urlParams.get('dev_preview') === 'true' || urlParams.get('developer') === '1') {
      localStorage.setItem('block_ads_tracking', 'true');
      return true;
    }
    return localStorage.getItem('block_ads_tracking') === 'true';
  } catch (e) {
    return false;
  }
}

// 4. تحميل كود قوقل بشكل غير حاجب للمعالج (Async & Non-blocking)
let gtagLoaded = false;
function loadGoogleTagScript() {
  if (gtagLoaded) return;
  gtagLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.adsId}`;
  document.head.appendChild(script);
}

// 5. دالة تسجيل الإحالة المحصنة ضد الضياع وموانع الإعلانات
function reportConversion(conversionType, targetUrl) {
  const isDev = isDeveloperSession();
  
  // استثناء جلسات المطورين من حرق الميزانية
  if (isDev) {
    console.info('[Tracking Blocked]: جلسة تطوير أو معاينة. لن يتم إرسال الإحالة لقوقل.');
    if (targetUrl) window.location.href = targetUrl;
    return;
  }

  // فرض تحميل السكربت فوراً إذا لم يكن قد بدأ بعد
  loadGoogleTagScript();

  let label = CONFIG.labels.whatsapp;
  if (conversionType === 'call') label = CONFIG.labels.call;
  if (conversionType === 'form') label = CONFIG.labels.form;

  const sendToTag = `${CONFIG.adsId}/${label}`;
  let callbackExecuted = false;

  const executeCallback = () => {
    if (!callbackExecuted) {
      callbackExecuted = true;
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  };

  // صمام أمان (Safety Timeout) 600ms لضمان عدم تعليق الزائر
  const safetyTimeout = setTimeout(executeCallback, 600);

  try {
    gtag('event', 'conversion', {
      send_to: sendToTag,
      transport_type: 'beacon',
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

// 6. تشغيل الأحداث والتفاعل بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // بدء تحميل سكربت قوقل في الخلفية دون أي تأخير مفرط
  loadGoogleTagScript();

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

  // أكورديون الخدمات
  const accordionToggle = document.getElementById('mobileServicesToggle');
  const accordionContent = document.getElementById('mobileServicesList');
  if (accordionToggle && accordionContent) {
    accordionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      accordionContent.classList.toggle('open');
    });
  }

  // زر الصعود لأعلى
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

// 7. الدوال العامة للاستدعاء المباشر من أزرار الموقع
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

// 8. تسجيل Service Worker للـ PWA والتصفح أوفلاين
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration skipped: ', err);
    });
  });
}
