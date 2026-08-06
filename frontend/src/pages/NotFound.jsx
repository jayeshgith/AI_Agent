import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="space-y-4">
      <p className="text-sm font-medium uppercase text-slate-500">404</p>
      <h1 className="text-2xl font-semibold text-slate-950">Page not found</h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Back to home
      </Link>
    </section>
  );
}
