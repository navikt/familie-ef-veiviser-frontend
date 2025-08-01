import styled from 'styled-components';
import { MarkdownViewer } from '../utils/markdownviewer/MarkdownViewer';
import VeiviserIkon from '../../icons/VeiviserIkon';
import { device, størrelse } from '../../utils/styles';
import { AGray900, APurple200 } from '@navikt/ds-tokens/dist/tokens';

export const VeiviserHeader = styled.div`
  @media ${device.mobile} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media ${device.tablet} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  p {
    width: ${størrelse.panelInnholdBredde};
    font-size: 20px;

    @media ${device.tablet} {
      width: 100%;
      padding: 0;
      margin: 0 auto;
    }

    @media ${device.mobile} {
      padding: 0;
    }
  }

  hr {
    border: none;
    height: 3px;
    width: 63px;
    color: ${AGray900};
    background-color: ${AGray900};
  }

  ul {
    @media ${device.tablet} {
      width: 100%;
      margin: 0 auto;
      padding: 0 0 0 1.1rem;
    }

    @media ${device.mobile} {
      padding: 0 0 0 1.1rem;
    }

    li {
      padding-bottom: 0.5rem;
    }
  }
`;

export const StyledVeiviserIkon = styled(VeiviserIkon)`
  margin: 0 auto;
  background-color: ${APurple200};
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

export const Ingress = styled(MarkdownViewer)`
  ul {
    @media ${device.tablet} {
      width: 100%;
      margin: 0 auto;
      padding: 0 0 0 1.1rem;
    }

    @media ${device.mobile} {
      padding: 0 0 0 1.1rem;
    }

    li {
      padding-bottom: 0.5rem;
    }
  }
`;

export const Overskrift = styled.h2`
  text-align: center;
`;
