// components/AnswerDisplay.jsx
import React from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const AnswerDisplay = ({ answer, backendStatus }) => {
  const handleTTS = async () => {
    if (!answer.trim()) {
      alert("No answer to speak");
      return;
    }

    if (backendStatus !== "connected") {
      alert("Backend not connected. Cannot generate speech.");
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
        timeout: 60000,
      });

      const audioBlob = new Blob([response.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      alert(
        "Error generating speech: " +
          (error.response?.data?.detail || error.message)
      );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>

      <div className="relative z-10 p-8">
        {/* Header Section - Centered */}
        <div className="mb-8">
          <div className="flex flex-col items-center text-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              💡
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                AI Answer
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                AI-generated response to your question
              </p>
            </div>
          </div>
        </div>

        {/* Answer Content Area */}
        <div className="space-y-6">
          {/* Answer Textarea */}
          <div className="relative">
            <textarea
              value={answer}
              readOnly
              placeholder="Your answer will appear here..."
              rows={10}
              className="w-full p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 font-medium leading-relaxed"
            />
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Action Buttons and Messages */}
          <div className="flex flex-col gap-4">
            {answer && backendStatus === "connected" && (
              <button
                onClick={handleTTS}
                className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span className="text-xl">🔊</span>
                  <span>Listen to Answer</span>
                </div>
              </button>
            )}

            {answer && backendStatus !== "connected" && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-amber-800">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-semibold">Backend Disconnected</p>
                    <p className="text-sm text-amber-700">
                      Text-to-speech is currently unavailable
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!answer && (
              <div className="p-6 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-2xl">
                    🤔
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Ready for Questions
                    </p>
                    <p className="text-sm">
                      Ask a question to see the AI-generated answer here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
    </div>
  );
};

export default AnswerDisplay;
