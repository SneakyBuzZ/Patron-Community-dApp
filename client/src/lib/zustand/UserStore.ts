import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  address: string;
  name: string;
  createdAt: string | Date;
  image: string;
  id: string;
};

type Actions = {
  setWalletAddress: (user: State) => void;
  reset: () => void;
};

const initialState: State = {
  address: '',
  name: '',
  createdAt: '',
  image: '',
  id: '',
};

type userSliceType = State & Actions;

const userSlice: StateCreator<userSliceType, [], [], userSliceType> = (set) => ({
  ...initialState,
  setWalletAddress: (user) => {
    set((state) => ({
      ...state,
      address: user.address,
      name: user.name,
      createdAt: user.createdAt,
      image: user.image,
      id: user.id,
    }));
  },
  reset: () => {
    set(initialState);
  },
});

const useUserStore = create(
  devtools(
    persist(userSlice, {
      name: 'user',
    })
  )
);

export default useUserStore;
