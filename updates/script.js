document.addEventListener('DOMContentLoaded', () => {
    loadChangelog();
});

async function loadChangelog() {
    try {
        const response = await fetch('../data/changelog.json');
        const changelog = await response.json();
        
        const timeline = document.getElementById('timeline');
        
        if (!changelog || changelog.length === 0) {
            timeline.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p>No updates yet. Check back soon for exciting new features!</p>
                </div>
            `;
            return;
        }

        // Sort by date (newest first)
        changelog.sort((a, b) => new Date(b.date) - new Date(a.date));

        timeline.innerHTML = changelog.map(entry => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${formatDate(entry.date)}</div>
                    <div class="timeline-title">${escapeHtml(entry.title)}</div>
                    <div class="timeline-description">${escapeHtml(entry.description)}</div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading changelog:', error);
        document.getElementById('timeline').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>Unable to load changelog. Please try again later.</p>
            </div>
        `;
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
