import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import { Link } from 'react-router-dom';
import { TariffContext } from '../../context/TariffContext';

const CheckBill = () => {
  const [accountNo, setAccountNo] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const [billAmount, setBillAmount] = useState(0);
  const { tariffCodes } = useContext(TariffContext);

  const handleAccountNoChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handleCheckBill = async () => {
    try {
    const backendurl=`${config.backendUrl}/getcustomerdetail`;
      const response = await axios.post(backendurl, { accountNo });
      const { sucess, customer } = response.data;
      if (sucess) {
        setCustomerInfo(customer);
        calculateBillAmount()
      } else {
        setError('Something went wrong while checking the bill');
      }
    } catch (error) {
      console.error('Error checking bill:', error);
      setError('An error occurred while checking the bill');
    }
  };
  const calculateBillAmount = () => {
    if (!customerInfo) {
    //   setError('Customer details not available');
      return;
    }

    const tariffCode = tariffCodes.find(tariff => tariff.code === customerInfo.tariffType);
    if (!tariffCode) {
    //   setError('Tariff code not found for the customer');
      return;
    }

    let totalUnitLeft = customerInfo.totalUnitLeft;
    let totalBillAmount = 0;

    for (let i = 0; i < tariffCode.units.length; i++) {
      if (totalUnitLeft <= 0) {
        break;
      }
      const unitsConsumed = Math.min(tariffCode.units[i], totalUnitLeft);
      if(i==2){
        totalBillAmount=totalUnitLeft*tariffCode.price[i]
      }
      totalBillAmount += unitsConsumed * tariffCode.price[i];
      totalUnitLeft -= unitsConsumed;
    }

    setBillAmount(totalBillAmount);
  };
  useEffect(() => {
    calculateBillAmount()
  }, [customerInfo]);
  

  return (
    <div>
      <h2>Check Bill</h2>
      <div>
        <label htmlFor="accountNo">Account Number:</label>
        <input
          type="text"
          id="accountNo"
          value={accountNo}
          onChange={handleAccountNoChange}
          required
        />
        <button onClick={handleCheckBill}>Check Bill</button>
      </div>
      {error && <div>{error}</div>}
      {customerInfo && (
          <div>
          <h3>Account Information</h3>
          <p>Account No: {customerInfo.accountNo}</p>
          <p>Name: {customerInfo.name}</p>
          <p>Total Unit Left: {customerInfo.totalUnitLeft}</p>
            {<p>Bill Amount: {billAmount}</p>}
          {/* <button onClick={calculateBillAmount}>Calculate Bill</button> */}
           <Link to={"/paybill"}> <button >Pay Bill</button></Link>
        </div>
      )}
    </div>
  );
};

export default CheckBill;
