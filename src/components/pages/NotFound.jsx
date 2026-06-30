import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="products-page vh-100 d-flex align-items-center py-5">
            <div className="position-absolute h-100 girl-with-phone-wrapper">
                <img src="/imgs/img_elements_glitch/girl.png" alt="girl-with-phone" className="girl-with-phone"/>
            </div>
            <div className="container text-center p-font">
                
                <div className="mb-4">
                    <i className="bi bi-exclamation-triangle text-info cyber-title fs-1 d-inline-block"></i>
                </div>

                <h1 className="cyber-title title-font mb-3">Errore 404</h1>
                <h2 className="title-font fs-4 text-white mb-4">Pagina Non Trovata</h2>
                
                <div className="cyber-form p-4 my-4 mx-auto text-center text-white col-12 col-md-6 col-lg-4">
                    <p className="fs-5 m-0 opacity-90">
                        <i className="bi bi-terminal me-2 text-info"></i>
                        Spiacenti, la pagina che stai cercando non esiste.
                    </p>
                </div>

                <div className="mt-5">
                    <Link to="/" className="btn cyber-btn py-3 px-4">
                        <span className="btn-shop-text text-uppercase tracking-wider fw-bold">Torna alla Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;