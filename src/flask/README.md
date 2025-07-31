
# XmPrepNEET Flask API

## Setup Instructions

1. **Install Python Dependencies:**
   ```bash
   cd src/flask
   pip install -r requirements.txt
   ```

2. **Create .env file in the flask directory:**
   ```
   OPENAI_API_KEY=your-openai-api-key
   ```

3. **Make sure you have the FAISS index:**
   - Place your `faiss_index` folder in the same directory as the Python files
   - This should contain your pre-built vector embeddings

4. **Run the Flask API:**
   ```bash
   python app.py
   ```

5. **Test the API:**
   ```bash
   curl -X POST http://localhost:5000/api/chat/ask \
     -H "Content-Type: application/json" \
     -d '{"question": "What is photosynthesis?"}'
   ```

## Available Endpoints

- `POST /api/chat/ask` - General AI tutor questions
- `POST /api/chat/generate-question` - Generate MCQ/explanation questions
- `POST /api/chat/validate-answer` - Validate student answers
- `POST /api/chat/generate-mock-test` - Generate complete mock tests
- `GET /health` - Health check endpoint

## Directory Structure
```
src/flask/
├── app.py              # Main Flask application
├── chat.py             # API endpoints blueprint
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
└── services/
    └── qa_service.py   # AI logic and FAISS integration
```
