import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

type UserSettingsStore = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  globalSelectedCity?: string;
  setGlobalCity: (cityId: string | undefined) => void;
  globalSelectedCinema?: string;
  setGlobalCinema: (cityId: string | undefined) => void;
};

const useUserSettings = create<UserSettingsStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',
        toggleTheme: () => {
          if (get().theme === 'dark') {
            return set({theme: 'light'});
          } else {
            return set({theme: 'dark'});
          }
        },
        setGlobalCity: (cityId: string | undefined) => set({globalSelectedCity: cityId}),
        setGlobalCinema: (cinemaId: string | undefined) => set({globalSelectedCinema: cinemaId}),
      }),
      {
        name: 'UserSettingsStore',
      },
    ),
  ),
);

export default useUserSettings;
