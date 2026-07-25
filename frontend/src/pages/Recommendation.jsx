import { useState } from "react";
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
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Recommendation
        </p>
        <h1 className="text-3xl font-semibold text-slate-950">
          Discover your next learning path
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Share a little about yourself and the AI will suggest a structured set
          of courses.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
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
            label="Goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            placeholder="e.g. Become a frontend developer"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-700 shadow-sm">
          Loading...
        </div>
      ) : null}

      {!isLoading && courses.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map((course, index) => (
            <RecommendationCard
              key={`${course.name}-${index}`}
              course={course}
              index={index}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
