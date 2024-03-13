import React, { createContext, useState, useEffect } from 'react';
import config from '../Links/config';
import axios from 'axios';

export const TariffContext = createContext();

export const TariffProvider = ({ children }) => {
  const [tariffCodes, setTariffCodes] = useState([]);
  const backendurl=config.backendUrl+"/gettariff"
  useEffect(() => {
    const fetchTariffCodes = async () => {
      try {
        const response = await axios.post(backendurl);
        const data = response.data;
        setTariffCodes(data.tariff);
        console.log(data.tariff); // Assuming the API response is an array of tariff codes
      } catch (error) {
        console.error('Error fetching tariff codes:', error);
      }
    };

    fetchTariffCodes();

    // Clean-up function if needed
    return () => {
      // Any cleanup code if necessary
    };
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <TariffContext.Provider value={{ tariffCodes, setTariffCodes }}>
      {children}
    </TariffContext.Provider>
  );
};
