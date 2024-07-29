import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Top N Products</h1>
      {selectedProduct ? (
        <ProductDetails product={selectedProduct} />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default App;
