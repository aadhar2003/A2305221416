import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">{product.productname}</h2>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}%</p>
          <p>Availability: {product.availability}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
