import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";


const AdminCreateBankDetails = ({ onAdminCreateBank }) => {
  const [employee_email,setEmployeeEmail] = useState("");
  const [bank_id, setBankId] = useState("");
  const [bank_name, setBankName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [routing_number, setRoutingNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitCreateBankDetails = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ token,},
    body: JSON.stringify({ 
        employee_email:employee_email,
        bank_id:bank_id,
        bank_name:bank_name,
        account_number:account_number,
        routing_number:routing_number
    }),
    };

    const response = await fetch("/admin_create/bank", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onAdminCreateBank(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCreateBankDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Admin Create Bank Details</h1>
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
          <label className="label">Bank id</label>
          <div className="control">
            <input
              type="BankId"
              placeholder="Enter Bank Id"
              value={bank_id}
              onChange={(e) => setBankId(e.target.value)}
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
          Admin Create Bank Details
        </button>
      </form>
    </div>
  );
};

export default AdminCreateBankDetails;