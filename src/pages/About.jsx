function About() {
    return <>
            <h1>Chi siamo</h1>
            <p className="lead mb-4">
                Omnidex è un archivio digitale dedicato alla catalogazione di reliquie
                provenienti da universi fantastici, galassie lontane e simulazioni.
            </p>

            <section className="mb-4">
                <h2>Il progetto</h2>
                <p>
                    L'obiettivo è raccogliere manufatti storici e leggendari in un unico
                    punto di consultazione, ordinandoli per universo e categoria. Ogni
                    reliquia è accompagnata da una descrizione e da un'immagine dedicata,
                    per facilitarne l'identificazione e lo studio.
                </p>
                <p>
                    Il catalogo comprende archivi provenienti da universi filmici,
                    letterari e videoludici, coprendo generi eterogenei tra loro.
                </p>
            </section>

            <section className="mb-4">
                <h2>Cosa trovi in Omnidex</h2>
                <ul className="list-unstyled">
                    <li className="mb-2">
                        <strong>Reliquie</strong>: la raccolta completa dei manufatti,
                        con dettagli, descrizione e immagine.
                    </li>
                    <li className="mb-2">
                        <strong>Universi</strong>: il contesto di provenienza di ogni
                        singolo oggetto.
                    </li>
                    <li className="mb-2">
                        <strong>Categorie</strong>: la classificazione delle reliquie in
                        base al loro impiego.
                    </li>
                </ul>
            </section>
        </>;
}
export default About;