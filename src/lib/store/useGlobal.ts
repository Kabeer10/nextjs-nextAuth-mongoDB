import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "red";
interface GlobalState {
  // ADD You Global State Here
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useGlobal = create<GlobalState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        changeTheme(theme);
      },
    }),
    {
      name: "app-global",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function changeTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
}

export { useGlobal };
