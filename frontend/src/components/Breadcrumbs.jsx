import { NavLink } from "react-router";

export default function Breadcrumbs({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            {isLast ? (
              <span className="font-medium text-slate-700">{item.label}</span>
            ) : (
              <NavLink to={item.to} className="transition hover:text-slate-900">
                {item.label}
              </NavLink>
            )}
          </div>
        );
      })}
    </nav>
  );
}
