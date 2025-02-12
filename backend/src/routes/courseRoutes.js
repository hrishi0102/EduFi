// src/routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseMatchingService = require("../services/courseMatchingService");

router.post("/course-match", async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ error: "Quiz answers are required" });
    }

    // Get AI recommendation text
    const aiResponse = await courseMatchingService.getRecommendations(answers);

    // Parse AI response into structured course data
    let courses = [];

    // Using educational field from quiz answers
    const field = answers[3]; // assuming field question is 4th

    switch (field) {
      case "Technology/Programming":
        courses = [
          {
            name: "Full Stack Web Development",
            duration: "24 weeks",
            cost: 1800,
            skills: ["JavaScript", "React", "Node.js", "MongoDB"],
            careers: "Full Stack Developer, Backend Developer",
            matchReason: "Matches your interest in programming and technology",
          },
          {
            name: "Mobile App Development",
            duration: "16 weeks",
            cost: 1500,
            skills: ["React Native", "JavaScript", "App Design"],
            careers: "Mobile Developer, App Developer",
            matchReason: "Perfect for creating mobile applications",
          },
          {
            name: "Cloud Computing Fundamentals",
            duration: "12 weeks",
            cost: 1200,
            skills: ["AWS", "Cloud Architecture", "DevOps"],
            careers: "Cloud Engineer, DevOps Engineer",
            matchReason: "Great foundation for cloud technologies",
          },
        ];
        break;

      case "Data Science/Analytics":
        courses = [
          {
            name: "Data Science Bootcamp",
            duration: "20 weeks",
            cost: 1900,
            skills: ["Python", "Machine Learning", "SQL", "Statistics"],
            careers: "Data Scientist, Machine Learning Engineer",
            matchReason: "Aligned with your interest in data science",
          },
          {
            name: "Business Analytics",
            duration: "16 weeks",
            cost: 1600,
            skills: ["Data Analysis", "Visualization", "Excel", "Tableau"],
            careers: "Business Analyst, Data Analyst",
            matchReason: "Perfect for business-focused data analysis",
          },
          {
            name: "Python for Data Analysis",
            duration: "12 weeks",
            cost: 1300,
            skills: ["Python", "Pandas", "NumPy", "Data Visualization"],
            careers: "Data Analyst, Research Analyst",
            matchReason: "Great starting point for data analysis",
          },
        ];
        break;

      case "Business/Management":
        courses = [
          {
            name: "Digital Business Management",
            duration: "16 weeks",
            cost: 1400,
            skills: [
              "Business Strategy",
              "Digital Marketing",
              "Project Management",
            ],
            careers: "Digital Business Manager, Project Manager",
            matchReason: "Matches your business management interests",
          },
          {
            name: "Product Management Essentials",
            duration: "12 weeks",
            cost: 1200,
            skills: ["Product Strategy", "Agile", "User Research"],
            careers: "Product Manager, Product Owner",
            matchReason: "Great for aspiring product managers",
          },
          {
            name: "Entrepreneurship Fundamentals",
            duration: "10 weeks",
            cost: 1000,
            skills: ["Business Planning", "Marketing", "Finance"],
            careers: "Entrepreneur, Business Owner",
            matchReason: "Perfect for starting your own business",
          },
        ];
        break;

      case "Design/Creative":
        courses = [
          {
            name: "UI/UX Design",
            duration: "16 weeks",
            cost: 1500,
            skills: [
              "User Interface",
              "User Experience",
              "Figma",
              "Design Systems",
            ],
            careers: "UI Designer, UX Designer",
            matchReason: "Matches your creative and design interests",
          },
          {
            name: "Digital Design",
            duration: "12 weeks",
            cost: 1200,
            skills: ["Graphic Design", "Adobe Creative Suite", "Brand Design"],
            careers: "Digital Designer, Graphic Designer",
            matchReason: "Perfect for digital creative work",
          },
          {
            name: "Motion Graphics",
            duration: "14 weeks",
            cost: 1300,
            skills: ["After Effects", "Animation", "Video Editing"],
            careers: "Motion Designer, Video Editor",
            matchReason: "Great for dynamic visual content creation",
          },
        ];
        break;

      case "Digital Marketing":
        courses = [
          {
            name: "Digital Marketing Specialist",
            duration: "16 weeks",
            cost: 1400,
            skills: ["SEO", "Social Media", "Content Marketing", "Analytics"],
            careers: "Digital Marketing Manager, Social Media Manager",
            matchReason: "Matches your marketing interests",
          },
          {
            name: "Social Media Marketing",
            duration: "12 weeks",
            cost: 1100,
            skills: ["Social Strategy", "Content Creation", "Analytics"],
            careers: "Social Media Specialist, Content Strategist",
            matchReason: "Perfect for social media focus",
          },
          {
            name: "Content Marketing",
            duration: "10 weeks",
            cost: 900,
            skills: ["Content Strategy", "SEO Writing", "Brand Storytelling"],
            careers: "Content Marketer, Content Creator",
            matchReason: "Great for content creation and strategy",
          },
        ];
        break;

      default:
        courses = [
          {
            name: "Digital Skills Fundamentals",
            duration: "12 weeks",
            cost: 1000,
            skills: [
              "Digital Literacy",
              "Professional Skills",
              "Communication",
            ],
            careers: "Various Digital Roles",
            matchReason: "Great foundation for digital careers",
          },
        ];
    }

    // Factor in time availability (answers[1])
    courses = courses.map((course) => {
      if (answers[1] === "1-2 hours daily" || answers[1] === "Weekends only") {
        course.duration = course.duration.replace(
          /(\d+)/,
          (match) => parseInt(match) * 1.5
        );
      }
      return course;
    });

    res.json({ recommendations: courses });
  } catch (error) {
    console.error("Course Matching Error:", error);
    res.status(500).json({ error: "Failed to get course recommendations" });
  }
});

module.exports = router;
