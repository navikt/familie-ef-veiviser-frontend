import React from 'react';
const marked = require('marked');

interface IMarkdownViewerProps {
  markdown: string;
}

const MarkdownViewer: React.FC<IMarkdownViewerProps> = ({ markdown }) => {
  const md = marked.parse(markdown);

  return <div className="markdown" dangerouslySetInnerHTML={{ __html: md }} />;
};

export default MarkdownViewer;
