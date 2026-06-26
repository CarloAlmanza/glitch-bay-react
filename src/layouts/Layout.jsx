import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx'; // Nuovo import
import { HeartFill, Cart3 } from 'react-bootstrap-icons';
import { Trash } from "react-bootstrap-icons";

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
                        <Link to="/" className=" cyber-link text-white text-decoration-none fw-bold">Home</Link>
                        <Link to="/products" className=" cyber-link text-white text-decoration-none fw-bold">I Nostri Prodotti</Link>
                        {/* Pulsante Wishlist Desktop */}
                        <span
                            className="btn position-relative p-font btn-preferiti"
                            onClick={() => setIsWishlistOpen(true)}
                        >
                            <HeartFill className='cuore-preferiti' /> Preferiti
                            {totalWish > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-magenta" style={{ backgroundColor: '#ff007f' }}>
                                    {totalWish}
                                </span>
                            )}
                        </span>

                        {/* Pulsante Carrello Desktop */}
                        <span
                            className="btn position-relative p-font btn-carrello p-font"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <Cart3 className='icona-carrello' /> Carrello
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </span>
                    </div>

                    {/* Controlli Mobile */}
                    <div className="d-lg-none d-flex gap-2">
                        {/* Bottone Preferiti */}
                        <button className="btn btn-sm btn-preferiti position-relative px-3" onClick={() => setIsWishlistOpen(true)}>
                            <HeartFill className='cuore-preferiti' />
                            {totalWish > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>{totalWish}</span>
                            )}
                        </button>

                        {/* Bottone Carrello (Corretto) */}
                        <button className="btn btn-sm btn-carrello position-relative px-3" onClick={() => setIsCartOpen(true)}>
                            <Cart3 className="icona-carrello" /> {/* Ho aggiunto anche la tua classe per l'icona */}
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                    {totalItems} {/* <--- IMPORTANTE: Inserisci il numero qui per renderlo visibile */}
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
                <div className="d-flex justify-content-between align-items-center mb-3 gap-4 flex-wrap">
                    <h4 className="cyber-glitch-title cyber-cart-section title-font">Glitch Bag</h4>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
                </div>
                <div className="cart-section p-font">
                    <h5 className="text-dark mb-3">I tuoi Hardware:</h5>
                    {cart.length === 0 ? (
                        <p className="text-muted small">Nessun pacchetto rilevato nel sistema...</p>
                    ) : (
                        <>
                            <div className="cart-items" style={{ maxHeight: "95vh", overflowY: "auto" }}>
                                {cart.map((item) => (
                                    <div key={item.id} className="card mb-2 p-2 cyber-card-item">
                                        <div className="d-flex justify-content-between align-items-center flex-wrap text-dark">
                                            <div style={{ maxWidth: '70%' }}>
                                                <div className="fw-bold text-truncate small">{item.name}</div>
                                                <div className="small text-muted">{item.quantity}x - €{item.price}</div>
                                            </div>




                                            <button className="cyber-quantity-btn" onClick={() => increaseQuantity(item.slug)}>+</button>
                                            <button className="cyber-quantity-btn" onClick={() => decreaseQuantity(item.slug)}>-</button>
                                            <button className="btn btn-sm cyber-delete-btn" onClick={() => removeFromCart(item.slug)} style={{ padding: '2px 6px', fontSize: '0.75rem' }}>Elimina</button>



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
                                <button className="cyber-checkout-btn w-100 mb-2 ">VAI AL PAGAMENTO</button>
                            </Link>
                            <button className="cyber-reset-btn w-100 w-100 " onClick={clearCart}>Resetta Carrello</button>
                        </>
                    )}
                </div>
            </nav>

            {/* SIDEBAR 2: LA WISHLIST (Nuova!) */}
            <nav className={`sidebar ${isWishlistOpen ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-dark title-font cyber-glitch-title" style={{ color: '#ff007f' }}>Wishlist</h4>
                    <button className="close-btn btn-close-bg-white" onClick={() => setIsWishlistOpen(false)}>×</button>
                </div>
                <div className="wishlist-section p-font">

                    {wishList.length === 0 ? (
                        <p className="text-muted small">Nessun codice salvato nei preferiti...</p>
                    ) : (
                        <div className="wishlist-items" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                            {wishList.map((item) => (
                                <div
                                    key={item.slug}
                                    className="card mb-3 bg-light border-info overflow-hidden    cyber-card-item"
                                >
                                    <Link
                                        to={`/products/${item.slug}`}
                                        className="text-decoration-none text-dark"
                                        onClick={() => setIsWishlistOpen(false)}
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="card-img-top card-whishlist"
                                            style={{
                                                height: "140px",
                                                width: "100%",
                                                objectFit: "cover"


                                            }}
                                        />

                                        <div className="card-body p-2">
                                            <h6 className="card-title mb-0">
                                                {item.name}
                                            </h6>
                                        </div>
                                    </Link>

                                    <div className="card-footer bg-white border-0">
                                        <button
                                            className="btn btn-outline-danger btn-sm w-100"
                                            onClick={() => addWishHandler(item)}
                                        >
                                            <Trash size={16} className="me-2" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </nav >

            <main>
                <Outlet />
            </main>
        </div >
    );
}

export default Layout;