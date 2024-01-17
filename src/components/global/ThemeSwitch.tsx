"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Theme, useGlobal } from "@/lib/store";

export default function ThemeSwitch() {
  const { setTheme, theme } = useGlobal();

  return (
    <Select value={theme} onValueChange={(e: Theme) => setTheme(e)}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="red">Red</SelectItem>
      </SelectContent>
    </Select>
  );
}
