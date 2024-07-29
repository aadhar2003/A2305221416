import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{product.productname}</h2>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductDetails;
