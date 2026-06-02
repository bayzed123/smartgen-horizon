document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initTheme();
});

function injectNavbar() {
    const header = document.getElementById('main-header');
    if (!header) return;

    // Direct Single-Line Desktop Header without Sidebars or Overlaps
    header.innerHTML = `
        <div style="background: #ffffff; border-bottom: 1px solid #e1e8ed; padding: 15px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <a href="https://bayzed123.github.io/smartgen-horizon/" style="display: flex; align-items: center; gap: 8px; text-decoration: none; font-weight: bold; color: #2d3748; font-size: 1.2rem;">
                    <span style="color: #ffc107;">⚡</span> SmartGen Beta
                </a>
                <nav style="display: flex; align-items: center; gap: 20px;">
                    <a href="https://bayzed123.github.io/smartgen-horizon/" style="text-decoration: none; color: #4a5568; font-weight: 600; font-size: 0.95rem;">🏠 Home</a>
                    <a href="https://bayzed123.github.io/smartgen-horizon/updates/" style="text-decoration: none; color: #4a5568; font-weight: 600; font-size: 0.95rem;">🔄 Updates & Changelog</a>
                    <button id="theme-toggle" style="background: transparent; border: none; font-size: 1.2rem; cursor: pointer; padding: 0; margin-left: 5px;">🌓</button>
                </nav>
            </div>
        </div>
    `;

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function injectFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    // Clean Simple Footer with precise links and credits requested
    footer.innerHTML = `
        <div style="background: #ffffff; border-top: 1px solid #e1e8ed; padding: 30px 0; margin-top: 4rem; text-align: center;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <p style="margin: 0 0 12px 0; color: #718096; font-size: 0.95rem; font-weight: 500;">
                    Smartgen Beta Test - Developers <a href="https://sayadbayezid.com" target="_blank" style="color: #2b6cb0; text-decoration: none; font-weight: 600;">Sayad Md Bayezid Hosan</a>
                </p>
                <div style="display: flex; justify-content: center; gap: 15px; font-size: 0.9rem;">
                    <a href="https://bayzed123.github.io/smartgen-horizon/cookies/" style="color: #4a5568; text-decoration: none;">🍪 Cookie Policy</a>
                </div>
            </div>
        </div>
    `;
}

function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}