import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicCV } from "../services/cvService";

function PublicCV() {
  const { slug } = useParams();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            CV Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The CV you&apos;re looking for doesn&apos;t exist or is not public.
          </p>
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

  const { data } = cv;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-900">
              CV Builder
            </Link>
            <div className="flex space-x-4">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Print CV
              </button>
              <Link to="/create" className="text-gray-700 hover:text-gray-900">
                Create Your CV
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CV Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-0">
          {/* Header */}
          <div className="text-center mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {data.personalInfo?.fullName || "Name Not Provided"}
            </h1>
            <div className="text-gray-600 text-lg space-y-1">
              {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
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
                                <p className="text-gray-600">{exp.location}</p>
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
                                    ? new Date(exp.endDate).toLocaleDateString(
                                        "en-US",
                                        { year: "numeric", month: "long" }
                                      )
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
                                <p className="text-gray-600">{edu.location}</p>
                              )}
                              {edu.gpa && (
                                <p className="text-gray-600">GPA: {edu.gpa}</p>
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
                                    ? new Date(edu.endDate).toLocaleDateString(
                                        "en-US",
                                        { year: "numeric", month: "long" }
                                      )
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
          {data.skills && data.skills.length > 0 && (
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
          {data.projects && data.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && (
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
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm print:hidden">
          <p>
            Created with{" "}
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              CV Builder
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicCV;
