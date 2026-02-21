import { A } from "@solidjs/router";
import { Github, AudioWaveform } from "lucide-solid";

export const Navbar = () => {
  return (
    <header class="sticky top-0 z-20 border-b border-border/70 bg-surface/70 backdrop-blur-xl">
      <div class="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
        <A href="/" class="inline-flex items-center gap-2.5">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/18 text-primary shadow-[0_8px_24px_-16px_rgba(99,102,241,0.95)]">
            <AudioWaveform size={16} />
          </span>
          <span class="text-sm font-semibold tracking-[0.08em] text-white/95 uppercase">
            Noise Brew
          </span>
        </A>

        <a
          href="https://github.com/pbg/noise-brew"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:border-primary/45 hover:bg-primary/12 hover:text-white"
          aria-label="Open Noise Brew on GitHub"
        >
          <Github size={15} />
          GitHub
        </a>
      </div>
    </header>
  );
};
