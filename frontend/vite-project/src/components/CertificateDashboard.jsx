import React, { useState, useEffect } from "react";
import { Trophy, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { pinata } from "../utils/config";
import Spinner from "../components/Spinner";

const CertificateDashboard = () => {
  const { address } = useAppKitAccount();
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    courseName: "",
    completionDate: "",
    courseType: "technical",
  });

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!address) return;

      try {
        const response = await pinata.files.list().execute();
        console.log("Files response:", response);

        const certsWithUrls = response.files.map((file) => ({
          id: file.cid,
          name: file.keyvalues?.courseName || file.name,
          completionDate: file.keyvalues?.completionDate,
          courseType: file.keyvalues?.courseType,
          url: `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${file.cid}`,
        }));

        setCertificates(certsWithUrls);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setError("Failed to load certificates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [address]);

  const calculateScore = (certs) => {
    return certs.reduce((total, cert) => {
      let points = 20; // Base points

      if (cert.courseType === "technical") {
        points += 10; // Bonus for technical courses
      }

      const completionDate = new Date(cert.completionDate);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      if (completionDate > sixMonthsAgo) {
        points += 5; // Bonus for recent completion
      }

      return total + points;
    }, 0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please upload a PDF or image file");
      e.target.value = "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!selectedFile || !formData.courseName || !formData.completionDate) {
      setError("Please fill in all fields");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Create metadata for the file
      const metadata = {
        name: formData.courseName,
        keyvalues: {
          courseName: formData.courseName,
          completionDate: formData.completionDate,
          courseType: formData.courseType,
          userAddress: address,
        },
      };

      // Upload to IPFS via Pinata
      const upload = await pinata.upload.file(selectedFile, metadata);
      console.log("Upload response:", upload);

      // Construct the gateway URL
      const url = `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
        upload.IpfsHash
      }`;

      // Add to certificates list
      const newCertificate = {
        id: upload.IpfsHash,
        name: formData.courseName,
        completionDate: formData.completionDate,
        courseType: formData.courseType,
        url,
      };

      setCertificates((prev) => [...prev, newCertificate]);

      // Reset form
      setSelectedFile(null);
      setFormData({
        courseName: "",
        completionDate: "",
        courseType: "technical",
      });
      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload certificate. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!address) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600 mt-2">
          Please connect your wallet to manage certificates
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Score Display */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Education Score
            </h2>
            <p className="text-gray-600">Based on your certifications</p>
          </div>
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-3xl font-bold text-blue-600">
              {calculateScore(certificates)}
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Upload Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Submit Certificate
        </h2>
        <form onSubmit={handleSubmission} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter course name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Completion Date
            </label>
            <input
              type="date"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Type
            </label>
            <select
              name="courseType"
              value={formData.courseType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="technical">Technical Course</option>
              <option value="non-technical">Non-Technical Course</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate File
            </label>
            <div
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                {selectedFile
                  ? selectedFile.name
                  : "Click to upload PDF or image"}
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, JPG, PNG
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 
                     transition-colors"
          >
            {isUploading ? <Spinner /> : "Submit Certificate"}
          </button>
        </form>
      </div>

      {/* Certificates List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Certificates
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : certificates.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No certificates submitted yet
          </p>
        ) : (
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-gray-600">
                    Completed:{" "}
                    {new Date(cert.completionDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Type:{" "}
                    {cert.courseType === "technical"
                      ? "Technical"
                      : "Non-Technical"}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View
                  </a>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDashboard;
