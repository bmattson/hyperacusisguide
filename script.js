// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ---------- Hamburger Menu Toggle (UPDATED for Scroll Lock) ----------
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    
    // Toggles the class on BOTH body and html for reliable scroll locking on mobile
    document.body.classList.toggle('menu-open'); 
    document.documentElement.classList.toggle('menu-open'); // Target <html> element
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