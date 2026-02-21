import { SoundItems } from "~/components/sound-items";

export default function Home() {
  return (
    <main class="min-h-screen bg-linear-to-b from-surface via-surface to-[#0b1225] px-5 py-10 text-white">
      <section class="mx-auto w-full max-w-3xl">
        <header class="mb-7">
          <h1 class="text-3xl font-semibold tracking-tight">Noise Brew</h1>
          <p class="mt-1 text-sm text-muted">
            Pick a soundscape and tune the volume.
          </p>
        </header>

        <SoundItems />
      </section>
    </main>
  );
}
