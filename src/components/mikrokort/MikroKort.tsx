import React from 'react';
import { Chips } from '@navikt/ds-react';

interface MikroKortProps {
  href: string;
  children: string;
  onClick?: () => void;
}

export const MikroKort = ({ href, children, onClick }: MikroKortProps) => {
  return (
    <>
      <Chips style={{ padding: '0' }}>
        <Chips.Toggle
          key={'1'}
          onClick={onClick}
          checkmark={false}
          as="a"
          href={href}
        >
          {children}
        </Chips.Toggle>
      </Chips>
    </>
  );
};
