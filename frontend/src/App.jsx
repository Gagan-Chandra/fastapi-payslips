import React, { useContext, useEffect, useState } from 'react';
import Register from './components/Register';
import Header from './components/Header';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import Payslips from './components/Viewpayslips';
import CreateEmployeeDetails from './components/CreateEmployeeDetails';
import UpdateEmployeeDetails from './components/UpdateEmployeeDetails';
import CreateEmployerDetails from './components/CreateEmployerDetails';
import UpdateEmployerDetails from './components/UpdateEmployerDetails';
import CreateBankDetails from './components/CreateBankDetails';
import UpdateBankDetails from './components/UpdateBankDetails';
import AdminCreateEmployeeDetails from './components/AdminCreateEmployee';
import AdminCreateEmployerDetails from './components/AdminCreateEmployer';
import AdminCreateBankDetails from './components/AdminCreateBank';
import AdminCreatePaymentDetails from './components/AdminCreatePayment';
import AdminUpdateEmployeeDetails from './components/AdminUpdateEmployee';
import AdminUpdateEmployerDetails from './components/AdminUpdateEmployer';
import AdminUpdateBankDetails from './components/AdminUpdateBank';
import AdminUpdatePaymentDetails from './components/AdminUpdatePayment';

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useContext(UserContext);
  const [action, setAction] = useState(null);
  const [createdData, setCreatedData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const getWelcomeMessage = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('/api', requestOptions);
      const data = await response.json();

      if (!response.ok) {
        console.log('Server error:', data.detail);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error fetching welcome message:', error.message);
    }
  };

  const handleAction = (action) => {
    setAction(action);
    setCreatedData(null);
    setUpdatedData(null);
  };

  const handleCreate = (data) => {
    setCreatedData(data);
  };

  const handleUpdate = (data) => {
    setUpdatedData(data);
  };

  const handleLogout = () => {
    setToken(null);
    setAction(null);
    setCreatedData(null);
    setUpdatedData(null);
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  const renderComponent = () => {
    if (!token) {
      return (
        <div className="columns">
          <Register />
          <Login />
        </div>
      );
    }

    switch (action) {
      case 'payslips':
        return <Payslips token={token} />;
      case 'createEmployee':
        return (
          <CreateEmployeeDetails
            token={token}
            onCreate={handleCreate}
          />
        );
      case 'updateEmployee':
        return (
          <UpdateEmployeeDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
      case 'createEmployer':
        return (
          <CreateEmployerDetails
            token={token}
            onCreate={handleCreate}
          />
        );
      case 'updateEmployer':
        return (
          <UpdateEmployerDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
      case 'createBank':
        return (
          <CreateBankDetails
            token={token}
            onCreate={handleCreate}
          />
        );
      case 'updateBank':
        return (
          <UpdateBankDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
      case 'adminCreateEmployee':
        return (
          <AdminCreateEmployeeDetails
            token={token}
            onAdminCreate={handleCreate}
          />
        );
      case 'adminCreateEmployer':
        return (
          <AdminCreateEmployerDetails
            token={token}
            onAdminCreate={handleCreate}
          />
        );
      case 'adminCreateBank':
        return (
          <AdminCreateBankDetails
            token={token}
            onAdminCreate={handleCreate}
          />
        );
      case 'adminCreatePayment':
        return (
          <AdminCreatePaymentDetails
            token={token}
            onAdminCreate={handleCreate}
          />
        );
      case 'adminUpdateEmployee':
        return (
          <AdminUpdateEmployeeDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
        case 'adminUpdateEmployer':
        return (
          <AdminUpdateEmployerDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
        case 'adminUpdateBank':
        return (
          <AdminUpdateBankDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
        case 'adminUpdatePayment':
        return (
          <AdminUpdatePaymentDetails
            token={token}
            onUpdate={handleUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        title={message}
        onPayslipsClick={() => handleAction('payslips')}
        onCreateEmployeeDetailsClick={() => handleAction('createEmployee')}
        onCreateEmployerDetailsClick={() => handleAction('createEmployer')}
        onCreateBankDetailsClick={() => handleAction('createBank')}
        onUpdateEmployeeDetailsClick={() => handleAction('updateEmployee')}
        onUpdateEmployerDetailsClick={() => handleAction('updateEmployer')}
        onUpdateBankDetailsClick={() => handleAction('updateBank')}
        onAdminCreateEmployeeDetailsClick={() => handleAction('adminCreateEmployee')}
        onAdminCreateEmployerDetailsClick={() => handleAction('adminCreateEmployer')}
        onAdminCreateBankDetailsClick={() => handleAction('adminCreateBank')}
        onAdminCreatePaymentDetailsClick={() => handleAction('adminCreatePayment')}
        onAdminUpdateEmployeeDetailsClick={() => handleAction('adminUpdateEmployee')}
        onAdminUpdateEmployerDetailsClick={() => handleAction('adminUpdateEmployer')}
        onAdminUpdateBankDetailsClick={() => handleAction('adminUpdateBank')}
        onAdminUpdatePaymentDetailsClick={() => handleAction('adminUpdatePayment')}
        onLogoutClick={handleLogout} // Pass the handleLogout function to Header
      />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {renderComponent()}
          {createdData && (
            <div>
              <p>Data created successfully!</p>
              <pre>{JSON.stringify(createdData, null, 2)}</pre>
              <button onClick={() => setCreatedData(null)}>Back</button>
            </div>
          )}
          {updatedData && (
            <div>
              <p>Data updated successfully!</p>
              <pre>{JSON.stringify(updatedData, null, 2)}</pre>
              <button onClick={() => setUpdatedData(null)}>Back</button>
            </div>
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
};

export default App;
