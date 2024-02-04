// Payslips.js
import React, { useEffect, useState } from 'react';

const Payslips = ({ token }) => {
  const [payslipData, setPayslipData] = useState(null);

  useEffect(() => {
    const fetchPayslipData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch('/payslips/', requestOptions);

        if (!response.ok) {
          console.error('Error fetching payslip data:', response.statusText);
          return;
        }

        const data = await response.json();
        setPayslipData(data);
      } catch (error) {
        console.error('Error fetching payslip data:', error.message);
      }
    };

    fetchPayslipData();
  }, [token]);

  return (
    <div>
      <h2>Your Payslips</h2>
      {payslipData ? (
        <div>
          <div>
            <h3>Employee Details</h3>
            <p>Name: {payslipData.employee.first_name} {payslipData.employee.last_name}</p>
            <p>Email: {payslipData.employee.email}</p>
            <p>Phone Number: {payslipData.employee.phone_number}</p>
            <p>Address: {payslipData.employee.address}</p>
          </div>
          <div>
            <h3>Bank Details</h3>
            {payslipData.bank.status_code === 404 ? (
              <p>{payslipData.bank.detail}</p>
            ) : (
              <>
                <p>Bank Name: {payslipData.bank.bank_name}</p>
                <p>Account Number: {payslipData.bank.account_number}</p>
                <p>Routing Number: {payslipData.bank.routing_number}</p>
              </>
            )}
          </div>
          <div>
            <h3>Payment Details</h3>
            {payslipData.payment.status_code === 404 ? (
              <p>{payslipData.payment.detail}</p>
            ) : (
              <>
                <p>Salary: {payslipData.payment.salary}</p>
                <p>Bonus: {payslipData.payment.bonus}</p>
                <p>Tax: {payslipData.payment.tax}</p>
                <p>Health Insurance: {payslipData.payment.health_insurance}</p>
                <p>Net Pay: {payslipData.payment.net_pay}</p>
              </>
            )}
          </div>
          <div>
            <h3>Employer Details</h3>
            {payslipData.employer.status_code === 404 ? (
              <p>{payslipData.employer.detail}</p>
            ) : (
              <>
                <p>Company Name: {payslipData.employer.company_name}</p>
                <p>Company Address: {payslipData.employer.company_address}</p>
                <p>Company Contact: {payslipData.employer.company_contact}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading payslip data...</p>
      )}
    </div>
  );
};

export default Payslips;
