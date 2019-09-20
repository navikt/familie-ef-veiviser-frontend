import React, {useEffect, useState} from 'react';
import { Panel } from 'nav-frontend-paneler';
import {client} from "../utils/sanity";
import MarkdownViewer from "./MarkdownViewer";
import NavFrontendSpinner from "nav-frontend-spinner";

interface IInformasjonstekstProps {
    steg: number
}

const Informasjonstekst: React.FC<IInformasjonstekstProps> = ({ steg }) => {

    const [fetching, settFetching] = useState<boolean>(true);
    const [info, settInfo] = useState<any>([]);
    const [error, settError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = () => {
            client
                .fetch(
                    '*[_type == $type && information_id == $id][0]',
                    {type: 'information', id: steg}
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

    if (fetching) {
        return (
            <NavFrontendSpinner className="spinner" />
        )
    }

    if (info && info.informasjonsfelt) {
        return (
            <>
                <div className="informasjonsboks blur-in">
                    <MarkdownViewer markdown={info.informasjonsfelt} />
                </div>
            </>
        );
    }

    return null;
};

export default Informasjonstekst;
