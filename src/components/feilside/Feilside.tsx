import React from 'react';
import { Alert } from '@navikt/ds-react';
import styled from 'styled-components';

const FeilsideWrapper = styled.div`
  padding: 1rem;
  width: 400px;
  margin: auto;
`;

const Feilside = () => {
  return (
    <FeilsideWrapper>
      <Alert variant="error">Noe galt skjedde</Alert>
    </FeilsideWrapper>
  );
};

export default Feilside;
