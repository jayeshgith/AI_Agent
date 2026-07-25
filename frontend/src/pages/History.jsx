import { useEffect, useState } from "react";
import { getHistory, deleteHistory } from "../services/api.js";

// Modal component to display recommendation details
function RecommendationModal({ recommendation, onClose }) {
  if (!recommendation) return null;

  const { name, goal, background, skills, courses } = recommendation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 scale-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-950">Learning Path Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* User Profile Summary */}
          <div className="grid gap-4 sm:grid-cols-2 bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Name</p>
              <p className="mt-1 font-medium text-slate-800">{name || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Goal</p>
              <p className="mt-1 font-medium text-slate-800">{goal || "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Background</p>
              <p className="mt-1 font-medium text-slate-800">{background || "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Skills</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="inline-flex items-center rounded-md bg-slate-200/60 px-2 py-0.5 text-xs font-semibold text-slate-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">No skills listed</span>
                )}
              </div>
            </div>
          </div>

          {/* Course Recommendations */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-l-4 border-slate-900 pl-2">
              Recommended Courses
            </h3>
            
            {courses && courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course, idx) => (
                  <div 
                    key={`${course.name}-${idx}`} 
                    className="relative border border-slate-200 rounded-xl p-4 bg-white shadow-sm hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-950 text-sm">
                        {idx + 1}. {course.name}
                      </h4>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                          {course.difficulty}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">Why this course: </span>
                      {course.reason}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm">No courses recommended.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

// History Page listing saved recommendations
export default function History() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isDeletingId, setIsDeletingId] = useState(null);

  // Fetch history list
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

  // Handle delete operation
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this recommendation record?")) {
      return;
    }

    setIsDeletingId(id);
    try {
      await deleteHistory(id);
      // Remove deleted item from local state list
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message || "Could not delete this recommendation.");
    } finally {
      setIsDeletingId(null);
    }
  }

  // Format creation timestamp
  function formatDate(isoString) {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  }

  return (
    <section className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          History
        </p>
        <h1 className="text-3xl font-semibold text-slate-950">
          Saved Recommendations
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Browse and manage your previously generated learning path recommendations.
        </p>
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-8 w-8 text-slate-800" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm font-medium text-slate-600">Loading history...</span>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-slate-700 shadow-sm flex flex-col gap-4">
          <p className="font-semibold text-red-800">Error Loading History</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchHistory}
            className="self-start rounded-lg bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mx-auto max-w-sm space-y-3">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-900">No History Records Found</h3>
            <p className="text-sm text-slate-500">
              You haven't generated any course recommendations yet. Head over to the Recommendation tab to create one.
            </p>
          </div>
        </div>
      ) : (
        /* History Table Container */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-800">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Goal</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition duration-150">
                    <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.goal}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedRecommendation(item)}
                          className="inline-flex items-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 text-xs font-bold transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeletingId === item.id}
                          className="inline-flex items-center rounded-lg bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 px-3 py-1.5 text-xs font-bold transition"
                        >
                          {isDeletingId === item.id ? "Deleting..." : "🗑 Delete"}
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

      {/* Recommendation Details Modal */}
      {selectedRecommendation && (
        <RecommendationModal
          recommendation={selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
        />
      )}
    </section>
  );
}
