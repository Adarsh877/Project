import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = ({ onPageChange, onProductChange }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category 1', price: 10, stockQuantity: 100 },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 50 },
    // Add more mock data as needed
  ]);

  useEffect(() => {
    // Call the callback function with the updated product count whenever products change
    onProductChange(products.length);
  }, [products, onProductChange]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity)
    };
    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      category: '',
      price: '',
      stockQuantity: ''
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="product-management">
      <h1>Enterprise Resource Planning System</h1> {/* Added heading */}
      <h2>Products Management</h2> {/* Updated heading */}
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={formData.stockQuantity} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div>Name: {product.name}</div>
            <div>Category: {product.category}</div>
            <div>Price: ${product.price}</div>
            <div>Stock Quantity: {product.stockQuantity}</div>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => onPageChange('dashboard')} className="navigation-button">Back to Dashboard</button>
    </div>
  );
};

export default ProductManagement;
