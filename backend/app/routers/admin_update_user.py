from .. import models,schemas,utils,oauth2
from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List,Optional
from .. database_pg import get_pg_db
from .. database_wb import get_wb_db
from .. database_ms import get_ms_db
from .. database_os import get_os_db
from sqlalchemy.exc import IntegrityError

router = APIRouter(
    prefix="/update_admin",
    tags=['update_admin']
)

@router.put("/employees",status_code=status.HTTP_201_CREATED)
async def admin_update_employees(
    update_employee_details: schemas.AdminUpdateEmployee,
    current_user:int = Depends(oauth2.get_current_user),
    db_pg: Session = Depends(get_pg_db)
):
    if not current_user.email.endswith("@admin.com"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins are allowed to update employee details."
        )

    # Check if the employee exists in the employee table
    query = db_pg.query(models.Employee).filter(
        models.Employee.email == update_employee_details.email)
    current_employee = query.first()

    if not current_employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"employee details not found for employee with email ID  {update_employee_details}."
        )

    # Update only the fields with non-None values from update_employee_details
    if update_employee_details.first_name is not None:
        current_employee.first_name = update_employee_details.first_name
    if update_employee_details.last_name is not None:
        current_employee.last_name = update_employee_details.last_name
    if update_employee_details.address is not None:
        current_employee.address = update_employee_details.address
    if update_employee_details.phone_number is not None:
        current_employee.phone_number = update_employee_details.phone_number

    db_pg.commit()

    return query.first()


@router.put("/employer",status_code=status.HTTP_201_CREATED)
async def admin_update_employer(
    update_employer_details: schemas.AdminUpdateEmployer,
    current_user:int = Depends(oauth2.get_current_user),
    db_ms: Session = Depends(get_ms_db)
):
    if not current_user.email.endswith("@admin.com"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins are allowed to update employee details."
        )
    # Check if the employee exists in the employee table
    query = db_ms.query(models.Employer).filter(
        models.Employer.employee_email == update_employer_details.employee_email)
    current_employer = query.first()

    if not current_employer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"employer details not found for employee with email ID  {update_employer_details}."
        )

    # Update only the fields with non-None values from update_employee_details
    if update_employer_details.company_name is not None:
        current_employer.company_name = update_employer_details.company_name
    if update_employer_details.company_address is not None:
        current_employer.company_address = update_employer_details.company_address
    if update_employer_details.company_contact is not None:
        current_employer.company_contact = update_employer_details.company_contact

    db_ms.commit()
    return query.first()


@router.put("/payments",status_code=status.HTTP_201_CREATED)
async def update_payments(
    update_data: schemas.UpdatePayments,
    current_user:int = Depends(oauth2.get_current_user),
    db_wb: Session = Depends(get_wb_db)
):
    if not current_user.email.endswith("@admin.com"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins are allowed to update payment details."
        )

    # Check if the employee exists in the payments table
    query = db_wb.query(models.Payment).filter(models.Payment.email == update_data.email)
    payment_data = query.first()
    if not payment_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Payment details not found for employee with ID {update_data.email}."
        )

    query.update(update_data.dict(), synchronize_session=False)
    db_wb.commit()

    return query.first()

@router.put("/bank",status_code=status.HTTP_201_CREATED)
async def admin_update_employees(
    update_bank_details: schemas.AdminUpdateBank,
    current_user:int = Depends(oauth2.get_current_user),
    db_os: Session = Depends(get_os_db)
):
    if not current_user.email.endswith("@admin.com"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins are allowed to update bank details."
        )

    # Check if the employee exists in the employee table
    query = db_os.query(models.Bank).filter(
        models.Bank.employee_email == update_bank_details.employee_email)
    bank = query.first()

    if not bank:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"bank details not found for employee with email ID{update_bank_details.employee_email}."
        )

    query.update(update_bank_details.dict(), synchronize_session=False)
    db_os.commit()

    return query.first()