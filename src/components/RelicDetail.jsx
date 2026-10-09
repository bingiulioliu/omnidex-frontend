import { Link } from "react-router"

export function RelicDetail({relic}){

    return <>
        <div className="row g-4">

            <div className="col-12 col-md-5">
                <div className="ratio ratio-1x1 bg-body-tertiary border rounded">
                    {relic.imgUrl ? (
                        <img src={`${import.meta.env.VITE_API_IMG_URL}${relic.imgUrl}`}/>
                    ) : (
                        <span className="d-flex align-items-center justify-content-center text-secondary">{relic.name}</span>
                    )}
                </div>
            </div>

            <div className="col-12 col-md-7 d-flex flex-column">
                {relic.universe?.name && (
                    <span className="badge text-bg-primary align-self-start mb-2 text-uppercase">
                        {relic.universe.name}
                    </span>
                )}

                <h1 className="mb-3">{relic.name}</h1>

                <p className="text-secondary">{relic.description}</p>

                {relic.categories.length > 0 && (
                    <ul className="list-inline mb-0">
                        {relic.categories.map(category =>{
                            <li className="list-inline-item" key={category.id}>
                                <span className="badge text-bg-secondary">{category.name}</span>
                            </li>
                        })}
                    </ul>
                )}

                

            </div>
        </div>
    </>
}