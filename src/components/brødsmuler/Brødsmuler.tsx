import React from 'react';
import styled from 'styled-components';
import { device } from '../../utils/styles';

const BrødsmulerWrapper = styled.div`
  font-size: 16px;
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  margin-right: 500px;

  @media ${device.tablet} {
    text-align: left;
    margin-right: 0;
    margin-left: 30px;
  }
`;

const Brødsmule = styled.span`
  margin-left: 5px;
  margin-right: 5px;

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Brødsmuler = () => {
  return (
    <BrødsmulerWrapper>
      <Brødsmule>
        <a href="https://nav.no">Forside</a>
      </Brødsmule>{' '}
      /{' '}
      <Brødsmule>
        <a href="https://www.nav.no/familie/alene-med-barn">Alene med barn</a>
      </Brødsmule>{' '}
      / <Brødsmule className="brødsmule-element">Hva kan du få?</Brødsmule>
    </BrødsmulerWrapper>
  );
};

export default Brødsmuler;
