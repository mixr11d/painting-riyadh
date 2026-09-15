/**
 * All-In-One Google Ads Conversion Engine (Call + WhatsApp + Form)
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 */

// معرفات الإحالات الثلاثة المعتمدة في حسابك
const ADS_CONFIG = {
  id: 'AW-17812962041',
  phone: '966534953831',
  labels: {
    call: '14RnCMm-nfgcEPn18K1C',      // إحالة الاتصال
    whatsapp: '3iEbCMy-nfgcEPn18K1C',  // إحالة الواتساب
    form: 'T-M8CLi2pPgcEPn18K1C'      // إحالة النموذج
  }
};

// تهيئة وإطلاق كود قوقل فوراً في ترويسة المتصفح
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', ADS_CONFIG.id);

(function() {
  const gScript = document.createElement('script');
  gScript.async = true;
  gScript.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_CONFIG.id}`;
  document.head.appendChild(gScript);
})();

// دالة إرسال الإحالة لقوقل
function sendGoogleConversion(type, redirectUrl) {
  let label = ADS_CONFIG.labels.whatsapp;
  if (type === 'call') label = ADS_CONFIG.labels.call;
  if (type === 'form') label = ADS_CONFIG.labels.form;

  const sendTo = `${ADS_CONFIG.id}/${label}`;
  console.log('===> تم إرسال الإحالة بنجاح لقوقل:', sendTo);

  let done = false;
  const proceed = () => {
    if (!done) {
      done = true;
      if (redirectUrl) window.location.href = redirectUrl;
    }
  };

  // صمام أمان زمني 500ms
  const timer = setTimeout(proceed, 500);

  try {
    gtag('event', 'conversion', {
      'send_to': sendTo,
      'event_callback': function() {
        clearTimeout(timer);
        proceed();
      }
    });
  } catch (err) {
    clearTimeout(timer);
    proceed();
  }
}

// رصد النقرات التلقائي في كافة صفحات الموقع
document.addEventListener('DOMContentLoaded', () => {
  // رصد نقرات الاتصال والواتساب أينما وجدت في الصفحة
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    // نقرة اتصال هاتفي
    if (href.startsWith('tel:')) {
      e.preventDefault();
      sendGoogleConversion('call', href);
    }

    // نقرة واتساب
    if (href.includes('wa.me')) {
      e.preventDefault();
      sendGoogleConversion('whatsapp', href);
    }
  });

  // رصد نموذج طلب التسعير الفوري
  const form = document.getElementById('quickQuoteForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('formService') ? document.getElementById('formService').value : 'دهانات';
      const area = document.getElementById('formArea') ? document.getElementById('formArea').value : 'غير محدد';
      const district = document.getElementById('formDistrict') ? document.getElementById('formDistrict').value : 'الرياض';

      const msg = `مرحباً، أود طلب تسعيرة للمتر:\n- الخدمة: ${service}\n- المساحة: ${area} م\n- الحي: ${district}`;
      const waUrl = `https://wa.me/${ADS_CONFIG.phone}?text=${encodeURIComponent(msg)}`;

      // إرسال إحالة النموذج والانتقال للواتساب
      sendGoogleConversion('form', waUrl);
    });
  }

  // التحكم بالقوائم والأكورديون
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  if (menuToggle && mobileDrawer && drawerBackdrop) {
    menuToggle.addEventListener('click', () => {
      const active = mobileDrawer.classList.toggle('active');
      drawerBackdrop.classList.toggle('active', active);
      menuToggle.classList.toggle('active', active);
    });
    drawerBackdrop.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  }

  const servicesToggle = document.getElementById('mobileServicesToggle');
  const servicesList = document.getElementById('mobileServicesList');
  if (servicesToggle && servicesList) {
    servicesToggle.addEventListener('click', () => servicesList.classList.toggle('open'));
  }

  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) scrollBtn && scrollBtn.classList.add('visible');
    else scrollBtn && scrollBtn.classList.remove('visible');
  }, { passive: true });

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.parentElement;
      const open = card.classList.contains('open');
      document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
      if (!open) card.classList.add('open');
    });
  });
});

// دوال الاستدعاء المباشر للأزرار التي تحتوي على onclick
window.handleTrackedWhatsApp = function(event, defaultText) {
  if (event) event.preventDefault();
  const text = defaultText || 'مرحباً، أود الاستفسار عن خدمات الدهانات بالرياض';
  sendGoogleConversion('whatsapp', `https://wa.me/${ADS_CONFIG.phone}?text=${encodeURIComponent(text)}`);
};

window.handleTrackedCall = function(event) {
  if (event) event.preventDefault();
  sendGoogleConversion('call', `tel:+${ADS_CONFIG.phone}`);
};

// تسجيل مشغل الخدمة PWA المحدث
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
