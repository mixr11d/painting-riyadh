/**
 * Universal Autonomous Tracking & Mobile Engine - All Pages
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 */

// =========================================================================
// 1. إعدادات الحملة الإعلانية المركزية
// =========================================================================
const CLIENT_PHONE = '0534953831';
const CLIENT_INT_PHONE = '966534953831';

const GOOGLE_ADS_ID = 'AW-17812962041'; 
const CONVERSION_LABEL_CALL = '14RnCMm-nfgcEPn18K1C'; 
const CONVERSION_LABEL_WHATSAPP = '3iEbCMy-nfgcEPn18K1C'; 
const CONVERSION_LABEL_FORM = 'T-M8CLi2pPgcEPn18K1C'; 

// =========================================================================
// 2. التهيئة القياسية لـ Google Tag في كل صفحات الموقع
// =========================================================================
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('js', new Date());
gtag('config', GOOGLE_ADS_ID);

// حقن مكتبة Google Tag في أي صفحة تُفتح تلقائياً
(function injectGoogleTag() {
  if (GOOGLE_ADS_ID && !document.getElementById('google-ads-tag')) {
    const scriptTag = document.createElement('script');
    scriptTag.id = 'google-ads-tag';
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(scriptTag);
  }
})();

// دالة إرسال الإحالة الرسمية والمعتمدة من Google
function triggerGoogleConversion(label, callbackUrl) {
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID && label) {
    let fired = false;
    function fireCallback() {
      if (!fired && callbackUrl) {
        fired = true;
        window.location.href = callbackUrl;
      }
    }

    // إرسال حدث التحويل
    console.log('===> [Google Ads Conversion] تم إرسال الإحالة برمز:', label);
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/${label}`,
      'event_callback': fireCallback
    });

    // مهلة احتياطية للأمان
    setTimeout(fireCallback, 500);
  } else if (callbackUrl) {
    window.location.href = callbackUrl;
  }
}

// دوال عامة للاستدعاء اليدوي إذا وُجدت
window.handleTrackedCall = function(event) {
  triggerGoogleConversion(CONVERSION_LABEL_CALL);
};

window.handleTrackedWhatsApp = function(event) {
  triggerGoogleConversion(CONVERSION_LABEL_WHATSAPP);
};

window.handleTrackedForm = function(event) {
  triggerGoogleConversion(CONVERSION_LABEL_FORM);
};

window.reportConversion = function(conversionType, targetUrl) {
  let label = CONVERSION_LABEL_WHATSAPP;
  if (conversionType === 'call') label = CONVERSION_LABEL_CALL;
  if (conversionType === 'form') label = CONVERSION_LABEL_FORM;
  triggerGoogleConversion(label, targetUrl);
};

// =========================================================================
// 3. راصد النقرات الشامل لجميع الصفحات (Universal Global Event Listener)
// =========================================================================

// رصد أزرار النماذج فور النقر في مرحلة الـ Capture لضمان التقاط الإحالة قبل أي شيء
document.addEventListener('click', (e) => {
  // رصد زر إرسال أي نموذج في أي صفحة
  const submitBtn = e.target.closest('button[type="submit"], input[type="submit"], .btn-primary');
  const parentForm = e.target.closest('form');
  if (submitBtn && parentForm) {
    triggerGoogleConversion(CONVERSION_LABEL_FORM);
  }

  // رصد روابط الاتصال والواتساب
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href') || '';

  // استبعاد رقم المطور
  if (href.includes('0578539687') || href.includes('966578539687')) {
    return;
  }

  // تتبع أي اتصال هاتفي في أي صفحة
  if (href.startsWith('tel:') || href.includes(CLIENT_PHONE)) {
    triggerGoogleConversion(CONVERSION_LABEL_CALL);
  }

  // تتبع أي رابط واتساب في أي صفحة
  if (href.includes('wa.me') || href.includes(CLIENT_INT_PHONE)) {
    triggerGoogleConversion(CONVERSION_LABEL_WHATSAPP);
  }
}, true); // true تعني تفعيل مرحلة Capture لسبق أي حدث آخر

document.addEventListener('DOMContentLoaded', () => {

  // إذا وصل الزائر لصفحة الشكر في أي وقت يتم تسجيل إحالة النموذج
  if (window.location.pathname.includes('thank-you')) {
    triggerGoogleConversion(CONVERSION_LABEL_FORM);
  }

  // رصد إرسال أي نموذج تسعير أو تواصل في أي صفحة بالموقع
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // إرسال إحالة النموذج فوراً
      triggerGoogleConversion(CONVERSION_LABEL_FORM);

      const serviceInput = form.querySelector('#formService, select[name="service"]');
      const areaInput = form.querySelector('#formArea, input[name="area"]');
      const districtInput = form.querySelector('#formDistrict, input[name="district"]');

      const service = serviceInput ? serviceInput.value : 'طلب خدمات دهانات';
      const area = areaInput ? areaInput.value : 'غير محدد';
      const district = districtInput ? districtInput.value : 'الرياض';

      const msg = `مرحباً، أود طلب تسعيرة فورية للمتر من مؤسسة الأول للدهانات:\n- الخدمة: ${service}\n- المساحة: ${area} م\n- الحي: ${district}`;
      const targetUrl = `https://wa.me/${CLIENT_INT_PHONE}?text=${encodeURIComponent(msg)}`;

      // فتح الواتساب دون إغلاق صفحة الفحص الحالية
      setTimeout(() => {
        window.open(targetUrl, '_blank') || (window.location.href = targetUrl);
      }, 350);
    });
  });

  // التحكم بالقوائم ودرج الجوال في جميع الصفحات
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  if (menuToggle && mobileDrawer && drawerBackdrop) {
    menuToggle.addEventListener('click', () => {
      const active = mobileDrawer.classList.toggle('active');
      drawerBackdrop.classList.toggle('active', active);
      menuToggle.classList.toggle('active', active);
      document.body.style.overflow = active ? 'hidden' : '';
    });

    drawerBackdrop.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // أكورديون الخدمات
  const servicesToggle = document.getElementById('mobileServicesToggle');
  const servicesList = document.getElementById('mobileServicesList');
  if (servicesToggle && servicesList) {
    servicesToggle.addEventListener('click', () => {
      servicesList.classList.toggle('open');
    });
  }

  // زر الصعود للأعلى
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 380) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // أكورديون الأسئلة الشائعة
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.parentElement;
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
      if (!isOpen) {
        card.classList.add('open');
      }
    });
  });
});
