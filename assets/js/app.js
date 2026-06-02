document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initTheme();
    initAccordion();
});

function injectNavbar() {
    const header = document.getElementById('main-header');
    if (!header) return;

    // Beta Testing Navbar
    header.innerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">
                    <div class="logo-icon">⚡</div>
                    SmartGen <span style="font-size: 0.8rem; background: #ffc107; color: #856404; padding: 2px 6px; border-radius: 4px; margin-left: 5px;">BETA</span>
                </a>
                <div class="header-actions">
                    <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                    <button id="mobile-menu-toggle" class="icon-btn mobile-only" title="Toggle Menu">☰</button>
                </div>
                <nav id="nav-links">
                    <a href="/">🏠 Home</a>
                    <a href="/updates/">🔄 Changelog</a>
                    <a href="/cookies/">🍪 Cookie Policy</a>
                    <a href="https://smartgentools.com" target="_blank" style="color: #d97706; font-weight: bold;">🚀 Live Platform</a>
                </nav>
            </div>
        </div>

        <aside id="mobile-sidebar" class="mobile-sidebar">
            <div class="sidebar-header">
                <a href="/" class="sidebar-logo">
                    <div class="sidebar-logo-icon">⚡</div>
                    SmartGen Beta
                </a>
                <button id="sidebar-close" class="sidebar-close-btn" title="Close Menu">✕</button>
            </div>

            <div class="sidebar-nav-links" style="display: flex; flex-direction: column; padding: 20px; overflow-y: auto;">
                <a href="/" class="nav-item" style="color: var(--text-primary); padding: 10px 0; text-decoration: none; font-weight: 600; font-size: 1rem;">🏠 Home (Playground)</a>
                <a href="/updates/" class="nav-item" style="color: var(--text-primary); padding: 10px 0; text-decoration: none; font-weight: 600; font-size: 1rem;">🔄 Updates & Changelog</a>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--border-color, #e5e7eb);">
                
                <div class="nav-category" style="font-weight: 700; color: var(--text-secondary, #6b7280); margin-top: 10px; font-size: 0.85rem; text-transform: uppercase;">⚠️ Testing Environment</div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px; line-height: 1.4;">This is a staging area. Tools here are under development.</p>

                <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--border-color, #e5e7eb);">
                <a href="/cookies/" class="nav-item" style="color: var(--text-primary); padding: 10px 0; text-decoration: none; display: block; font-weight: 500;">🍪 Cookie Policy</a>
                <a href="https://smartgentools.com" target="_blank" class="nav-item" style="background: #0056b3; color: #fff; text-align: center; border-radius: 6px; padding: 12px 0; margin-top: 10px; text-decoration: none; display: block; font-weight: bold;">🚀 Visit Live Platform</a>
            </div>
        </aside>

        <div id="sidebar-overlay" class="sidebar-overlay"></div>
    `;

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Toggle sidebar
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a link
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeSidebar();
        });
    });
}

function injectFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    // Beta Testing Footer (Simplified to avoid 404 links)
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
                            <li><a href="/">Playground Home</a></li>
                            <li><a href="/updates/">Updates & Changelog</a></li>
                            <li><a href="https://smartgentools.com" target="_blank" style="color: #2563eb; font-weight: bold;">Live Platform ↗</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4 class="footer-accordion-trigger">Legal / Testing <span class="accordion-icon"></span></h4>
                        <ul class="footer-links">
                            <li><a href="/cookies/">Cookie Policy</a></li>
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
                    <a href="https://github.com/bayzed123" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Visit our GitHub Repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
                    <a href="https://linkedin.com/in/sayadbayezid" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Visit our LinkedIn Profile"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.646 1.199-1.538 2.914-1.538 2.127 0 3.72 1.395 3.72 4.393v5.427zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.963-1.704 1.193 0 1.915.753 1.929 1.704 0 .946-.736 1.704-1.977 1.704zm1.582 11.597H3.635V9.859h3.284v10.593zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
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
                
                // Close all other footer accordion items
                document.querySelectorAll('.footer-column').forEach(otherCol => {
                    if (otherCol !== column) {
                        otherCol.classList.remove('active');
                    }
                });
                
                // Toggle current item
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
            const isActive = item.classList.contains('active');
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
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
