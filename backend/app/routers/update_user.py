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
    prefix="/update_user",
    tags=['update_user']
)


#@router.get("/",response_model=List[schemas.Post])
@router.put("/employee",status_code=status.HTTP_201_CREATED,response_model=schemas.Employee)
async def update_employee_details(
    update_employee_details:schemas.UpdateEmployee,
    db_pg: Session = Depends(get_pg_db),
    current_user:int = Depends(oauth2.get_current_user),
):


    query = db_pg.query(models.Employee).filter(
        models.Employee.email == current_user.email
    )
    
    employee = query.first()

    if employee is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform the requested action")

    update_data = {k: v for k, v in update_employee_details.dict().items() if v is not None}
    query.update(update_data, synchronize_session=False)
    db_pg.commit()

    return query.first()


    
#@router.get("/",response_model=List[schemas.Post])
@router.put("/bank",status_code=status.HTTP_201_CREATED,response_model=schemas.Bank)
async def update_bank_details(
    update_bank_details:schemas.UpdateBank,
    db_os: Session = Depends(get_os_db),
    current_user:int = Depends(oauth2.get_current_user),
):


    query = db_os.query(models.Bank).filter(
        models.Bank.employee_email == current_user.email
    )
    
    bank = query.first()

    if bank is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform the requested action")


    query.update(update_bank_details.dict(), synchronize_session=False)
    db_os.commit()

    return query.first()


#@router.get("/",response_model=List[schemas.Post])
@router.put("/employer",status_code=status.HTTP_201_CREATED,response_model=schemas.Employer)
async def update_bank_details(
    update_employer_details:schemas.UpdateEmployer,
    db_ms: Session = Depends(get_ms_db),
    current_user:int = Depends(oauth2.get_current_user),
):
    query = db_ms.query(models.Employer).filter(
        models.Employer.employee_email == current_user.email
    )
    employer = query.first()
    if employer is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform the requested action")
    
    update_data = {k: v for k, v in update_employer_details.dict().items() if v is not None}
    query.update(update_data, synchronize_session=False)
    db_ms.commit()
    return query.first()