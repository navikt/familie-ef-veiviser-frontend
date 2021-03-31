import React from 'react';
import { StyledBrødsmuler, Brødsmule } from './BrødsmulerElementer';

const Brødsmuler = () => {
  return (
    <StyledBrødsmuler>
      <Brødsmule>
        <a href="https://nav.no">Forside</a>
      </Brødsmule>{' '}
      /{' '}
      <Brødsmule>
        <a href="https://www.nav.no/familie/alene-med-barn">Alene med barn</a>
      </Brødsmule>{' '}
      / <Brødsmule className="brødsmule-element">Hva kan du få?</Brødsmule>
    </StyledBrødsmuler>
  );
};

export default Brødsmuler;
