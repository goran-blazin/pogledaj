import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

type AppStore = {
  firstTimeVisitor: boolean;
  setNotFirstTimeVisitor: () => void;
};

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => {
        return {
          firstTimeVisitor: true,
          setNotFirstTimeVisitor: () => set({firstTimeVisitor: false}),
        };
      },
      {name: 'AppStore'},
    ),
  ),
);

export default useAppStore;
