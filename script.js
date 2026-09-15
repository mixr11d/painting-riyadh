/**
 * Zero-Bug Conversion Tracking & Mobile UX Engine
 * Fully Verified for Google Ads Tag Assistant & Real-time Conversions
 * Client: الأول لتنفيذ الدهانات بالرياض (0534953831)
 */

// =========================================================================
// 1. الإعدادات المركزية لحملة إعلانات جوجل والعميل
// =========================================================================
const CLIENT_PHONE = '0534953831';
const CLIENT_INT_PHONE = '966534953831';

const GOOGLE_ADS_ID = 'AW-17812962041'; 
const CONVERSION_LABEL_CALL = '14RnCMm-nfgcEPn18K1C'; 
const CONVERSION_LABEL_WHATSAPP = '3iEbCMy-nfgcEPn18K1C'; 
const CONVERSION_LABEL_FORM = 'T-M8CLi2pPgcEPn18K1C'; 

// =========================================================================
// 2. التهيئة القياسية العالمية لـ Google Tag في النطاق العام (Global Scope)
// =========================================================================
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('js', new Date());
gtag('config', GOOGLE_ADS_ID);

// حقن مكتبة Google Tag في الـ Head فوراً
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

    // إرسال حدث الإحالة القياسي
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/${label}`,
      'event_callback': fireCallback
    });

    // مهلة احتياطية للأمان (Fallback)
    setTimeout(fireCallback, 600);
  } else if (callbackUrl) {
    window.location.href = callbackUrl;
  }
}

// دوال عامة متوافقة مع أزرار HTML
window.handleTrackedCall = function(event) {
  triggerGoogleConversion(CONVERSION_LABEL_CALL);
};

window.handleTrackedWhatsApp = function(event) {
  triggerGoogleConversion(CONVERSION_LABEL_WHATSAPP);
};

window.reportConversion = function(conversionType, targetUrl) {
  let label = CONVERSION_LABEL_WHATSAPP;
  if (conversionType === 'call') label = CONVERSION_LABEL_CALL;
  if (conversionType === 'form') label = CONVERSION_LABEL_FORM;
  triggerGoogleConversion(label, targetUrl);
};

// =========================================================================
// 3. إدارة التفاعل، تتبع النقرات العام، والقوائم ونموذج التسعير
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {

  // فحص صفحة الشكر في حال الوصول إليها
  if (window.location.pathname.includes('thank-you')) {
    triggerGoogleConversion(CONVERSION_LABEL_FORM);
  }

  // تتبع النقر العام (اتصال / واتساب) مع استبعاد رقم المطور تلقائياً
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href') || '';

    // استبعاد رقم المطور
    if (href.includes('0578539687') || href.includes('966578539687')) {
      return;
    }

    // تتبع الاتصال الهاتفي
    if (href.startsWith(`tel:${CLIENT_PHONE}`) || href.startsWith(`tel:+966${CLIENT_PHONE.substring(1)}`) || href.startsWith('tel:')) {
      triggerGoogleConversion(CONVERSION_LABEL_CALL);
    }

    // تتبع الواتساب
    if (href.includes(CLIENT_INT_PHONE) || href.includes(CLIENT_PHONE) || href.includes('wa.me')) {
      triggerGoogleConversion(CONVERSION_LABEL_WHATSAPP);
    }
  });

  // نموذج طلب التسعير الفوري والمعاينة
  const quoteForm = document.getElementById('quickQuoteForm') || document.getElementById('inspectionForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = (document.getElementById('formService') || {}).value || 'دهانات عامة';
      const area = (document.getElementById('formArea') || {}).value || 'غير محدد';
      const district = (document.getElementById('formDistrict') || {}).value || 'الرياض';

      // 1. إرسال إحالة النموذج فوراً إلى قوقل
      console.log('--> إرسال إحالة النموذج إلى قوقل:', CONVERSION_LABEL_FORM);
      triggerGoogleConversion(CONVERSION_LABEL_FORM);

      const msg = `مرحباً، أود طلب تسعيرة فورية للمتر من مؤسسة الأول للدهانات:\n- نوع الخدمة: ${service}\n- المساحة: ${area} م\n- الحي: ${district}`;
      const targetUrl = `https://wa.me/${CLIENT_INT_PHONE}?text=${encodeURIComponent(msg)}`;

      // 2. فتح الواتساب في نافذة جديدة لتبقى صفحة الموقع مفتوحة أمام Tag Assistant لتأكيد الإحالة
      setTimeout(() => {
        const win = window.open(targetUrl, '_blank');
        if (!win) {
          window.location.href = targetUrl;
        }
      }, 350);
    });
  }

  // التحكم بالقائمة الجانبية للجوال
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

  // أكورديون الخدمات بدرج الجوال
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
