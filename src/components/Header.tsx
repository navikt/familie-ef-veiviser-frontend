import React, {useEffect, useState} from 'react';
import CustomSVG from '../utils/CustomSVG';
import SvgMask from "./svg-mask/SvgMask";
import { client } from '../utils/sanity';

const signSVG = require('../assets/icons/ark-veiviser.svg');

const Header = () => {
    console.log(signSVG);
    const [fetching, settFetching] = useState<boolean>(true);
    const [info, settInfo] = useState<any>([]);
    const [error, settError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = () => {
            client
                .fetch(
                    '*[_type == $type]',
                    {type: 'header'}
                )
                .then((res: any) => {
                    settInfo(res);
                })
                .catch((err: any) => {
                    console.error('Oh no, error occured: ', err);
                    settError(true);
                });

            settFetching(false);
        };

        fetchData();
    }, []);

    return (
        <div className="veiviser-header">
            <h2>Kan jeg søke stønad som enslig mor eller far?</h2>
            <hr />
            <p>Som enslig mor eller far, kan du få overgangsstønad og stønad til barnetilsyn. I forbindelse med arbeidssøking og utdanning, kan du også få stønad til skolepenger, læremidler og reise.</p>
            <p>Sjekk hvilke av disse du kan søke om i din situasjon.</p>
        </div>
    );
};

export default Header;
