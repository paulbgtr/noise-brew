import { createMemo, createSignal, onMount, Show } from "solid-js";
import { Download, Save, Trash2 } from "lucide-solid";

import { usePlayer } from "~/audio/player-provider";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export const PresetControls = () => {
  const {
    applyPresetById,
    deletePreset,
    hasHydratedPresets,
    hydratePresets,
    presets,
    saveCurrentAsPreset,
    selectedPresetId,
  } = usePlayer();

  const [name, setName] = createSignal("");
  const [selectedId, setSelectedId] = createSignal<string>("");
  const [error, setError] = createSignal<string | null>(null);

  const hasPresets = createMemo(() => presets().length > 0);

  onMount(() => {
    hydratePresets();
  });

  const savePreset = () => {
    const result = saveCurrentAsPreset(name());
    if (!result.ok) {
      setError("Please enter a preset name.");
      return;
    }

    setName("");
    setError(null);
  };

  const applyPreset = () => {
    const id = selectedId() || selectedPresetId() || "";
    if (!id) return;
    applyPresetById(id);
    setSelectedId(id);
  };

  const removePreset = () => {
    const id = selectedId() || selectedPresetId() || "";
    if (!id) return;
    deletePreset(id);
    setSelectedId("");
  };

  return (
    <Card as="section" tone="elevated">
      <div class="mb-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-white/95">Presets</span>
          <span class="text-xs text-muted">
            {hasHydratedPresets() ? `${presets().length} saved` : "Loading..."}
          </span>
        </div>
      </div>

      <div class="grid gap-3">
        <div class="flex flex-col gap-2 sm:flex-row">
          <input
            class="h-11 w-full rounded-xl border border-border/80 bg-white/[0.03] px-3 text-sm text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-colors placeholder:text-muted/80 focus:border-primary/50"
            value={name()}
            placeholder="Preset name (e.g. Deep Work)"
            onInput={(event) => setName(event.currentTarget.value)}
          />
          <Button class="sm:shrink-0" onClick={savePreset}>
            <Save size={14} />
            Save current
          </Button>
        </div>

        <Show when={error()}>
          {(message) => <p class="text-xs text-[#fca5a5]">{message()}</p>}
        </Show>

        <Show
          when={hasPresets()}
          fallback={
            <p class="text-sm text-muted">
              Save your current mix to reuse it any time.
            </p>
          }
        >
          <div class="flex flex-col gap-2 sm:flex-row">
            <select
              class="h-11 w-full rounded-xl border border-border/80 bg-surface/80 px-3 text-sm text-white/90 outline-none transition-colors focus:border-primary/50"
              value={selectedId() || selectedPresetId() || ""}
              onChange={(event) => setSelectedId(event.currentTarget.value)}
            >
              <option value="" disabled>
                Choose a preset
              </option>
              {presets().map((preset) => (
                <option value={preset.id}>{preset.name}</option>
              ))}
            </select>

            <div class="flex gap-2 sm:shrink-0">
              <Button variant="ghost" onClick={applyPreset}>
                <Download size={14} />
                Apply
              </Button>
              <Button variant="ghost" onClick={removePreset}>
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </div>
        </Show>
      </div>
    </Card>
  );
};
