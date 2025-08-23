// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import QuestionInput from "../components/QuestionInput";
import AnswerDisplay from "../components/AnswerDisplay";
import Footer from "../components/Footer";

import AboutUs from "../components/Aboutus.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Developer from "../components/Developer.jsx";

const API_BASE_URL = "http://localhost:8000";

// Alert Component
const Alert = ({ type = "info", message, isVisible }) => {
  if (!isVisible || !message) return null;

  const alertStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconStyles = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  const progressBarStyles = {
    success: "bg-green-400",
    error: "bg-red-400",
    warning: "bg-yellow-400",
    info: "bg-blue-400",
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-in slide-in-from-right duration-300">
      <div
        className={`border-l-4 rounded-lg shadow-lg overflow-hidden ${alertStyles[type]}`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${iconStyles[type]}`}>
              {icons[type]}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div
            className={`h-full ${progressBarStyles[type]} animate-progress-bar`}
            style={{
              animation: "progress 3s linear forwards",
            }}
          ></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-progress-bar {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking");

  // Alert state
  const [alert, setAlert] = useState({
    isVisible: false,
    type: "info",
    message: "",
  });

  // Show alert function
  const showAlert = (type, message) => {
    setAlert({
      isVisible: true,
      type,
      message,
    });

    // Auto-hide alert after 3 seconds
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Hide alert function
  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        timeout: 5000,
      });
      setBackendStatus("connected");
      console.log("Backend status:", response.data);
    } catch (error) {
      setBackendStatus("disconnected");
      console.error("Backend connection failed:", error);
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      showAlert("warning", "Please select a PDF file first");
      return;
    }

    if (backendStatus !== "connected") {
      showAlert(
        "error",
        "Backend is not connected. Please check if the server is running."
      );
      return;
    }

    setLoading(true);
    setPdfUploaded(false);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });

      showAlert(
        "success",
        `PDF uploaded successfully! Processed ${response.data.chunks} chunks.`
      );
      setPdfUploaded(true);
    } catch (error) {
      console.error("Upload error:", error);

      if (error.code === "ECONNABORTED") {
        showAlert(
          "error",
          "Upload timeout. Please try with a smaller PDF file."
        );
      } else if (error.response) {
        showAlert(
          "error",
          "Error uploading PDF: " +
            (error.response.data?.detail || error.response.statusText)
        );
      } else if (error.request) {
        showAlert(
          "error",
          "Cannot connect to server. Please check if the backend is running on http://localhost:8000"
        );
      } else {
        showAlert("error", "Error uploading PDF: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      showAlert("warning", "Please enter a question");
      return;
    }

    if (!pdfUploaded) {
      showAlert("warning", "Please upload a PDF first");
      return;
    }

    if (backendStatus !== "connected") {
      showAlert(
        "error",
        "Backend is not connected. Please check if the server is running."
      );
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
        timeout: 60000,
      });

      setAnswer(response.data.answer);
      showAlert("success", "Question answered successfully!");
    } catch (error) {
      console.error("Question error:", error);

      if (error.code === "ECONNABORTED") {
        showAlert("error", "Request timeout. Please try again.");
      } else if (error.response) {
        showAlert(
          "error",
          "Error asking question: " +
            (error.response.data?.detail || error.response.statusText)
        );
      } else if (error.request) {
        showAlert(
          "error",
          "Cannot connect to server. Please check if the backend is running."
        );
      } else {
        showAlert("error", "Error asking question: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Alert Component */}
      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
      />

      <main className="App-main">
        {/* Step 1: File Upload */}
        <FileUpload
          pdfFile={pdfFile}
          setPdfFile={setPdfFile}
          handleUpload={handleUpload}
          loading={loading}
          pdfUploaded={pdfUploaded}
          backendStatus={backendStatus}
        />

        {/* Step 2: Question Input */}
        <QuestionInput
          question={question}
          setQuestion={setQuestion}
          handleAsk={handleAsk}
          loading={loading}
          pdfUploaded={pdfUploaded}
          backendStatus={backendStatus}
        />

        {/* Step 3: Answer Display */}
        <AnswerDisplay answer={answer} backendStatus={backendStatus} />

        {/* Backend Connection Error */}
        {backendStatus === "disconnected" && (
          <div className="error-section">
            <h3>⚠️ Backend Connection Issue</h3>
            <p>Make sure the backend server is running:</p>
            <code>
              cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000
            </code>
            <button onClick={checkBackendStatus} style={{ marginTop: "10px" }}>
              🔄 Retry Connection
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-screen pt-24 px-8 flex items-center justify-center">
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <span className="text-8xl">🔍</span>
      </div>
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10"></div>

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
