import styled from 'styled-components';
import { device, størrelse } from '../../utils/styles';
import Lesmerpanel from 'nav-frontend-lesmerpanel';

export const Spørsmålstekst = styled.span`
  display: inline-block;
  padding-left: ${størrelse.spørsmålTekstPadding};
  padding-right: 2rem;
  font-weight: bold;
  font-size: 20px;
  text-align: left;

  @media ${device.tablet} {
    padding: 0;
  }

  @media ${device.mobile} {
    padding: 0;
  }
`;

export const Hjelpetekst = styled(Lesmerpanel)`
  .lesMerPanel {
    &__toggle {
      justify-content: flex-start;
      padding-left: ${størrelse.spørsmålTekstPadding};

      @media ${device.mobile} {
        padding-left: 0;
      }
    }

    &__togglelink {
      flex-direction: row-reverse;

      .chevron--ned {
        margin-top: 0.2rem;
      }

      .chevron--opp {
        margin-top: 0.3rem;
      }
    }

    &__toggleTekst {
      font-size: 16px;
    }
  }
`;

export const SpørsmålElement = styled.div`
  margin-top: 4rem;

  p {
    padding-left: ${størrelse.spørsmålTekstPadding};
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
