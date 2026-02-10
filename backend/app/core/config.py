from pydantic_settings import BaseSettings
from pydantic import ConfigDict, field_validator
from typing import List, Union
import json

class Settings(BaseSettings):
    #APP INFO
    APP_NAME: str
    APP_VERSION: str

    #SECURITY
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    #DB
    DATABASE_URL: str

    #CORS
    BACKEND_CORS_ORIGINS: List[str] = []

    @field_validator('BACKEND_CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            try:
                return json.loads(v)
            except json.JSONDecodeError:
                return [v]
        return v

    model_config = ConfigDict(
        env_file = "backend/.env",
        case_sensitive = True
    )

settings = Settings()
