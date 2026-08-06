export default function RecommendationCard({ course, index }) {
  const { name, reason, difficulty, duration } = course;

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
              <circle cx="12" cy="12" r="8" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-950">{name}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <div>
          <p className="font-semibold text-slate-900">Reason</p>
          <p className="mt-1 leading-6">{reason}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Difficulty
            </p>
            <p className="mt-1 font-medium text-slate-800">{difficulty}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Duration
            </p>
            <p className="mt-1 font-medium text-slate-800">{duration}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
