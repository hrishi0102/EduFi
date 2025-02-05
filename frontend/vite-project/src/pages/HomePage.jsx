// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, MessageSquare, PenSquare } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, link }) => (
  <Link
    to={link}
    className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow
               border border-gray-100 flex flex-col items-center text-center"
  >
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const HomePage = () => {
  const features = [
    {
      icon: PenSquare,
      title: "Apply for Loan",
      description:
        "Submit your education loan application with verified income",
      link: "/apply",
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get help with your loan application process",
      link: "/chat",
    },
    {
      icon: BookOpen,
      title: "Learn More",
      description: "Understand how our decentralized education financing works",
      link: "/learn",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to EduFi</h1>
        <p className="text-xl text-gray-600">
          Your pathway to secure education financing
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
