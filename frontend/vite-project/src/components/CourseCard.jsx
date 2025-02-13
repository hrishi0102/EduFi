import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  DollarSign,
  Trophy,
  ArrowRight,
  Briefcase,
  Code,
} from "lucide-react";
import Spinner from "../components/Spinner";

const CourseCard = ({ course, onSelect }) => (
  <div
    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 
                hover:border-emerald-500/30 transition-all duration-300
                hover:transform hover:translate-y-[-4px] hover:shadow-lg hover:shadow-emerald-500/10"
  >
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-semibold text-slate-200">{course.name}</h3>
      <div className="p-2 bg-emerald-500/20 rounded-lg">
        <Trophy className="w-5 h-5 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-5">
      <div className="flex items-center text-slate-400">
        <div className="p-1.5 bg-slate-700/50 rounded-lg mr-3">
          <Clock className="w-4 h-4 text-emerald-400" />
        </div>
        <span>{course.duration}</span>
      </div>

      <div className="flex items-center text-slate-400">
        <div className="p-1.5 bg-slate-700/50 rounded-lg mr-3">
          <DollarSign className="w-4 h-4 text-amber-400" />
        </div>
        <span>${course.cost}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-300">
          <Code className="w-4 h-4 text-emerald-400" />
          <p className="font-medium">Key Skills:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {course.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-700/50 rounded-md text-sm text-slate-300 
                           border border-slate-600/50"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 text-slate-300">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <p className="font-medium">Career Opportunities:</p>
        </div>
        <p className="text-slate-400 leading-relaxed">{course.careers}</p>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
        <p className="text-sm text-slate-300">{course.matchReason}</p>
      </div>
    </div>

    <button
      onClick={() => onSelect(course)}
      className="w-full mt-6 py-3 bg-emerald-500 text-slate-900 rounded-lg font-medium
               hover:bg-emerald-400 transition-all duration-300
               hover:shadow-lg hover:shadow-emerald-500/20
               flex items-center justify-center gap-2"
    >
      Apply for Loan
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

const CourseRecommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!location.state?.answers) {
        navigate("/career-match");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/course-match`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: location.state.answers }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to get course recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [location.state, navigate]);

  const handleCourseSelect = (course) => {
    // Navigate to loan application with course details
    navigate("/apply", {
      state: {
        course: course,
        purpose: `Course: ${course.name} - ${course.duration}`,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-8">
      <div className="max-w-6xl mx-auto p-8 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative mb-12">
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text 
                        bg-gradient-to-r from-emerald-400 to-emerald-200 mb-3"
          >
            Your Recommended Courses
          </h1>
          <p className="text-slate-400 text-lg">
            Based on your profile, here are courses that match your goals and
            market demand
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              onSelect={handleCourseSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;
