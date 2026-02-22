import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { splitProps, type ComponentProps } from "solid-js";
import { ChevronRight, Check, Circle } from "lucide-solid";

const menuSurfaceClass =
  "z-50 min-w-52 overflow-hidden rounded-xl border border-border/80 bg-surface/95 p-1 text-white/92 shadow-[0_24px_56px_-30px_rgba(2,6,23,0.98)] backdrop-blur-xl data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0";

const menuItemClass =
  "relative flex cursor-default items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-white/88 outline-none transition-all duration-150 data-[highlighted]:bg-primary/16 data-[highlighted]:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-45";

export const DropdownMenu = KDropdownMenu;
export const DropdownMenuTrigger = KDropdownMenu.Trigger;
export const DropdownMenuIcon = KDropdownMenu.Icon;
export const DropdownMenuPortal = KDropdownMenu.Portal;
export const DropdownMenuGroup = KDropdownMenu.Group;
export const DropdownMenuRadioGroup = KDropdownMenu.RadioGroup;
export const DropdownMenuSub = KDropdownMenu.Sub;

type ContentProps = ComponentProps<typeof KDropdownMenu.Content>;

export const DropdownMenuContent = (props: ContentProps) => {
  const [local, others] = splitProps(props, ["class", "sideOffset"]);

  return (
    <KDropdownMenu.Portal>
      <KDropdownMenu.Content
        sideOffset={local.sideOffset ?? 8}
        class={`${menuSurfaceClass} ${local.class ?? ""}`}
        {...others}
      />
    </KDropdownMenu.Portal>
  );
};

type SubContentProps = ComponentProps<typeof KDropdownMenu.SubContent>;

export const DropdownMenuSubContent = (props: SubContentProps) => {
  const [local, others] = splitProps(props, ["class", "sideOffset"]);

  return (
    <KDropdownMenu.Portal>
      <KDropdownMenu.SubContent
        sideOffset={local.sideOffset ?? 8}
        class={`${menuSurfaceClass} ${local.class ?? ""}`}
        {...others}
      />
    </KDropdownMenu.Portal>
  );
};

type ItemProps = ComponentProps<typeof KDropdownMenu.Item> & {
  inset?: boolean;
};

export const DropdownMenuItem = (props: ItemProps) => {
  const [local, others] = splitProps(props, ["class", "inset"]);

  return (
    <KDropdownMenu.Item
      class={`${menuItemClass} ${local.inset ? "pl-8" : ""} ${local.class ?? ""}`}
      {...others}
    />
  );
};

type SubTriggerProps = ComponentProps<typeof KDropdownMenu.SubTrigger> & {
  inset?: boolean;
};

export const DropdownMenuSubTrigger = (props: SubTriggerProps) => {
  const [local, others] = splitProps(props, ["class", "children", "inset"]);

  return (
    <KDropdownMenu.SubTrigger
      class={`${menuItemClass} ${local.inset ? "pl-8" : ""} ${local.class ?? ""}`}
      {...others}
    >
      {local.children}
      <ChevronRight class="ml-auto size-4 text-muted" />
    </KDropdownMenu.SubTrigger>
  );
};

export const DropdownMenuSeparator = (
  props: ComponentProps<typeof KDropdownMenu.Separator>,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <KDropdownMenu.Separator
      class={`-mx-1 my-1 h-px border-0 bg-border/80 ${local.class ?? ""}`}
      {...others}
    />
  );
};

export const DropdownMenuGroupLabel = (
  props: ComponentProps<typeof KDropdownMenu.GroupLabel> & { inset?: boolean },
) => {
  const [local, others] = splitProps(props, ["class", "inset"]);

  return (
    <KDropdownMenu.GroupLabel
      class={`px-2.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-muted uppercase ${local.inset ? "pl-8" : ""} ${local.class ?? ""}`}
      {...others}
    />
  );
};

// Backward-compatible alias.
export const DropdownMenuLabel = DropdownMenuGroupLabel;

type CheckboxItemProps = ComponentProps<typeof KDropdownMenu.CheckboxItem>;

export const DropdownMenuCheckboxItem = (props: CheckboxItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  return (
    <KDropdownMenu.CheckboxItem
      class={`${menuItemClass} pl-8 ${local.class ?? ""}`}
      {...others}
    >
      <KDropdownMenu.ItemIndicator class="absolute left-2.5 inline-flex size-4 items-center justify-center text-primary">
        <Check class="size-3.5" />
      </KDropdownMenu.ItemIndicator>
      {local.children}
    </KDropdownMenu.CheckboxItem>
  );
};

type RadioItemProps = ComponentProps<typeof KDropdownMenu.RadioItem>;

export const DropdownMenuRadioItem = (props: RadioItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  return (
    <KDropdownMenu.RadioItem
      class={`${menuItemClass} pl-8 ${local.class ?? ""}`}
      {...others}
    >
      <KDropdownMenu.ItemIndicator class="absolute left-2.5 inline-flex size-4 items-center justify-center text-primary">
        <Circle class="size-2.5 fill-current" />
      </KDropdownMenu.ItemIndicator>
      {local.children}
    </KDropdownMenu.RadioItem>
  );
};

export const DropdownMenuArrow = (
  props: ComponentProps<typeof KDropdownMenu.Arrow>,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <KDropdownMenu.Arrow
      class={`fill-surface/95 stroke-border/80 stroke-1 ${local.class ?? ""}`}
      {...others}
    />
  );
};
