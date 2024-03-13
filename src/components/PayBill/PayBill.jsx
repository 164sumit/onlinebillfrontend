import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';

const PayBill = () => {
  const [accountNo, setAccountNo] = useState('');
  
  const handleAccountNoChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handlePayBill = async () => {
    try {
        const backendurl=`${config.backendUrl}/PayBill`;
        // const jjj;
      const response = await axios.post(backendurl, { accountNo });
      const { sucess } = response.data;
      if (sucess) {
        alert('Bill paid successfully');
      } else {
        alert('Something went wrong while paying the bill');
      }
    } catch (error) {
      console.error('Error paying bill:', error);
      alert('An error occurred while paying the bill');
    }
  };

  return (
    <div>
      <h2>Pay Bill</h2>
      <div>
        <label htmlFor="accountNo">Account Number:</label>
        <input
          type="text"
          id="accountNo"
          value={accountNo}
          onChange={handleAccountNoChange}
          required
        />
      </div>
      <button onClick={handlePayBill}>Pay Bill</button>
    </div>
  );
};

export default PayBill;
