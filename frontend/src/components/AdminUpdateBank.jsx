import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";


const AdminUpdateBankDetails = ({ onUpdate }) => {
  const [employee_email,setEmployeeEmail] = useState("");
  const [bank_name, setBankName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [routing_number, setRoutingNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitAdminUpdateBankDetails = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ token,},
    body: JSON.stringify({ 
        employee_email:employee_email,
        bank_name:bank_name,
        account_number:account_number,
        routing_number:routing_number
    }),
    };

    const response = await fetch("/update_admin/bank", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onUpdate(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAdminUpdateBankDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Admin Update Bank Details</h1>
        <div className="field">
          <label className="label">Employee Email</label>
          <div className="control">
            <input
              type="EmployeeEmail"
              placeholder="Enter Employee Email"
              value={employee_email}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Bank Name</label>
          <div className="control">
            <input
              type="BankName"
              placeholder="Enter Bank Name"
              value={bank_name}
              onChange={(e) => setBankName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">account number</label>
          <div className="control">
            <input
              type="AccountNumber"
              placeholder="Enter Account Number"
              value={account_number}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">routing number</label>
          <div className="control">
            <input
              type="RoutingNumber"
              placeholder="Enter Routing Number"
              value={routing_number}
              onChange={(e) => setRoutingNumber(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Admin Update Bank Details
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateBankDetails;