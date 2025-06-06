"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const markdownItContainer = require('markdown-it-container');
const markdownItEmoji = require('markdown-it-emoji');
function activate(context) {
    return {
        extendMarkdownIt(md) {
            md.use(markdownItContainer, 'alert', {
                validate: () => true,
                render: (tokens, idx) => {
                    return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
                }
            });
            md.use(markdownItContainer, 'spoiler', {
                marker: '?',
                validate: (params) => {
                    return params.trim().match(/^spoiler\s+(.*)$/);
                },
                render: (tokens, idx) => {
                    const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
                    if (tokens[idx].nesting === 1) {
                        return `<div class="spoiler"><details><summary>${md.utils.escapeHtml(m[1])}</summary>\n`;
                    }
                    else {
                        return '</details></div>\n';
                    }
                }
            });
            md.use(markdownItEmoji);
            return md;
        }
    };
}
//# sourceMappingURL=extension.js.map