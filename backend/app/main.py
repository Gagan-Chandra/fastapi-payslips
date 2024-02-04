from fastapi import FastAPI
from . import models
from .database_pg import engine_pg
from .database_wb import engine_wb
from .database_ms import engine_ms
from .database_os import engine_os
from .routers import payslip,user,auth,update_user,create_user,admin_update_user,admin_payslips,admin_create_user
import psycopg2
from psycopg2.extras import RealDictCursor
from .config import settings

#models.Base_pg.metadata.create_all(bind=engine_pg)
#models.Base_wb.metadata.create_all(bind=engine_wb)
#models.Base_ms.metadata.create_all(bind=engine_ms)
#models.Base_os.metadata.create_all(bind=engine_os)
app = FastAPI()

app.include_router(payslip.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(update_user.router)
app.include_router(create_user.router)
app.include_router(admin_update_user.router)
app.include_router(admin_payslips.router)
app.include_router(admin_create_user.router)


@app.get("/api")
async def root():
    return{"message":"Payslips"}