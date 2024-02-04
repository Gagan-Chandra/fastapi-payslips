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
    prefix="/create",
    tags=['create']
)


@router.post("/employee", status_code=status.HTTP_201_CREATED)
async def create_employee(
    create: schemas.CreateEmployee,
    current_user: int = Depends(oauth2.get_current_user),
    db_pg: Session = Depends(get_pg_db),
):

    if current_user.email.endswith("@admin.com"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Go to admin's view to create employee."
        )
    existing_employee = db_pg.query(models.Employee).filter(models.Employee.email == current_user.email).first()
    if existing_employee:
        raise HTTPException(status_code=400, detail="User already registered. To update details, go to the update section.")

    employee_data = models.Employee(
                first_name=create.first_name,
                last_name=create.last_name,
                address=create.address,
                employment_status=create.employment_status,
                phone_number=create.phone_number,
                email=current_user.email
            )
    db_pg.add(employee_data)
    db_pg.commit()
    db_pg.refresh(employee_data)

    return employee_data


@router.post("/bank", status_code=status.HTTP_201_CREATED)
async def create_bank(
    create: schemas.CreateBank,
    current_user: int = Depends(oauth2.get_current_user),
    db_os: Session = Depends(get_os_db),
    db_pg: Session = Depends(get_pg_db)
):

    existing_employee = db_pg.query(models.Employee).filter(models.Employee.email == current_user.email).first()
    if not existing_employee:
        raise HTTPException(status_code=403, detail="Employee details not registerd, register employee details first.")

    existing_bank = db_os.query(models.Bank).filter(models.Bank.employee_email == current_user.email).first()
    if existing_bank:
        raise HTTPException(status_code=400, detail="User bank details already registered. To update details, go to the update section.")

    bank_data = models.Bank(
                bank_id = create.bank_id,
                bank_name = create.bank_name,
                account_number = create.account_number,
                routing_number = create.routing_number,
                employee_email = current_user.email
            )
    db_os.add(bank_data)
    db_os.commit()
    db_os.refresh(bank_data)

    return bank_data

@router.post("/employer", status_code=status.HTTP_201_CREATED)
async def create_employer(
    create: schemas.CreateEmployer,
    current_user: int = Depends(oauth2.get_current_user),
    db_ms: Session = Depends(get_ms_db),
    db_pg: Session = Depends(get_pg_db)
):
    existing_employee = db_pg.query(models.Employee).filter(models.Employee.email == current_user.email).first()
    if not existing_employee:
        raise HTTPException(status_code=403, detail="Employee details not registerd, register employee details first.")

    existing_employer = db_ms.query(models.Employer).filter(models.Employer.employee_email == current_user.email).first()
    if existing_employer:
        raise HTTPException(status_code=400, detail="User already registered. To update details, go to the update section.")

    employer_data = models.Employer(
                company_name = create.company_name,
                employee_email=current_user.email,
                company_address = create.company_address,
                company_contact = create.company_contact,
            )
    db_ms.add(employer_data)
    db_ms.commit()
    db_ms.refresh(employer_data)

    return employer_data
