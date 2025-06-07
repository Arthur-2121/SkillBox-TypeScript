function initializeMermaid() {
    if (typeof mermaid === 'undefined') {
        console.error('Mermaid not loaded');
        return;
    }

    mermaid.initialize({
        startOnLoad: false,
        theme: document.body.classList.contains('vscode-dark') ? 'dark' : 'default',
        securityLevel: 'loose'
    });

    const renderMermaid = () => {
        document.querySelectorAll('.mermaid:not(.rendered)').forEach(el => {
            try {
                const id = 'mermaid-' + Math.floor(Math.random() * 1000000);
                const code = el.textContent.trim();
                mermaid.render(id, code, svgCode => {
                    el.innerHTML = svgCode;
                    el.classList.add('rendered');
                });
            } catch (error) {
                console.error('Mermaid error:', error);
                el.innerHTML = `<div class="error">${error.message}</div>`;
            }
        });
    };

    // Initial render
    renderMermaid();

    // Mutation observer for dynamic content
    new MutationObserver(renderMermaid).observe(document.body, {
        childList: true,
        subtree: true
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMermaid);
} else {
    initializeMermaid();
}