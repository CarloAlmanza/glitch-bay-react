import ProductCard from "./ProductCard";

function ProductList({ products, displayed, viewMode }) {
    return (
        <div className="row g-4">
            {products.map((product) => (
                <div key={product.id} className={viewMode === 'list' ? 'col-12' : 'col-12 col-sm-6 col-md-4 col-lg-3'}>
                    <ProductCard product={product} viewMode={viewMode} />
                </div>
            ))}
        </div>
    )
}
export default ProductList;