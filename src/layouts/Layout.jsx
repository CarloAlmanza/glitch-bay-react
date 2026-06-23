import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

function Layout() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, removeFromCart, clearCart } = useCart();

    // Calcolo del numero totale di articoli (somma delle quantità)
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Calcolo del prezzo totale
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="app-container">
            <header className='header'>
                <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center p-3">
                    <Link className="navbar-brand" to="/" >
                        <img src="/imgs/glitch-bay-logo.png" alt="Logo" className="logo" />
                    </Link>

                    {/* Menu Desktop */}
                    <div className="d-none d-lg-flex gap-4 align-items-center">
                        <Link to="/products" className="text-white text-decoration-none fw-bold">I Nostri Prodotti</Link>
                        <Link to="/aboutus" className="text-white text-decoration-none fw-bold">404</Link>

                        {/* Pulsante Carrello Desktop */}
                        <button
                            className="btn btn-dark position-relative ms-2 p-font"
                            onClick={() => setIsOpen(true)}
                            style={{ border: '1px solid #00f0ff', boxShadow: '0 0 5px rgba(0, 240, 255, 0.4)' }}
                        >
                            🛒 Carrello
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Pulsante Menu/Carrello Mobile */}
                    <button className="navbar-toggler d-lg-none position-relative" onClick={() => setIsOpen(true)}>
                        <span className="navbar-toggler-icon"></span>
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                {totalItems}
                            </span>
                        )}
                    </button>
                </nav>
            </header>

            {/* Overlay */}
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

            {/* Sidebar Unificata */}
            <nav className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-dark title-font">Glitch Bag</h4>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                </div>

                {/* Link di Navigazione interni alla sidebar */}
                <ul className="sidebar-nav list-unstyled mb-4 p-font">
                    <li className="mb-2"><Link to="/products" className="text-decoration-none text-dark fw-bold" onClick={() => setIsOpen(false)}>🌐 Our Products</Link></li>
                    <li className="mb-4"><Link to="/aboutus" className="text-decoration-none text-dark fw-bold" onClick={() => setIsOpen(false)}>💀 About Us</Link></li>
                </ul>

                <hr className="text-dark" />

                {/* Contenuto del Carrello */}
                <div className="cart-section p-font">
                    <h5 className="text-dark mb-3">I tuoi Hardware:</h5>

                    {cart.length === 0 ? (
                        <p className="text-muted small">Nessun pacchetto rilevato nel sistema...</p>
                    ) : (
                        <>
                            <div className="cart-items" style={{ maxHeight: "45vh", overflowY: "auto" }}>
                                {cart.map((item) => (
                                    <div key={item.id} className="card mb-2 p-2 bg-light border-secondary">
                                        <div className="d-flex justify-content-between align-items-center text-dark">
                                            <div style={{ maxWidth: '70%' }}>
                                                <div className="fw-bold text-truncate small">{item.name}</div>
                                                <div className="small text-muted">{item.quantity}x - €{item.price}</div>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                                            >
                                                Elimina
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="text-dark" />

                            <div className="d-flex justify-content-between align-items-center text-dark mb-3">
                                <span>TOTAL:</span>
                                <span className="fw-bold text-success">€{totalPrice}</span>
                            </div>

                            <button className="btn btn-dark w-100 mb-2 border-success text-success fw-bold">
                                VAI AL PAGAMENTO
                            </button>
                            <button className="btn btn-link btn-sm w-100 text-danger text-decoration-none" onClick={clearCart}>
                                Resetta Carrello
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

/* Nota: Per visualizzare le scritte scure all'interno della sidebar bianca, 
abbiamo usato le utilità .text-dark e .bg-light di Bootstrap. */
export default Layout;