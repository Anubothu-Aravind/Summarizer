import React from "react";
import { Github, Linkedin, Mail, Code, User, Sparkles } from "lucide-react";

// Renamed from 'Developer' to 'developers' to avoid naming conflict with component
const developers = [
  {
    name: "Charan Nayak",
    role: "Frontend Developer",
    bio: "Charan is passionate about building modern, responsive, and beautiful web apps using React and Tailwind CSS. He focuses on user experience and interface polish to create stunning digital experiences.",
    skills: ["React", "Tailwind CSS", "JavaScript", "UI/UX", "Next.js"],
    email: "charannaikcharan734@gmail.com",
    linkedin: "https://www.linkedin.com/in/charan-naik-charan/",
    github: "https://github.com/charannaik07N",
    avatar: "/pic.jpg",
    gradient: "from-blue-500 via-purple-500 to-indigo-600",
  },
  {
    name: "Anubothu Aravind",
    role: "Backend & AI Developer",
    bio: "Specializes in backend systems and natural language processing. Expert in Node.js and integrating AI models for real-world applications, bringing intelligence to every feature.",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "LangChain",
      "OpenAI",
      "MongoDB",
      "Docker",
      "AWS",
    ],
    email: "aanubothu@gmail.com",
    linkedin:
      "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAECA0JYB0fYviKxCS8loZ-edO5d3BQVJTT0&keywords=anubothu%20aravind&origin=RICH_QUERY_SUGGESTION&position=0&searchId=68c829fc-70a4-4b23-a0d6-c2118cb2be80&sid=u9b&spellCorrectionEnabled=false",
    github: "https://github.com/Anubothu-Aravind",
    avatar: "/Aravind.jpg",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
  },
];

const DeveloperPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating elements - made more subtle */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-100 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100 opacity-20 rounded-full blur-3xl"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white shadow-md rounded-full px-6 py-3 mb-8 border border-gray-200">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-medium">Meet Our Team</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            The Developers
          </h1>
        </div>
        <br />
        {/* Developers Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl">
            {developers.map((dev, index) => (
              <div key={index} className="group relative">
                {/* Card Container */}
                <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-xl shadow-md">
                  {/* Gradient Header */}
                  <div
                    className={`h-24 bg-gradient-to-br ${dev.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute top-4 right-4">
                      <Code className="w-5 h-5 text-white opacity-80" />
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="relative -mt-12 flex justify-center">
                    <div className="relative">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br ${dev.gradient} rounded-full flex items-center justify-center border-2 border-white`}
                      >
                        <User className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <br />
                  {/* Content */}
                  <div className="p-6 pt-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {dev.name}
                      </h2>
                      <p className="text-sm font-medium text-gray-600 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {dev.role}
                      </p>
                    </div>
                    <br />

                    <p className="text-gray-600 leading-relaxed mb-6 text-center text-sm">
                      {dev.bio}
                    </p>
                    <br />

                    {/* Skills */}
                    <div className="mb-6">
                      <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2 justify-center text-sm">
                        <Code className="w-4 h-4" />
                        Tech Stack
                      </h3>
                      <br />
                      <div className="flex flex-wrap gap-2 justify-center">
                        {dev.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <br />
                    {/* Contact Links */}
                    <div className="flex justify-center gap-3">
                      <a
                        href={`mailto:${dev.email}`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100  text-gray-700 hover:bg-gray-200 transition-all duration-300 border border-gray-200 hover:border-gray-300 group text-sm"
                      >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Email</span>
                      </a>

                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-50  text-blue-600 hover:bg-blue-100 transition-all duration-300 border border-blue-200 hover:border-blue-300 group text-sm"
                      >
                        <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">LinkedIn</span>
                      </a>

                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800  text-white hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 group text-sm"
                      >
                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">GitHub</span>
                      </a>
                    </div>
                    <br />
                  </div>
                </div>

                <br />
                {/* Hover glow effect - more subtle */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dev.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <br />
            <Sparkles className="w-4 h-4" />
            <span>Crafted with passion and precision</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
