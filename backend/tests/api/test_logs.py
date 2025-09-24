import pytest
from fastapi.testclient import TestClient

def test_get_logs(client: TestClient):
    """Test getting all logs"""
    response = client.get("/api/v1/logs/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_log_not_found(client: TestClient):
    """Test getting a non-existent log"""
    response = client.get("/api/v1/logs/999")
    assert response.status_code == 404

def test_root_endpoint(client: TestClient):
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "LogAi API" in response.json()["message"]

def test_health_check(client: TestClient):
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"