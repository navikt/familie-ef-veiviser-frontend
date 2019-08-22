import React, { useState } from 'react';
import Sporsmal from './components/Sporsmal';
import Informasjonstekst from './components/Informasjonstekst';

const App = () => {

    const [ferdig, settFerdig] = useState<boolean>(false);
    const [steg, settSteg] = useState<number>(1);
    const [alder, settAlder] = useState<number>(0);
    const [inntekt, settInntekt] = useState<number>(0);

    return (
        <div className="app">
            <div className="innholdscontainer">
                {ferdig ?
                    <Informasjonstekst
                        steg={steg}
                        alder={alder}
                        inntekt={inntekt}
                    /> :
                    <Sporsmal
                        settSteg={settSteg}
                        settAlder={settAlder}
                        settInntekt={settInntekt}
                        settFerdig={settFerdig}
                        steg={steg}
                    />}
            </div>
        </div>
    );
};

export default App;
