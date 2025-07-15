// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


const API_BASE_URL = "https://summarizer-puxa.onrender.com/";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking");

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        timeout: 5000
      });
      setBackendStatus("connected");
      console.log("Backend status:", response.data);
    } catch (error) {
      setBackendStatus("disconnected");
      console.error("Backend connection failed:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfUploaded(false); // Reset upload status
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file first");
      return;
    }

    if (backendStatus !== "connected") {
      alert("Backend is not connected. Please check if the server is running.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds timeout for file upload
      });
      
      alert(`PDF uploaded successfully! Processed ${response.data.chunks} chunks.`);
      setPdfUploaded(true);
    } catch (error) {
      console.error("Upload error:", error);
      
      if (error.code === 'ECONNABORTED') {
        alert("Upload timeout. Please try with a smaller PDF file.");
      } else if (error.response) {
        alert("Error uploading PDF: " + (error.response.data?.detail || error.response.statusText));
      } else if (error.request) {
        alert("Cannot connect to server. Please check if the backend is running on http://localhost:8000");
      } else {
        alert("Error uploading PDF: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (!pdfUploaded) {
      alert("Please upload a PDF first");
      return;
    }

    if (backendStatus !== "connected") {
      alert("Backend is not connected. Please check if the server is running.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("question", question);
      
      const response = await axios.post(`${API_BASE_URL}/ask`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds timeout for question processing
      });
      
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Question error:", error);
      
      if (error.code === 'ECONNABORTED') {
        alert("Request timeout. Please try again.");
      } else if (error.response) {
        alert("Error asking question: " + (error.response.data?.detail || error.response.statusText));
      } else if (error.request) {
        alert("Cannot connect to server. Please check if the backend is running.");
      } else {
        alert("Error asking question: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async () => {
    if (!answer.trim()) {
      alert("No answer to speak");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("text", answer);
      
      const response = await axios.post(`${API_BASE_URL}/tts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
        timeout: 45000, // 45 seconds timeout for TTS
      });
      
      const audioBlob = new Blob([response.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      alert("Error generating speech: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAsk();
    }
  };

  const getStatusColor = () => {
    switch (backendStatus) {
      case "connected": return "#27ae60";
      case "disconnected": return "#e74c3c";
      default: return "#f39c12";
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case "connected": return "✅ Backend Connected";
      case "disconnected": return "❌ Backend Disconnected";
      default: return "🔄 Checking Backend...";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 DocDistill</h1>
        <p>Your AI-Powered Research Paper Assistant</p>
        <div className="status-indicator" style={{ color: getStatusColor() }}>
          {getStatusText()}
        </div>
      </header>
      
      <main className="App-main">
        <div className="upload-section">
          <h2>📄 Upload PDF</h2>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button 
            onClick={handleUpload} 
            disabled={loading || !pdfFile || backendStatus !== "connected"}
          >
            {loading ? "Processing..." : "Upload PDF"}
          </button>
          {pdfUploaded && <p className="success">✅ PDF uploaded and processed!</p>}
        </div>

        <div className="question-section">
          <h2>❓ Ask a Question</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Ask a question about your PDF..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={handleAsk} 
              disabled={loading || !pdfUploaded || backendStatus !== "connected"}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </div>

        <div className="answer-section">
          <h2>💡 Answer</h2>
          <div className="answer-box">
            <textarea
              value={answer}
              readOnly
              placeholder="Your answer will appear here..."
              rows={10}
            />
            {answer && (
              <button onClick={handleTTS} className="tts-button">
                🔊 Listen to Answer
              </button>
            )}
          </div>
        </div>

        {backendStatus === "disconnected" && (
          <div className="error-section">
            <h3>⚠️ Backend Connection Issue</h3>
            <p>Make sure the backend server is running:</p>
            <code>cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000</code>
            <button onClick={checkBackendStatus} style={{ marginTop: "10px" }}>
              🔄 Retry Connection
            </button>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
  <div className="footer-content">
    <div className="footer-section">
      <h3>📚 About</h3>
      <p>
        DocDistill is an AI-powered tool that helps users extract insights from academic PDFs through natural language queries. It streamlines research by combining intelligent processing with a clean, user-friendly interface.
      </p>
    </div>

    <div className="footer-section">
      <h3>👨‍💻 Developer</h3>
      <p>
        Created by <strong>Anubothu Aravind</strong> , a developer passionate about building accessible, AI-driven tools. This project showcases skills in modern full-stack development and user-focused design.
      </p>
    </div>

    <div className="footer-section">
      <h3>🔗 Contact</h3>
      <p>
        Connect via <a href="https://t.me/iarvn1" target="_blank" rel="noopener noreferrer">Telegram</a>, 
        <a href="mailto:aravind.anubothu@gmail.com"> Email</a>, or find me on LinkedIn/GitHub for feedback or collaboration.
      </p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2024 DocDistill. Developed by Anubothu Aravind.</p>
  </div>
</footer>
    </div>
  );
}

export default App;