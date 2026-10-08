import { useEffect } from "react";
import { useState } from "react";
import { fetchRelics } from "../utils/fetch";

function Relics() {
    const {relics, setRelics} = useState(null);

    useEffect(() => {
        fetchRelics()
        .then(setRelics);
    }, [])

    return <>
        <h1>Pagina reliquie</h1>
        <pre>{JSON.stringify(relics,null,2)}</pre>
    </>;
}
export default Relics;
