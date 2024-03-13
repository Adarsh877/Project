// App.js

import React, { useState } from 'react';
import './App.css';
import ProductManagement from './productmanagement';
import OrderManagement from './OrderManagement';
import OrdersCalendarView from './OrderCalenderViews'; // Import the OrdersCalendarView component

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [productCount, setProductCount] = useState(2); // Initial product count based on mock data
  const [orderCount, setOrderCount] = useState(2); // Initial order count based on mock data
  const [orders] = useState([
    { id: 1, orderId: 'ORD001', customerName: 'John Doe', orderDate: '2024-03-10', deliveryDate: '2024-03-15', status: 'Pending' },
    { id: 2, orderId: 'ORD002', customerName: 'Jane Smith', orderDate: '2024-03-09', deliveryDate: '2024-03-14', status: 'Completed' },
    // Add more mock data as needed
  ]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleProductChange = (count) => {
    setProductCount(count);
  };

  const handleOrderChange = (count) => {
    setOrderCount(count);
  };

  return (
    <div className="App">
      {currentPage === 'products' && (
        <ProductManagement
          onPageChange={handleNavigation}
          onProductChange={handleProductChange}
          onOrderChange={handleOrderChange}
        />
      )}
      {currentPage === 'orders' && (
        <OrderManagement
          onPageChange={handleNavigation}
          onOrderChange={handleOrderChange}
          orders={orders}
        />
      )}
      {currentPage === 'calendar' && (
        <OrdersCalendarView
          orders={orders}
          onPageChange={handleNavigation}
        />
      )}
      {currentPage === 'dashboard' && (
        <div className="dashboard">
          <h1>Enterprise Resource Planning System</h1>
          <h2>Welcome to the Dashboard</h2>
          <div className="dashboard-summary">
            <div className="metric">
              <h2>Total Products</h2>
              <span>{productCount}</span>
            </div>
            <div className="metric">
              <h2>Total Orders</h2>
              <span>{orderCount}</span>
            </div>
          </div>
          <div className="navigation-links">
            <button onClick={() => handleNavigation('products')} className="navigation-button">Product Management</button>
            <button onClick={() => handleNavigation('orders')} className="navigation-button">Order Management</button>
            <button onClick={() => handleNavigation('calendar')} className="navigation-button">Calendar View</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
