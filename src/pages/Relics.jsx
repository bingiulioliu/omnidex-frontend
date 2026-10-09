import { useEffect } from "react";
import { useState } from "react";
import { fetchRelicById, fetchRelics } from "../utils/fetch";
import { RelicList } from "../components/RelicList";

function Relics() {
    const [relics, setRelics] = useState(null);

    useEffect(() => {
        fetchRelics()
        .then(setRelics);
    }, [])

    if (relics === null)
        return <p>Stiamo recuperando le reliquie...</p>;


    return <>
        <h1>Pagina reliquie</h1>

        <RelicList relics={relics}/>

    </>;
}
export default Relics;
