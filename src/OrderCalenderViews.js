import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './OrdersCalendarView.css';

const OrdersCalendarView = ({ orders, onPageChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const ordersOnSelectedDate = orders.filter(order => {
    const deliveryDate = new Date(order.deliveryDate);
    return format(deliveryDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  });

  return (
    <div className="orders-calendar-view">
      <h1>Enterprise Resource Planning System</h1>
      <h2>Orders Calendar View</h2>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="orders-on-date">
        <h3>Orders on {format(selectedDate, 'MMMM d, yyyy')}</h3>
        <ul>
          {ordersOnSelectedDate.map(order => (
            <li key={order.id}>
              <div>Order ID: {order.orderId}</div>
              <div>Customer Name: {order.customerName}</div>
              <div>Order Date: {order.orderDate}</div>
              <div>Delivery Date: {order.deliveryDate}</div>
              <div>Status: {order.status}</div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => onPageChange('dashboard')} className="navigation-button">Return to Dashboard</button>
    </div>
  );
};

export default OrdersCalendarView;
