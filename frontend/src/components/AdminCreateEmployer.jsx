import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";


const AdminCreateEmployerDetails = ({ onAdminCreateEmployer }) => {
  const [employee_email,setEmployeeEmail] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [company_contact, setCompanyContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitCreateEmployerDetails = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ token,},
    body: JSON.stringify({ 
        employee_email:employee_email,
        company_name:company_name, 
        company_address:company_address,
        company_contact:company_contact}),
    };

    const response = await fetch("/admin_create/employer", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onAdminCreateEmployer(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCreateEmployerDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Admin Create Employer</h1>
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
          <label className="label">Company Name</label>
          <div className="control">
            <input
              type="CompanyName"
              placeholder="Enter Company Name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Company Address</label>
          <div className="control">
            <input
              type="CompanyAddress"
              placeholder="Enter Company Address"
              value={company_address}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Company Contact</label>
          <div className="control">
            <input
              type="CompanyContact"
              placeholder="Enter phone  number/email of comany"
              value={company_contact}
              onChange={(e) => setCompanyContact(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Admin Create Employer
        </button>
      </form>
    </div>
  );
};

export default AdminCreateEmployerDetails;