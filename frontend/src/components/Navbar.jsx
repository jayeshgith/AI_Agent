import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/recommendation", label: "Recommendation" },
  { to: "/history", label: "History" },
];

function getLinkClass({ isActive }) {
  const baseClass =
    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200";
  const activeClass = "bg-blue-600 text-white shadow-sm";
  const inactiveClass = "text-slate-600 hover:bg-blue-50 hover:text-blue-700";

  return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
            AI
          </span>
          <span>AI Course Recommendation</span>
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
