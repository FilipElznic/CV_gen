import { useEffect } from "react";
import Navbar from "../Components/Navbar";

function HowToWrite() {
  useEffect(() => {
    // Load Chart.js from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => {
      // Initialize charts after Chart.js loads
      initializeCharts();
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  const initializeCharts = () => {
    const brilliantBlues = {
      primary: "#0077B6",
      secondary: "#003B46",
      accent1: "#07575B",
      accent2: "#66A5AD",
      light: "#C3DFE0",
    };

    function wrapLabels(label, maxWidth) {
      const words = label.split(" ");
      let lines = [];
      let currentLine = "";
      words.forEach((word) => {
        if ((currentLine + word).length > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = "";
        }
        currentLine += word + " ";
      });
      lines.push(currentLine.trim());
      return lines;
    }

    const tooltipTitleCallback = (tooltipItems) => {
      const item = tooltipItems[0];
      let label = item.chart.data.labels[item.dataIndex];
      if (Array.isArray(label)) {
        return label.join(" ");
      }
      return label;
    };

    const defaultChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: brilliantBlues.secondary,
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            title: tooltipTitleCallback,
          },
        },
      },
      scales: {
        y: {
          ticks: { color: brilliantBlues.accent1 },
          grid: { color: "#e0e0e0" },
        },
        x: {
          ticks: { color: brilliantBlues.accent1 },
          grid: { display: false },
        },
      },
    };

    // ATS Chart
    const atsCtx = document.getElementById("atsChart");
    if (atsCtx && window.Chart) {
      new window.Chart(atsCtx, {
        type: "doughnut",
        data: {
          labels: ["Recruiters Using ATS", "Recruiters Not Using ATS"],
          datasets: [
            {
              label: "ATS Usage",
              data: [76.4, 23.6],
              backgroundColor: [brilliantBlues.primary, brilliantBlues.light],
              borderColor: "#ffffff",
              borderWidth: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: brilliantBlues.secondary,
                font: { size: 14 },
              },
            },
            tooltip: {
              callbacks: {
                title: tooltipTitleCallback,
              },
            },
            title: {
              display: true,
              text: "76.4% of Recruiters Use ATS",
              font: { size: 18, weight: "bold" },
              color: brilliantBlues.secondary,
              padding: {
                bottom: 20,
              },
            },
          },
        },
      });
    }

    // CV Sections Chart
    const cvSectionsCtx = document.getElementById("cvSectionsChart");
    if (cvSectionsCtx && window.Chart) {
      const cvSectionsLabels = [
        "Work Experience",
        "Skills Section",
        "Professional Summary",
        "Education",
        "Optional Sections",
      ];
      new window.Chart(cvSectionsCtx, {
        type: "bar",
        data: {
          labels: cvSectionsLabels.map((label) => wrapLabels(label, 16)),
          datasets: [
            {
              label: "Relative Importance",
              data: [100, 85, 70, 60, 40],
              backgroundColor: [
                brilliantBlues.primary,
                brilliantBlues.accent1,
                brilliantBlues.accent2,
                brilliantBlues.light,
                "#d1e8e2",
              ],
              borderColor: brilliantBlues.secondary,
              borderWidth: 1,
            },
          ],
        },
        options: {
          ...defaultChartOptions,
          indexAxis: "y",
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: tooltipTitleCallback,
              },
            },
            title: {
              display: false,
            },
          },
        },
      });
    }

    // Mistakes Chart
    const mistakesCtx = document.getElementById("mistakesChart");
    if (mistakesCtx && window.Chart) {
      const mistakesLabels = [
        "Typos or Grammar Errors",
        "Not Tailoring the CV",
        "Overly Complex Formatting",
        "Vague Claims (No Data)",
        "Including Irrelevant Info",
      ];
      new window.Chart(mistakesCtx, {
        type: "bar",
        data: {
          labels: mistakesLabels.map((label) => wrapLabels(label, 16)),
          datasets: [
            {
              label: "Impact on Rejection",
              data: [95, 88, 80, 75, 65],
              backgroundColor: [
                "#e63946",
                "#f4a261",
                "#e76f51",
                "#2a9d8f",
                "#264653",
              ].reverse(),
            },
          ],
        },
        options: {
          ...defaultChartOptions,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: tooltipTitleCallback,
              },
            },
            title: {
              display: false,
            },
          },
          scales: {
            y: {
              ticks: { color: brilliantBlues.accent1 },
              grid: { color: "#e0e0e0" },
            },
            x: {
              ticks: {
                color: brilliantBlues.accent1,
                callback: function (value) {
                  return value + "%";
                },
              },
              grid: { display: false },
              min: 50,
              max: 100,
            },
          },
        },
      });
    }
  };

  return (
    <>
      <style>{`
        .content-section {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .content-section:nth-child(2) { animation-delay: 0.1s; }
        .content-section:nth-child(3) { animation-delay: 0.2s; }
        .content-section:nth-child(4) { animation-delay: 0.3s; }
        .content-section:nth-child(5) { animation-delay: 0.4s; }
        .content-section:nth-child(6) { animation-delay: 0.5s; }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .tech-card {
          transition: all 0.3s ease;
          background: linear-gradient(145deg, rgba(39, 39, 42, 0.5), rgba(24, 24, 27, 0.3));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(63, 63, 70, 0.3);
        }
        
        .tech-card:hover {
          transform: translateY(-2px);
          border-color: rgba(156, 163, 175, 0.5);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extralight mb-6 text-gray-100 tracking-tight">
              CV Writing Guide
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your resume from a simple document into a powerful
              marketing tool that gets you noticed by recruiters and hiring
              managers.
            </p>
          </div>
          {/* Main Content */}
          <div className="space-y-16">
            {/* The 6-Second Challenge */}
            <section id="first-impression" className="content-section">
              <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                The 6-Second Challenge
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-8xl md:text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    6
                  </div>
                  <div className="text-2xl font-light text-gray-300 tracking-wide">
                    Seconds
                  </div>
                </div>
                <div className="lg:col-span-2 tech-card rounded-2xl p-8">
                  <h3 className="text-2xl font-medium mb-6 text-gray-100">
                    You Have Seconds to Make an Impact
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    In today&apos;s fast-paced job market, recruiters spend an
                    average of just six seconds on an initial resume review.
                    This tiny window of opportunity means your CV must be clear,
                    concise, and immediately compelling.
                  </p>
                  <p className="text-gray-400">
                    Every element must work together to quickly capture
                    attention and persuade the reader that you&apos;re the right
                    candidate for an interview.
                  </p>
                </div>
              </div>
            </section>

            {/* ATS Section */}
            <section id="ats" className="content-section">
              <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                Beating the Bots: The ATS Gatekeeper
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="tech-card rounded-2xl p-8">
                  <h3 className="text-2xl font-medium mb-6 text-gray-100">
                    Are You ATS-Friendly?
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Before a human ever sees your CV, it likely has to pass
                    through an Applicant Tracking System (ATS). These software
                    programs scan and rank applications based on keywords and
                    formatting.
                  </p>
                  <p className="text-gray-400 mb-6">
                    A CV that isn&apos;t optimized for ATS may be automatically
                    rejected, making you invisible to recruiters.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                    <p className="text-blue-300 font-medium">
                      💡 Simple, clean formatting is not just a
                      suggestion—it&apos;s a necessity for machine readability.
                    </p>
                  </div>
                </div>
                <div className="tech-card rounded-2xl p-8">
                  <div className="chart-container mx-auto h-80">
                    <canvas id="atsChart"></canvas>
                  </div>
                  <p className="text-center mt-4 text-sm text-gray-400">
                    76.4% of recruiters use ATS systems to filter applications
                  </p>
                </div>
              </div>
            </section>

            {/* Content Structure Section */}
            <section id="content" className="content-section">
              <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                Content is King: What to Include
              </h2>
              <p className="text-center max-w-3xl mx-auto mb-12 text-gray-300">
                A powerful CV is built on a foundation of well-structured,
                impactful content. Each section has a specific job to do, from
                introducing your professional brand to proving your value with
                quantified results.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="tech-card rounded-2xl p-8">
                  <h3 className="text-2xl font-medium mb-6 text-gray-100">
                    Anatomy of an Effective CV
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    While the exact order can be tailored, these core sections
                    are non-negotiable. Experienced professionals should lead
                    with their work history, while recent graduates might place
                    education more prominently.
                  </p>
                  <div className="chart-container mx-auto h-80">
                    <canvas id="cvSectionsChart"></canvas>
                  </div>
                  <p className="text-center mt-4 text-sm text-gray-400">
                    Relative importance and focus for a standard professional CV
                  </p>
                </div>
                <div className="tech-card rounded-2xl p-8">
                  <h3 className="text-2xl font-medium mb-6 text-gray-100">
                    Quantify Your Achievements
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Don&apos;t just list your duties; showcase your impact.
                    Using numbers, percentages, and specific metrics transforms
                    vague claims into concrete evidence of your value.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-zinc-700/30 rounded-lg p-4 border-l-4 border-red-400">
                      <div className="text-red-400 font-medium mb-1">
                        ❌ Before:
                      </div>
                      <div className="text-gray-400">
                        Responsible for social media.
                      </div>
                    </div>
                    <div className="bg-zinc-700/30 rounded-lg p-4 border-l-4 border-green-400">
                      <div className="text-green-400 font-medium mb-1">
                        ✅ After:
                      </div>
                      <div className="text-gray-300">
                        Grew social media engagement by 45% across three
                        platforms in six months.
                      </div>
                    </div>
                    <div className="bg-zinc-700/30 rounded-lg p-4 border-l-4 border-red-400">
                      <div className="text-red-400 font-medium mb-1">
                        ❌ Before:
                      </div>
                      <div className="text-gray-400">
                        Managed the sales team.
                      </div>
                    </div>
                    <div className="bg-zinc-700/30 rounded-lg p-4 border-l-4 border-green-400">
                      <div className="text-green-400 font-medium mb-1">
                        ✅ After:
                      </div>
                      <div className="text-gray-300">
                        Led a team of 8 to exceed sales targets by 20% for three
                        consecutive quarters.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tailoring Section */}
            <section id="tailoring" className="content-section">
              <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                The &quot;One-Size-Fits-All&quot; CV is Dead
              </h2>
              <p className="text-center max-w-3xl mx-auto mb-12 text-gray-300">
                Sending a generic CV is one of the biggest mistakes you can
                make. Customizing your resume for each specific job application
                is essential for getting past ATS filters and showing recruiters
                that you are a perfect fit.
              </p>
              <div className="tech-card rounded-2xl p-8">
                <h3 className="text-2xl font-medium mb-8 text-center text-gray-100">
                  Your CV Tailoring Workflow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 rounded-xl p-6 mb-4">
                      <div className="text-3xl mb-3">🔍</div>
                      <h4 className="font-medium text-blue-300 mb-2">
                        Analyze
                      </h4>
                      <p className="text-sm text-gray-400">
                        Study the job description for keywords
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/30 rounded-xl p-6 mb-4">
                      <div className="text-3xl mb-3">✏️</div>
                      <h4 className="font-medium text-green-300 mb-2">
                        Update
                      </h4>
                      <p className="text-sm text-gray-400">
                        Revise your professional summary
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 rounded-xl p-6 mb-4">
                      <div className="text-3xl mb-3">🎯</div>
                      <h4 className="font-medium text-purple-300 mb-2">
                        Integrate
                      </h4>
                      <p className="text-sm text-gray-400">
                        Weave keywords into experience
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-400/30 rounded-xl p-6 mb-4">
                      <div className="text-3xl mb-3">🚀</div>
                      <h4 className="font-medium text-yellow-300 mb-2">
                        Submit
                      </h4>
                      <p className="text-sm text-gray-400">
                        Review and send tailored CV
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mistakes Section */}
            <section id="mistakes" className="content-section">
              <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                Top 5 CV Mistakes to Avoid
              </h2>
              <div className="tech-card rounded-2xl p-8">
                <p className="text-center max-w-3xl mx-auto mb-8 text-gray-300">
                  Even a great candidate can be rejected due to simple,
                  avoidable errors. These common mistakes can signal
                  carelessness or a lack of professionalism to recruiters.
                </p>
                <div className="chart-container mx-auto h-96 md:h-[500px]">
                  <canvas id="mistakesChart"></canvas>
                </div>
                <p className="text-center mt-6 text-sm text-gray-400">
                  Common errors ranked by their impact on application rejection
                  rates
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
        </div>
      </div>
    </>
  );
}

export default HowToWrite;
