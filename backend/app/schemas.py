from pydantic import BaseModel,EmailStr,ValidationError
from datetime import datetime
from typing import Optional,Union
from pydantic.types import conint

class UserOut(BaseModel):
    user_id:int
    email:EmailStr
    created_at:datetime
    class Config:
        orm_model = True

class Payment(BaseModel):
    payment_id: int
    first_name : str
    last_name : str
    salary : float
    email : EmailStr
    salary_credit_date : datetime
    bonus : float
    tax : float
    health_insurance : float
    net_pay : float

    class Config:
        orm_model = True

class UpdatePayments(BaseModel):
    email : EmailStr
    salary : float
    bonus : float
    tax : float
    health_insurance : float
    net_pay : float

    class Config:
        orm_model = True

class AdminCreatePayments(BaseModel):
    email : EmailStr
    first_name : str
    last_name : str
    salary : float
    bonus : float
    tax : float
    health_insurance : float
    net_pay : float

    class Config:
        orm_model = True

class Bank(BaseModel):
    bank_id: int
    bank_name : str
    account_number : int
    routing_number : int
    employee_email: EmailStr

    class Config:
        orm_model = True

class CreateBank(BaseModel):
    bank_id: int
    bank_name : str
    account_number : int
    routing_number : int
    class config:
        orm_model = True

class UpdateBank(BaseModel):
    bank_name:str
    account_number : int
    routing_number : int
    class Config:
        orm_model = True

class AdminUpdateBank(BaseModel):
    employee_email: EmailStr
    bank_name:str
    account_number : int
    routing_number : int
    class config:
        orm_model = True

class AdminCreateBank(BaseModel):
    employee_email: EmailStr
    bank_id: int
    bank_name:str
    account_number : int
    routing_number : int
    class config:
        orm_model = True

class Employer(BaseModel):
    employer_id : int
    company_name : str
    employee_email : str
    company_address : str
    company_contact : str

    class Config:
        orm_model = True

class CreateEmployer(BaseModel):
    company_name : str
    company_address : str
    company_contact : str
    class config:
        orm_model = True

class UpdateEmployer(BaseModel):
    company_name : Optional[str] = None
    company_address : Optional[str] = None
    company_contact : Optional[str] = None

    class Config:
        orm_model = True

class AdminUpdateEmployer(BaseModel):
    employee_email: EmailStr
    company_name : Optional[str] = None
    company_address : Optional[str] = None
    company_contact : Optional[str] = None
    class config:
        orm_model = True

class AdminCreateEmployer(BaseModel):
    employee_email: EmailStr
    company_name : str
    company_address : str
    company_contact : str
    class config:
        orm_model = True

class Employee(BaseModel):
    employee_id : int
    first_name : str
    last_name : str
    address : str
    employment_status: str
    created_at: datetime
    phone_number: str
    email: EmailStr
    class config:
        orm_model = True

class CreateEmployee(BaseModel):

    first_name : str
    last_name : str
    address : str
    employment_status: str
    phone_number: str
    class config:
        orm_model = True


class UpdateEmployee(BaseModel):
    first_name : Optional[str] = None
    last_name : Optional[str] = None
    address : Optional[str] = None
    employment_status: Optional[str] = None
    phone_number: Optional[str] = None
    class config:
        orm_model = True

class AdminUpdateEmployee(BaseModel):
    email: EmailStr
    first_name : Optional[str] = None
    last_name : Optional[str] = None
    address : Optional[str] = None
    employment_status: Optional[str]=None
    phone_number: Optional[str] = None
    class config:
        orm_model = True

class AdminCreateEmployee(BaseModel):
    email: EmailStr
    first_name : str
    last_name : str
    address : str
    employment_status: str
    phone_number: str
    class config:
        orm_model = True

class UserCreate(BaseModel):
    email:EmailStr
    password:str

class UserLogin(BaseModel):
    email: EmailStr
    password:str

class User(BaseModel):
    email:str
    user_id:int
    class config:
        orm_model = True

class Token(BaseModel):
    access_token:str
    token_type:str

class TokenData(BaseModel):
    id: Optional[str] = None

class CombinedResponse(BaseModel):
    Employee: Employee
    Bank: Bank

    class config:
        from_attributes = True