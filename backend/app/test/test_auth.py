from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)
def test_register_and_login():
    r = client.post("/api/auth/register", json={"email":"t@example.com","password":"pwd"})
    assert r.status_code == 200
    r2 = client.post("/api/auth/login", json={"email":"t@example.com","password":"pwd"})
    assert r2.status_code == 200
    assert "access_token" in r2.json()