# Frontend ↔ Backend Integration Guide

This project is designed to run with:
- Frontend (React): http://localhost:3000
- Backend (Flask): http://localhost:3001

The frontend discovers the backend base URL using:
1) REACT_APP_API_BASE
2) REACT_APP_BACKEND_URL
3) Fallback: `${window.location.protocol}//${window.location.hostname}:3001`

Healthcheck path uses REACT_APP_HEALTHCHECK_PATH or defaults to `/`.

## Quick Start

1) Backend
   - In a separate terminal:
     - cd ../react-windows-gui-demo-209878-209888/backend
     - Create and activate your venv, then:
       - pip install -r requirements.txt
       - export PORT=3001
       - python run.py
   - Docs: http://localhost:3001/docs
   - OpenAPI: http://localhost:3001/openapi.json

2) Frontend
   - In another terminal:
     - cd ./react-windows-gui-demo-209878-209887/windows_gui_frontend
     - npm install
     - Optionally create .env file with:
         REACT_APP_API_BASE=http://localhost:3001
         REACT_APP_HEALTHCHECK_PATH=/
         REACT_APP_LOG_LEVEL=debug
     - npm start
   - App: http://localhost:3000

## Verifying Integration

- On app load, the Health card should show:
  - Loading… then
  - Status: Healthy (HTTP 200) if backend is reachable
- If REACT_APP_LOG_LEVEL=debug is set, the Health card shows the resolved backend base URL.
- If there’s an error, the card shows an error with a hint to check environment variables.

## Notes

- CORS is enabled on backend for demo purposes.
- For other environments, set REACT_APP_API_BASE accordingly (e.g., https://api.example.com).
- The default fallback to port 3001 is intended for local preview where the frontend runs at 3000 and backend at 3001.
