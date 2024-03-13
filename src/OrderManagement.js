// OrderManagement.js

import React, { useState, useEffect } from 'react';
import './OrderManagement.css';

const OrderManagement = ({ onOrderChange, onPageChange, orders }) => {
  const [updatedOrders, setUpdatedOrders] = useState(orders); // Define the setOrders function

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');

  useEffect(() => {
    // Call the callback function with the updated order count whenever orders change
    onOrderChange(updatedOrders.length);
  }, [updatedOrders, onOrderChange]);

  const handleDelete = (id) => {
    const updatedOrdersList = updatedOrders.filter(order => order.id !== id);
    setUpdatedOrders(updatedOrdersList); // Update the orders using setOrders
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    if (!updatedStatus) return;
    const updatedOrdersList = updatedOrders.map(order => {
      if (order.id === selectedOrder.id) {
        return { ...order, status: updatedStatus };
      }
      return order;
    });
    setUpdatedOrders(updatedOrdersList); // Update the orders using setOrders
    setSelectedOrder(null);
    setUpdatedStatus('');
  };

  return (
    <div className="order-management">
      <div className="header">
        <h1>Enterprise Resource Planning System</h1>
        <button onClick={() => onPageChange('dashboard')} className="navigation-button">Return to Dashboard</button>
      </div>
      <h2>Orders Management</h2>
      <ul className="order-list">
        {updatedOrders.map(order => (
          <li key={order.id} className="order-item">
            <div>Order ID: {order.orderId}</div>
            <div>Customer Name: {order.customerName}</div>
            <div>Order Date: {order.orderDate}</div>
            <div>Delivery Date: {order.deliveryDate}</div>
            <div>Status: {order.status}</div>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
            <button onClick={() => handleViewDetails(order)}>View Details</button>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div className="order-details">
          <h2>Order Details</h2>
          <div>Order ID: {selectedOrder.orderId}</div>
          <div>Customer Name: {selectedOrder.customerName}</div>
          <div>Order Date: {selectedOrder.orderDate}</div>
          <div>Delivery Date: {selectedOrder.deliveryDate}</div>
          <div>Status:
            <select value={updatedStatus} onChange={handleStatusChange}>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              {/* Add more status options as needed */}
            </select>
            <button onClick={handleUpdateStatus}>Update Status</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
