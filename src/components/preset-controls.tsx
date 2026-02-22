import { createMemo, createSignal, onMount, Show } from "solid-js";
import { ChevronDown, Save, Trash2 } from "lucide-solid";

import { usePlayer } from "~/audio/player-provider";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
  const [error, setError] = createSignal<string | null>(null);

  const hasPresets = createMemo(() => presets().length > 0);
  const activePresetId = createMemo(() => selectedPresetId() || "");
  const activePresetName = createMemo(() => {
    const selected = presets().find((preset) => preset.id === activePresetId());
    return selected?.name ?? "Select preset";
  });

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

  const applyPreset = (id: string) => {
    if (!id) return;
    applyPresetById(id);
  };

  const removeActivePreset = () => {
    const id = activePresetId();
    if (!id) return;
    deletePreset(id);
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
          <div class="grid gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                class="h-11 w-full inline-flex items-center justify-between gap-2 rounded-xl border border-border/85 bg-white/[0.03] px-3 text-sm font-medium text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-220 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35 sm:min-w-68"
                aria-label="Select preset"
              >
                <span class="truncate">{activePresetName()}</span>
                <DropdownMenuIcon>
                  <ChevronDown size={16} class="text-muted" />
                </DropdownMenuIcon>
              </DropdownMenuTrigger>

              <DropdownMenuContent class="w-[--kb-dropdown-menu-trigger-width]">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Apply Preset</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={activePresetId()}
                    onChange={applyPreset}
                  >
                    {presets().map((preset) => (
                      <DropdownMenuRadioItem value={preset.id}>
                        {preset.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  class="text-[#fca5a5] data-[highlighted]:bg-[#7f1d1d]/35 data-[highlighted]:text-[#fecaca]"
                  disabled={!activePresetId()}
                  onSelect={removeActivePreset}
                >
                  <Trash2 size={14} />
                  Delete selected preset
                </DropdownMenuItem>
                <DropdownMenuArrow />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Show>
      </div>
    </Card>
  );
};
