from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings

SQLALCHEMY_OS_DATABASE_URL = f'oracle+cx_oracle://{settings.database_username_os}:{settings.database_password_os}@{settings.database_hostname_os}:{settings.database_port_os}/{settings.database_servicename_os}'

engine_os = create_engine(SQLALCHEMY_OS_DATABASE_URL)
Sessionlocal_os = sessionmaker(autocommit=False,autoflush=False,bind=engine_os)
Base_os = declarative_base()

def get_os_db():
    db = Sessionlocal_os()
    try:
        yield db
    finally:
        db.close()