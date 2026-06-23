import { useEffect, useState } from "react";
import { fetchFive, fetchTopSeller } from "../../utils/fetch";
import ProductsCarousel from "../Carousel";

function Home() {
    const [latest, setLatest] = useState([]);
    const [topFive, setTopFive] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [latest, topFive] = await Promise.all([fetchFive(), fetchTopSeller()]);
                setLatest(latest);
                setTopFive(topFive);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <main>
            <ProductsCarousel
                title="Più Venduto"
                items={topFive || []}
                loading={loading}
                error={error}
            />
            <ProductsCarousel
                title="Ultimi Arrivi"
                items={latest || []}
                loading={loading}
                error={error}
            />
        </main>
    );
}
export default Home;