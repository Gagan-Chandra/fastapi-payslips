import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const AdminCreatePaymentDetails = ({ onAdminCreatePayment}) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [salary, setSalary] = useState(0.0);
  const [bonus, setBonus] = useState(0.0);
  const [tax, setTax] = useState(0.0);
  const [health_insurance, setHealthInsurance] = useState(0.0);
  const [net_pay, setNetPay] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  const [token,] = useContext(UserContext);

  const submitCreatePaymentDetails = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ token,},
    body: JSON.stringify({ 
        email:email,
        first_name:first_name, 
        last_name:last_name, 
        salary:parseFloat(salary),
        bonus:parseFloat(bonus),
        tax:parseFloat(tax),
        health_insurance:parseFloat(health_insurance),
        net_pay:parseFloat(net_pay)
        }),
    };

    const response = await fetch("/admin_create/payments", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        // setToken(data.access_token);
        onAdminCreatePayment(data); // Callback to pass created employee data
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCreatePaymentDetails();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Admin Create Payment</h1>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="Email"
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
          <label className="label">Salary</label>
          <div className="control">
            <input
              type="Salary"
              placeholder="Enter Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Bonus</label>
          <div className="control">
            <input
              type="Bonus"
              placeholder="Enter Bonus"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Tax</label>
          <div className="control">
            <input
              type="Tax"
              placeholder="Enter Tax"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Health Insurance</label>
          <div className="control">
            <input
              type="HealthInsurance"
              placeholder="Enter Health Insurance"
              value={health_insurance}
              onChange={(e) => setHealthInsurance(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Net Pay</label>
          <div className="control">
            <input
              type="NetPay"
              placeholder="Enter Net Pay"
              value={net_pay}
              onChange={(e) => setNetPay(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Admin Create Payment
        </button>
      </form>
    </div>
  );
};

export default AdminCreatePaymentDetails;