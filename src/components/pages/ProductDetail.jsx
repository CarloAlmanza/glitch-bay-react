import { useEffect, useState } from "react"
import { fetchSingle } from "../../utils/fetch.js"
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard.jsx";

function ProductDetail() {
    
    const [product, setProduct] = useState([]);
    const { slug } = useParams();
    useEffect(() => {
        fetchSingle(slug).then(product => {
            setProduct(product);
        })
    }, []);
    const hasDiscount = product.discounted_price && product.discounted_price !== product.price;

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
                                    
                                    <h5 className="text-decoration-line-through cut-price">
                                        ${product.price}
                                    </h5>
                                    <h3>${product.discounted_price}</h3>
                                    <div className="empty-box"></div>
                                </>
                            ) : (
                                <h3>${product.price}</h3>
                            )}
                        </div>
                        <div className="cyber-line"></div>
                        <p className="cyber-description mt-4 p-font">
                            {product.description}
                        </p>
                        <button className="btn cyber-btn mt-4">
                            <p className="btn-shop-text">Aggiungi al carrello</p>
                        </button>
                        <button className="btn cyber-btn mt-4 ms-3">
                            <p className="btn-shop-text">Aggiungi alla wishlist</p>
                        </button>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default ProductDetail