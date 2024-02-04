from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_hostname:str
    database_port:str
    database_password:str
    database_name:str
    database_username:str
    secret_key:str
    algorithm:str
    access_token_expire_minutes:int
    database_hostname_wb:str
    database_port_wb:str
    database_password_wb:str
    database_name_wb:str
    database_username_wb:str
    secret_key_wb:str
    algorithm_wb:str
    access_token_expire_minutes_wb:int
    database_login_ms:str
    database_password_ms:str
    database_name_ms:str
    database_username_ms:str
    database_servername_ms:str
    secret_key_ms:str
    algorithm_ms:str
    access_token_expire_minutes_ms:int
    database_password_os:str
    database_name_os:str
    database_username_os:str
    database_hostname_os:str
    database_servicename_os:str
    database_port_os:str
    secret_key_os:str
    algorithm_os:str
    access_token_expire_minutes_os:int
    

    class Config:
        env_file =".env"
settings =  Settings()