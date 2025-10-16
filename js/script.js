// ملف JavaScript الرئيسي لموقع سطحة نقل السيارات

// تشغيل الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    
    // تفعيل التنقل النشط
    setActiveNavigation();
    
    // تفعيل تأثيرات التمرير
    initScrollEffects();
    
    // تفعيل زر العودة للأعلى
    initScrollToTop();
    
    // تفعيل نموذج الاتصال
    initContactForm();
    
    // تفعيل معرض الصور
    initGallery();
    
    // تفعيل العد التنازلي للإحصائيات
    initCounters();
    
    // تفعيل التنقل السلس
    initSmoothScrolling();
});

// تفعيل التنقل النشط
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// تأثيرات التمرير
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر التي تحتاج تأثير الظهور
    const elementsToAnimate = document.querySelectorAll('.service-card, .gallery-item, .contact-item, .section-title');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// زر العودة للأعلى
function initScrollToTop() {
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// نموذج الاتصال
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // التحقق من صحة البيانات
            if (validateForm(data)) {
                // محاكاة إرسال النموذج
                showMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                contactForm.reset();
            }
        });
    }
}

// التحقق من صحة النموذج
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('يرجى إدخال اسم صحيح');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('يرجى إدخال رقم هاتف صحيح');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('يرجى إدخال رسالة تحتوي على 10 أحرف على الأقل');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
    const phoneRegex = /^(05|5)[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// عرض الرسائل
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = '#28a745';
    } else {
        messageDiv.style.background = '#dc3545';
    }
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // تأثير الظهور
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // إزالة الرسالة بعد 5 ثوان
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// معرض الصور
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
}

// فتح معرض الصور المكبر
function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // إغلاق المعرض عند النقر
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    // إغلاق المعرض بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
    });
}

// العدادات المتحركة
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // مدة العد بالميلي ثانية
                const increment = target / (duration / 16); // 60 FPS
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// التنقل السلس
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // مراعاة ارتفاع الهيدر
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// تفعيل القائمة المتجاوبة للهواتف
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // إغلاق القائمة عند النقر على رابط
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// تحسين الأداء - تأخير تحميل الصور
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// تحديث الوقت الحالي
function updateCurrentTime() {
    const timeElements = document.querySelectorAll('.current-time');
    
    if (timeElements.length > 0) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        timeElements.forEach(element => {
            element.textContent = timeString;
        });
    }
}

// تحديث الوقت كل دقيقة
setInterval(updateCurrentTime, 60000);

// طلب خدمة سريع
function requestService(serviceType) {
    const phone = '0500000000'; // رقم الهاتف الافتراضي
    const message = `أريد طلب خدمة ${serviceType}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// إضافة مستمعي الأحداث للأزرار
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('service-request-btn')) {
        const serviceType = e.target.getAttribute('data-service');
        requestService(serviceType);
    }
});

// تحسين تجربة المستخدم - إضافة تأثيرات الحركة
function addHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .contact-item, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// تشغيل التحسينات الإضافية
setTimeout(() => {
    initMobileMenu();
    initLazyLoading();
    updateCurrentTime();
    addHoverEffects();
}, 1000);
