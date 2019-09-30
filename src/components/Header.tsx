import React, { useEffect, useState } from 'react';
import { client } from '../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './Feilside';
import MarkdownViewer from './MarkdownViewer';
import Veiviserikon from '../assets/icons/VeiviserIkon';

const Header = () => {
  const [fetching, settFetching] = useState<boolean>(true);
  const [info, settInfo] = useState<any>([]);
  const [error, settError] = useState<boolean>(false);

  const sanityQuery = '*[_type == $type][0]{ingress, overskrift}';

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(sanityQuery, { type: 'header' })
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
