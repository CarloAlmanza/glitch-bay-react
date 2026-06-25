import { useEffect, useState } from "react"
import { fetchSingle } from "../../utils/fetch.js"
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { Heart, HeartFill, Cart3, DashCircle, PlusCircle } from "react-bootstrap-icons"

function ProductDetail() {
    const [product, setProduct] = useState([]);
    const { slug } = useParams();
    const { cart,
            addToCart,
            increaseQuantity,
            decreaseQuantity } = useCart();

    const cartItem = cart.find(
        (item) => item.slug === product.slug
    );

    const { wishList, setWishList, addWishHandler } = useWishlist();
    const isAdded = Array.isArray(wishList) && wishList.some((item) => item.slug === product.slug);
    useEffect(() => {
        fetchSingle(slug).then(product => {
            setProduct(product);
        })
    }, [slug]);
    const hasDiscount = product.discounted_price && product.discounted_price !== product.price;
    const handleAddToCart = () => {
        const productToCart = {
            ...product,
            price: hasDiscount ? product.discounted_price : product.price
        };
        addToCart(productToCart);
    };
    return (
        <div className="container-product-detail py-5">
            <div className="cyber-detail-card">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="img-fluid cyber-img"
                        />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="cyber-title detail-font">
                            {product.name}
                        </h1>
                        <div className="cyber-price mt-4 p-font">
                            {hasDiscount ? (
                                <>

                                    <h5 className="text-decoration-line-through cut-price-detail opacity-50">
                                        ${product.price}
                                    </h5>
                                    <h3>${product.discounted_price}</h3>
                                </>
                            ) : (
                                <h3>${product.price}</h3>
                            )}
                        </div>
                        <div className="cyber-line"></div>
                        <p className="cyber-description mt-4 p-font">
                            {product.description}
                        </p>
                        <div className="d-flex align-items-center justify-content-start gap-2">


                                {cartItem ? (
                                    <div
                                        className="d-flex align-items-center flex-grow-0 cyber-qty-box "
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
                                ) : (
                                    <button className="cyber-action-btn" onClick={handleAddToCart}>
                                        <Cart3 className="cyber-icon" size={17} />
                                    </button>
                                )}
                            <button
                                className={`cyber-action-btn ${isAdded ? 'active-heart' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addWishHandler(product, !isAdded);
                                }}
                            >
                                {isAdded ? (
                                    <HeartFill className="cyber-icon" size={17} />
                                ) : (
                                    <Heart className="cyber-icon" size={17} />
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default ProductDetail