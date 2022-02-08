import styled from 'styled-components';
import { Alert } from '@navikt/ds-react';
import { device, størrelse } from '../../utils/styles';

export const StyledAlertstripeAdvarsel = styled(Alert)`
  max-width: 556px;
  margin: 0 auto;
  margin-top: 3.5rem;

  @media ${device.desktop} {
    .inputPanel {
      width: ${størrelse.panelInnholdBredde};
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
  }

  @media ${device.tablet} {
    .inputPanel {
      max-width: ${størrelse.panelInnholdBredde};
      width: 100%;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
  }
`;

export const InformasjonsboksInnhold = styled.div`
  h2 {
    margin-block-start: 4rem;
    margin-block-end: 0;
  }

  .disclaimer {
    padding: 2rem 6rem 1rem 6rem;

    @media ${device.mobile} {
      padding-right: 2rem;
      padding-left: 2rem;
    }
  }

  @media ${device.mobile} {
    padding: 0;
  }
`;
