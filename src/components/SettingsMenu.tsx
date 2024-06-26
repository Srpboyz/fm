import { DropdownMenu } from "@kobalte/core";
import { Settings, CheckIcon, Grid2x2, List } from "lucide-solid";
import { AppSettings } from "../types";
import { SetStoreFunction } from "solid-js/store";
import { invoke } from "@tauri-apps/api";
import { Show } from "solid-js";

interface Props {
  settings: AppSettings
  setSettings: SetStoreFunction<AppSettings>
}

export default function SettingsMenu(props: Props) {
  return (
    <DropdownMenu.Root>
      <button onclick={() => {
        const newValue = props.settings.view === 'grid' ? 'list' : 'grid';
        props.setSettings('view', newValue);
        invoke("update_settings", { setting: "grid", value: newValue });
      }
      }>
        <Show when={props.settings.view === 'grid'} fallback={<Grid2x2 />}>
          <List />
        </Show>
      </button>
      <DropdownMenu.Trigger class="dropdown-menu__trigger">
        <DropdownMenu.Icon class="dropdown-menu__trigger-icon">
          <Settings />
        </DropdownMenu.Icon>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content class="dropdown-menu__content">
          <DropdownMenu.CheckboxItem
            class="dropdown-menu__checkbox-item"
            checked={props.settings.showHidden}
            onChange={(newValue) => invoke("update_settings", { setting: "showHidden", value: newValue }) && props.setSettings('showHidden', newValue)}
          >
            <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Hidden Files
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            class="dropdown-menu__checkbox-item"
            checked={props.settings.deletePermanently}
            onChange={(newValue) => invoke("update_settings", { setting: "deletePermanently", value: newValue }) && props.setSettings('deletePermanently', newValue)}
          >
            <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Delete Permanently
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
