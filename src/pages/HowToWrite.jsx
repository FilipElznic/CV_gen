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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-gray-100">
        <header className="text-white text-center py-12 px-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-100">
            Crafting Your Interview-Winning CV
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Transform your resume from a simple document into a powerful
            marketing tool that gets you noticed.
          </p>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <section id="first-impression" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
              The 6-Second Challenge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 text-center">
                <div className="text-8xl md:text-9xl font-black text-blue-400">
                  6
                </div>
                <div className="text-4xl font-bold text-gray-300">Seconds</div>
              </div>
              <div className="md:col-span-2 bg-zinc-800/50 rounded-lg shadow-lg p-6 border border-zinc-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  You Have Seconds to Make an Impact
                </h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  In today&apos;s fast-paced job market, recruiters spend an
                  average of just six seconds on an initial resume review. This
                  tiny window of opportunity means your CV must be clear,
                  concise, and immediately compelling. Every element must work
                  together to quickly capture attention and persuade the reader
                  that you&apos;re the right candidate for an interview.
                </p>
              </div>
            </div>
          </section>

          <section id="ats" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
              Beating the Bots: The ATS Gatekeeper
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 border border-zinc-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  Are You ATS-Friendly?
                </h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-300">
                  Before a human ever sees your CV, it likely has to pass
                  through an Applicant Tracking System (ATS). These software
                  programs scan and rank applications based on keywords and
                  formatting. A CV that isn&apos;t optimized for ATS may be
                  automatically rejected, making you invisible to recruiters.
                </p>
                <p className="text-lg leading-relaxed font-bold text-blue-400">
                  Simple, clean formatting is not just a suggestion—it&apos;s a
                  necessity for machine readability.
                </p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 border border-zinc-700">
                <div className="chart-container mx-auto h-80 md:h-96">
                  <canvas id="atsChart"></canvas>
                </div>
                <p className="text-center mt-4 text-sm text-gray-400">
                  This chart shows the high prevalence of ATS in modern
                  recruitment.
                </p>
              </div>
            </div>
          </section>

          <section id="content" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
              Content is King: What to Include
            </h2>
            <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-300">
              A powerful CV is built on a foundation of well-structured,
              impactful content. Each section has a specific job to do, from
              introducing your professional brand to proving your value with
              quantified results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 border border-zinc-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  Anatomy of an Effective CV
                </h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-300">
                  While the exact order can be tailored, these core sections are
                  non-negotiable. Experienced professionals should lead with
                  their work history, while recent graduates might place
                  education more prominently.
                </p>
                <div className="chart-container mx-auto h-96">
                  <canvas id="cvSectionsChart"></canvas>
                </div>
                <p className="text-center mt-4 text-sm text-gray-400">
                  Relative importance and focus for a standard professional CV.
                </p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 border border-zinc-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  Quantify Your Achievements
                </h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-300">
                  Don&apos;t just list your duties; showcase your impact. Using
                  numbers, percentages, and specific metrics transforms vague
                  claims into concrete evidence of your value. This is what
                  truly catches a hiring manager&apos;s eye.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-2xl font-bold text-blue-400 mr-3">
                      →
                    </span>
                    <div>
                      <strong className="text-gray-200">Before:</strong>{" "}
                      <span className="text-gray-400">
                        Responsible for social media.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl font-bold text-green-400 mr-3">
                      →
                    </span>
                    <div>
                      <strong className="text-gray-200">After:</strong>{" "}
                      <span className="text-gray-300">
                        Grew social media engagement by 45% across three
                        platforms in six months.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl font-bold text-blue-400 mr-3">
                      →
                    </span>
                    <div>
                      <strong className="text-gray-200">Before:</strong>{" "}
                      <span className="text-gray-400">
                        Managed the sales team.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl font-bold text-green-400 mr-3">
                      →
                    </span>
                    <div>
                      <strong className="text-gray-200">After:</strong>{" "}
                      <span className="text-gray-300">
                        Led a team of 8 to exceed sales targets by 20% for three
                        consecutive quarters.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="tailoring" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
              The &quot;One-Size-Fits-All&quot; CV is Dead
            </h2>
            <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-300">
              Sending a generic CV is one of the biggest mistakes you can make.
              Customizing your resume for each specific job application is
              essential for getting past ATS filters and showing a human
              reviewer that you are a perfect fit.
            </p>
            <div className="bg-zinc-800/50 rounded-lg shadow-lg p-8 border border-zinc-700">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-100">
                Your CV Tailoring Workflow
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="bg-blue-600 text-white p-4 rounded-lg w-full md:w-1/4 text-center">
                  Analyze the Job Description for Keywords
                </div>
                <div className="text-2xl font-bold text-gray-300">↓</div>
                <div className="bg-zinc-600 text-white p-4 rounded-lg w-full md:w-1/4 text-center">
                  Update Your Professional Summary
                </div>
                <div className="text-2xl font-bold text-gray-300">↓</div>
                <div className="bg-green-600 text-white p-4 rounded-lg w-full md:w-1/4 text-center">
                  Weave Keywords into Experience & Skills
                </div>
                <div className="text-2xl font-bold text-gray-300">↓</div>
                <div className="bg-purple-600 text-white p-4 rounded-lg w-full md:w-1/4 text-center">
                  Review & Submit the Tailored CV
                </div>
              </div>
            </div>
          </section>

          <section id="mistakes" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
              Top 5 CV Mistakes to Avoid
            </h2>
            <div className="bg-zinc-800/50 rounded-lg shadow-lg p-6 border border-zinc-700">
              <p className="text-center max-w-3xl mx-auto mb-8 text-lg text-gray-300">
                Even a great candidate can be rejected due to simple, avoidable
                errors. These common mistakes can signal carelessness or a lack
                of professionalism to recruiters.
              </p>
              <div className="chart-container mx-auto h-96 md:h-[500px]">
                <canvas id="mistakesChart"></canvas>
              </div>
              <p className="text-center mt-4 text-sm text-gray-400">
                Ranking of common errors that can lead to immediate rejection.
              </p>
            </div>
          </section>
        </main>

        <footer className="bg-zinc-900/50 text-gray-300 text-center py-6 px-4 border-t border-zinc-700">
          <p>
            Infographic created based on the &quot;Crafting an Impactful
            CV&quot; guide.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            This infographic was generated using Chart.js and Tailwind CSS. No
            SVG or Mermaid JS was used in its creation.
          </p>
        </footer>
      </div>
    </>
  );
}

export default HowToWrite;
