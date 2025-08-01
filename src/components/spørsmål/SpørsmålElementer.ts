import styled from 'styled-components';
import { device, størrelse } from '../../utils/styles';

export const SpørsmålElement = styled.div`
  margin-top: 4rem;

  p {
    max-width: 500px;

    margin-top: -0.5rem;

    @media ${device.mobile} {
      padding-left: 0;
    }
  }
`;

export const RadioknappWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  .inputPanel {
    margin: 0 auto;
  }

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
