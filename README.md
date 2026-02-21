# Noise Brew

Noise Brew is a minimal ambient sound mixer built with SolidStart.
It lets you layer multiple soundscapes (rain, ocean, cafe, etc.), control per-track volume, and adjust a global master volume.

## Features

- Multi-track ambient mixer
- Per-track play/pause and volume
- Master controls: play all, stop all, mute, master volume
- Smooth fade-in/fade-out playback transitions
- Floating "Now Playing" indicator when multiple tracks are active

## Tech Stack

- SolidStart + SolidJS
- Howler.js for audio playback
- UnoCSS for styling
- Kobalte primitives (buttons/sliders)

## Run Locally

```bash
bun install
bun run dev
```

App runs on your local dev server (typically `http://localhost:3000`).

## Scripts

```bash
bun run dev      # start development server
bun run build    # build for production
bun run start    # run production build
```

## Project Structure

```txt
src/
  audio/         # player state/context and audio engine
  components/    # UI components (mixer, cards, navbar, controls)
  data/          # static sound catalog
  routes/        # app routes
```
