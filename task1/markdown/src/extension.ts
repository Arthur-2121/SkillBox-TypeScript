import * as vscode from 'vscode';
import * as markdownItContainer from 'markdown-it-container';
import * as markdownItEmoji from 'markdown-it-emoji';

export function activate(context: vscode.ExtensionContext) {
	return {
		extendMarkdownIt(md: any) {
			const defaultRender = md.renderer.rules.fence || function (tokens: any, idx: number) {
				const token = tokens[idx];
				return `<pre><code>${token.content}</code></pre>`;
			};

			md.renderer.rules.fence = (tokens: any, idx: number) => {
				const token = tokens[idx];
				if (token.info === 'mermaid') {
					return `<div class="mermaid">${token.content}</div>`;
				}
				return defaultRender(tokens, idx);
			};
			// Остальные плагины
			md.use(markdownItContainer, 'alert', {
				validate: () => true,
				render: (tokens: any, idx: number) => {
					return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
				}
			});

			md.use(markdownItContainer, 'spoiler', {
				marker: '?',
				validate: (params: string) => params.trim().match(/^spoiler\s+(.*)$/),
				render: (tokens: any, idx: number) => {
					const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
					return tokens[idx].nesting === 1
						? `<div class="spoiler"><details><summary>${md.utils.escapeHtml(m[1])}</summary>`
						: '</details></div>';
				}
			});

			md.use(markdownItEmoji);

			return md;
		}
	};
}