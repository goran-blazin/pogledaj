import {create} from 'zustand';

type ThemeStore = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

const useTheme = create<ThemeStore>((set) => ({
  darkTheme: false,
  toggleTheme: () => set((state) => ({darkTheme: !state.darkTheme})),
}));

export default useTheme;
