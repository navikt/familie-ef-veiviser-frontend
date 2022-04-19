import React from 'react';
import styled from 'styled-components';

const StyledMikroKort = styled.a`
  border-radius: 1rem;
  color: #262626;
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  background-color: #ffd699;
  border: 1px solid transparent;

  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: #fff;
    border-color: #01459c;
    color: #0166c5;
    transition: 0.3s;

    cursor: pointer;
  }

  &:focus {
    background-color: #fff;
    color: #0166c5;
    outline: none;
    box-shadow: var(--navds-shadow-focus);
    transition: 0.1s;
  }

  &:active {
    background-color: #0166c5;
    color: #fff;
  }
`;

interface MikroKortProps {
  href: string;
  children: string;
}

const MikroKort = ({ href, children, ...rest }: MikroKortProps) => {
  return (
    <StyledMikroKort href={href} {...rest}>
      {children}
    </StyledMikroKort>
  );
};

export default MikroKort;
