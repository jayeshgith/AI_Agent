import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import FormField from "../components/FormField.jsx";
import RecommendationCard from "../components/RecommendationCard.jsx";
import { recommendCourses } from "../services/api.js";

const initialFormState = {
  name: "",
  background: "",
  skills: "",
  goal: "",
};

// Recommendation renders the learner form and displays AI-generated course cards.
export default function Recommendation() {
  const [formData, setFormData] = useState(initialFormState);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Convert the comma-separated skills input into the array shape expected by the API.
      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await recommendCourses(payload);
      setCourses(response.courses || []);
    } catch (err) {
      setError(err.message || "Unable to fetch recommendations right now.");
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Recommendation", to: "/recommendation" },
        ]}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Recommendation
          </p>
          <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
            AI Course Recommendation
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Fill in your details to generate a personalized learning roadmap.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-5 shadow-sm sm:p-7"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Asha"
              required
            />
            <FormField
              label="Background"
              name="background"
              value={formData.background}
              onChange={handleChange}
              placeholder="e.g. Beginner in web development"
              textarea
              required
            />
            <FormField
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. HTML, CSS, JavaScript"
              required
            />
            <FormField
              label="Career Goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g. Become a frontend developer"
              textarea
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.75 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? "Generating..." : "Generate Recommendation"}
          </button>
        </form>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <svg
                className="h-6 w-6 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
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
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              AI is analyzing your profile...
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Please wait a few seconds.
            </p>
          </div>
        ) : null}

        {!isLoading && courses.length > 0 ? (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-950">
                Recommended learning path
              </h2>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                {courses.length} courses
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {courses.map((course, index) => (
                <RecommendationCard
                  key={`${course.name}-${index}`}
                  course={course}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
