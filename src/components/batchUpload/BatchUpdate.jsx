import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const BatchUpdate = () => {
  const [file, setFile] = useState(null);
  const [updatedCustomers, setUpdatedCustomers] = useState(null);
  const [notUpdatedCustomers, setNotUpdatedCustomers] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileNameParts = selectedFile.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
      // Ensure file is of type .xlsx or .xls
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        setFile(selectedFile);
      } else {
        alert('Please select an Excel file (.xlsx or .xls)');
      }
    }
  };

  const handleUpload = async () => {
    const backendUrl = config.backendUrl + "/batchUpdateCustomers";
    try {
      if (!file) {
        alert('Please select a file to upload');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(backendUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);

      if (data.success) {
        setUpdatedCustomers(data.updatedCustomers);
        setNotUpdatedCustomers(data.notUpdatedCustomers);
      }

      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file');
    }
  };

  const createExcelSheet = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const handleDownload = (customers, fileName) => {
    createExcelSheet(customers, fileName);
  };

  return (
    <div>
      <h2>Batch Update</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {updatedCustomers && (
        <button onClick={() => handleDownload(updatedCustomers, 'updatedCustomers')}>
          Download Updated Customers
        </button>
      )}
      {notUpdatedCustomers && (
        <button onClick={() => handleDownload(notUpdatedCustomers, 'notUpdatedCustomers')}>
          Download Not Updated Customers
        </button>
      )}
<Link to={"/batchMail"}><button>Go to BatchMail</button></Link>

    </div>
  );
};

export default BatchUpdate;
