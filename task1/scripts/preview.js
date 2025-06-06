document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.spoiler details').forEach(details => {
        details.addEventListener('toggle', () => {
            if (details.open) {
                details.style.animation = 'fadeIn 0.5s';
            }
        });
    });

    if (window.mermaid) {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default'
        });
    }
});