import React from 'react';
import styled from 'styled-components';
const marked = require('marked');
const renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
});

renderer.link = function(href: string, title: string, text: string) {
  return `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title ||
    text}">${text}</a>`;
};

interface IMarkdownViewerProps {
  markdown: string;
}

const MarkdownViewer: React.FC<IMarkdownViewerProps> = ({ markdown }) => {
  const md = marked.parse(markdown, { renderer: renderer });

  return <div className="markdown" dangerouslySetInnerHTML={{ __html: md }} />;
};

const StyledMarkdownViewer = styled(MarkdownViewer)`
  p {
    margin-top: 1rem;

    a {
      margin-bottom: 200px;
    }
  }
`;

export default StyledMarkdownViewer;
