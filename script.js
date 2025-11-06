// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Variable to store the scroll position when the menu is open
let scrollPosition = 0; 

// ---------- Hamburger Menu Toggle (FINAL REVISION for iOS) ----------
hamburger.addEventListener('click', () => {
    // Check if the menu is currently open by checking the sidebar class
    const isMenuOpen = sidebar.classList.contains('open');

    if (isMenuOpen) {
        // --- CLOSING THE MENU ---
        sidebar.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        // Restore scroll position
        window.scrollTo(0, scrollPosition);
        
        // Remove inline styles used for scroll locking
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');

    } else {
        // --- OPENING THE MENU ---
        // 1. Record current scroll position
        scrollPosition = window.scrollY;
        
        // 2. Set scroll lock styles via JS to work with CSS
        // This is the core fix: it shifts the body up by the negative scroll amount and fixes it.
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
        
        // 3. Apply classes for overflow:hidden and menu visibility
        sidebar.classList.add('open');
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');
    }
});

// ---------- Highlight Current Page in Sidebar ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('#sidebar ul li a').forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.toggle('active', linkPage === currentPage);
});

// ---------- Add Tap Feedback on Touch Devices ----------
document.querySelectorAll('nav#sidebar ul li a').forEach(link => {
    link.addEventListener('touchstart', () => {
        link.classList.add('tap-active'); // highlight immediately on tap
    });

    link.addEventListener('touchend', () => {
        // remove highlight shortly after lifting finger
        setTimeout(() => {
            link.classList.remove('tap-active');
        }, 150); // 150ms is enough to show brief feedback
    });

    // optional: remove highlight if user scrolls instead of tapping
    link.addEventListener('touchmove', () => {
        link.classList.remove('tap-active');
    });
});