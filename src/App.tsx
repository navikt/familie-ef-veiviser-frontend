import React, { useState, useEffect } from 'react';
import Sporsmal from './components/Sporsmal';
import Informasjonstekst from './components/Informasjonstekst';

const sanityClient = require('@sanity/client');

const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_ID,
    dataset: process.env.REACT_APP_SANITY_DATASET
});

const App = () => {

    const [sporsmalListe, settSporsmalListe] = useState<any>([]);
    const [ferdig, settFerdig] = useState<boolean>(false);
    const [steg, settSteg] = useState<number>(1);

    useEffect(() => {
        client
            .fetch(
                '*[_type == $type]',
                {type: 'question'}
            )
            .then((res: any) => {
                settSporsmalListe(res);
            })
            .catch((err: any) => {
                console.error('Oh no, error occured: ', err)
            })
    });

    if (sporsmalListe && sporsmalListe.length) {
        console.log("liste");
        console.log(sporsmalListe);

        return (
            <div className="app">
                <div className="innholdscontainer">
                    {ferdig ?
                        <Informasjonstekst
                            steg={steg}
                        /> :
                        <Sporsmal
                            sporsmal={sporsmalListe}
                            settSteg={settSteg}
                            settFerdig={settFerdig}
                            steg={steg}
                        />}
                </div>
            </div>
        );
    } else {
        return (
            <div>Venter</div>
        )
    }
};

export default App;
