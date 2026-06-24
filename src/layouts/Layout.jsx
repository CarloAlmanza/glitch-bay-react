import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx'; // Nuovo import

function Layout() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false); // Stato per la seconda sidebar

    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
    const { wishList, addWishHandler } = useWishlist(); // Dati della wishlist

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalWish = wishList.length; // Numero di elementi nei preferiti

    return (
        <div className="app-container">
            <header className='header'>
                <nav className="navbar navbar-dark navbar-expand-lg d-flex justify-content-between align-items-center p-3">
                    <Link className="navbar-brand" to="/" >
                        <img src="/imgs/glitch-bay-logo.png" alt="Logo" className="logo" />
                    </Link>

                    <div className="d-none d-lg-flex gap-3 align-items-center">
                        <Link to="/" className=" cyber-link text-white text-decoration-none fw-bold">Pagina iniziale</Link>
                        <Link to="/products" className=" cyber-link text-white text-decoration-none fw-bold">I Nostri Prodotti</Link>


                        {/* Pulsante Wishlist Desktop */}
                        <button
                            className="btn btn-dark position-relative p-font"
                            onClick={() => setIsWishlistOpen(true)}
                            style={{ border: '1px solid #ff007f', boxShadow: '0 0 5px rgba(255, 0, 127, 0.4)' }}
                        >
                            ❤️ Preferiti
                            {totalWish > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-magenta" style={{ backgroundColor: '#ff007f' }}>
                                    {totalWish}
                                </span>
                            )}
                        </button>

                        {/* Pulsante Carrello Desktop */}
                        <button
                            className="btn btn-dark position-relative p-font"
                            onClick={() => setIsCartOpen(true)}
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

                    {/* Controlli Mobile */}
                    <div className="d-lg-none d-flex gap-2">
                        <button className="btn btn-sm btn-outline-light position-relative" onClick={() => setIsWishlistOpen(true)}>
                            ❤️ {totalWish > 0 && <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>}
                        </button>
                        <button className="navbar-toggler position-relative" onClick={() => setIsCartOpen(true)}>
                            <span className="navbar-toggler-icon"></span>
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Overlay generico (si attiva se una delle due sidebar è aperta) */}
            <div className={`overlay ${isCartOpen || isWishlistOpen ? 'active' : ''}`} onClick={() => { setIsCartOpen(false); setIsWishlistOpen(false); }}></div>

            {/* SIDEBAR 1: IL CARRELLO */}
            <nav className={`sidebar ${isCartOpen ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-dark title-font">Glitch Bag</h4>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
                </div>
                <div className="cart-section p-font">
                    <h5 className="text-dark mb-3">I tuoi Hardware:</h5>
                    {cart.length === 0 ? (
                        <p className="text-muted small">Nessun pacchetto rilevato nel sistema...</p>
                    ) : (
                        <>
                            <div className="cart-items" style={{ maxHeight: "55vh", overflowY: "auto" }}>
                                {cart.map((item) => (
                                    <div key={item.id} className="card mb-2 p-2 bg-light border-secondary">
                                        <div className="d-flex justify-content-between align-items-center text-dark">
                                            <div style={{ maxWidth: '70%' }}>
                                                <div className="fw-bold text-truncate small">{item.name}</div>
                                                <div className="small text-muted">{item.quantity}x - €{item.price}</div>
                                            </div>
                                            <button onClick={() => increaseQuantity(item.slug)}>+</button>
                                            <button onClick={() => decreaseQuantity(item.slug)}>-</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.slug)} style={{ padding: '2px 6px', fontSize: '0.75rem' }}>Elimina</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr className="text-dark" />
                            <div className="d-flex justify-content-between align-items-center text-dark mb-3">
                                <span>TOTAL:</span>
                                <span className="fw-bold text-success">€{totalPrice}</span>
                            </div>
                            <Link to="checkout">
                                <button className="btn btn-dark w-100 mb-2 border-success text-success fw-bold">VAI AL PAGAMENTO</button>
                            </Link>
                            <button className="btn btn-link btn-sm w-100 text-danger text-decoration-none" onClick={clearCart}>Resetta Carrello</button>
                        </>
                    )}
                </div>
            </nav>

            {/* SIDEBAR 2: LA WISHLIST (Nuova!) */}
            <nav className={`sidebar ${isWishlistOpen ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-dark title-font" style={{ color: '#ff007f' }}>Wishlist</h4>
                    <button className="close-btn" onClick={() => setIsWishlistOpen(false)}>×</button>
                </div>
                <div className="wishlist-section p-font">
                    <h5 className="text-dark mb-3">Componenti salvati:</h5>
                    {wishList.length === 0 ? (
                        <p className="text-muted small">Nessun codice salvato nei preferiti...</p>
                    ) : (
                        <div className="wishlist-items" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                            {wishList.map((item) => (
                                <div key={item.slug} className="card mb-2 p-2 bg-light border-secondary">
                                    <div className="d-flex justify-content-between align-items-center text-dark">
                                        <div className="text-truncate style" style={{ maxWidth: '70%' }}>
                                            <span className="fw-bold small">{item.name}</span>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => addWishHandler(item)}
                                            style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                                        >
                                            Rimuovi
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;