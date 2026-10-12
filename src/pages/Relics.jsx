import { useEffect } from "react";
import { useState } from "react";
import { fetchRelics } from "../utils/fetch";
import { RelicList } from "../components/RelicList";
import { useSearchParams } from "react-router";

function Relics() {
    const [relics, setRelics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useSearchParams();
    const query = params.get("name") ?? "";

    useEffect(() => {
        setIsLoading(true);
        fetchRelics(query)
            .then(setRelics)
            .finally(() => setIsLoading(false));
    }, [query])

    return <>
        <div className="d-flex justify-content-around">
            <p className="lead text-secondary mb-3">
                Elenco completo delle reliquie filtrabili per nome
            </p>
            <p className="text-secondary mb-3">
                {relics?.length ? `${relics.length} reliquie disponibili` : ""}
            </p>
        </div>

        <input
            type="search"
            placeholder="Cerca il nome della reliquia"
            className="form-control mb-3"
            value={query}
            onChange={event => setParams(event.target.value ? { name: event.target.value } : {}, { replace: true })}
        />

        {isLoading ? (
            <p>Stiamo recuperando le reliquie...</p>
        ) : relics === null ? (
            <p>Errore di comunicazione col Server. Riprova.</p>
        ) : (
            <RelicList relics={relics} />
        )}
    </>;
}
export default Relics;
