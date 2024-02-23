import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import { Loader } from '@navikt/ds-react';
import RettTilListe from './rett-til-liste/RettTilListe';
import { IInformasjonsboks, IUndertittel } from '../../models/Informasjonsboks';
import UndertitlerPanel from './UndertitlerPanel';
import BallIkon from '../../icons/BallIkon';
import BamseIkon from '../../icons/BamseIkon';
import BordIkon from '../../icons/BordIkon';
import BarnIkon from '../../icons/BarnIkon';
import Barn2Ikon from '../../icons/Barn2Ikon';
import BrodskiveIkon from '../../icons/BrodskiveIkon';
import TaateflaskeIkon from '../../icons/TaateflaskeIkon';
import Feilside from '../feilside/Feilside';
import MarkdownViewer from '../utils/MarkdownViewer';
import { hentInformasjonsboksQuery } from '../../utils/sanity';
import {
  StyledAlertstripeAdvarsel,
  InformasjonsboksInnhold,
} from './InformasjonsboksElementer';
import styled from 'styled-components';
import MikroKort from '../mikrokort/MikroKort';
import { logNavigering, logVeiviserFullført } from '../../utils/amplitude';
import { device, størrelse } from '../../utils/styles';
import {
  AGray100,
  APurple200,
  APurple400,
} from '@navikt/ds-tokens/dist/tokens';

interface IInformasjonstekstProps {
  steg: number;
  disclaimer?: string;
  alert?: string;
}

