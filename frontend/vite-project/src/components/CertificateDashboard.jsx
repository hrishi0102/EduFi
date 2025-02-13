import React, { useState, useEffect } from "react";
import {
  Trophy,
  Upload,
  CheckCircle,
  AlertCircle,
  Award,
  Calendar,
  BookOpen,
} from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { pinata } from "../utils/config";
import Spinner from "../components/Spinner";

const ScoreCard = ({ score }) => (
  <div
    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6
                hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-200">
          Education Score
        </h2>
        <p className="text-slate-400">Based on your certifications</p>
      </div>
      <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-lg">
        <Trophy className="w-8 h-8 text-emerald-400" />
        <span
          className="text-3xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-emerald-400 to-emerald-200"
        >
          {score}
        </span>
      </div>
    </div>
  </div>
);

const UploadForm = ({
  formData,
  handleInputChange,
  handleSubmission,
  handleFileChange,
  selectedFile,
  error,
  isUploading,
}) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
    <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
      <Award className="w-6 h-6 text-emerald-400" />
      Submit Certificate
    </h2>

    <form onSubmit={handleSubmission} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Course Name
        </label>
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
          className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg
                   text-slate-200 placeholder-slate-500
                   focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                   transition-all duration-300"
          placeholder="Enter course name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Completion Date
        </label>
        <input
          type="date"
          name="completionDate"
          value={formData.completionDate}
          onChange={handleInputChange}
          max={new Date().toISOString().split("T")[0]}
          className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg
                   text-slate-200
                   focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                   transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Course Type
        </label>
        <select
          name="courseType"
          value={formData.courseType}
          onChange={handleInputChange}
          className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg
                   text-slate-200
                   focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                   transition-all duration-300"
        >
          <option value="technical">Technical Course</option>
          <option value="non-technical">Non-Technical Course</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Certificate File
        </label>
        <div
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center
                   cursor-pointer hover:border-emerald-500/50 transition-all duration-300
                   bg-slate-900/30"
        >
          <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-slate-400">
            {selectedFile ? selectedFile.name : "Click to upload PDF or image"}
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Supported formats: PDF, JPG, PNG
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading}
        className="w-full py-3 bg-emerald-500 text-slate-900 rounded-lg font-medium
                hover:bg-emerald-400 focus:outline-none focus:ring-2
                focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800
                disabled:bg-emerald-500/50 transition-all duration-300
                hover:shadow-lg hover:shadow-emerald-500/20"
      >
        {isUploading ? <Spinner /> : "Submit Certificate"}
      </button>
    </form>
  </div>
);

const CertificateCard = ({ certificate }) => (
  <div
    className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4
                hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="font-medium text-slate-200">{certificate.name}</h3>
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(certificate.completionDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {certificate.courseType === "technical"
            ? "Technical"
            : "Non-Technical"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={certificate.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          View
        </a>
        <CheckCircle className="w-5 h-5 text-emerald-400" />
      </div>
    </div>
  </div>
);

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
      let points = 20;
      if (cert.courseType === "technical") points += 10;
      const completionDate = new Date(cert.completionDate);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      if (completionDate > sixMonthsAgo) points += 5;
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const metadata = {
        name: formData.courseName,
        keyvalues: {
          courseName: formData.courseName,
          completionDate: formData.completionDate,
          courseType: formData.courseType,
          userAddress: address,
        },
      };

      const upload = await pinata.upload.file(selectedFile, metadata);
      const url = `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
        upload.IpfsHash
      }`;

      const newCertificate = {
        id: upload.IpfsHash,
        name: formData.courseName,
        completionDate: formData.completionDate,
        courseType: formData.courseType,
        url,
      };

      setCertificates((prev) => [...prev, newCertificate]);
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
      <div
        className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 
                    flex items-center justify-center p-8"
      >
        <div
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 
                      p-8 text-center max-w-md w-full"
        >
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-200 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-slate-400">
            Please connect your wallet to manage certificates
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-8">
      <div className="max-w-4xl mx-auto p-8 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative space-y-8">
          <ScoreCard score={calculateScore(certificates)} />

          <UploadForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmission={handleSubmission}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            error={error}
            isUploading={isUploading}
          />

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-emerald-400" />
              Your Certificates
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : certificates.length === 0 ? (
              <p className="text-slate-400 text-center py-8">
                No certificates submitted yet
              </p>
            ) : (
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDashboard;
