import { Link } from "react-router"

function HomePage() {
  return <>
    <div className="container py-5">
      {/* Hero */}
      <section className="text-center mb-5">
        <h1 className="mb-3">Omnidex</h1>
        <p className="lead mb-4">
          L'archivio delle reliquie provenienti da mondi, galassie e simulazioni.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Link to="/relics" className="btn btn-primary btn-lg">
            Esplora le reliquie
          </Link>
          <Link to="/about" className="btn btn-outline-secondary btn-lg">
            Chi siamo
          </Link>
        </div>
      </section>
    </div>
  </>;
}
export default HomePage;
