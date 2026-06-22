import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main>
            <section>
                <h1><strong>404</strong> - Pagina Non Trovata</h1>
                <p>Spiacenti, la pagina che stai cercando non esiste.</p>
                <Link to="/" >Torna alla Home</Link>
            </section>
        </main>
    );
}

export default NotFound;