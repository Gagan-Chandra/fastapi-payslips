from .. import models,schemas,utils,oauth2
from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List,Optional
from .. database_pg import get_pg_db
from .. database_wb import get_wb_db
from .. database_ms import get_ms_db
from .. database_os import get_os_db

router = APIRouter(
    prefix="/payslips",
    tags=['payslips']
)


#@router.get("/",response_model=List[schemas.Post])
@router.get("/")
async def get_employee_details(
    db_pg: Session = Depends(get_pg_db),
    current_user:int = Depends(oauth2.get_current_user),
    db_os: Session = Depends(get_os_db),
    db_wb: Session = Depends(get_wb_db),
    db_ms: Session = Depends(get_ms_db)
    
):

    # Query employee data from PostgreSQL
    employee_data = db_pg.query(models.Employee).filter(models.Employee.email == current_user.email).first()
    if not employee_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with email {current_user.email} not found")

    # Initialize variables for optional data
    bank_data = None
    payment_data = None
    employeer_data = None

    # Query bank data from Oracle
    try:
        bank_data = db_os.query(models.Bank).filter(models.Bank.employee_email == current_user.email).first()
        if not bank_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Bank details not found for employee with email {current_user.email}")

    except HTTPException as bank_exception:
        stored_bank_exception = bank_exception

    # Query payment data from Workbench
    try:
        payment_data = db_wb.query(models.Payment).filter(models.Payment.email == current_user.email).first()
        if not payment_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Payment details not found for employee with email {current_user.email}")

    except HTTPException as payment_exception:
        stored_payment_exception = payment_exception

    # Query employeer data from Microsoft SQL Server
    try:
        employer_data = db_ms.query(models.Employer).filter(models.Employer.employee_email == current_user.email).first()
        if not employer_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Employer details not found for employee with email {current_user.email}")

    except HTTPException as employer_exception:
        stored_employer_exception = employer_exception

    # Include the results in the response
    combined_response = {
        "employee": employee_data,
        "bank": bank_data if bank_data else stored_bank_exception,
        "payment": payment_data if payment_data else stored_payment_exception,
        "employer": employer_data if employer_data else stored_employer_exception
    }

    return combined_response