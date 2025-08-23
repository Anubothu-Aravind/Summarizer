import React, { useRef, useEffect, useState } from "react";

const QuestionInput = ({
  question,
  setQuestion,
  handleAsk,
  loading,
  pdfUploaded,
  backendStatus,
}) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 60) + "px";
    }
  }, [question]);

  const handleKeyPress = (e) => {
    const isDisabled = loading || !pdfUploaded || backendStatus !== "connected";
    if (e.key === "Enter" && !e.shiftKey && !isDisabled) {
      e.preventDefault();
      handleAsk();
    }
  };

  const isDisabled = loading || !pdfUploaded || backendStatus !== "connected";
  const showReady = pdfUploaded && backendStatus === "connected" && !loading;

  return (
    // Full div in center (vertically & horizontally)
    <div className="flex items-center justify-center min-h-screen w-full ">
      {/* Main Container - Card & Tip */}
      <div className="w-full max-w-2xl px-2 sm:px-0 py-6">
        {/* Glass Card */}
        <div className="relative bg-white/60 border border-white/30 rounded-3xl shadow-xl px-6 pt-6 pb-4 backdrop-blur-md mx-auto">
          {/* Top Heading and Subtitle */}
          <div className="text-center mb-6">
            <br />
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md">
              <span className="text-2xl text-white">⚡</span>
            </div>
            <br />
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-gray-900">
              Ask Your Question
            </h2>
            <br />
            <div className="mt-1 text-gray-600 text-base font-normal">
              What would you like to know about your document?
            </div>
          </div>
          <br />

          {/* Main input area: input + button side by side */}
          <div className="flex items-stretch gap-2 w-full">
            <textarea
              ref={(el) => {
                textareaRef.current = el;
                if (el) {
                  // Center placeholder via JS (not always possible via CSS in all browsers)
                  el.style.setProperty("--tw-placeholder-opacity", "1");
                  el.className = `flex-1 resize-none rounded-lg px-4 py-3 text-center text-sm bg-white border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder-gray-400 text-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px] max-h-[60px]`;
                }
              }}
              rows={1}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isDisabled}
              
              placeholder="Type your question here... (Press Enter to send, Shift+Enter for new line)"
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                textAlign: "center", // This will center the actual text
              }}
            />
            <button
              onClick={handleAsk}
              disabled={isDisabled}
              className="px-4 min-w-[80px] font-semibold text-white rounded-lg text-sm bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-l-none"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m-6-6l6 6-6 6"
                    />
                  </svg>
                  Send
                </span>
              )}
            </button>
          </div>
          <br />

          {/* Status Bar */}
          {showReady && (
            <div className="flex items-center mt-4 mb-2 px-4 py-2 rounded-xl bg-green-100 border border-green-200 text-green-700 text-sm font-semibold shadow-inner">
              <svg
                className="w-4 h-4 mr-1 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Ready to help{" "}
              <span className="ml-2 font-normal text-green-700">
                Your document is loaded and ready for questions
              </span>
            </div>
          )}
          

          {!pdfUploaded && backendStatus === "connected" && (
            <div className="flex items-center mt-4 mb-2 px-4 py-2 rounded-xl bg-yellow-100 border border-yellow-200 text-yellow-800 text-sm font-medium shadow-inner">
              <svg
                className="w-4 h-4 mr-1 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Please upload a PDF file first.
            </div>
          )}
          <br />
          {backendStatus !== "connected" && (
            <div className="flex items-center mt-4 mb-2 px-4 py-2 rounded-xl bg-red-100 border border-red-200 text-red-800 text-sm font-medium shadow-inner">
              <svg
                className="w-4 h-4 mr-1 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Unable to connect to backend service.
            </div>
          )}
        </div>
<br />
        {/* Tip below the card */}
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span role="img" aria-label="light-bulb">
              💡
            </span>
            Tip: You can ask about specific sections, summarize content, or
            request explanations
          </span>
        </div>
        
      </div>
    </div>
    
  );
};

export default QuestionInput;
