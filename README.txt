FastAuthReact

This project is a full-stack authentication system using FastAPI (Python) for the backend and React for the frontend.

Project Structure:
- backend/: FastAPI backend code
- frontend/: React frontend code

Backend Setup:
1. Create a virtual environment and activate it.
   - Windows (PowerShell): python -m venv .venv ; .\.venv\Scripts\Activate
   - Unix/macOS: python3 -m venv .venv ; source .venv/bin/activate
2. Create a .env file in the backend directory for environment variables (e.g., DATABASE_URL, SECRET_KEY).
3. Install dependencies:
   - From backend directory: pip install -r requirements.txt
   - Or from project root: pip install -r backend/requirements.txt
4. Run the backend server from the project root:
   uvicorn backend.app.main:app --reload

Frontend Setup:
1. Navigate to the frontend directory.
2. Create a .env file in the frontend directory for environment variables (e.g., VITE_API_URL). Example variable:
   - VITE_API_URL=http://localhost:8000/api
3. Install dependencies: npm install
4. Start the frontend dev server: npm run dev

Development Notes:
- The backend uses SQLAlchemy for ORM and JWT for authentication.
- The frontend uses React and communicates with the backend via REST API.
- Update .env or config files as needed for your environment.

GitHub Repository:
https://github.com/liaak/FastAuthReact

License:
This project is licensed under the MIT License. See the LICENSE file for details.
