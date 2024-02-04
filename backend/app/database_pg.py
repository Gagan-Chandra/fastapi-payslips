from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings

SQLALCHEMY_PG_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

engine_pg = create_engine(SQLALCHEMY_PG_DATABASE_URL)
Sessionlocal_pg = sessionmaker(autocommit=False,autoflush=False,bind=engine_pg)
Base_pg = declarative_base()

def get_pg_db():
    db = Sessionlocal_pg()
    try:
        yield db
    finally:
        db.close()