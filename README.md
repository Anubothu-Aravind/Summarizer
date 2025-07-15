# DocDistill

DocDistill is a full-stack application for uploading PDFs, asking questions about their content, and generating text-to-speech answers using advanced LLMs and embeddings.

## Features

- Upload PDF files and process their content
- Ask questions about the uploaded PDF using Retrieval-Augmented Generation (RAG)
- Get answers powered by Groq LLM and sentence-transformers
- Convert answers to speech (TTS) via gTTS(Google Text-to-Speech)
- Modern React frontend with Vite

---

## Project Structure

```
Summarizer/
├── backend/    # FastAPI backend (Python)
│   ├── main.py
│   ├── rag_engine.py
│   ├── pdf_utils.py
│   ├── tts.py
│   ├── requirements.txt
│   └── .env
├── frontend/   # React frontend (Vite)
│   ├── public/
│   ├── src/
|   |   ├── assets/
|   |   ├── App.css
│   │   ├── App.jsx
|   |   ├── index.css
|   |   └── main.jsx
│   └── package.json
└── README.md
```

---

## Prerequisites

- **Python 3.9+** (for backend)
- **Git installed**
- **Node.js 16+** and **npm** (for frontend)
- **GitHub Codespaces** (or local development environment)
- A Groq API key (for LLM-powered answers)

---

## Backend Setup (FastAPI)

1. **Install dependencies:**

   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # Or: source venv/bin/activate  # On Mac/Linux

   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

   Create a `.env` file in the `backend/` directory with the following content:

   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

   Replace `your_groq_api_key_here` with your actual Groq API key.

3. **Run the backend server:**

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at [http://localhost:8000](http://localhost:8000).

---

## Frontend Setup (React + Vite)

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Run the frontend development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

1. Start the backend and frontend servers as described above.
2. Open the frontend in your browser.
3. Upload a PDF, ask questions, and listen to the answers!

---

## Environment Variables

- **Backend:**  
  - `GROQ_API_KEY` (required): Your Groq API key for LLM-powered answers.

---

## Scripts

### Backend

- `uvicorn main:app --reload` — Start the FastAPI server in development mode.

### Frontend

- `npm run dev` — Start the Vite development server.
- `npm run build` — Build the frontend for production.
- `npm run preview` — Preview the production build.
- `npm run lint` — Lint the frontend code.

---

## License

MIT 