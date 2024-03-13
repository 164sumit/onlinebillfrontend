// TariffModification.js

import React, { useState } from 'react';
import './TariffModification.css';
import config from '../../Links/config';
import axios from 'axios';

const TariffModification = () => {
    const [code, setcode] = useState('');
    const [unit1, setUnit1] = useState('');
    const [price1, setPrice1] = useState('');
    const [unit2, setUnit2] = useState('');
    const [price2, setPrice2] = useState('');
    const [unit3, setUnit3] = useState('');
    const [price3, setPrice3] = useState('');
    const [units, setUnits] = useState([]);
    const [price, setPrice] = useState([]);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const unitArray = [unit1, unit2, unit3];
        const priceArray = [price1, price2, price3];
        setUnits(unitArray);
        setPrice(priceArray);
        const backendurl=`${config.backendUrl}/updatetariff`;
        try {
            const {data}=await axios.post(backendurl,{
                code,
                units:[unit1,unit2,unit3],
                price:[price1,price2,price3]
            })
            const tariff=data.newtariff
            if(tariff){
                setUnit1(tariff.units[0]);
                setPrice1(tariff.price[0]);
                setUnit2(tariff.units[1]);
                setPrice2(tariff.price[1]);
                setUnit3(tariff.units[2]);
                setPrice3(tariff.price[2]);
                setFlag(true);
                alert("Tariff updated sucessfuly");
            }
            else{
                alert("Tariff code not found");
            }
            console.log(data);
        } catch (error) {
            console.error("Error fetching tariff details:", error);
            alert("An error occurred while fetching tariff details");
        }

    };
    const handleSearch = async(e) => {
        e.preventDefault();
        const backendurl=`${config.backendUrl}/gettariffdetail`;
        try {
            const {data}=await axios.post(backendurl,{
                code
            })
            const tariff=data.tariff
            if(tariff){
                setUnit1(tariff.units[0]);
                setPrice1(tariff.price[0]);
                setUnit2(tariff.units[1]);
                setPrice2(tariff.price[1]);
                setUnit3(tariff.units[2]);
                setPrice3(tariff.price[2]);
                setFlag(true);
                setFlag2(true);
            }
            else{
                alert("Tariff code not found");
            }
            console.log(data);
        } catch (error) {
            console.error("Error fetching tariff details:", error);
            alert("An error occurred while fetching tariff details");
        }
    };

    return (
        <div className="tariff-container">
            <h2>Tariff Modification</h2>
            {!flag2&&(<form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="code">Tariff Code Name:</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setcode(e.target.value)}
                        // disabled
                        required
                    />
                </div>
                <button type="submit">Search</button>
            </form>)}
            
            {flag&&(<form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="code">Tariff Code Name:</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setcode(e.target.value)}
                        disabled
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unit1">Unit 1:</label>
                    <input
                        type="text"
                        id="unit1"
                        value={unit1}
                        onChange={(e) => setUnit1(e.target.value)}
                        required
                    />
                    <label htmlFor="price1">Price 1:</label>
                    <input
                        type="text"
                        id="price1"
                        value={price1}
                        onChange={(e) => setPrice1(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unit2">Unit 2:</label>
                    <input
                        type="text"
                        id="unit2"
                        value={unit2}
                        onChange={(e) => setUnit2(e.target.value)}
                        required
                    />
                    <label htmlFor="price2">Price 2:</label>
                    <input
                        type="text"
                        id="price2"
                        value={price2}
                        onChange={(e) => setPrice2(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unit3">Unit 3:</label>
                    <input
                        type="text"
                        id="unit3"
                        value={unit3}
                        onChange={(e) => setUnit3(e.target.value)}
                        required
                    />
                    <label htmlFor="price3">Price 3:</label>
                    <input
                        type="text"
                        id="price3"
                        value={price3}
                        onChange={(e) => setPrice3(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>)}
            {flag&&(<div className="result">
                <h3>Units:</h3>
                <p>{units.join(', ')}</p>
                <h3>Price:</h3>
                <p>{price.join(', ')}</p>
            </div>)}
        </div>
    );
};

export default TariffModification;
