import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { getHistory, deleteHistory } from "../services/api.js";

function RecommendationModal({ recommendation, onClose }) {
  if (!recommendation) return null;

  const { name, goal, background, skills, courses } = recommendation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-950">
            Learning Path Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-6">
          <div className="grid gap-4 rounded-[1.25rem] border border-slate-100 bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Name
              </p>
              <p className="mt-1 font-medium text-slate-800">{name || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Goal
              </p>
              <p className="mt-1 font-medium text-slate-800">{goal || "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Background
              </p>
              <p className="mt-1 font-medium text-slate-800">
                {background || "N/A"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Skills
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="inline-flex items-center rounded-full bg-slate-200/70 px-2.5 py-1 text-xs font-semibold text-slate-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">
                    No skills listed
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-l-4 border-blue-600 pl-2 text-base font-semibold text-slate-900">
              Recommended Courses
            </h3>

            {courses && courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course, idx) => (
                  <div
                    key={`${course.name}-${idx}`}
                    className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="text-sm font-semibold text-slate-950">
                        {idx + 1}. {course.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {course.difficulty}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      <span className="font-semibold text-slate-700">
                        Why this course:{" "}
                      </span>
                      {course.reason}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">
                No courses recommended.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isDeletingId, setIsDeletingId] = useState(null);

  async function fetchHistory() {
    setIsLoading(true);
    setError("");
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      setError(err.message || "Failed to load history.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  async function handleDelete(id) {
    if (
      !window.confirm(
        "Are you sure you want to delete this recommendation record?",
      )
    ) {
      return;
    }

    setIsDeletingId(id);
    try {
      await deleteHistory(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message || "Could not delete this recommendation.");
    } finally {
      setIsDeletingId(null);
    }
  }

  function formatDate(isoString) {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  }

  return (
    <section className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "History", to: "/history" },
        ]}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            History
          </p>
          <h1 className="text-3xl font-semibold text-slate-950">
            Recommendation History
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Review past learning paths and keep the ones that matter most.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-8 flex items-center justify-center rounded-[1.5rem] border border-slate-200 bg-slate-50 py-12">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="h-8 w-8 animate-spin text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm font-medium text-slate-600">
                Loading history...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-[1.5rem] border border-red-200 bg-red-50 p-6 text-slate-700">
            <p className="font-semibold text-red-800">Error Loading History</p>
            <p className="mt-2 text-sm">{error}</p>
            <button
              onClick={fetchHistory}
              className="mt-4 rounded-full bg-red-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : history.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <div className="mx-auto max-w-sm space-y-3">
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-lg font-semibold text-slate-900">
                No recommendations found.
              </h3>
              <p className="text-sm text-slate-500">
                Generate your first learning path.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-slate-800">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Goal
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((item) => (
                    <tr key={item.id} className="transition hover:bg-slate-50">
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.goal}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setSelectedRecommendation(item)}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeletingId === item.id}
                            className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            {isDeletingId === item.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedRecommendation && (
        <RecommendationModal
          recommendation={selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
        />
      )}
    </section>
  );
}
