/**
 * Core Architectural Engine & Google Ads Tracking Architecture
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 * Developer Number: 0578539687
 */

// تهيئة مصفوفة dataLayer فورياً لمنع فقدان النقرات قبل تحميل السكربت
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }

// إعدادات التتبع
const CONFIG = {
  adsId: 'AW-XXXXXXXXXXX',
  labels: {
    call: 'XXXXXXXXXXXXXXXXXX',
    whatsapp: 'XXXXXXXXXXXXXXXXXX',
    form: 'XXXXXXXXXXXXXXXXXX'
  },
  clientPhoneClean: '966534953831',
  devPhones: ['0578539687', '966578539687']
};

// فحص واستثناء المطور برمجياً
function isDeveloperSession() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev_preview') === 'true' || urlParams.get('developer') === '1') {
      localStorage.setItem('block_ads_tracking', 'true');
      return true;
    }
    return localStorage.getItem('block_ads_tracking') === 'true';
  } catch (e) {
    return false;
  }
}

// دالة تسجيل التحويل مع صمام أمان زمني ضد AdBlockers
function reportConversion(conversionType, targetUrl) {
  const isDev = isDeveloperSession();
  
  // تحويل مباشر للمطورين دون تسجيل إحالة
  if (isDev) {
    console.info('[Tracking Blocked]: جلسة تطوير أو معاينة. لن يتم احتساب الإحالة لمنع حرق الميزانية.');
    if (targetUrl) window.location.href = targetUrl;
    return;
  }

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

  // صمام أمان مدته 600 ملي ثانية
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

// تحميل كود gtag.js في وضع الخمول (requestIdleCallback) للأداء 100/100 في Core Web Vitals
function loadGoogleAnalyticsDeferred() {
  const loadScript = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.adsId}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', CONFIG.adsId);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadScript, { timeout: 2500 });
  } else {
    setTimeout(loadScript, 2000);
  }
}

// إدارة القائمة بالجوال والأكورديون
document.addEventListener('DOMContentLoaded', () => {
  loadGoogleAnalyticsDeferred();

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
      
      // إغلاق باقي الأسئلة
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

      // تسجيل إحالة النموذج والانتقال للواتساب
      reportConversion('form', waUrl);
    });
  }
});

// دوال تتبع مباشرة للاستدعاء من HTML
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

// تسجيل Service Worker للـ PWA والتصفح أوفلاين
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration skipped: ', err);
    });
  });
}
