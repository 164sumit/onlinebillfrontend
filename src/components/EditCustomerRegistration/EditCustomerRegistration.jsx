import React, { useContext, useState } from 'react';
import './EditCustomerRegistration.css';
import axios from 'axios';
import config from '../../Links/config';
import { useNavigate } from 'react-router-dom';
import { TariffContext } from '../../context/TariffContext';

const EditCustomerRegistration = () => {
    const [accountNo, setAccountNo] = useState('');
    const [name, setName] = useState('');
    const [tariffType, setTariffType] = useState('');
    const [electricMeterNo, setElectricMeterNo] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [email, setEmail] = useState('');
    const { tariffCodes } = useContext(TariffContext);
    const navigate = useNavigate();

    const handleSearchClick = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/getcustomerdetail`,{
                accountNo
            });
            const { sucess, customer } = response.data;
            if (sucess) {
                setName(customer.name);
                setTariffType(customer.tariffType);
                setElectricMeterNo(customer.electricMeterNo);
                setEmail(customer.email);
                setSearchClicked(true);
            } else {
                alert("Customer not found");
            }
        } catch (error) {
            console.error("Error fetching customer details:", error);
            alert("An error occurred while fetching customer details");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendurl = `${config.backendUrl}/updatecustomer`;
        try {
            const { data } = await axios.post(backendurl, {
                name,
                accountNo,
                tariffType,
                electricMeterNo,
                email
            });
            console.log(data);
            if (data.sucess) {
                alert(`updation successful for customer ${name} with account no. ${accountNo}`);
                navigate("/dashboard");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("An error occurred while updating customer");
        }
    };

    return (
        <div className="registration-container">
            <h2>Edit Customer Registration</h2>
            <div className="search-section">
                <input
                    type="text"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    placeholder="Enter Account No"
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            {searchClicked && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled // Disable input field
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
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default EditCustomerRegistration;
