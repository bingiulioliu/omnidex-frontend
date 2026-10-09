export function RelicCard({relic}){
    return <>
        <article className="card h-100 bg-body-tertiary border">

            {/* Immagine */}
            <div className="ratio ratio-4x3 bg-body-secondary border-bottom">
                {relic.imgUrl &&(
                    <img src={relic.imgUrl} alt={relic.name} className="object-fit-contain p-3"></img>
                )}
            </div>

            {/* Corpo card */}
            <div className="card-body d-flex flex-column">
                {relic.universe?.name &&(
                    <span className="badge text-bg-primary align-self-start mb-2 text-uppercase">
                        {relic.universe.name}
                    </span>
                )}
                <h3 className="card-title mb-2">{relic.name}</h3>
                <p className="card-text text-secondary flex-grow-1">{relic.description}</p>
            </div>
        </article>
    </>
}