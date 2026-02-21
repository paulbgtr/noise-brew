import { createSignal, For, onCleanup, onMount } from "solid-js";
import { Howl } from "howler";
import { MixerControls } from "~/components/mixer-controls";
import { SOUND_CATALOG } from "~/data/sound-catalog";
import { SoundTrackCard } from "~/components/sound-track-card";

export const SoundItems = () => {
  const [masterVolume, setMasterVolume] = createSignal(100);
  const [isMuted, setIsMuted] = createSignal(false);
  const [trackVolumes, setTrackVolumes] = createSignal<number[]>(
    SOUND_CATALOG.map(() => 100),
  );
  const [isTrackPlaying, setIsTrackPlaying] = createSignal<boolean[]>(
    SOUND_CATALOG.map(() => false),
  );

  const players: Howl[] = [];

  const effectiveVolume = (
    trackVolume: number,
    muted = isMuted(),
    master = masterVolume(),
  ) => {
    if (muted) return 0;
    return (trackVolume / 100) * (master / 100);
  };

  const applyTrackVolume = (
    index: number,
    trackVolume = trackVolumes()[index],
    muted = isMuted(),
    master = masterVolume(),
  ) => {
    const player = players[index];
    if (!player) return;
    player.volume(effectiveVolume(trackVolume, muted, master));
  };

  const applyAllVolumes = (muted = isMuted(), master = masterVolume()) => {
    for (let index = 0; index < players.length; index += 1) {
      applyTrackVolume(index, trackVolumes()[index], muted, master);
    }
  };

  const setTrackPlaying = (index: number, next: boolean) => {
    setIsTrackPlaying((prev) => {
      const updated = [...prev];
      updated[index] = next;
      return updated;
    });
  };

  const toggleTrack = (index: number) => {
    const player = players[index];
    if (!player) return;

    const currentlyPlaying = isTrackPlaying()[index];
    if (currentlyPlaying) {
      player.pause();
      setTrackPlaying(index, false);
      return;
    }

    player.play();
    setTrackPlaying(index, true);
  };

  const stopAll = () => {
    players.forEach((player, index) => {
      if (player.playing()) {
        player.stop();
      }
      setTrackPlaying(index, false);
    });
  };

  const playAll = () => {
    players.forEach((player, index) => {
      if (!player.playing()) {
        player.play();
      }
      setTrackPlaying(index, true);
    });
  };

  const handleTrackVolumeChange = (index: number, value: number[]) => {
    const nextVolume = value[0] ?? 0;
    setTrackVolumes((prev) => {
      const updated = [...prev];
      updated[index] = nextVolume;
      return updated;
    });
    applyTrackVolume(index, nextVolume);
  };

  const handleMasterVolumeChange = (value: number[]) => {
    const nextVolume = value[0] ?? 0;
    setMasterVolume(nextVolume);
    applyAllVolumes(isMuted(), nextVolume);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted();
    setIsMuted(nextMuted);
    applyAllVolumes(nextMuted, masterVolume());
  };

  onMount(() => {
    SOUND_CATALOG.forEach((sound, index) => {
      const player = new Howl({
        src: [sound.path],
        loop: true,
        volume: effectiveVolume(trackVolumes()[index]),
        onplay: () => setTrackPlaying(index, true),
        onpause: () => setTrackPlaying(index, false),
        onstop: () => setTrackPlaying(index, false),
      });
      players.push(player);
    });
  });

  onCleanup(() => {
    players.forEach((player) => player.unload());
  });

  return (
    <div class="grid gap-4">
      <MixerControls
        trackCount={SOUND_CATALOG.length}
        masterVolume={masterVolume()}
        isMuted={isMuted()}
        onPlayAll={playAll}
        onStopAll={stopAll}
        onToggleMute={toggleMute}
        onMasterVolumeChange={handleMasterVolumeChange}
      />

      <div class="grid gap-3 sm:grid-cols-2">
        <For each={SOUND_CATALOG}>
          {(sound, index) => (
            <SoundTrackCard
              sound={sound}
              isPlaying={isTrackPlaying()[index()]}
              volume={trackVolumes()[index()]}
              onToggle={() => toggleTrack(index())}
              onVolumeChange={(value) =>
                handleTrackVolumeChange(index(), value)
              }
            />
          )}
        </For>
      </div>
    </div>
  );
};
