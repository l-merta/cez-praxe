import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CheckboxItem from "./CheckboxItem";

import { ListFilter } from "lucide-react";

import { FilterSettingsTypes } from "@/types/app";

interface FilterMenuProps {
  filterSettings: FilterSettingsTypes[];
  setFilterSettings?: (settings: FilterSettingsTypes[]) => void;
}

export default function FilterMenu({ filterSettings, setFilterSettings }: FilterMenuProps) {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (filterSettings && filterSettings.length > 0) {
      const updatedSettings = filterSettings.map((setting) =>
        setting.name === name ? { ...setting, value: checked } : setting
      );
      
      if (typeof setFilterSettings === "function") {
        setFilterSettings(updatedSettings);
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="py-3 h-full" asChild>
        <Button variant="default"><ListFilter /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterSettings.map((setting) => (
          <CheckboxItem
            key={setting.name}
            name={setting.name}
            label={setting.label}
            value={setting.value}
            onCheckedChange={handleCheckboxChange}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}