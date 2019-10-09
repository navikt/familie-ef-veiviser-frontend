import React from 'react';
const marked = require('marked');

interface IMarkdownViewerProps {
  markdown: any;
}

const MarkdownViewer: React.FC<IMarkdownViewerProps> = ({ markdown }) => {
  const md = marked.parse(markdown);

  return <div dangerouslySetInnerHTML={{ __html: md }} />;
};

export default MarkdownViewer;
