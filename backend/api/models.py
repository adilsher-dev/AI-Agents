from pydantic import BaseModel


class DebateRequest(BaseModel):
    topic: str
    rounds: int = 2


class DebateResponse(BaseModel):
    topic: str
    rounds: int
    history: list
    verdict: str