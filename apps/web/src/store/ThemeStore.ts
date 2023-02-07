import {create} from 'zustand';

type ThemeStore = {
  theme: boolean;
  toggleTheme: (isDark: boolean) => void;
};

const useTheme = create<ThemeStore>((set) => ({
  theme: false,
  toggleTheme: (isDark: boolean) => set({theme: isDark}),
}));

export default useTheme;
