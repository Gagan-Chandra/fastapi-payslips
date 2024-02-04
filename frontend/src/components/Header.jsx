import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = ({ title, onPayslipsClick, onCreateEmployeeDetailsClick, onCreateEmployerDetailsClick
    , onCreateBankDetailsClick, onUpdateEmployeeDetailsClick, onUpdateEmployerDetailsClick
    , onUpdateBankDetailsClick, onAdminCreateEmployeeDetailsClick, onAdminCreateEmployerDetailsClick
    , onAdminCreateBankDetailsClick, onAdminCreatePaymentDetailsClick, onAdminUpdateEmployeeDetailsClick, 
    onAdminUpdateEmployerDetailsClick, onAdminUpdateBankDetailsClick,onAdminUpdatePaymentDetailsClick, onLogoutClick }) => {
    const [token] = useContext(UserContext);
  
    return (
      <div className="has-text-centered m-6">
        <h1 className="title">{title}</h1>
        {token && (
          <>
            <button className="button" onClick={onPayslipsClick}>
              Payslips
            </button>
            <button className="button" onClick={onCreateEmployeeDetailsClick}>
              Create_Employee_Details
            </button>
            <button className="button" onClick={onCreateEmployerDetailsClick}>
              Create_Employer_Details
            </button>
            <button className="button" onClick={onCreateBankDetailsClick}>
              Create_Bank_Details
            </button>
            <button className="button" onClick={onUpdateEmployeeDetailsClick}>
              Update_Employee_Details
            </button>
            <button className="button" onClick={onUpdateEmployerDetailsClick}>
              Update_Employer_Details
            </button>
            <button className="button" onClick={onUpdateBankDetailsClick}>
              Update_Bank_Details
            </button>
            <button className="button" onClick={onAdminCreateEmployeeDetailsClick}>
              Admin_Create_Employee_Details
            </button>
            <button className="button" onClick={onAdminCreateEmployerDetailsClick}>
              Admin_Create_Employer_Details
            </button>
            <button className="button" onClick={onAdminCreateBankDetailsClick}>
              Admin_Create_Bank_Details
            </button>
            <button className="button" onClick={onAdminCreatePaymentDetailsClick}>
              Admin_Create_Payment_Details
            </button>
            <button className="button" onClick={onAdminUpdateEmployeeDetailsClick}>
              Admin_Update_Employee_Details
            </button>
            <button className="button" onClick={onAdminUpdateEmployerDetailsClick}>
              Admin_Update_Employer_Details
            </button>
            <button className="button" onClick={onAdminUpdateBankDetailsClick}>
              Admin_Update_Bank_Details
            </button>
            <button className="button" onClick={onAdminUpdatePaymentDetailsClick}>
              Admin_Update_Payment_Details
            </button>
            <button className="button" onClick={onLogoutClick}>
              Logout
            </button>
          </>
        )}
      </div>
    );
};

export default Header;
