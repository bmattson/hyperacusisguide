// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ---------- Hamburger Menu Toggle ----------
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    // Toggles the class that locks background scroll on mobile
    document.body.classList.toggle('menu-open'); 
});

// ---------- Highlight Current Page in Sidebar ----------
// Gets the filename from the URL (e.g., 'about.html' or defaults to 'index.html')
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('#sidebar ul li a').forEach(link => {
    const linkPage = link.getAttribute('href');
    // Adds 'active' class if the link's href matches the current page filename
    link.classList.toggle('active', linkPage === currentPage);
});

// ---------- Add Tap Feedback on Touch Devices ----------
document.querySelectorAll('nav#sidebar ul li a').forEach(link => {
    link.addEventListener('touchstart', () => {
        // highlight immediately on tap
        link.classList.add('tap-active'); 
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