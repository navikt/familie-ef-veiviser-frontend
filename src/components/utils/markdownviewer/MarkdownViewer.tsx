import React from 'react';
import { marked } from 'marked';
import styles from './MarkdownViewer.module.css';

const renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
});

renderer.link = function ({ href, title, text }) {
  return `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${
    title || text
  }">${text}</a>`;
};

interface IMarkdownViewerProps {
  markdown: string;
}

export const MarkdownViewer: React.FC<IMarkdownViewerProps> = ({
  markdown,
}) => {
  // Sender vi ikke sender inn async: true i options, så kan ikke returverdien være et Promise.
  // Caster derfor retur-verdien til string.
  const md = marked.parse(markdown, { renderer: renderer }) as string;

  return (
    <div
      className={`markdown ${styles.markdownViewer}`}
      dangerouslySetInnerHTML={{ __html: md }}
    />
  );
};
