from .database_pg import Base_pg
from .database_wb import Base_wb
from .database_ms import Base_ms
from .database_os import Base_os
from sqlalchemy import Column,Integer,String,Boolean,ForeignKey,Float,VARCHAR
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

class Employee(Base_pg):
    __tablename__ = "employees"
    employee_id = Column(Integer,primary_key = True, nullable = False)
    first_name = Column(String,nullable=False)
    last_name = Column(String,nullable=False)
    address = Column(String,nullable=False)
    employment_status=Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    phone_number = Column(String,nullable=True)
    email= Column(String,nullable=False)

class User(Base_pg):
    __tablename__ = "users"
    user_id = Column(Integer,primary_key = True, nullable = False)
    email = Column(String,nullable=False,unique=True)
    password = Column(String,nullable=False,unique=True)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))

class Payment(Base_wb):
    __tablename__ = "payments"
    payment_id = Column(Integer, primary_key=True)
    first_name = Column(VARCHAR(50),nullable=False)
    last_name = Column(VARCHAR(50),nullable=False)
    email = Column(VARCHAR(50),nullable=False)
    salary = Column(Float, nullable=True)
    salary_credit_date = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    bonus = Column(Float, nullable=True)
    tax =  Column(Float, nullable=True)
    health_insurance =  Column(Float, nullable=True)
    net_pay =  Column(Float, nullable=True)

class Employer(Base_ms):
    __tablename__ = "employer"
    employer_id = Column(Integer, primary_key=True)
    company_name = Column(VARCHAR(50),nullable=False)
    employee_email = Column(VARCHAR(50),nullable=False,unique=True)
    company_address = Column(VARCHAR(50),nullable=False)
    company_contact = Column(VARCHAR(50),nullable=False)

class Bank(Base_os):
    __tablename__ = "bank"
    bank_id = Column(Integer, primary_key=True)
    bank_name = Column(VARCHAR(50),nullable=False)
    account_number = Column(Integer,nullable = False)
    routing_number = Column(Integer,nullable = False)
    employee_email = Column(VARCHAR(50),nullable=False,unique=True)