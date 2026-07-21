import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import StreamingResponse

from backend.debate import run_debate_stream

from backend.api.models import DebateRequest

app = FastAPI(
    title="AI Debate API",
    version="1.0.0"
)

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Debate API Running Successfully"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.post("/debate/stream")
async def debate_stream(request: DebateRequest):

    async def event_generator():

        async for event in run_debate_stream(
            request.topic,
            request.rounds,
        ):

            yield f"data:{json.dumps(event)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
    )


# @app.post("/debate")
# def debate(request: DebateRequest):

#     result = run_debate(
#         request.topic,
#         request.rounds,
#     )

    return result