export const MikroKortWrapper = styled.div`
  padding-left: 6rem;
  padding-right: 6rem;

  padding-bottom: 3rem;

  @media all and (max-width: 420px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const InfoBoksContainer = styled.div`
  border-radius: 8px;
  -webkit-border-radius: 8px;

  background-color: ${AGray100};
  width: ${størrelse.panelInnholdBredde};
  min-height: 5rem;
  margin: 0 auto;
  margin-top: 4rem;

  @media ${device.tablet} {
    max-width: ${størrelse.panelInnholdBredde};
    width: 100%;
  }

  @media ${device.mobile} {
    padding-left: 0;
    margin-left: 0;
  }

  ul {
    padding: 0;
  }

  hr {
    margin-top: 4rem;
    width: 70%;
    border: solid 0.5px #151515;
  }

  .liste-element {
    display: inline;
    margin-left: 1rem;
    margin-right: 2rem;
  }

  .undertittel-flere,
  .undertittel-singel,
  .andre-stonader {
    margin-top: 4rem;

    padding-left: 6rem;
    padding-right: 6rem;

    @media ${device.mobile} {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    ul {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  .undertittel-singel {
    padding-bottom: 6rem;
  }

  .bare-brodtekst {
    margin-top: 0;

    padding-left: 6rem;
    padding-right: 6rem;

    @media ${device.mobile} {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    &-0 {
      padding-left: 6rem;
      padding-right: 6rem;

      @media ${device.mobile} {
        padding-top: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
  }

  .informasjonsboks-header {
    position: relative;
    width: 100%;
    height: 140px;
    border-bottom: 0.4rem ${APurple400} solid;
    background-color: ${APurple200};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    -webkit-border-top-left-radius: 8px;
    -webkit-border-top-right-radius: 8px;

    .ball-ikon {
      position: absolute;
      top: 108px;
      left: 18%;

      @media ${device.mobile} {
        left: 22%;
      }
    }

    .bamse-ikon {
      position: absolute;
      top: 98px;
      left: 13%;
    }

    .bord-ikon {
      position: absolute;
      top: 118px;
      left: 55%;

      @media ${device.mobile} {
        left: 35%;
      }
    }

    .barn-ikon {
      position: absolute;
      top: 54px;
      left: 70%;

      @media ${device.mobile} {
        left: 70%;
      }
    }

    .barn2-ikon {
      position: absolute;
      top: 64px;
      left: 60%;

      @media ${device.mobile} {
        left: 50%;
      }
    }

    .brodskive-ikon {
      position: absolute;
      top: 109px;
      left: 72%;

      @media ${device.mobile} {
        left: 73%;
      }
    }

    .taateflaske-ikon {
      position: absolute;
      top: 95px;
      left: 59%;

      @media ${device.mobile} {
        left: 49%;
      }
    }
  }

  .informasjonsboks-innhold {
    h2 {
      margin-block-start: 4rem;
      margin-block-end: 0;
    }

    .disclaimer {
      padding: 2rem 6rem 4rem 6rem;

      @media ${device.mobile} {
        padding-right: 2rem;
        padding-left: 2rem;
      }
    }

    @media ${device.mobile} {
      padding: 0;
    }
  }
`;

const Informasjonsboks: React.FC<IInformasjonstekstProps> = ({
  steg,
  disclaimer,
  alert,
}) => {
  const [henter, settHenter] = useState<boolean>(true);
  const [info, settInfo] = useState<any>([]);
  const [feil, settFeil] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(hentInformasjonsboksQuery, {
          type: 'informasjonsboks',
          id: steg,
        })
        .then((res: IInformasjonsboks) => {
          settInfo(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });

      settHenter(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, [steg]);

  if (henter || !(info && info.undertitler)) {
    return <Loader className="spinner" />;
  }

  if (feil) {
    return <Feilside />;
  }

  const rett_til_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (undertittel.tekst_i_liste && !undertittel.ikke_rett_til)
        tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

  const ikke_rett_til_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (
        undertittel.tekst_i_liste &&
        typeof undertittel.ikke_rett_til === 'boolean' &&
        undertittel.ikke_rett_til
      )
        tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

  const rett_til_undertitler = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      !undertittel.ikke_rett_til &&
      (undertittel.tekst_i_panel || undertittel.brodtekster) &&
      !(
        undertittel.tekst_i_panel ===
        'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
      )
  );

  const ikke_rett_til_undertitler = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      typeof undertittel.ikke_rett_til === 'boolean' &&
      undertittel.ikke_rett_til &&
      !(
        undertittel.tekst_i_panel ===
        'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
      )
  );

  logVeiviserFullført(rett_til_liste, ikke_rett_til_liste);

  return (
    <>
      {alert ? (
        <StyledAlertstripeAdvarsel variant="warning">
          {alert}
        </StyledAlertstripeAdvarsel>
      ) : null}
      <InfoBoksContainer className="blur-in" id={`informasjonsboks-${steg}`}>
        <div className="informasjonsboks-header">
          <BallIkon className="ball-ikon" />
          <BamseIkon className="bamse-ikon" />
          <BarnIkon className="barn-ikon" />
          <Barn2Ikon className="barn2-ikon" />
          <BordIkon className="bord-ikon" />
          <BrodskiveIkon className="brodskive-ikon" />
          <TaateflaskeIkon className="taateflaske-ikon" />
        </div>
        <InformasjonsboksInnhold>
          {rett_til_liste.length ? (
            <RettTilListe
              tekster_i_liste={rett_til_liste}
              ikke_rett_til={false}
            />
          ) : null}
          <UndertitlerPanel
            undertitler={rett_til_undertitler}
            antall_undertitler_totalt={info.undertitler.length}
          />
          {ikke_rett_til_liste.length ? (
            <RettTilListe
              tekster_i_liste={ikke_rett_til_liste}
              ikke_rett_til={true}
            />
          ) : null}
          <UndertitlerPanel
            undertitler={ikke_rett_til_undertitler}
            antall_undertitler_totalt={info.undertitler.length}
          />
          {disclaimer ? (
            <div className="disclaimer">
              <MarkdownViewer markdown={disclaimer} />
            </div>
          ) : null}

          <MikroKortWrapper>
            <h3>Les mer om hva du kan ha rett til når du</h3>
            <MikroKort
              href="https://www.nav.no/alene-med-barn"
              onClick={() => {
                logNavigering(
                  'https://www.nav.no/alene-med-barn',
                  'Mer om hva du kan ha rett til når du er helt eller delvis alene med barn',
                  'informasjonsboks'
                );
              }}
            >
              Er helt eller delvis alene med barn
            </MikroKort>
          </MikroKortWrapper>
        </InformasjonsboksInnhold>
      </InfoBoksContainer>
    </>
  );
};

export default Informasjonsboks;
