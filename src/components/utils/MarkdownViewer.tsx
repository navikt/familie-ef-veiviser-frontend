import React from 'react';
const marked = require('marked');
const renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
});

renderer.link = function(href: string, title: string, text: string) {
  return `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`;
};

interface IMarkdownViewerProps {
  markdown: string;
}

const MarkdownViewer: React.FC<IMarkdownViewerProps> = ({ markdown }) => {
  const md = marked.parse(markdown, { renderer: renderer });

  return <div className="markdown" dangerouslySetInnerHTML={{ __html: md }} />;
};

export default MarkdownViewer;
