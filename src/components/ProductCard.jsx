import { Link } from "react-router-dom";
import { Heart } from "react-bootstrap-icons";
import { useCart } from "../context/CartContext.jsx";

function ProductCard({ product, displayed }) {
    const { addToCart } = useCart();
    const hasDiscount = product.discounted_price && product.discounted_price !== product.price;

    const handleAddToCart = () => {
        const productToCart = {
            ...product,
            price: hasDiscount ? product.discounted_price : product.price
        };
        addToCart(productToCart);
    };

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex g-4">
            <div className="cyber-card w-100 d-flex flex-column justify-content-between">

                <Link to={`/products/${product.slug}`} className="card-body d-flex flex-column text-decoration-none h-100">
                    <img src={product.img} alt="product-img" className="img-fluid mb-3 product-img" />
                    <h5 className="card-title p-font prod-name-wrapper">{product.name}</h5>

                    <div className="price-wrapper p-font mt-auto mb-2 d-flex justify-content-center align-items-center gap-2">
                        {hasDiscount ? (
                            <>
                                <h5 className="text-decoration-line-through cut-price mb-0">
                                    ${product.price}
                                </h5>
                                <h3 className="mb-0 text-danger">${product.discounted_price}</h3>
                            </>
                        ) : (
                            <h3 className="mb-0">${product.price}</h3>
                        )}
                    </div>

                    {displayed === 'product-detail' && (
                        <div className="mt-2">
                            <p className="card-text p-font">{product.description}</p>
                        </div>
                    )}
                </Link>

                <div className="card-actions px-3 pb-3 mt-auto d-flex gap-2">
                    {displayed !== 'product-detail' && (
                        <button className="btn explore-btn flex-grow-0">
                            <Heart className="explore-eye" size={17} />
                        </button>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className="btn btn-outline-info flex-grow-1 p-font fw-bold"
                        style={{
                            border: '1px solid #00f0ff',
                            color: '#00f0ff',
                            boxShadow: '0 0 5px rgba(0, 240, 255, 0.2)'
                        }}
                    >
                        Aggiungi al carrello
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProductCard;