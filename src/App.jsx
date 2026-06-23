import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import Home from "./components/pages/Home.jsx";
import OurProducts from './components/pages/OurProducts.jsx';
import ProductDetail from './components/pages/ProductDetail.jsx';
import NotFound from './components/pages/NotFound.jsx';
import ScrollReset from './components/ScrollReset.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollReset />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route path="products" element={<OurProducts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;