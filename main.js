// ClawNode Language Switcher
(function() {
    'use strict';
    
    const currentLang = () => localStorage.getItem('clawnode-lang') || 'en';
    
    const updateUI = (lang) => {
        // Update button
        const btn = document.getElementById('langBtn');
        const active = btn.querySelector('.lang-active');
        const inactive = btn.querySelector('.lang-inactive');
        
        if (lang === 'en') {
            active.textContent = 'EN';
            inactive.textContent = '中';
        } else {
            active.textContent = '中';
            inactive.textContent = 'EN';
        }
        
        // Update content
        document.querySelectorAll('[data-en][data-zh]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.innerHTML = text.replace(/&quot;/g, '"');
            }
        });
        
        document.documentElement.lang = lang;
    };
    
    const toggle = () => {
        const newLang = currentLang() === 'en' ? 'zh' : 'en';
        localStorage.setItem('clawnode-lang', newLang);
        updateUI(newLang);
    };
    
    // Init
    document.addEventListener('DOMContentLoaded', () => {
        updateUI(currentLang());
        document.getElementById('langBtn').addEventListener('click', toggle);
    });
})();
