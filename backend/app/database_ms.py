from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings

SQLALCHEMY_MS_DATABASE_URL = f'mssql+pyodbc://{settings.database_servername_ms}/{settings.database_name_ms}?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server'

engine_ms = create_engine(SQLALCHEMY_MS_DATABASE_URL)
Sessionlocal_ms = sessionmaker(autocommit=False,autoflush=False,bind=engine_ms)
Base_ms = declarative_base()

def get_ms_db():
    db = Sessionlocal_ms()
    try:
        yield db
    finally:
        db.close()