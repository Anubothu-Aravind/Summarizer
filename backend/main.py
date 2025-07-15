# backend/main.py
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from rag_engine import get_qa_chain
from pdf_utils import parse_pdf
from tts import text_to_speech
import tempfile
import time
import datetime
import os

app = FastAPI(title="SummarEase API", version="1.0.0")
start_time = time.time()
# Configure CORS for Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Only if safe in your use case
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store QA chain
qa_chain = None

@app.get("/")
async def root():
    return {"message": "SummarEase API is running!", "status": "healthy"}

@app.post("/upload")
async def upload_pdf(file: UploadFile):
    """Upload and process PDF file"""
    global qa_chain
    
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        # Parse PDF and create QA chain
        chunks = parse_pdf(tmp_path)
        qa_chain = get_qa_chain(chunks)
        
        # Clean up temporary file
        os.unlink(tmp_path)
        
        return {"message": f"PDF '{file.filename}' processed successfully", "chunks": len(chunks)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

@app.post("/ask")
async def ask_question(question: str = Form(...)):
    """Ask a question about the uploaded PDF"""
    if not qa_chain:
        raise HTTPException(status_code=400, detail="Please upload a PDF first")
    
    try:
        response = qa_chain.run(question)
        return {"answer": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

# Add this to your TTS endpoint for debugging
@app.post("/tts")
async def text_to_speech_endpoint(text: str = Form(...)):
    """Convert text to speech"""
    try:
        print(f"Received text: {text[:50]}...")  # Debug log
        audio_path = text_to_speech(text)
        print(f"Audio file created at: {audio_path}")  # Debug log
        return FileResponse(audio_path, media_type="audio/wav", filename="response.wav")
    
    except Exception as e:
        print(f"TTS Error: {e}")  # Debug log
        raise HTTPException(status_code=500, detail=f"Error generating speech: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "qa_chain_loaded": qa_chain is not None}

@app.get("/ping")
async def ping():
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.now().isoformat(),
        "uptime_seconds": round(time.time() - start_time, 2),
        "status_code": 200
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)