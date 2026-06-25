import { Link } from "react-router-dom";
import { Heart, HeartFill, PlusCircle, DashCircle, Cart3, Trash } from "react-bootstrap-icons";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx"; // Nuovo import

function ProductCard({ product, displayed, viewMode }) {
    const isList = viewMode === 'list';
    const {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();
    const { wishList, setWishList, addWishHandler } = useWishlist(); // Estraiamo le funzioni della wishlist
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
        <div className="cyber-card w-100 d-flex flex-column justify-content-between">

            <Link to={`/products/${product.slug}`} className="card-body d-flex flex-column text-decoration-none h-100">
                <img src={product.img} alt="product-img" className="img-fluid mb-3 product-img" />
                <h5 className="card-title p-font prod-name-wrapper">{product.name}</h5>

                <div className="price-wrapper p-font mt-auto mb-2 d-flex justify-content-center align-items-center">
                    {hasDiscount ? (
                        <div className="price-box">
                            <h5 className="text-decoration-line-through cut-price">
                                {product.price}€
                            </h5>
                            <h3 className="">{product.discounted_price}€</h3>
                        </div>
                    ) : (
                        <h3 className="">{product.price}€</h3>
                    )}
                </div>
            </Link>

            <div className="card-actions px-3 pb-3 mt-auto d-flex gap-2">
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