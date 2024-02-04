import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";


const AdminUpdateEmployeeDetails = ({ onAdminUpdateEmployee }) => {
  const [email,setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [employment_status, setEmploymentStatus] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitAdminUpdateEmployeeDetails = async () => {
    const payload = {
      email:email,
      first_name: first_name.trim() !== "" ? first_name : undefined,
      last_name: last_name.trim() !== "" ? last_name : undefined,
      address: address.trim() !== "" ? address : undefined,
      employment_status: employment_status.trim() !== "" ? employment_status : undefined,
      phone_number: phone_number.trim() !== "" ? phone_number : undefined,
    };
  
    const requestOptions = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch("/update_admin/employees", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onAdminUpdateEmployee(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAdminUpdateEmployeeDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Admin Update Employee</h1>
        <div className="field">
          <label className="label">Employee Email</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter Employee Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              type="FirstName"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
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
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <input
              type="Address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
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
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Admin Update Employee
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateEmployeeDetails;