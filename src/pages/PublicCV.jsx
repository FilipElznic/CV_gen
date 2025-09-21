import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicCV } from "../services/cvService";
import Navbar from "../Components/Navbar";
import QRCodeModal from "../Components/QRCodeModal";

function PublicCV() {
  const { slug } = useParams();

  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const cvData = await getPublicCV(slug);
        if (cvData) {
          setCv(cvData);
        } else {
          setError("CV not found");
        }
      } catch (err) {
        console.error("Error fetching CV:", err);
        setError("Error loading CV");
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
            <Link to="/" className="text-blue-600 hover:underline">
              Go back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  const { data } = cv;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 py-8">
        {/* Header */}

        {/* CV Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-0">
            {/* Header */}
            <div className="text-center mb-8 border-b border-gray-200 pb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {data.personalInfo?.fullName || "Name Not Provided"}
              </h1>
              <div className="text-gray-600 text-lg space-y-1">
                {data.personalInfo?.email && (
                  <div>{data.personalInfo.email}</div>
                )}
                <div className="flex justify-center items-center space-x-4 text-base">
                  {data.personalInfo?.phone && (
                    <span>{data.personalInfo.phone}</span>
                  )}
                  {data.personalInfo?.location && (
                    <span>{data.personalInfo.location}</span>
                  )}
                </div>
                {data.personalInfo?.website && (
                  <div>
                    <a
                      href={data.personalInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {data.personalInfo.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {data.personalInfo?.summary && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {data.personalInfo.summary}
                </p>
              </section>
            )}

            {/* Work Experience */}
            {data.experience &&
              Array.isArray(data.experience) &&
              data.experience.some((exp) => exp.title || exp.company) && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Work Experience
                  </h2>
                  <div className="space-y-6">
                    {data.experience.map(
                      (exp) =>
                        (exp.title || exp.company) && (
                          <div
                            key={exp.id}
                            className="border-l-4 border-blue-200 pl-6"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {exp.title}
                                </h3>
                                <p className="text-lg text-gray-700 font-medium">
                                  {exp.company}
                                </p>
                                {exp.location && (
                                  <p className="text-gray-600">
                                    {exp.location}
                                  </p>
                                )}
                              </div>
                              <div className="text-right text-gray-600">
                                {exp.startDate && (
                                  <p className="font-medium">
                                    {new Date(exp.startDate).toLocaleDateString(
                                      "en-US",
                                      { year: "numeric", month: "long" }
                                    )}{" "}
                                    -{" "}
                                    {exp.current
                                      ? "Present"
                                      : exp.endDate
                                      ? new Date(
                                          exp.endDate
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                        })
                                      : "Present"}
                                  </p>
                                )}
                              </div>
                            </div>
                            {exp.description && (
                              <div className="mt-3">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                  {exp.description}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </section>
              )}

            {/* Education */}
            {data.education &&
              Array.isArray(data.education) &&
              data.education.some((edu) => edu.degree || edu.institution) && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {data.education.map(
                      (edu) =>
                        (edu.degree || edu.institution) && (
                          <div
                            key={edu.id}
                            className="border-l-4 border-blue-200 pl-6"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {edu.degree}
                                </h3>
                                <p className="text-gray-700 font-medium">
                                  {edu.institution}
                                </p>
                                {edu.location && (
                                  <p className="text-gray-600">
                                    {edu.location}
                                  </p>
                                )}
                                {edu.gpa && (
                                  <p className="text-gray-600">
                                    GPA: {edu.gpa}
                                  </p>
                                )}
                              </div>
                              <div className="text-right text-gray-600">
                                {edu.startDate && (
                                  <p>
                                    {new Date(edu.startDate).toLocaleDateString(
                                      "en-US",
                                      { year: "numeric", month: "long" }
                                    )}{" "}
                                    -{" "}
                                    {edu.endDate
                                      ? new Date(
                                          edu.endDate
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                        })
                                      : "Present"}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </section>
              )}

            {/* Skills */}
            {data.skills &&
              Array.isArray(data.skills) &&
              data.skills.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

            {/* Projects */}
            {data.projects &&
              Array.isArray(data.projects) &&
              data.projects.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {data.projects.map((project, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-200 pl-6"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.name}
                        </h3>
                        {project.description && (
                          <p className="text-gray-700 mt-2 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                        {project.technologies &&
                          Array.isArray(project.technologies) &&
                          project.technologies.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {project.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Languages */}
            {data.languages &&
              Array.isArray(data.languages) &&
              data.languages.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Languages
                  </h2>
                  <div className="space-y-3">
                    {data.languages.map((language, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-l-4 border-blue-200 pl-6 py-2"
                      >
                        <span className="text-lg font-medium text-gray-900">
                          {typeof language === "string"
                            ? language
                            : language.language || language.name || "Language"}
                        </span>
                        {typeof language === "object" &&
                          language.proficiency && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {language.proficiency}
                            </span>
                          )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Certificates */}
            {data.certificates &&
              Array.isArray(data.certificates) &&
              data.certificates.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Certificates
                  </h2>
                  <div className="space-y-4">
                    {data.certificates.map((certificate, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-200 pl-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {certificate.name}
                            </h3>
                            <p className="text-gray-700 font-medium">
                              {certificate.issuer}
                            </p>
                            {certificate.description && (
                              <p className="text-gray-600 mt-2 leading-relaxed">
                                {certificate.description}
                              </p>
                            )}
                            {certificate.url && (
                              <a
                                href={certificate.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                              >
                                View Certificate →
                              </a>
                            )}
                          </div>
                          <div className="text-right text-gray-600">
                            {certificate.date && (
                              <p className="font-medium">
                                {new Date(certificate.date).toLocaleDateString(
                                  "en-US",
                                  { year: "numeric", month: "long" }
                                )}
                              </p>
                            )}
                            {certificate.expiryDate && (
                              <p className="text-sm text-gray-500">
                                Expires:{" "}
                                {new Date(
                                  certificate.expiryDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* QR Code Section */}
            <section className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Share this CV
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Generate a QR code to easily share this CV with others
                  </p>
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    Generate QR Code
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          cvData={data}
          cvSlug={slug}
        />
      </div>
    </>
  );
}

export default PublicCV;
