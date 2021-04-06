import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';

const FeilsideWrapper = styled.div`
  padding: 1;
  width: 400px;
  margin: auto;
`;

const Feilside = () => {
  return (
    <FeilsideWrapper>
      <AlertStripeFeil>Noe galt skjedde</AlertStripeFeil>
    </FeilsideWrapper>
  );
};

export default Feilside;
