import { Link } from "react-router-dom";
import { EyeFill } from "react-bootstrap-icons";

function ProductCard({ product, displayed }) {
    const hasDiscount = product.discounted_price && product.discounted_price !== product.price;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex g-4">
            <div className="cyber-card w-100">
                    <Link to={`/products/${product.slug}`} className="card-body d-flex flex-column text-decoration-none">
                        <img src={product.img} alt="product-img" className="img-fluid mb-3 product-img" />

                        <h5 className="card-title p-font prod-name-wrapper">{product.name}</h5>
                        <div className="price-wrapper p-font mt-auto mb-2 d-flex justify-content-center">
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
                        {displayed === 'product-detail' && (
                            <div className="mt-2">
                                <p className="card-text p-font">{product.description}</p>
                            </div>
                        )}
                        {displayed !== 'product-detail' && (

                            <div className="btn mt-3 explore-btn">
                                <EyeFill className="explore-eye" />
                            </div>

                        )}
                    </Link>
            </div>
        </div>
    );
}

export default ProductCard;