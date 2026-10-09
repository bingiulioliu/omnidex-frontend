import { useEffect } from "react";
import { useState } from "react";
import { fetchRelicById, fetchRelics } from "../utils/fetch";

function Relics() {
    const {relics, setRelics} = useState(null);
    const {relic, setRelic} = useState(null);

    useEffect(() => {
        fetchRelics()
        .then(setRelics);
    }, [])

    useEffect(() => {
        fetchRelicById(1)
        .then(setRelics);
    }, [])



    return <>
        <h1>Pagina reliquie</h1>
        <pre>{JSON.stringify(relics,null,2)}</pre>
        <pre>{JSON.stringify(relic,null,2)}</pre>
    </>;
}
export default Relics;
