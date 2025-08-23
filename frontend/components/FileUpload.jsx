// components/FileUpload.jsx
import React from "react";

const FileUpload = ({
  pdfFile,
  setPdfFile,
  handleUpload,
  loading,
  pdfUploaded,
  backendStatus,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please select a PDF file");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
      {/* Centered Container */}
      <div className="w-full max-w-2xl">
        {/* Glass Container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="relative p-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mb-4">
                <span className="text-3xl">📄</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Choose Your PDF File
              </h2>
              <p className="text-gray-600 font-medium text-lg">
                Upload a PDF document to start asking questions
              </p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="p-8 space-y-6">
            {/* File Input Area */}
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="flex flex-col items-center justify-center w-full h-48 bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-2 border-dashed border-gray-300/60 rounded-2xl cursor-pointer hover:bg-gray-50/90 hover:border-blue-400/60 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="mb-2 text-lg font-semibold text-gray-700 text-center">
                    <span className="font-bold text-blue-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 font-medium text-center">
                    PDF files only (MAX. 50MB)
                  </p>
                </div>
              </label>
            </div>
            <br />
            {/* Selected File Info */}
            {pdfFile && (
              <div className="flex items-center justify-center">
                <div className="flex items-center p-4 bg-green-50/80 backdrop-blur-sm border border-green-200/60 rounded-xl w-full max-w-md">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <br />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800">
                        Selected File:
                      </p>
                      <p className="text-sm text-gray-600 font-medium truncate">
                        {pdfFile.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <br />
            {/* Upload Button */}
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                disabled={loading || !pdfFile || backendStatus !== "connected"}
                className={`w-full max-w-md py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  loading || !pdfFile || backendStatus !== "connected"
                    ? "bg-gray-300/60 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing...</span>
                    <br />
                  </div>
                ) : (
                  "Upload PDF"
                )}
              </button>
            </div>
              <br />

            {/* Success Message */}
            {pdfUploaded && (
              <div className="flex justify-center">
                <div className="flex items-center p-4 bg-green-50/80 backdrop-blur-sm border border-green-200/60 rounded-xl animate-pulse max-w-md w-full">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-green-800 font-semibold">
                      PDF uploaded and processed successfully!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Warning Message */}
            {backendStatus !== "connected" && (
              <div className="flex justify-center">
                <div className="flex items-center p-4 bg-amber-50/80 backdrop-blur-sm border border-amber-200/60 rounded-xl max-w-md w-full">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-amber-800 font-semibold">
                      Backend not connected. Please check server status.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FileUpload;
