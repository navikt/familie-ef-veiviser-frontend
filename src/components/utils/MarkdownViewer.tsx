import React from 'react';
import styled from 'styled-components';
import  { marked }  from 'marked';

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
  // Sender vi ikke sender inn async: true i options, så kan ikke returverdien være et Promise.
  // Caster derfor retur-verdien til string.
  const md = marked.parse(markdown, { renderer: renderer }) as string;

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
