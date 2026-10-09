import { RelicCard } from "./RelicCard";

export function RelicList({relics}){
    return <>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            {relics.map(relic => (
                <div className="col" key={relic.id}>
                    <RelicCard relic={relic} />
                </div>
            ))}
        </div>
    </>
}