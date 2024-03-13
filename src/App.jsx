import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import NewCustomerRegistration from './components/NewCustomerRegistration/NewCustomerRegistration';
import EditCustomerRegistration from './components/EditCustomerRegistration/EditCustomerRegistration';
import TariffModification from './components/TariffModification/TariffModification';
import NewTariffCreation from './components/NewTariffCreation/NewTariffCreation';
import { AuthProvider } from './context/AuthContext';
import { TariffProvider } from './context/TariffContext';
import BatchUpdate from './components/batchUpload/BatchUpdate';
import PayBill from './components/PayBill/PayBill';
import CheckBill from './components/CheckBill/CheckBill';
import BatchMail from './components/BatchMail/BatchMail';
import SignUpForm from './components/temp/SignUpForm';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter >
      <AuthProvider>
        <TariffProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/NewRegistration" element={<NewCustomerRegistration />} />
            <Route path="/updatecustomer" element={<EditCustomerRegistration />} />
            <Route path="/creationtariff" element={<NewTariffCreation />} />
            <Route path="/updatetariff" element={<TariffModification />} />
            <Route path="/batchUpdate" element={<BatchUpdate />} />
            <Route path="/BatchMail" element={<BatchMail />} />
            <Route path="/paybill" element={<PayBill />} />
            <Route path="/checkbill" element={<CheckBill />} />
            <Route path="/SignUpForm" element={<SignUpForm />} />
          </Routes>
        </TariffProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
