import React, { useState, useEffect, useRef } from 'react';
import Spørsmål from './components/spørsmål/Spørsmål';
import { Button, Loader, VStack } from '@navikt/ds-react';
import Feilside from './components/feilside/Feilside';
import { Header } from './components/veiviser-header/Header';
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
import { logStartVeiviser } from './utils/amplitude';
import { IHeader, tomHeaderTekst } from './models/Header';
import { InnholdsContainer } from './components/innholdscontainer/InnholdsContainer';
import './global.css';

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
  const førsteSpørsmål = useRef<HTMLFieldSetElement>(null);
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

    setTimeout(() => {
      if (førsteSpørsmål.current) {
        førsteSpørsmål.current.focus();
      }
    }, 150);
  };

  const skalViseApp = !feil && spørsmålListe && spørsmålListe.length > 0;

  if (henter) {
    return <Loader className="spinner" />;
  }

  if (!skalViseApp) {
    return <Feilside />;
  }

  return (
    <>
      <VStack
        justify={'center'}
        align={'center'}
        style={{
          marginTop: '5rem',
          marginBottom: '8rem',
        }}
      >
        <InnholdsContainer>
          <Header tekst={headerTekst} />

          {!startet && (
            <div>
              <Button
                variant="primary"
                onClick={startVeiviser}
                style={{
                  marginTop: '1.5rem',
                  textAlign: 'center',
                }}
              >
                Start veiviseren
              </Button>
            </div>
          )}

          <Spørsmål
            nesteSpørsmål={nesteSpørsmål}
            førsteSpørsmål={førsteSpørsmål}
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
        </InnholdsContainer>
      </VStack>
    </>
  );
};

export default App;
