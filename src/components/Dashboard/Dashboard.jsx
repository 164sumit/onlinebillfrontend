import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleNewRegistration = () => {
    // Handle new registration logic
    console.log('New Registration');
  };

  const handleEditCustomer = () => {
    // Handle editing customer logic
    console.log('Edit Customer');
  };

  const handleTariffModification = () => {
    // Handle tariff modification logic
    console.log('Tariff Modification');
  };

  const handleTariffCreation = () => {
    // Handle tariff creation logic
    console.log('Tariff Creation');
  };

  const handleBulkEmail = () => {
    // Handle bulk email logic
    console.log('Bulk Email');
  };

  const handleBulkUpload = () => {
    // Handle bulk upload logic
    console.log('Bulk Upload');
  };

  const handleCheckBill = () => {
    // Handle check bill logic
    console.log('Check Bill');
  };

  const handlePayBill = () => {
    // Handle pay bill logic
    console.log('Pay Bill');
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard - MyApp</h1>
      <div className="button-container">
        <div className="dropdown">
          <button className="dropbtn">Customer</button>
          <div className="dropdown-content">
            <Link to={"/NewRegistration"}><button onClick={handleNewRegistration}>New Registration</button></Link>
            <Link to={"/updatecustomer"}><button onClick={handleEditCustomer}>Edit Existing Customer</button></Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Traffic Plan</button>
          <div className="dropdown-content">
            <Link to={"/updatetariff"}><button onClick={handleTariffModification}>Modification</button></Link>
            <Link to={"/creationtariff"}><button onClick={handleTariffCreation}>Creation</button></Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Utilities</button>
          <div className="dropdown-content">
            <Link to={"/BatchMail"}><button onClick={handleBulkEmail}>Bulk Email</button></Link>
            <Link to={"/batchUpdate"}><button onClick={handleBulkUpload}>Bulk Upload</button></Link>
            <Link to={"/checkbill"}><button onClick={handleCheckBill}>Check Bill</button></Link>
            <Link to={"/paybill"}><button onClick={handlePayBill}>Pay Bill</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
