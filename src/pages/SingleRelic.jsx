import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { RelicDetail } from "../components/RelicDetail";
import { fetchRelicById } from "../utils/fetch";

export function SingleRelic(){

    const {id} = useParams();
    const [relic, setRelic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        fetchRelicById(id)
        .then(setRelic)
        .finally(() => setIsLoading(false));
    }, [id])


    return <>
        <h1>Dettaglio {relic?.name}</h1>
        <Link to="/relics" className="btn btn-outline-secondary align-self-start mt-3 mb-3">
            Torna alle reliquie
        </Link>

        {isLoading ? (
            <p>Stiamo recuperando la reliquia...</p>
        ) : relic === null ? (
            <p>Errore di comunicazione col Server. Riprova</p>
        ) : (
            <RelicDetail relic={relic}/>
        )}
    </>
}