import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';

const StyledFeilside = styled.div`
  padding: 1;
  width: 400px;
  margin: auto;
`;

const Feilside = () => {
  return (
    <StyledFeilside>
      <AlertStripeFeil>Noe galt skjedde</AlertStripeFeil>
    </StyledFeilside>
  );
};

export default Feilside;
