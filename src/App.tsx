import React, { useState, useEffect, useRef } from 'react';
import Sporsmal from './components/sporsmal/Sporsmal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './components/feilside/Feilside';
import Header from './components/header/Header';
import { Panel } from 'nav-frontend-paneler';
import {
  client,
  hentSporsmalQuery,
  svarstiTilInformasjonsboksQuery,
} from './utils/sanity';
import { Knapp } from 'nav-frontend-knapper';
import {
  ISvarstiTilInformasjonsboksMapping,
  ISporsmal,
} from './models/Sporsmal';
import { scrollTilNesteSporsmal } from './utils/utils';

const App = () => {
  const [sporsmalListe, setSporsmalListe] = useState<ISporsmal[]>([]);
  const [ferdig, setFerdig] = useState<boolean>(false);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [steg, setSteg] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [
    svarstiTilInformasjonsboksMapping,
    setSvarstiTilInformasjonsboksMapping,
  ] = useState<ISvarstiTilInformasjonsboksMapping[]>([]);
  const [startet, setStartet] = useState<boolean>(false);
  const nesteSporsmal = useRef(null);

  useEffect(() => {
    const fetchSvarstiTilInformasjonsboksMapping = () => {
      client
        .fetch(svarstiTilInformasjonsboksQuery, {
          type: 'informasjonsboks',
        })
        .then((res: ISvarstiTilInformasjonsboksMapping[]) => {
          setSvarstiTilInformasjonsboksMapping(res);
        })
        .catch((err: Error) => {
          console.log('err', err);
          console.error('Oh no, error occured: ', err);
        });
    };

    const fetchSporsmal = () => {
      client
        .fetch(hentSporsmalQuery, { type: 'sporsmal' })
        .then((res: ISporsmal[]) => {
          setSporsmalListe(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });

      setFetching(false);
    };

    const fetchDisclaimer = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'disclaimer' })
        .then((res: any) => {
          setDisclaimer(res.disclaimer);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });
    };

    fetchSporsmal();
    fetchSvarstiTilInformasjonsboksMapping();
    fetchDisclaimer();
  }, []);

  const startVeiviser = () => {
    setStartet(true);
    scrollTilNesteSporsmal(nesteSporsmal);
  };

  if (fetching) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!error && sporsmalListe && sporsmalListe.length) {
    return (
      <div className="app">
        <Panel className="innholdspanel">
          <div className="innholdscontainer">
            <Header />
            {!startet ? (
              <div className="knappwrapper">
                <Knapp className="startknapp" onClick={startVeiviser}>
                  Start veiviseren
                </Knapp>
              </div>
            ) : null}
            <Sporsmal
              nesteSporsmal={nesteSporsmal}
              startet={startet}
              sporsmalListe={sporsmalListe}
              setSteg={setSteg}
              setFerdig={setFerdig}
              ferdig={ferdig}
              steg={steg}
              svarstiTilInformasjonsboksMapping={
                svarstiTilInformasjonsboksMapping
              }
              disclaimer={disclaimer}
            />
          </div>
        </Panel>
      </div>
    );
  } else if (error) {
    return <Feilside />;
  }

  return null;
};

export default App;
