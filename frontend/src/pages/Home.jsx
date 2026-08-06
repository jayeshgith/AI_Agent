import { Link } from "react-router";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

const features = [
  {
    title: "AI-Powered Recommendations",
    description:
      "Receive personalized course recommendations based on your career goals.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14M12 5l7 7-7 7"
        />
      </svg>
    ),
  },
  {
    title: "Structured Learning Roadmap",
    description:
      "Get course difficulty, estimated duration, and reasons for every recommendation.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6h10M9 12h10M9 18h10M5 6h.01M5 12h.01M5 18h.01"
        />
      </svg>
    ),
  },
  {
    title: "Recommendation History",
    description: "View your previously generated learning paths anytime.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3M12 3a9 9 0 100 18 9 9 0 000-18z"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Enter your profile",
    description: "Share your background, skills, and goals.",
  },
  {
    title: "AI analyzes your information",
    description: "The platform matches your profile to the best courses.",
  },
  {
    title: "Receive your roadmap",
    description: "Review a clear, personalized learning path.",
  },
];

export default function Home() {
  return (
    <section className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }]} />

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Personalized learning paths
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                AI Course Recommendation Platform
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Discover the best learning path based on your skills,
                background, and career goals using AI.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/recommendation"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </Link>
              <Link
                to="/history"
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                View History
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Why it works
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Tailored to your profile
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    The experience adapts to your background and goals.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Clear and structured guidance
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Each recommendation includes why it fits and how long it may
                    take.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              {feature.icon}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            How It Works
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            A simple path from profile to roadmap
          </h2>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        Powered by @2026 Mani- using React, FastAPI, MongoDB, Groq
      </footer>
    </section>
  );
}
