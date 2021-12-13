import { Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Product from './product/product';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
    </Routes>
  );
}

export default App;
