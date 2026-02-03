// Language switching functionality
(function() {
    'use strict';
    
    // Default language
    let currentLang = localStorage.getItem('clawnode-lang') || 'en';
    
    // DOM elements
    const langSwitch = document.getElementById('langSwitch');
    const langCurrent = langSwitch.querySelector('.lang-current');
    const langAlt = langSwitch.querySelector('.lang-alt');
    
    // Initialize
    function init() {
        updateLanguage(currentLang);
        updateLangSwitchUI(currentLang);
        
        // Event listener
        langSwitch.addEventListener('click', toggleLanguage);
    }
    
    // Toggle between languages
    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('clawnode-lang', currentLang);
        updateLanguage(currentLang);
        updateLangSwitchUI(currentLang);
    }
    
    // Update language switch UI
    function updateLangSwitchUI(lang) {
        if (lang === 'en') {
            langCurrent.textContent = 'EN';
            langAlt.textContent = '中';
        } else {
            langCurrent.textContent = '中';
            langAlt.textContent = 'EN';
        }
    }
    
    // Update all translatable elements
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-en][data-zh]');
        
        elements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // Handle HTML content
                if (text.includes('&quot;') || text.includes('&lt;') || text.includes('&gt;')) {
                    el.innerHTML = text
                        .replace(/&quot;/g, '"')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>');
                } else {
                    el.textContent = text;
                }
            }
        });
        
        // Update html lang attribute
        document.documentElement.lang = lang;
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Smooth scroll for anchor links
(function() {
    'use strict';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
})();

// Add scroll-based nav background enhancement
(function() {
    'use strict';
    
    const nav = document.querySelector('.nav');
    let ticking = false;
    
    function updateNav() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });
})();
