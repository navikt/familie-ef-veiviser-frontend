import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { device } from '../../../utils/styles';

export const StyledRettTilListe = styled.div`
  ul {
    list-style-type: none;

    li {
      padding-bottom: 0;
      padding-right: 2rem;
    }
  }

  ul {
    li:not(:last-child) {
      padding-bottom: 0.5rem;
    }
  }

  padding-left: 6rem;

  @media ${device.mobile} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const ListeMedIkon = styled.span`
  display: inline;

  p {
    position: absolute;
    margin-top: 0.1rem;
  }
`;

export const ListeElement = styled(Normaltekst)`
  display: inline;
  margin-left: 1rem;
  margin-right: 2rem;
`;
