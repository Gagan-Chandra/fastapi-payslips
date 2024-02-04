from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings

SQLALCHEMY_WB_DATABASE_URL = f'mysql+mysqlconnector://{settings.database_username_wb}:{settings.database_password_wb}@{settings.database_hostname_wb}:{settings.database_port_wb}/{settings.database_name_wb}'

engine_wb = create_engine(SQLALCHEMY_WB_DATABASE_URL,pool_pre_ping=True)
Sessionlocal_wb = sessionmaker(autocommit=False,autoflush=False,bind=engine_wb)
Base_wb = declarative_base()

def get_wb_db():
    db = Sessionlocal_wb()
    try:
        yield db
    finally:
        db.close()