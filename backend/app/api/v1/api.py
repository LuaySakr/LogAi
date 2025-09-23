from fastapi import APIRouter
from app.api.v1.endpoints import logs, summaries, alerts, organizations, users

api_router = APIRouter()
api_router.include_router(logs.router, prefix="/logs", tags=["logs"])
api_router.include_router(summaries.router, prefix="/summaries", tags=["summaries"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(organizations.router, prefix="/organizations", tags=["organizations"])
api_router.include_router(users.router, prefix="/users", tags=["users"])