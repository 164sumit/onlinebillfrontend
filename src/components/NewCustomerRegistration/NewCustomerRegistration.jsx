import React, { useState, useContext } from 'react';
import './NewCustomerRegistration.css';
import config from '../../Links/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TariffContext } from '../../context/TariffContext';

const NewCustomerRegistration = () => {
    const [accountNo, setAccountNo] = useState('');
    const [name, setName] = useState('');
    const [tariffType, setTariffType] = useState('');
    const [electricMeterNo, setElectricMeterNo] = useState('');
    const [email, setEmail] = useState('');
    const { tariffCodes } = useContext(TariffContext);
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle registration logic
        const backendurl = config.backendUrl+"/registercustomer"
        try {
            const { data } = await axios.post(backendurl,
                {
                    name,
                    accountNo,
                    tariffType,
                    electricMeterNo,
                    email
                }
            )
            console.log(data);
            if(data.sucess){
                alert(`Registration successful for customer ${name} with account no. ${accountNo}`);
                navigate("/dashboard");
            }
            else{
                alert(data.error);
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="registration-container">
            <h2>New Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="accountNo">Account No:</label>
                    <input
                        type="text"
                        id="accountNo"
                        value={accountNo}
                        onChange={(e) => setAccountNo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tariffType">Tariff Type:</label>
                    <select
                        id="tariffType"
                        value={tariffType}
                        onChange={(e) => setTariffType(e.target.value)}
                        required
                    >
                        <option value="">Select Tariff Type</option>
                        {tariffCodes.map(tariff => (
                            <option key={tariff._id} value={tariff.code}>{tariff.code}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="electricMeterNo">Electric Meter No:</label>
                    <input
                        type="text"
                        id="electricMeterNo"
                        value={electricMeterNo}
                        onChange={(e) => setElectricMeterNo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewCustomerRegistration;
