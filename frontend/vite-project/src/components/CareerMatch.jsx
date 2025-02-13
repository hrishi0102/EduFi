import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Target,
} from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your highest level of education?",
    icon: "🎓",
    options: [
      "High School",
      "Some College",
      "Bachelor's Degree",
      "Master's Degree",
      "Other",
    ],
  },
  {
    id: 2,
    question: "How much time can you dedicate to learning?",
    icon: "⏰",
    options: [
      "1-2 hours daily",
      "3-4 hours daily",
      "5+ hours daily",
      "Weekends only",
      "Flexible schedule",
    ],
  },
  {
    id: 3,
    question: "What's your primary goal?",
    icon: "🎯",
    options: [
      "Career switch",
      "Skill enhancement",
      "Higher salary",
      "Starting a business",
      "Personal interest",
    ],
  },
  {
    id: 4,
    question: "Which field interests you most?",
    icon: "💡",
    options: [
      "Technology/Programming",
      "Business/Management",
      "Design/Creative",
      "Data Science/Analytics",
      "Digital Marketing",
    ],
  },
  {
    id: 5,
    question: "What's your preferred learning style?",
    icon: "📚",
    options: [
      "Video lectures",
      "Interactive projects",
      "Reading materials",
      "Mentor-guided",
      "Mixed approach",
    ],
  },
];

const CareerMatch = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    navigate("/course-recommendations", { state: { answers } });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-8">
      <div className="max-w-4xl mx-auto p-8 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative mb-12">
          <div className="flex items-center gap-4 mb-3">
            <Target className="w-8 h-8 text-emerald-400" />
            <h1
              className="text-4xl font-bold text-transparent bg-clip-text 
                          bg-gradient-to-r from-emerald-400 to-emerald-200"
            >
              Find Your Perfect Course
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Answer a few questions to get personalized course recommendations
          </p>
        </div>

        <div
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 
                     p-8 shadow-xl relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.2)_50%,transparent_75%,transparent_100%)] 
                       bg-[length:250px_250px] animate-[gradient_8s_linear_infinite]"
          />

          <div className="relative">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 
                           rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-400 mt-2 flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">
                  {currentQuestion + 1}
                </span>
                <span>of</span>
                <span className="text-slate-300">{questions.length}</span>
              </p>
            </div>

            {/* Question */}
            <div className="mb-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {questions[currentQuestion].icon}
                </span>
                <h2 className="text-xl font-semibold text-slate-200">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border border-slate-700/50 rounded-lg 
                             bg-slate-800/30 hover:bg-slate-700/50 
                             hover:border-emerald-500/50 transition-all duration-300
                             group flex justify-between items-center"
                  >
                    <span className="text-slate-300 group-hover:text-emerald-400">
                      {option}
                    </span>
                    <ChevronRight
                      className="w-5 h-5 text-slate-500 
                                         group-hover:text-emerald-400 
                                         transform group-hover:translate-x-1 
                                         transition-all duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMatch;
