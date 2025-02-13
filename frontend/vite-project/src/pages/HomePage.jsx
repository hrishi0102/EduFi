import React from "react";
import { Link } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import {
  LockKeyhole,
  GraduationCap,
  Bot,
  Shield,
  Wallet,
  ChevronRight,
  BarChart,
  BookOpen,
  FileCheck,
  BrainCircuit,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div
    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6
                hover:border-emerald-500/30 transition-all duration-300
                hover:transform hover:translate-y-[-4px]"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 bg-emerald-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
    </div>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const StepCard = ({ number, title, description, icon: Icon, link }) => (
  <Link to={link} className="group">
    <div
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6
                  hover:border-emerald-500/30 transition-all duration-300
                  hover:transform hover:translate-y-[-4px]"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center
                      text-emerald-400 font-semibold"
        >
          {number}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-slate-400 leading-relaxed mb-4">{description}</p>
          <div className="flex items-center text-emerald-400 group-hover:gap-2 transition-all">
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const HomePage = () => {
  const { isConnected } = useAppKitAccount();

  const features = [
    {
      icon: LockKeyhole,
      title: "Privacy First",
      description:
        "Verify your income using zero-knowledge proofs, keeping your financial data private and secure.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Matching",
      description:
        "Get personalized course recommendations based on your goals, skills, and market demand.",
    },
    {
      icon: Shield,
      title: "Decentralized Finance",
      description:
        "Access education funding through smart contracts on the blockchain, ensuring transparency and trust.",
    },
    {
      icon: Bot,
      title: "AI Study Advisor",
      description:
        "Get 24/7 support from our AI advisor for course selection, loan applications, and learning guidance.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Verify Your Income",
      description:
        "Securely prove your income level without revealing sensitive data using zero-knowledge proofs.",
      icon: FileCheck,
      link: "/",
    },
    {
      number: "2",
      title: "Find Your Course",
      description:
        "Get AI-powered course recommendations based on your interests and career goals.",
      icon: BookOpen,
      link: "/career-match",
    },
    {
      number: "3",
      title: "Apply for Funding",
      description:
        "Submit your loan application with verified income proof and get quick approval.",
      icon: Wallet,
      link: "/apply",
    },
    {
      number: "4",
      title: "Track Progress",
      description:
        "Monitor your learning journey and manage your certificates on-chain.",
      icon: BarChart,
      link: "/certificates",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-500/10 blur-3xl rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-8 pt-20 pb-16 relative">
          <div className="text-center mb-16">
            <h1
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-emerald-200 to-blue-400 
                        text-transparent bg-clip-text"
            >
              "Learn Privately, Fund Securely, Grow Confidently"
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              EduFi is a micro-financing platform which combines AI-powered
              course matching to make quality education accessible while
              protecting your privacy.
            </p>
            {!isConnected && (
              <button
                onClick={() => {}} // Your wallet connect function
                className="mt-8 px-8 py-3 bg-emerald-500 text-slate-900 rounded-lg font-medium
                         hover:bg-emerald-400 transition-all duration-300
                         hover:shadow-lg hover:shadow-emerald-500/20
                         flex items-center gap-2 mx-auto"
              >
                <Wallet className="w-5 h-5" />
                Connect to Get Started
              </button>
            )}
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-200 mb-4">
                How It Works
              </h2>
              <p className="text-slate-400">
                Get started with EduFi in four simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </div>
          </div>

          {/* Stats or Social Proof */}
          <div className="grid grid-cols-3 gap-8 py-12 border-t border-slate-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                100%
              </div>
              <div className="text-slate-400">Private</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                24/7
              </div>
              <div className="text-slate-400">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                5 min
              </div>
              <div className="text-slate-400">Verification</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
