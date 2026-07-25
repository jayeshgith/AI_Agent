import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";

// App is the shared shell rendered around every page route.
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
