import React from 'react';
import styled from 'styled-components';
import {
  ABorderAction,
  ABorderFocus,
  AOrange200,
  ATextAction,
  ATextDefault,
  ASurfaceAction,
  AWhite,
} from '@navikt/ds-tokens/dist/tokens';

const StyledMikroKort = styled.a`
  border-radius: 1rem;
  color: ${ATextDefault};
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  background-color: ${AOrange200};
  border: 1px solid transparent;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: ${AWhite};
    border-color: ${ABorderAction};
    color: ${ATextAction};
    transition: 0.3s;
    cursor: pointer;
  }

  &:focus-visible {
    background-color: ${AOrange200};
    color: ${ATextDefault};
    outline: 3px solid ${ABorderFocus};
  }

  &:active {
    background-color: ${ASurfaceAction};
    color: ${AWhite};
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
