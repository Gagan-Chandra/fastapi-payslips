from .. import models,schemas,utils,oauth2
from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from .. database_pg import get_pg_db

router = APIRouter(
    prefix="/users",
    tags=['Users']
)
@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.UserOut)
def create_user(user:schemas.UserCreate,db:Session=Depends(get_pg_db)):

    hashed_password= utils.hash(user.password)
    user.password = hashed_password
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
    
@router.get("/me", response_model=schemas.User)
async def get_user(user: schemas.User = Depends(oauth2.get_current_user)):
    return user

@router.get('/{id}',response_model=schemas.UserOut)
def get_user(id:int,db:Session=Depends(get_pg_db)):
    user = db.query(models.User).filter(models.User.user_id==id).first()
    if not user:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail=f"User with id:{id} does not exist")
    return user


