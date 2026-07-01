import { Link } from "react-router-dom";
import { Heart, HeartFill, PlusCircle, DashCircle, Cart3, Trash } from "react-bootstrap-icons";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

function ProductCard({ product, displayed, viewMode }) {
    const isList = viewMode === 'list';
    const {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();
    const { wishList, addWishHandler } = useWishlist();
    const isAdded = Array.isArray(wishList) && wishList.some((item) => item.slug === product.slug);

    const cartItem = cart.find(
        (item) => item.slug === product.slug
    );

    const hasDiscount = product.discounted_price && product.discounted_price !== product.price;

    const handleAddToCart = () => {
        const productToCart = {
            ...product,
            price: hasDiscount ? product.discounted_price : product.price
        };
        addToCart(productToCart);
    };

    return (
        <div className={`cyber-card w-100 d-flex ${isList ? 'flex-row align-items-center p-3 gap-3' : 'flex-column justify-content-between'}`}>
            <Link
                to={`/products/${product.slug}`}
                className={`card-body d-flex text-decoration-none h-100 p-0 
            ${isList
                        ? 'flex-row align-items-center flex-grow-1 gap-3'
                        : 'flex-column'}`}>
                <img
                    src={product.img}
                    alt="product-img"
                    className={`img-fluid product-img ${isList ? 'mb-0' : 'mb-3'}`}
                    style={isList ? { width: '180px', height: '110px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 } : {}}
                />
                <div className={`d-flex flex-column flex-grow-1 ${isList ? 'justify-content-center align-items-center' : ''}`}>

                    <div className="d-flex align-items-center justify-content-center gap-2 mb-1 w-100">
                        <h5 className="card-title p-font prod-name-wrapper mb-0 text-center text-white">{product.name}</h5>

                        {isList && product.category && (
                            <span className="badge text-uppercase p-font"
                                style={{
                                    fontSize: '0.75rem',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Trasparenza al 15%
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.25)' // Bordino leggero per non farlo sparire
                                }}>
                                {product.category}
                            </span>
                        )}
                    </div>

                    {isList && product.description && (
                        <p className="text-white small mb-2 text-center text-truncate-2-lines"
                            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#fff' }}>
                            {product.description}
                        </p>
                    )}

                    <div className={`price-wrapper p-font d-flex align-items-center justify-content-center w-100 ${isList ? 'mt-1' : ''}`}>
                        {hasDiscount ? (
                            <div className="d-flex flex-column">
                                <h5 className="text-decoration-line-through cut-price mb-0" style={{ fontSize: '1rem' }}>
                                    {product.price.toFixed(2).replace('.',',')}€
                                </h5>
                                <h3 className="mb-0" style={isList ? { fontSize: '1.4rem' } : {}}>{product.discounted_price.toFixed(2).replace('.',',')}€</h3>
                            </div>
                        ) : (
                            <h3 className="mb-0" style={isList ? { fontSize: '1.4rem' } : {}}>{product.price.toFixed(2).replace('.',',')}€</h3>
                        )}
                    </div>
                </div>
            </Link>

            <div
                className={`card-actions d-flex gap-2 align-items-center ${isList ? 'col-2 p-0 justify-content-end align-self-end' : ' mt-auto'
                    }`}>
                {displayed !== 'product-detail' && (
                    /* Pulsante Cuore con Toggle e classe condizionale per l'animazione neon */
                    <button
                        className={`btn explore-btn flex-grow-0 ${isAdded ? 'active-heart' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            addWishHandler(product, !isAdded);
                        }}
                    >
                        {isAdded ? (
                            <HeartFill className="explore-eye text-danger" size={17} />
                        ) : (
                            <Heart className="explore-eye" size={17} />
                        )}
                    </button>
                )}

                {cartItem ? (
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                        <div
                            className="d-flex align-items-center justify-content-between flex-grow-1 ms-auto cyber-qty-box "
                            style={{
                                border: '1px solid #00f0ff',
                                borderRadius: '8px',
                                padding: '4px 8px'
                            }}
                        >

                            <span className="fw-bold p-font qty-display">
                                {cartItem.quantity}
                            </span>

                            <button
                                className="btn qty-btn d-flex align-items-center justify-content-center p-0 fw-bold me-2"
                                onClick={() => decreaseQuantity(product.slug)}
                            >
                                <DashCircle />
                            </button>

                            <button
                                className="btn qty-btn d-flex align-items-center justify-content-center p-0 fw-bold"
                                onClick={() => increaseQuantity(product.slug)}
                            >
                                <PlusCircle />
                            </button>
                        </div>
                        <button
                            className="d-flex trash-box align-items-center justify-content-between ms-auto cyber-qty-box "
                            onClick={() => removeFromCart(product.slug)}
                            title="Rimuovi dal carrello"
                        >
                            <Trash size={18} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-outline-info flex-grow-0 p-font fw-bold"
                        style={{
                            border: '1px solid #00f0ff',
                            color: '#00f0ff',
                            boxShadow: '0 0 5px rgba(0, 240, 255, 0.2)'
                        }}
                    >
                        <Cart3 />
                    </button>
                )}
            </div>

        </div>
    );
}

export default ProductCard;