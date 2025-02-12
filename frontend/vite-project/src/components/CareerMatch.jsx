import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, ArrowRight } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your highest level of education?",
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
    // Will implement AI matching in next step
    navigate("/course-recommendations", { state: { answers } });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Your Perfect Course
        </h1>
        <p className="text-gray-600 mt-2">
          Answer a few questions to get personalized course recommendations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left border rounded-lg hover:border-blue-500 
                         hover:bg-blue-50 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMatch;
