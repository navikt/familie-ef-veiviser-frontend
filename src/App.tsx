import React, { useState, useEffect } from 'react';
import Sporsmal from './components/sporsmal/Sporsmal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './components/feilside/Feilside';
import Header from './components/header/Header';
import { Panel } from 'nav-frontend-paneler';
import { client } from './utils/sanity';
import { IInfoMapping, ISporsmal } from './models/Sporsmal';
import header from './assets/header.png';
import footer from './assets/footer.png';

const App = () => {
  const [sporsmalListe, setSporsmalListe] = useState<ISporsmal[]>([]);
  const [ferdig, setFerdig] = useState<boolean>(false);
  const [steg, setSteg] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [infoMapping, setInfoMapping] = useState<IInfoMapping[]>([]);

  const sporsmalQuery =
    '*[_type == $type]{sporsmal_id, sporsmal_tekst, hjelpetekst_overskrift, hjelpetekst, svarliste[]->, _createdAt, _id, _rev, _type, _updatedAt}';

  const infoMappingQuery =
    '*[_type == $type]{information_id, svarsti[]->{_id, tekst}}';

  useEffect(() => {
    const fetchInfoMapping = () => {
      client
        .fetch(infoMappingQuery, {
          type: 'informasjonsboks',
        })
        .then((res: IInfoMapping[]) => {
          setInfoMapping(res);
        })
        .catch((err: Error) => {
          console.log('err', err);
          console.error('Oh no, error occured: ', err);
        });
    };

    const fetchSporsmal = () => {
      client
        .fetch(sporsmalQuery, { type: 'sporsmal' })
        .then((res: ISporsmal[]) => {
          setSporsmalListe(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });

      setFetching(false);
    };

    fetchSporsmal();
    fetchInfoMapping();
  }, []);

  if (fetching) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!error && sporsmalListe && sporsmalListe.length) {
    return (
      <div className="app">
        <div style={{ width: '100%', margin: '0 auto', overflow: 'hidden' }}>
          <div style={{ position: 'relative', float: 'right', right: '50%' }}>
            <img
              alt="NAV dummyheader"
              src={header}
              style={{ position: 'relative', right: '-50%' }}
            />
          </div>
        </div>
        <Panel className="innholdspanel">
          <div className="innholdscontainer">
            <Header />
            <Sporsmal
              sporsmalListe={sporsmalListe}
              setSteg={setSteg}
              setFerdig={setFerdig}
              ferdig={ferdig}
              steg={steg}
              infoMapping={infoMapping}
            />
          </div>
        </Panel>
        <div style={{ width: '100%', margin: '0 auto', overflow: 'hidden' }}>
          <div style={{ position: 'relative', float: 'right', right: '50%' }}>
            <img
              alt="NAV dummyfooter"
              src={footer}
              style={{ position: 'relative', right: '-50%' }}
            />
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return <Feilside />;
  }

  return null;
};

export default App;
