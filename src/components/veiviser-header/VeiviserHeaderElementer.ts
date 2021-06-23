import styled from 'styled-components';
import MarkdownViewer from '../utils/MarkdownViewer';
import VeiviserIkon from '../../assets/icons/VeiviserIkon';
import { device, farge, størrelse } from '../../utils/styles';

export const MicroCardWrapper = styled.div`
  padding-left: 3rem;

  @media ${device.mobile} {
    padding-left: 0;
  }

  @media ${device.tablet} {
    padding-left: 0;
  }
`;

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
    padding-left: ${størrelse.spørsmålTekstPadding};

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
    color: #151515;
    background-color: #000;
  }

  ul {
    padding-left: 4.5rem;

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
  background-color: ${farge.familieBakgrunn};
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

export const Ingress = styled(MarkdownViewer)`
  ul {
    padding-left: 4.5rem;

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
