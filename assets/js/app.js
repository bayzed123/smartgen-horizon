document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initTheme();
    initAccordion();
});

function injectNavbar() {
    const header = document.getElementById('main-header');
    if (!header) return;

    header.innerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="/smartgen-horizon/" class="logo">
                    <div class="logo-icon">⚡</div>
                    SmartGen <span style="font-size: 0.8rem; background: #ffc107; color: #856404; padding: 2px 6px; border-radius: 4px; margin-left: 5px;">BETA</span>
                </a>
                <div class="header-actions">
                    <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                    <button id="mobile-menu-toggle" class="icon-btn mobile-only" title="Toggle Menu">☰</button>
                </div>
                <nav id="nav-links">
                    <a href="/smartgen-horizon/">🏠 Home</a>
                    <a href="/smartgen-horizon/updates/">🔄 Changelog</a>
                    <a href="/smartgen-horizon/cookies/">🍪 Cookie Policy</a>
                    <a href="https://smartgentools.com" target="_blank" style="color: #d97706; font-weight: bold;">🚀 Live Platform</a>
                </nav>
            </div>
        </div>

        <aside id="mobile-sidebar" class="mobile-sidebar">
            <div class="sidebar-header">
                <a href="/smartgen-horizon/" class="sidebar-logo">
                    <div class="sidebar-logo-icon">⚡</div>
                    SmartGen Beta
                </a>
                <button id="sidebar-close" class="sidebar-close-btn" title="Close Menu">✕</button>
            </div>

            <div class="sidebar-nav-links" style="display: flex; flex-direction: column; padding: 20px; overflow-y: auto;">
                <a href="/smartgen-horizon/" class="nav-item" style="color: var(--text-primary); padding: 10px 0; text-decoration: none; font-weight: 600; font-size: 1rem;">🏠 Home (Playground)</a>
                <a href="/smartgen-horizon/updates/" class="nav-item" style="color: var(--text-primary); padding: 10px 0; text-decoration: none; font-weight: 600; font-size: 1rem;">🔄 Updates & Changelog</a>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--border-color, #e5e7eb);">
                
                <div class="nav-category" style="font-weight: 700; color: var(--text-secondary, #6b7280); margin-top: 10px; font-size: 0.85rem; text-transform: uppercase;">🔧 Beta Tools</div>
                
                <!-- 👇 AUTOMATION SCRIPT WILL INJECT SIDEBAR LINKS HERE 👇 -->
                <!-- AUTO_INJECT_SIDEBAR_START -->
                <!-- AUTO_INJECT_SIDEBAR_END -->

                <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--border-color, #e5e7eb);">
                
                <div class="nav-category" style="font-weight: 700; color: var(--text-secondary, #6b7280); margin-top: 10px; font-size: 0.85rem; text-transform: uppercase;">⚠️ Testing Environment</div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px; line-height: 1.4;">This is a staging area. Tools here are under development.</p>

                <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--border-color, #e5e7eb);">
                <a href="/smartgen-horizon/cookies/" class="nav-item" style="color: var(--text-primary); padding: 10px 0; text-decoration: none; display: block; font-weight: 500;">🍪 Cookie Policy</a>
                <a href="https://smartgentools.com" target="_blank" class="nav-item" style="background: #0056b3; color: #fff; text-align: center; border-radius: 6px; padding: 12px 0; margin-top: 10px; text-decoration: none; display: block; font-weight: bold;">🚀 Visit Live Platform</a>
            </div>
        </aside>

        <div id="sidebar-overlay" class="sidebar-overlay"></div>
    `;

    // Initialize Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Sidebar Navigation Logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (menuToggle && sidebar && sidebarOverlay && sidebarClose) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });

        const closeSidebar = () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        };

        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);

        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeSidebar();
            });
        });
    }
}

function injectFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-top" style="justify-content: space-between;">
                <div class="footer-brand-section" style="max-width: 400px;">
                    <div class="footer-logo">
                        <div class="logo-icon" style="width: 40px; height: 40px; font-size: 1.5rem;">⚡</div>
                        <h3>SmartGen Horizon</h3>
                    </div>
                    <p class="footer-description">🚧 <strong>Beta Testing Environment.</strong> All tools here are strictly for staging, testing, and development purposes. They may be unstable or incomplete.</p>
                </div>
                
                <div class="footer-quick-links-grid" style="display: flex; gap: 4rem;">
                    <div class="footer-column">
                        <h4 class="footer-accordion-trigger">Testing Hub <span class="accordion-icon"></span></h4>
                        <ul class="footer-links">
                            <li><a href="/smartgen-horizon/">Playground Home</a></li>
                            <li><a href="/smartgen-horizon/updates/">Updates & Changelog</a></li>
                            <li><a href="https://smartgentools.com" target="_blank" style="color: #2563eb; font-weight: bold;">Live Platform ↗</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4 class="footer-accordion-trigger">Legal / Testing <span class="accordion-icon"></span></h4>
                        <ul class="footer-links">
                            <li><a href="/smartgen-horizon/cookies/">Cookie Policy</a></li>
                            <li><a href="https://github.com/bayzed123/smartgen-horizon" target="_blank">GitHub Repository</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <p>&copy; 2026 SmartGen. Developed by <a href="https://sayadbayezid.com" target="_blank" rel="noopener noreferrer" class="developer-link">Sayad Md Bayezid Hosan</a></p>
                </div>
                <div class="footer-social-icons">
                    <a href="https://github.com/bayzed123/smartgen-horizon" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Visit our GitHub Repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
                </div>
            </div>
        </div>
    `;

    initFooterAccordion();
}

function initFooterAccordion() {
    const triggers = document.querySelectorAll('.footer-accordion-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                const column = trigger.parentElement;
                const isActive = column.classList.contains('active');
                
                document.querySelectorAll('.footer-column').forEach(otherCol => {
                    if (otherCol !== column) {
                        otherCol.classList.remove('active');
                    }
                });
                
                column.classList.toggle('active');
            }
        });
    });
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
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