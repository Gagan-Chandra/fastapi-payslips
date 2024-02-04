import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";


const UpdateEmployerDetails = ({ onUpdateEmployer }) => {
  const [company_name, setCompanyName] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [company_contact, setCompanyContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitUpdateEmployerDetails = async () => {
    const payload = {
      company_name: company_name.trim() !== "" ? company_name : undefined,
      company_address: company_address.trim() !== "" ? company_address : undefined,
      company_contact: company_contact.trim() !== "" ? company_contact : undefined
    };
  
    const requestOptions = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch("/update_user/employer", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onUpdateEmployer(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitUpdateEmployerDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Update Employer</h1>
        <div className="field">
          <label className="label">Company Name</label>
          <div className="control">
            <input
              type="CompanyName"
              placeholder="Enter Company Name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input"
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
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Update Employer
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployerDetails;