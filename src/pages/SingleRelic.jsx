import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { RelicDetail } from "../components/RelicDetail";
import { fetchRelicById } from "../utils/fetch";

export function SingleRelic(){

    const {id} = useParams();
    const [relic, setRelic] = useState(null);

    useEffect(() => {
        fetchRelicById(id)
        .then(setRelic);
    }, [id])

    if (relic === null)
        return <p>Stiamo caricando la reliquia...</p>


    return <>
        <h1>Dettaglio reliquia</h1>
        <Link to="/relics" className="btn btn-outline-secondary align-self-start mt-3 mb-3">
            Torna alle reliquie
        </Link>
        <RelicDetail relic={relic}/>
    </>
}