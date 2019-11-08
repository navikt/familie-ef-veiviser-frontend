import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from '../feilside/Feilside';
import MarkdownViewer from '../utils/MarkdownViewer';
import Veiviserikon from '../../assets/icons/VeiviserIkon';
import AlertStripe from 'nav-frontend-alertstriper';
import { IHeader } from '../../models/Header';

const Header = () => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [info, setInfo] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  const sanityQuery = '*[_type == $type][0]{ingress, overskrift}';

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(sanityQuery, { type: 'header' })
        .then((res: IHeader) => {
          setInfo(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });

      setFetching(false);
    };

    fetchData();
  }, []);

  if (fetching) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!error && info && info.ingress && info.overskrift) {
    return (
      <div className="veiviser-header">
        <Veiviserikon className="veiviser-ikon" />
        <h2>{info.overskrift}</h2>
        <hr />
        <MarkdownViewer markdown={info.ingress} />
      </div>
    );
  } else if (error) {
    return <Feilside />;
  }

  return null;
};

export default Header;
