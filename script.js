/**
 * Core Architectural Engine & Google Ads Tracking Architecture
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 */

// إعدادات الحسابات والإحالات المعتمدة
const CONFIG = {
  adsId: 'AW-17812962041',
  labels: {
    call: '14RnCMm-nfgcEPn18K1C',
    whatsapp: '3iEbCMy-nfgcEPn18K1C',
    form: 'T-M8CLi2pPgcEPn18K1C'
  },
  clientPhoneClean: '966534953831'
};

// تهيئة مصفوفة dataLayer فوراً
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', CONFIG.adsId);

// دالة تسجيل الإحالة المباشرة بدون أي حظر لتجاوز الفحص فوراً
function reportConversion(conversionType, targetUrl) {
  let label = CONFIG.labels.whatsapp;
  if (conversionType === 'call') label = CONFIG.labels.call;
  if (conversionType === 'form') label = CONFIG.labels.form;

  const sendToTag = `${CONFIG.adsId}/${label}`;
  
  // إرسال الإحالة لقوقل فوراً
  gtag('event', 'conversion', {
    send_to: sendToTag,
    event_callback: function() {
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  });

  // صمام أمان بعد 500 ملي ثانية
  setTimeout(function() {
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  }, 500);
}

// تشغيل القوائم والتفاعل بعد تحميل الصفحة
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

  // نموذج وحاسبة التسعير السريع المربوط بالواتساب
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

// الدوال العامة لأزرار الاتصال والواتساب
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

// تسجيل Service Worker للـ PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration skipped: ', err);
    });
  });
}
