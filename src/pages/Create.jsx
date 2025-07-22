import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Create() {
  const { currentUser } = useAuth();
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
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
    projects: [],
  });

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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to create a CV
          </h1>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-900">
              CV Builder
            </Link>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Save CV
              </button>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* CV Builder Form */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Your CV</h1>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={cvData.personalInfo.location}
                  onChange={(e) =>
                    updatePersonalInfo("location", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="url"
                  placeholder="Website/LinkedIn"
                  value={cvData.personalInfo.website}
                  onChange={(e) =>
                    updatePersonalInfo("website", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <textarea
                placeholder="Professional Summary"
                value={cvData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                rows={4}
                className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Experience */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  Add Experience
                </button>
              </div>

              {cvData.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border-b border-gray-200 pb-4 mb-4 last:border-b-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) =>
                        updateExperience(exp.id, "title", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, "location", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="month"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="month"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
                        }
                        disabled={exp.current}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, "current", e.target.checked)
                        }
                        className="mr-2"
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
                    className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  {cvData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="mt-2 text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CV Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="border border-gray-200 p-6 rounded-lg min-h-96">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {cvData.personalInfo.fullName || "Your Name"}
                  </h1>
                  <div className="text-gray-600 mt-2">
                    {cvData.personalInfo.email && (
                      <span>{cvData.personalInfo.email}</span>
                    )}
                    {cvData.personalInfo.phone && (
                      <span> • {cvData.personalInfo.phone}</span>
                    )}
                    {cvData.personalInfo.location && (
                      <span> • {cvData.personalInfo.location}</span>
                    )}
                  </div>
                  {cvData.personalInfo.website && (
                    <div className="text-blue-600 mt-1">
                      {cvData.personalInfo.website}
                    </div>
                  )}
                </div>

                {/* Summary */}
                {cvData.personalInfo.summary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Professional Summary
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {cvData.personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {cvData.experience.some((exp) => exp.title || exp.company) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Work Experience
                    </h3>
                    {cvData.experience.map(
                      (exp) =>
                        (exp.title || exp.company) && (
                          <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {exp.title}
                                </h4>
                                <p className="text-gray-700">{exp.company}</p>
                                {exp.location && (
                                  <p className="text-gray-600 text-sm">
                                    {exp.location}
                                  </p>
                                )}
                              </div>
                              <div className="text-right text-sm text-gray-600">
                                {exp.startDate && (
                                  <p>
                                    {exp.startDate} -{" "}
                                    {exp.current ? "Present" : exp.endDate}
                                  </p>
                                )}
                              </div>
                            </div>
                            {exp.description && (
                              <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
