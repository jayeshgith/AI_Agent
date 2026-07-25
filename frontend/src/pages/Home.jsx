import { useEffect, useState } from "react";
import { getHealth } from "../services/api.js";

// Home checks the backend health endpoint when the page first loads.
export default function Home() {
  const [backendStatus, setBackendStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function checkBackendHealth() {
      try {
        await getHealth();

        if (isMounted) {
          setBackendStatus("connected");
        }
      } catch {
        if (isMounted) {
          setBackendStatus("disconnected");
        }
      }
    }

    checkBackendHealth();

    // Prevent state updates if the page unmounts before the request finishes.
    return () => {
      isMounted = false;
    };
  }, []);

  const statusMessage = {
    loading: "Backend Status: Loading...",
    connected: "Backend Status: Connected ✅",
    disconnected: "Backend Status: Disconnected ❌",
  }[backendStatus];

  return (
    <section className="space-y-6">
      <p className="text-sm font-medium uppercase text-slate-500">Home</p>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
          AI-Agent workspace
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          This is a minimal React frontend scaffold. Recommendation and history
          features are intentionally left as placeholders.
        </p>
      </div>
      <div className="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium text-slate-800">
        {statusMessage}
      </div>
    </section>
  );
}
