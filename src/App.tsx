import React, { useState, useEffect, useRef } from 'react';
import Spørsmål from './components/spørsmål/Spørsmål';
import { Button, Loader, Heading, Panel } from '@navikt/ds-react';
import Feilside from './components/feilside/Feilside';
import Header from './components/veiviser-header/Header';
import {
  client,
  hentHeaderQuery,
  hentSpørsmålQuery,
  svarstiTilInformasjonsboksQuery,
} from './utils/sanity';
import {
  ISvarstiTilInformasjonsboksMapping,
  ISpørsmål,
} from './models/Spørsmål';
import { scrollTilNesteSpørsmal } from './components/spørsmål/SpørsmålUtils';
import styled, { createGlobalStyle } from 'styled-components';
import { device, størrelse } from './utils/styles';
import { logStartVeiviser } from './utils/amplitude';
import { IHeader, tomHeaderTekst } from './models/Header';
import {
  AGray100,
  AGray700,
  AOrange500,
  APurple200,
} from '@navikt/ds-tokens/dist/tokens';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${AGray100};
    margin: 0;

    a:focus {
      color: ${AGray700};
      text-decoration: none;
      background-color: ${AOrange500};
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .innholdspanel {
    margin-top: 5rem;
    margin-bottom: 8rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .knappwrapper {
    text-align: center;
  }

  .startknapp {
    margin-top: 2rem;
  }

  .panel {
    width: ${størrelse.panelBredde};

    @media ${device.tablet} {
      width: 100%;
    }

    @media ${device.mobile} {
      width: 100%;
    }
  }

  .blur-in {
    -webkit-animation: text-focus-in 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      both;
    animation: text-focus-in 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  @-webkit-keyframes blur-in {
    0% {
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  @keyframes text-focus-in {
    0% {
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }

  .side-header {
    background-color: ${APurple200};
    text-align: center;
    height: 80px;
    width: 100%;
    font-weight: bold;

    h1 {
      line-height: 80px;
    }
  }
`;

const InnholdsWrapper = styled.div`
  scroll-behavior: smooth;
  padding: 2rem;

  @media ${device.mobile} {
    padding: 0;
  }
`;

const App = () => {
  const [spørsmålListe, settSpørsmålListe] = useState<ISpørsmål[]>([]);
  const [ferdig, settFerdig] = useState<boolean>(false);
  const [disclaimer, settDisclaimer] = useState<string>('');
  const [alert, settAlert] = useState<string>('');
  const [steg, settSteg] = useState<number>(1);
  const [henter, settHenter] = useState<boolean>(true);
  const [feil, settFeil] = useState<boolean>(false);
  const [
    svarstiTilInformasjonsboksMapping,
    settSvarstiTilInformasjonsboksMapping,
  ] = useState<ISvarstiTilInformasjonsboksMapping[]>([]);
  const [startet, settStartet] = useState<boolean>(false);
  const nesteSpørsmål = useRef(null);
  const [headerTekst, settHeaderTekst] = useState<IHeader>(tomHeaderTekst);

  useEffect(() => {
    const fetchSpørsmål = () => {
      client
        .fetch(hentSpørsmålQuery, { type: 'sporsmal' })
        .then((res: ISpørsmål[]) => {
          settSpørsmålListe(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });
    };

    const fetchHeaderInfo = () => {
      client
        .fetch(hentHeaderQuery, { type: 'header' })
        .then((res: IHeader) => {
          settHeaderTekst(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        })
        .finally(() => settHenter(false));
    };

    const fetchSvarstiTilInformasjonsboksMapping = () => {
      client
        .fetch(svarstiTilInformasjonsboksQuery, {
          type: 'informasjonsboks',
        })
        .then((res: ISvarstiTilInformasjonsboksMapping[]) => {
          settSvarstiTilInformasjonsboksMapping(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
        });
    };

    const fetchDisclaimer = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'disclaimer' })
        .then((res: any) => {
          settDisclaimer(res.disclaimer);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });
    };

    const fetchAlert = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'alert' })
        .then((res: any) => {
          if (res && res.alert) {
            settAlert(res.alert);
          }
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        })
        .finally(() => settHenter(false));
    };

    fetchSpørsmål();
    fetchHeaderInfo();
    fetchSvarstiTilInformasjonsboksMapping();
    fetchDisclaimer();
    fetchAlert();
  }, []);
  const startVeiviser = () => {
    settStartet(true);

    logStartVeiviser();

    scrollTilNesteSpørsmal(nesteSpørsmål);
  };

  const skalViseApp = !feil && spørsmålListe && spørsmålListe.length > 0;

  if (henter) {
    return <Loader className="spinner" />;
  }

  if (!skalViseApp) {
    return <Feilside />;
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <div className="side-header">
          <Heading size="xlarge">Hva kan du få?</Heading>
        </div>
        <Panel className="innholdspanel">
          <InnholdsWrapper>
            <Header tekst={headerTekst} />
            {!startet ? (
              <div className="knappwrapper">
                <Button
                  variant="primary"
                  className="startknapp"
                  onClick={startVeiviser}
                >
                  Start veiviseren
                </Button>
              </div>
            ) : null}
            <Spørsmål
              nesteSpørsmål={nesteSpørsmål}
              startet={startet}
              spørsmålListe={spørsmålListe}
              settSteg={settSteg}
              settFerdig={settFerdig}
              ferdig={ferdig}
              steg={steg}
              svarstiTilInformasjonsboksMapping={
                svarstiTilInformasjonsboksMapping
              }
              disclaimer={disclaimer}
              alert={alert}
            />
          </InnholdsWrapper>
        </Panel>
      </Container>
    </React.Fragment>
  );
};

export default App;
