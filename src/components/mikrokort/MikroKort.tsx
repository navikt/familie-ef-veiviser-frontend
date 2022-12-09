import React from 'react';
import styled from 'styled-components';

const StyledMikroKort = styled.a`
  border-radius: 1rem;
  color: var(--a-text-default);
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  background-color: var(--a-orange-200);
  border: 1px solid transparent;

  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: var(--a-white);
    border-color: var(--a-border-action);
    color: var(--a-text-action);
    transition: 0.3s;
    cursor: pointer;
  }

  &:focus-visible {
    background-color: var(--a-orange-200);
    color: var(--a-text-default);
    outline: 3px solid var(--a-border-focus);
  }

  &:active {
    background-color: var(--a-surface-action);
    color: var(--a-white);
  }
`;

interface MikroKortProps {
  href: string;
  children: string;
  onClick?: () => void;
}

const MikroKort = ({ href, children, onClick, ...rest }: MikroKortProps) => {
  return (
    <StyledMikroKort href={href} onClick={onClick} {...rest}>
      {children}
    </StyledMikroKort>
  );
};

export default MikroKort;
