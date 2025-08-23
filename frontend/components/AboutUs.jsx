import React from "react";
import {
  FileText,
  Brain,
  Target,
  Rocket,
  Wrench,
  Upload,
  MessageCircle,
  Volume2,
  Zap,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f2f3fe" }}>
      {/* Main Container with proper padding and centering */}
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <br />

        <div className="w-full flex flex-col items-center text-center mb-24">
          <br />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
            About Us
          </h1>
          <br />

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 text-center">
            Welcome to our{" "}
            <span className="font-bold text-purple-600">📚DocDistill</span>{" "}
            AI-powered PDF assistant where static documents become interactive
            and engaging.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            We built this platform to help users{" "}
            <span className="font-semibold text-blue-600">
              extract knowledge
            </span>{" "}
            from PDF files effortlessly. Whether you're a student, researcher,
            or professional, you can upload a PDF,{" "}
            <span className="font-semibold text-purple-600">ask questions</span>
            , and even{" "}
            <span className="font-semibold text-green-600">
              listen to AI-generated answers
            </span>{" "}
            just like talking to your notes.
          </p>
        </div>

        <br />

        {/* Vision Section */}
        <div className="w-full flex flex-col items-center mb-24">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
              Our Vision
            </h2>
          </div>
          <br />

          <p className="text-xl text-gray-700 text-center leading-relaxed">
            Our goal is to transform the way people interact with documents.
            Instead of reading long PDFs manually, we let you{" "}
            <span className="font-bold text-purple-600">
              chat with your file
            </span>{" "}
            and <span className="font-bold text-blue-600">hear it speak</span>.
          </p>
        </div>

        <br />

        {/* Features Section */}
        <div className="w-full flex flex-col items-center mb-24">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
              What Our Tool Can Do
            </h2>
          </div>
          <br />

          {/* Perfectly centered grid container */}
          <div className="w-full flex justify-center">
            {[
              {
                icon: <Upload className="w-8 h-8" />,
                title: "Upload & Read PDFs",
                description: "📄 Upload and read PDFs instantly",
                gradient: "from-green-500 to-blue-500",
                bgColor: "from-green-50 to-blue-50",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Natural Questions",
                description:
                  "🤖 Ask natural language questions based on the content",
                gradient: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50",
              },
              {
                icon: <Volume2 className="w-8 h-8" />,
                title: "Spoken Answers",
                description: "🔊 Generate spoken answers using text-to-speech",
                gradient: "from-yellow-500 to-orange-500",
                bgColor: "from-yellow-50 to-orange-50",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Fast Experience",
                description: "⚡ Simple, fast, and intuitive experience",
                gradient: "from-cyan-500 to-blue-500",
                bgColor: "from-cyan-50 to-blue-50",
              },
            ].map((feature, index) => (
              <article
                key={index}
                className={`w-full max-w-xs bg-gradient-to-br ${feature.bgColor} flex flex-col items-center`}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 text-white flex items-center justify-center`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <br />

        <br />
      </div>
    </div>
  );
}
