import * as vscode from 'vscode';
const markdownItContainer = require('markdown-it-container');
const markdownItEmoji = require('markdown-it-emoji');

export function activate(context: vscode.ExtensionContext) {
	return {
		extendMarkdownIt(md: any) {
			md.use(markdownItContainer, 'alert', {
				validate: () => true,
				render: (tokens: any, idx: number) => {
					return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
				}
			});
			md.use(markdownItContainer, 'spoiler', {
				marker: '?',
				validate: (params: string) => {
					return params.trim().match(/^spoiler\s+(.*)$/);
				},
				render: (tokens: any, idx: number) => {
					const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

					if (tokens[idx].nesting === 1) {
						return `<div class="spoiler"><details><summary>${md.utils.escapeHtml(m[1])}</summary>\n`;
					} else {
						return '</details></div>\n';
					}
				}
			});
			md.use(markdownItEmoji);

			return md;
		}
	};
}