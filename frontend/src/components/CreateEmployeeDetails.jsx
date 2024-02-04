import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";


const CreateEmployeeDetails = ({ onCreateEmployee }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [employment_status, setEmploymentStatus] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitCreateEmployeeDetails = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ token,},
    body: JSON.stringify({ first_name:first_name, 
        last_name:last_name, 
        address:address,
        employment_status:employment_status,
        phone_number:phone_number}),
    };

    const response = await fetch("/create/employee", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onCreateEmployee(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCreateEmployeeDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Create Employee</h1>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              type="FirstName"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              type="LastName"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <input
              type="Address"
              placeholder="Enter Adsress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Employement Status</label>
          <div className="control">
            <input
              type="EmployementStatus"
              placeholder="Enter Intern/FullTime/contract/temporary"
              value={employment_status}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Phone number</label>
          <div className="control">
            <input
              type="PhoneNumber"
              placeholder="Enter PhoneNumber"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployeeDetails;