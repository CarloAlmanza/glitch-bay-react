import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductsCarousel({ items = [], loading, error, title}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const nextIndex = (currentIndex + 1) % items.length;
    const nextProduct = () => setCurrentIndex(nextIndex);
    const prevProduct = () => setCurrentIndex(prevIndex);

    if (loading) return <p>Caricamento...</p>;
    if (items.length === 0) return <p>Nessun prodotto disponibile.</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div className="carousel">
            <div className="controls">
                <button onClick={prevProduct}>Prev</button>
                <button onClick={nextProduct}>Next</button>
            </div>

            <div className="carousel-inner">
                <div>
                    <ProductCard product={items[prevIndex]} displayed="carousel" />
                </div>
                <div>
                    <ProductCard product={items[currentIndex]} displayed="carousel" />
                </div>
                <div>
                    <ProductCard product={items[nextIndex]} displayed="carousel" />
                </div>
            </div>
        </div>
    );
}

export default ProductsCarousel;