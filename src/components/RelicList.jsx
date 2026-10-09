import { Link } from "react-router";
import { RelicCard } from "./RelicCard";

export function RelicList({relics}){
    return <>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            {relics.map(relic => (
                <div className="col" key={relic.id}>
                    <Link to={`${relic.id}`} className="d-block h-100 text-decoration-none text-reset">
                        <RelicCard relic={relic} />
                    </Link>
                </div>
            ))}
        </div>
    </>
}