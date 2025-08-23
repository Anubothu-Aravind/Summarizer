import React from "react";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

const Contact = () => {
  const profiles = [
    {
      name: "Anubothu Aravind",
      email: "aanubothu@gmail.com",
      phone: "+91 8374005347",
      linkedin: "https://linkedin.com/in/anubothu-aravind",
      github: "https://github.com/Anubothu-Aravind",
    },
    {
      name: "Charan Naik",
      email: "charannaikcharan734@gmail.com",
      phone: "+91 9704835234",
      linkedin: "https://www.linkedin.com/in/charan-naik-charan/",
      github: "https://github.com/charannaik07N",
    },
  ];

  const ContactCard = ({ profile }) => (
    <div className="space-y-6">
      {/* Name */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {profile.name}
        </h2>
      </div>
      <br />

      {/* Email */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
          <a
            href={`mailto:${profile.email}`}
            className="text-blue-600 hover:text-blue-700 transition-colors break-all"
          >
            {profile.email}
          </a>
        </div>
      </div>
<br />
      {/* Phone */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Phone className="w-6 h-6 text-green-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
          <a
            href={`tel:${profile.phone}`}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            {profile.phone}
          </a>
        </div>
      </div>
<br />
      {/* LinkedIn */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Linkedin className="w-6 h-6 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">LinkedIn</h3>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Connect with me
          </a>
        </div>
      </div>
<br />
      {/* GitHub */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Github className="w-6 h-6 text-gray-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">GitHub</h3>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-700 transition-colors"
          >
            View my code
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-100 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100 opacity-20 rounded-full blur-3xl"></div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h1>
          </div>
          <br />

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 justify-items-center">
            {profiles.map((profile, index) => (
              <ContactCard key={index} profile={profile} />
            ))}
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default Contact;
