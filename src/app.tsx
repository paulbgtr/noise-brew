import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { PlayerProvider } from "./audio/player-provider";
import { Navbar } from "./components/navbar";

export default function App() {
  return (
    <PlayerProvider>
      <Router
        root={(props) => (
          <main class="min-h-screen bg-linear-to-b from-surface via-surface to-[#0b1225] text-white">
            <Navbar />
            <section class="mx-auto w-full max-w-5xl px-5 py-8">
              <Suspense>{props.children}</Suspense>
            </section>
          </main>
        )}
      >
        <FileRoutes />
      </Router>
    </PlayerProvider>
  );
}
