import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../Components/Navbar";
import { createCV, updateCV, getCV } from "../services/cvService";

function Create() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const editCVId = searchParams.get("edit");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Predefined list of technologies
  const availableTechnologies = [
    // Programming Languages
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "TypeScript",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "Ruby",
    "Scala",
    "Dart",
    "R",
    "MATLAB",
    "Perl",
    "Lua",
    "Haskell",
    "Clojure",
    // Frontend Technologies
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "HTML5",
    "CSS3",
    "Sass",
    "Less",
    "Bootstrap",
    "Tailwind CSS",
    "Material-UI",
    "Ant Design",
    "Chakra UI",
    "jQuery",
    "D3.js",
    "Three.js",
    "WebGL",
    "Progressive Web Apps",
    // Backend Technologies
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "ASP.NET",
    "Laravel",
    "Rails",
    "Phoenix",
    "Gin",
    "Echo",
    "Fiber",
    "NestJS",
    "Koa.js",
    "Hapi.js",
    // Databases
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Oracle",
    "SQL Server",
    "DynamoDB",
    "Cassandra",
    "Neo4j",
    "InfluxDB",
    "ElasticSearch",
    "Firebase Firestore",
    "Supabase",
    // Cloud & DevOps
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitLab CI",
    "GitHub Actions",
    "Terraform",
    "Ansible",
    "Chef",
    "Puppet",
    "Vagrant",
    "Nginx",
    "Apache",
    "Linux",
    "Ubuntu",
    "CentOS",
    // Mobile Development
    "React Native",
    "Flutter",
    "Ionic",
    "Xamarin",
    "Swift UI",
    "Android Studio",
    "Expo",
    // Tools & Others
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Jira",
    "Confluence",
    "Slack",
    "Discord",
    "Figma",
    "Adobe XD",
    "Sketch",
    "InVision",
    "Postman",
    "Insomnia",
    "VS Code",
    "IntelliJ",
    "Eclipse",
    "Vim",
    "Emacs",
    "Sublime Text",
    "Atom",
  ];

  // Color themes for the CV with distinct layouts and styles
  const colorThemes = {
    classic: {
      name: "Classic",
      primary: "text-gray-900",
      secondary: "text-gray-700",
      accent: "text-blue-600",
      border: "border-gray-300",
      background: "bg-gray-100",
      headerBg: "bg-white",
      layout: "traditional",
      headerAlign: "text-center",
      sectionStyle: "border-b border-gray-300 pb-3 mb-4",
      skillStyle: "bg-gray-100 text-gray-800 border border-gray-300",
    },
    modern: {
      name: "Modern",
      primary: "text-slate-300",
      secondary: "text-slate-100",
      accent: "text-cyan-500",
      border: "border-slate-200",
      background: "bg-zinc-800",
      headerBg: "bg-gradient-to-r from-cyan-500 to-blue-600",
      headerTextPrimary: "text-white",
      headerTextSecondary: "text-white/90",
      headerTextAccent: "text-white/80",
      layout: "modern",
      headerAlign: "text-left",
      sectionStyle: "border-l-4 border-cyan-500 pl-4 mb-6",
      skillStyle:
        "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-l-2 border-cyan-500",
    },
    professional: {
      name: "Professional",
      primary: "text-zinc-900",
      secondary: "text-zinc-600",
      accent: "text-indigo-600",
      border: "border-zinc-200",
      background: "bg-zinc-50",
      headerBg: "bg-white",
      layout: "corporate",
      headerAlign: "text-left",
      sectionStyle:
        "bg-zinc-50 p-4 rounded-lg mb-4 border-l-4 border-indigo-600",
      skillStyle: "bg-indigo-50 text-indigo-900 border border-indigo-200",
    },
    creative: {
      name: "Creative",
      primary: "text-purple-900",
      secondary: "text-purple-700",
      accent: "text-pink-600",
      border: "border-purple-200",
      background:
        "bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800",
      headerBg: "bg-gradient-to-r from-purple-600 to-pink-600",
      headerTextPrimary: "text-white",
      headerTextSecondary: "text-white/90",
      headerTextAccent: "text-white/80",
      layout: "creative",
      headerAlign: "text-center",
      sectionStyle:
        "bg-white/60 backdrop-blur-sm p-4 rounded-xl mb-4 border border-purple-200 shadow-lg",
      skillStyle:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-md",
    },
    minimal: {
      name: "Minimal",
      primary: "text-black",
      secondary: "text-gray-600",
      accent: "text-gray-900",
      border: "border-gray-100",
      background: "bg-white",
      headerBg: "bg-white",
      layout: "minimal",
      headerAlign: "text-center",
      sectionStyle: "mb-8",
      skillStyle: "bg-black text-white border-none",
    },
    vibrant: {
      name: "Vibrant",
      primary: "text-purple-800", // Strong purple for text
      secondary: "text-white", // Deep blue for secondary text
      accent: "text-blue-400", // Light blue for accents
      border: "border-purple-300", // Soft purple borders
      background: "bg-gradient-to-br from-black via-zinc-800 to-black", // Rich dark gradient background
      headerBg: "bg-gradient-to-r from-blue-600 to-purple-700", // Vivid header gradient
      headerTextPrimary: "text-white",
      headerTextSecondary: "text-white/90",
      headerTextAccent: "text-white/80",
      layout: "vibrant",
      headerAlign: "text-center",
      sectionStyle:
        "bg-black/70 p-4 rounded-2xl mb-4 border-2 border-purple-500 shadow-xl", // Semi-transparent dark section with purple border
      skillStyle:
        "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-lg", // Eye-catching skill tags
    },
  };

  const [selectedTheme, setSelectedTheme] = useState("classic");
  const currentTheme = colorThemes[selectedTheme];

  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
      about: "",
    },
    experience: [
      {
        id: 1,
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ],
    skills: [],
    projects: [
      {
        id: 1,
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    certifications: [],
    languages: [
      {
        id: 1,
        language: "",
        proficiency: "",
      },
    ],
  });

  // State for saving/loading functionality
  const [currentCvId, setCurrentCvId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Load existing CV data if editing
  useEffect(() => {
    const loadCVForEditing = async () => {
      if (editCVId && currentUser) {
        setLoading(true);
        setIsEditing(true);
        try {
          const cvDoc = await getCV(editCVId);
          if (cvDoc && cvDoc.userId === currentUser.uid) {
            setCvData(cvDoc.data);
            setSelectedTheme(cvDoc.data.theme || "classic");
            setCurrentCvId(editCVId);
          } else {
            console.error("CV not found or unauthorized");
          }
        } catch (error) {
          console.error("Error loading CV for editing:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCVForEditing();
  }, [editCVId, currentUser]);

  // Save CV to Firebase
  const saveCV = async () => {
    if (!currentUser) {
      setSaveStatus("Please login to save your CV");
      return;
    }

    setIsLoading(true);
    setSaveStatus("");

    try {
      const cvDataWithTheme = { ...cvData, theme: selectedTheme };

      if (currentCvId) {
        // Update existing CV
        await updateCV(currentCvId, cvDataWithTheme);
        setSaveStatus("CV updated successfully!");
      } else {
        // Create new CV
        const newCV = await createCV(currentUser.uid, cvDataWithTheme);
        setCurrentCvId(newCV.id);
        setSaveStatus("CV saved successfully!");
      }
    } catch (error) {
      console.error("Error saving CV:", error);
      setSaveStatus("Error saving CV. Please try again.");
    } finally {
      setIsLoading(false);
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  // Export CV data as JSON
  const exportAsJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `cv-${
      cvData.personalInfo.fullName || "untitled"
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Import CV data from JSON
  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setCvData(jsonData);
          setSaveStatus("CV imported successfully!");
          setTimeout(() => setSaveStatus(""), 3000);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setSaveStatus("Error parsing JSON file. Please check the format.");
          setTimeout(() => setSaveStatus(""), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  const updatePersonalInfo = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const toggleTechnology = (tech) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.includes(tech)
        ? prev.skills.filter((skill) => skill !== tech)
        : [...prev.skills, tech],
    }));
  };

  const addCustomTechnology = (customTech) => {
    if (customTech.trim() && !cvData.skills.includes(customTech.trim())) {
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, customTech.trim()],
      }));
    }
  };

  // Education functions
  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          gpa: "",
        },
      ],
    }));
  };

  const updateEducation = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Project functions
  const addProject = () => {
    setCvData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    }));
  };

  const updateProject = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    }));
  };

  const removeProject = (id) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }));
  };

  // Certification functions
  const addCertification = (certificationText) => {
    if (certificationText.trim()) {
      setCvData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, certificationText.trim()],
      }));
    }
  };

  const removeCertification = (index) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Language functions
  const addLanguage = () => {
    setCvData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now(),
          language: "",
          proficiency: "",
        },
      ],
    }));
  };

  const updateLanguage = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const removeLanguage = (id) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Please sign in to create a CV
            </h1>
            <Link
              to="/"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition duration-200"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isEditing ? "Loading CV for editing..." : "Loading..."}
            </h1>
            <p className="text-gray-300">
              Please wait while we prepare your CV builder
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <style>
        {`
          @page {
            margin: 0;
            size: A4;
            -webkit-print-color-adjust: exact;
          }
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            /* Hide everything except CV preview */
            body > div:not([class*="cv-preview"]) {
              display: none !important;
            }
            .min-h-screen > div > div > div:not(:has(.cv-preview)) {
              display: none !important;
            }
            /* Show only the CV preview container */
            .min-h-screen,
            .min-h-screen > div,
            .min-h-screen > div > div,
            .min-h-screen > div > div > div:has(.cv-preview) {
              display: block !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              min-height: auto !important;
            }
            /* Style the CV preview for print */
            .cv-preview {
              max-height: none !important;
              overflow: visible !important;
              box-shadow: none !important;
              border: none !important;
              margin: 0 !important;
              padding: 20mm !important;
              background: white !important;
              border-radius: 0 !important;
              min-height: auto !important;
            }
            /* Hide navigation and buttons */
            nav,
            .navbar,
            button,
            .print\\:hidden,
            h2:contains("Preview") {
              display: none !important;
            }
            /* Ensure proper page breaks */
            .cv-preview * {
              page-break-inside: avoid;
            }
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid xl:grid-cols-2 gap-8">
            {/* CV Builder Form */}
            <div className="space-y-6 order-2 xl:order-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">
                  {isEditing ? "Edit Your CV" : "Create Your CV"}
                </h1>
                {isEditing && (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-4 py-2 bg-gray-600/20 text-gray-300 border border-gray-600/30 rounded-lg hover:bg-gray-600/30 transition duration-200 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Dashboard
                  </Link>
                )}
              </div>

              {/* Theme Selector */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Choose CV Theme
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTheme(key)}
                      className={`p-3 rounded-lg border-2 transition duration-200 ${
                        selectedTheme === key
                          ? "border-cyan-500 bg-cyan-500/20"
                          : "border-zinc-600 bg-zinc-800 hover:border-zinc-500"
                      }`}
                    >
                      <div
                        className={`w-full h-8 rounded ${theme.headerBg} border ${theme.border} mb-2`}
                      ></div>
                      <div
                        className={`w-3/4 h-2 rounded ${theme.background} mb-1`}
                      ></div>
                      <div
                        className={`w-1/2 h-2 rounded ${theme.background}`}
                      ></div>
                      <p className="text-white text-xs mt-2 font-medium">
                        {theme.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Save/Load/Export Section */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Save & Load CV
                </h2>

                {/* Status Message */}
                {saveStatus && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm ${
                      saveStatus.includes("Error") ||
                      saveStatus.includes("not found")
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {saveStatus}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Save to Firebase */}
                  <button
                    onClick={saveCV}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    {isLoading ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "💾"
                    )}
                    {currentCvId ? "Update CV" : "Save CV"}
                  </button>

                  {/* Export as JSON */}
                  <button
                    onClick={exportAsJSON}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    📥 Export JSON
                  </button>

                  {/* Import from JSON */}
                  <label className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer">
                    📤 Import JSON
                    <input
                      type="file"
                      accept=".json"
                      onChange={importFromJSON}
                      className="hidden"
                    />
                  </label>

                  {/* New CV */}
                  <button
                    onClick={() => {
                      setCvData({
                        personalInfo: {
                          fullName: "",
                          email: "",
                          phone: "",
                          location: "",
                          website: "",
                          summary: "",
                          about: "",
                        },
                        experience: [
                          {
                            id: 1,
                            title: "",
                            company: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            current: false,
                            description: "",
                          },
                        ],
                        education: [
                          {
                            id: 1,
                            degree: "",
                            institution: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            gpa: "",
                          },
                        ],
                        skills: [],
                        projects: [
                          {
                            id: 1,
                            name: "",
                            description: "",
                            technologies: "",
                            link: "",
                          },
                        ],
                        certifications: [],
                        languages: [
                          {
                            id: 1,
                            language: "",
                            proficiency: "",
                          },
                        ],
                      });
                      setCurrentCvId(null);
                      setSaveStatus("");
                    }}
                    className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    🆕 New CV
                  </button>
                </div>

                {/* Current CV Info */}
                {currentCvId && (
                  <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-600">
                    <p className="text-white text-sm">
                      <span className="text-cyan-400">Current CV ID:</span>{" "}
                      {currentCvId}
                    </p>
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={cvData.personalInfo.fullName}
                    onChange={(e) =>
                      updatePersonalInfo("fullName", e.target.value)
                    }
                    className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                      cvData.personalInfo.fullName
                        ? "text-gray-400"
                        : "text-white"
                    } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={cvData.personalInfo.email}
                    onChange={(e) =>
                      updatePersonalInfo("email", e.target.value)
                    }
                    className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                      cvData.personalInfo.email ? "text-gray-400" : "text-white"
                    } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) =>
                      updatePersonalInfo("phone", e.target.value)
                    }
                    className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                      cvData.personalInfo.phone ? "text-gray-400" : "text-white"
                    } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={cvData.personalInfo.location}
                    onChange={(e) =>
                      updatePersonalInfo("location", e.target.value)
                    }
                    className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                      cvData.personalInfo.location
                        ? "text-gray-400"
                        : "text-white"
                    } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                  />
                  <input
                    type="url"
                    placeholder="Website/LinkedIn"
                    value={cvData.personalInfo.website}
                    onChange={(e) =>
                      updatePersonalInfo("website", e.target.value)
                    }
                    className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                      cvData.personalInfo.website
                        ? "text-gray-400"
                        : "text-white"
                    } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                  />
                </div>
                <textarea
                  placeholder="Professional Summary"
                  value={cvData.personalInfo.summary}
                  onChange={(e) =>
                    updatePersonalInfo("summary", e.target.value)
                  }
                  rows={4}
                  className={`w-full mt-4 p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                    cvData.personalInfo.summary ? "text-gray-400" : "text-white"
                  } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                />
                <textarea
                  placeholder="About Me (2-3 sentences about yourself, your passion, and what drives you professionally)"
                  value={cvData.personalInfo.about}
                  onChange={(e) => updatePersonalInfo("about", e.target.value)}
                  rows={3}
                  className={`w-full mt-4 p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                    cvData.personalInfo.about ? "text-gray-400" : "text-white"
                  } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                />
              </div>

              {/* Technologies & Skills */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Technologies & Skills
                </h2>
                <div className="space-y-4">
                  {/* Selected Technologies */}
                  {cvData.skills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-2">
                        Selected Technologies:
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cvData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:from-cyan-600 hover:to-blue-700 transition duration-200"
                            onClick={() => toggleTechnology(skill)}
                          >
                            {skill} ×
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Custom Technology */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      Add Custom Technology:
                    </h3>
                    <input
                      type="text"
                      placeholder="Type a technology and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addCustomTechnology(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                    />
                  </div>

                  {/* Available Technologies */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      Select from Available Technologies:
                    </h3>
                    <div className="max-h-60 overflow-y-auto bg-zinc-800 border border-zinc-600 rounded-md p-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {availableTechnologies.map((tech) => (
                          <label
                            key={tech}
                            className="flex items-center text-sm text-white hover:text-cyan-400 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={cvData.skills.includes(tech)}
                              onChange={() => toggleTechnology(tech)}
                              className="mr-2 accent-cyan-500"
                            />
                            {tech}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Work Experience
                  </h2>
                  <button
                    onClick={addExperience}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition duration-200 text-sm font-semibold"
                  >
                    Add Experience
                  </button>
                </div>

                {cvData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-b border-zinc-700/50 pb-4 mb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) =>
                          updateExperience(exp.id, "title", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          exp.title ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          exp.company ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(exp.id, "location", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          exp.location ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                            exp.startDate ? "text-gray-400" : "text-white"
                          } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          disabled={exp.current}
                          className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                            exp.endDate ? "text-gray-400" : "text-white"
                          } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-zinc-700 disabled:text-gray-500 transition duration-200`}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "current",
                              e.target.checked
                            )
                          }
                          className="mr-2 accent-cyan-500"
                        />
                        Currently working here
                      </label>
                    </div>
                    <textarea
                      placeholder="Job Description"
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, "description", e.target.value)
                      }
                      rows={3}
                      className={`w-full mt-4 p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                        exp.description ? "text-gray-400" : "text-white"
                      } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                    />
                    {cvData.experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm transition duration-200"
                      >
                        Remove Experience
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Education
                  </h2>
                  <button
                    onClick={addEducation}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition duration-200 text-sm font-semibold"
                  >
                    Add Education
                  </button>
                </div>

                {cvData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-b border-zinc-700/50 pb-4 mb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Degree/Qualification"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          edu.degree ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(edu.id, "institution", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          edu.institution ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) =>
                          updateEducation(edu.id, "location", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          edu.location ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <input
                        type="text"
                        placeholder="GPA (Optional)"
                        value={edu.gpa}
                        onChange={(e) =>
                          updateEducation(edu.id, "gpa", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          edu.gpa ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:col-span-2">
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "startDate", e.target.value)
                          }
                          className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                            edu.startDate ? "text-gray-400" : "text-white"
                          } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "endDate", e.target.value)
                          }
                          className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                            edu.endDate ? "text-gray-400" : "text-white"
                          } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                        />
                      </div>
                    </div>
                    {cvData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm transition duration-200"
                      >
                        Remove Education
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Projects</h2>
                  <button
                    onClick={addProject}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition duration-200 text-sm font-semibold"
                  >
                    Add Project
                  </button>
                </div>

                {cvData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border-b border-zinc-700/50 pb-4 mb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) =>
                          updateProject(project.id, "name", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          project.name ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <input
                        type="text"
                        placeholder="Technologies Used"
                        value={project.technologies}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "technologies",
                            e.target.value
                          )
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          project.technologies ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Project Link (Optional)"
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, "link", e.target.value)
                      }
                      className={`w-full mt-4 p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                        project.link ? "text-gray-400" : "text-white"
                      } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                    />
                    <textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, "description", e.target.value)
                      }
                      rows={3}
                      className={`w-full mt-4 p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                        project.description ? "text-gray-400" : "text-white"
                      } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                    />
                    {cvData.projects.length > 1 && (
                      <button
                        onClick={() => removeProject(project.id)}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm transition duration-200"
                      >
                        Remove Project
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {/* Display existing certifications */}
                  {cvData.certifications.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-2">
                        Your Certifications:
                      </h3>
                      <ul className="space-y-2">
                        {cvData.certifications.map((cert, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-zinc-800 p-3 rounded-md"
                          >
                            <span className="text-white text-sm">{cert}</span>
                            <button
                              onClick={() => removeCertification(index)}
                              className="text-red-400 hover:text-red-300 text-sm ml-2 transition duration-200"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Add new certification */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      Add Certification:
                    </h3>
                    <input
                      type="text"
                      placeholder="Enter certification name and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addCertification(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Languages
                  </h2>
                  <button
                    onClick={addLanguage}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition duration-200 text-sm font-semibold"
                  >
                    Add Language
                  </button>
                </div>

                {cvData.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="border-b border-zinc-700/50 pb-4 mb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Language"
                        value={lang.language}
                        onChange={(e) =>
                          updateLanguage(lang.id, "language", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          lang.language ? "text-gray-400" : "text-white"
                        } placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      />
                      <select
                        value={lang.proficiency}
                        onChange={(e) =>
                          updateLanguage(lang.id, "proficiency", e.target.value)
                        }
                        className={`w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md ${
                          lang.proficiency ? "text-gray-400" : "text-white"
                        } focus:ring-cyan-500 focus:border-cyan-500 transition duration-200`}
                      >
                        <option value="">Select Proficiency Level</option>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Proficient">Proficient</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                      </select>
                    </div>
                    {cvData.languages.length > 1 && (
                      <button
                        onClick={() => removeLanguage(lang.id)}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm transition duration-200"
                      >
                        Remove Language
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CV Preview */}
            <div className="order-1 xl:order-2 xl:sticky xl:top-8">
              <div className="bg-zinc-900/50 border border-zinc-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Preview</h2>
                  <button
                    onClick={() => window.print()}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition duration-200 text-sm font-semibold print:hidden"
                  >
                    Print CV
                  </button>
                </div>
                <div
                  className={`cv-preview ${currentTheme.background} border ${currentTheme.border} p-4 sm:p-6 rounded-lg min-h-96 max-h-[80vh] xl:max-h-screen overflow-y-auto`}
                >
                  {/* Header */}
                  <div
                    className={`${currentTheme.headerAlign} mb-6 ${
                      currentTheme.headerBg === "bg-white"
                        ? ""
                        : "p-6 rounded-lg text-white -m-4 sm:-m-6 mb-6"
                    }`}
                  >
                    <h1
                      className={`text-xl sm:text-2xl font-bold break-words ${
                        currentTheme.headerBg === "bg-white"
                          ? currentTheme.primary
                          : currentTheme.headerTextPrimary || "text-white"
                      }`}
                    >
                      {cvData.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div
                      className={`mt-2 text-xs sm:text-sm break-words ${
                        currentTheme.headerAlign === "text-center"
                          ? "flex flex-wrap justify-center gap-1"
                          : ""
                      } ${
                        currentTheme.headerBg === "bg-white"
                          ? currentTheme.secondary
                          : currentTheme.headerTextSecondary || "text-white/90"
                      }`}
                    >
                      {cvData.personalInfo.email && (
                        <span className="inline-block">
                          {cvData.personalInfo.email}
                        </span>
                      )}
                      {cvData.personalInfo.phone && (
                        <span className="inline-block">
                          {" "}
                          • {cvData.personalInfo.phone}
                        </span>
                      )}
                      {cvData.personalInfo.location && (
                        <span className="inline-block">
                          {" "}
                          • {cvData.personalInfo.location}
                        </span>
                      )}
                    </div>
                    {cvData.personalInfo.website && (
                      <div
                        className={`mt-1 text-sm break-all ${
                          currentTheme.headerBg === "bg-white"
                            ? currentTheme.accent
                            : currentTheme.headerTextAccent ||
                              "text-white/90 underline"
                        }`}
                      >
                        {cvData.personalInfo.website}
                      </div>
                    )}
                  </div>

                  {/* Content starts here - adjust margin for gradient headers */}
                  <div
                    className={`${
                      currentTheme.headerBg !== "bg-white" ? "mt-6" : ""
                    }`}
                  >
                    {/* Summary */}
                    {cvData.personalInfo.summary && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-2`}
                        >
                          Professional Summary
                        </h3>
                        <p
                          className={`${currentTheme.secondary} text-sm leading-relaxed break-words`}
                        >
                          {cvData.personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* About */}
                    {cvData.personalInfo.about && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-2`}
                        >
                          About Me
                        </h3>
                        <p
                          className={`${currentTheme.secondary} text-sm leading-relaxed break-words`}
                        >
                          {cvData.personalInfo.about}
                        </p>
                      </div>
                    )}

                    {/* Technologies & Skills */}
                    {cvData.skills.length > 0 && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-2`}
                        >
                          Technologies & Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`${currentTheme.skillStyle} px-3 py-1 rounded-full text-sm font-medium`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience */}
                    {cvData.experience.some(
                      (exp) => exp.title || exp.company
                    ) && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-3`}
                        >
                          Work Experience
                        </h3>
                        {cvData.experience.map(
                          (exp) =>
                            (exp.title || exp.company) && (
                              <div key={exp.id} className="mb-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                  <div className="flex-1">
                                    <h4
                                      className={`font-semibold ${currentTheme.primary} break-words`}
                                    >
                                      {exp.title}
                                    </h4>
                                    <p
                                      className={`${currentTheme.secondary} break-words`}
                                    >
                                      {exp.company}
                                    </p>
                                    {exp.location && (
                                      <p
                                        className={`${currentTheme.secondary} text-sm break-words`}
                                      >
                                        {exp.location}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-left sm:text-right text-sm">
                                    {exp.startDate && (
                                      <p
                                        className={`${currentTheme.secondary} whitespace-nowrap`}
                                      >
                                        {exp.startDate} -{" "}
                                        {exp.current ? "Present" : exp.endDate}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {exp.description && (
                                  <p
                                    className={`${currentTheme.secondary} text-sm mt-2 leading-relaxed break-words`}
                                  >
                                    {exp.description}
                                  </p>
                                )}
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* Education */}
                    {cvData.education.some(
                      (edu) => edu.degree || edu.institution
                    ) && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-3`}
                        >
                          Education
                        </h3>
                        {cvData.education.map(
                          (edu) =>
                            (edu.degree || edu.institution) && (
                              <div key={edu.id} className="mb-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                  <div className="flex-1">
                                    <h4
                                      className={`font-semibold ${currentTheme.primary} break-words`}
                                    >
                                      {edu.degree}
                                    </h4>
                                    <p
                                      className={`${currentTheme.secondary} break-words`}
                                    >
                                      {edu.institution}
                                    </p>
                                    {edu.location && (
                                      <p
                                        className={`${currentTheme.secondary} text-sm break-words`}
                                      >
                                        {edu.location}
                                      </p>
                                    )}
                                    {edu.gpa && (
                                      <p
                                        className={`${currentTheme.secondary} text-sm`}
                                      >
                                        GPA: {edu.gpa}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-left sm:text-right text-sm">
                                    {edu.startDate && (
                                      <p
                                        className={`${currentTheme.secondary} whitespace-nowrap`}
                                      >
                                        {edu.startDate} -{" "}
                                        {edu.endDate || "Present"}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* Projects */}
                    {cvData.projects.some(
                      (project) => project.name || project.description
                    ) && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-3`}
                        >
                          Projects
                        </h3>
                        {cvData.projects.map(
                          (project) =>
                            (project.name || project.description) && (
                              <div key={project.id} className="mb-4">
                                <div className="flex flex-col gap-2">
                                  <div>
                                    <h4
                                      className={`font-semibold ${currentTheme.primary} break-words`}
                                    >
                                      {project.name}
                                    </h4>
                                    {project.technologies && (
                                      <p
                                        className={`${currentTheme.secondary} text-sm break-words`}
                                      >
                                        Technologies: {project.technologies}
                                      </p>
                                    )}
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${currentTheme.accent} text-sm hover:underline break-all`}
                                      >
                                        View Project
                                      </a>
                                    )}
                                  </div>
                                </div>
                                {project.description && (
                                  <p
                                    className={`${currentTheme.secondary} text-sm mt-2 leading-relaxed break-words`}
                                  >
                                    {project.description}
                                  </p>
                                )}
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* Certifications */}
                    {cvData.certifications.length > 0 && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-2`}
                        >
                          Certifications
                        </h3>
                        <ul
                          className={`${currentTheme.secondary} text-sm space-y-1`}
                        >
                          {cvData.certifications.map((cert, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 flex-shrink-0">•</span>
                              <span className="break-words break-all leading-relaxed">
                                {cert}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Languages */}
                    {cvData.languages.some(
                      (lang) => lang.language || lang.proficiency
                    ) && (
                      <div className={currentTheme.sectionStyle}>
                        <h3
                          className={`text-lg font-semibold ${currentTheme.primary} mb-2`}
                        >
                          Languages
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cvData.languages.map(
                            (lang) =>
                              (lang.language || lang.proficiency) && (
                                <div
                                  key={lang.id}
                                  className="flex justify-between items-center gap-2"
                                >
                                  <span
                                    className={`${currentTheme.secondary} text-sm break-words flex-1`}
                                  >
                                    {lang.language}
                                  </span>
                                  <span
                                    className={`${currentTheme.secondary} text-sm whitespace-nowrap`}
                                  >
                                    {lang.proficiency}
                                  </span>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
