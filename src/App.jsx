import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import Layout from './layouts/Layout.jsx';
import Home from "./components/pages/Home.jsx";
import OurProducts from './components/pages/OurProducts.jsx';
import ProductDetail from './components/pages/ProductDetail.jsx';
import CheckoutSummary from './components/pages/CheckoutSummary.jsx';
import ScrollReset from './components/ScrollReset.jsx';
import NotFound from './components/pages/NotFound.jsx';
import OrderSuccess from './components/pages/OrderSuccess.jsx';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <ScrollReset />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="products" element={<OurProducts />} />
              <Route path="/checkout" element={<CheckoutSummary />}/>
              <Route path="/order_success" element={<OrderSuccess />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;