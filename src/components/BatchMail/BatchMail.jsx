import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const BatchMail = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      
      try {
        const { data } = await axios.post(`http://localhost:5000/api/v1/batchmail`, {jsonData});
        setResponse(data);
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const createExcelSheet = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const handleDownload = (data, fileName) => {
    createExcelSheet(data, fileName);
  };

  return (
    <div>
      <h2>Batch Mail</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && (
  <div>
    <h3>Response:</h3>
    <p>Success: {response.success ? 'Yes' : 'No'}</p>
    <p>Successfully Sent Mail:</p>
    <ul>
      {response.successfullySentMail.map((mail, index) => (
        <li key={index}>
          <div>
            <p>Electric Meter No: {mail.electricMeterNo}</p>
            <p>Email: {mail.email}</p>
            <p>Account No: {mail.accountNo}</p>
          </div>
        </li>
      ))}
    </ul>
    <p>Not Sent Mail:</p>
    <ul>
      {response.notSentMail.map((mail, index) => (
        <li key={index}>
          <div>
            <p>Electric Meter No: {mail.electricMeterNo}</p>
            <p>Email: {mail.email}</p>
            <p>Account No: {mail.accountNo}</p>
          </div>
        </li>
      ))}
    </ul>
    <button onClick={() => handleDownload(response.successfullySentMail, 'successfullySentMail')}>
      Download Successfully Sent Mail
    </button>
    <button onClick={() => handleDownload(response.notSentMail, 'notSentMail')}>
      Download Not Sent Mail
    </button>
  </div>
)}
<Link to={"/batchUpdate"}><button>Go to BatchUpdate</button></Link>

    </div>
  );
};

export default BatchMail;
