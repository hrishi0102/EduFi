import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Clock, DollarSign, Trophy, ArrowRight } from "lucide-react";
import Spinner from "../components/Spinner";

const CourseCard = ({ course, onSelect }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{course.name}</h3>

    <div className="space-y-4">
      <div className="flex items-center text-gray-600">
        <Clock className="w-5 h-5 mr-2" />
        <span>{course.duration}</span>
      </div>

      <div className="flex items-center text-gray-600">
        <DollarSign className="w-5 h-5 mr-2" />
        <span>${course.cost}</span>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-gray-700">Key Skills:</p>
        <ul className="list-disc list-inside text-gray-600 ml-2">
          {course.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-medium text-gray-700 mb-2">Career Opportunities:</p>
        <p className="text-gray-600">{course.careers}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">{course.matchReason}</p>
      </div>
    </div>

    <button
      onClick={() => onSelect(course)}
      className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg 
               hover:bg-blue-700 transition-colors flex items-center justify-center"
    >
      Apply for Loan
      <ArrowRight className="w-4 h-4 ml-2" />
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
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answers: location.state.answers }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

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
        <div className="bg-red-50 p-4 rounded-lg text-red-800">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Recommended Courses
        </h1>
        <p className="text-gray-600 mt-2">
          Based on your profile, here are courses that match your goals and
          market demand
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            onSelect={handleCourseSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseRecommendations;
