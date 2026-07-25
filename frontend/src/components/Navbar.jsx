import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/recommendation", label: "Recommendation" },
  { to: "/history", label: "History" },
];

function getLinkClass({ isActive }) {
  const baseClass =
    "rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-100";
  const activeClass = "bg-slate-900 text-white hover:bg-slate-900";
  const inactiveClass = "text-slate-700";

  return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
}

// Navbar provides the top-level app navigation for all routes.
export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold text-slate-950">
          AI-Agent
        </NavLink>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={getLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
