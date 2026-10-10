import { useEffect } from "react";
import { useState } from "react";
import { fetchRelics } from "../utils/fetch";
import { RelicList } from "../components/RelicList";
import { useSearchParams } from "react-router";

function Relics() {
    const [relics, setRelics] = useState(null);
    const [params, setParams] = useSearchParams()
    const query = params.get("name") ?? "";

    useEffect(() => {
        fetchRelics(query)
        .then(setRelics);
    }, [query])

    if (relics === null)
        return <p>Stiamo recuperando le reliquie...</p>;


    return <>
        <h1>Pagina reliquie</h1>

        <input 
            type="search"
            placeholder="Cerca il nome della reliquia"
            className="form-control mb-3"
            value={query}
            onChange={event => setParams(event.target.value ? {name: event.target.value} : {}, {replace: true})}
        />

        <RelicList relics={relics}/>

    </>;
}
export default Relics;
