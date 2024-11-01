import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  walletAddress: String | null;
  isConnected: boolean;
};

type Actions = {
  setWalletAddress: (address: String) => void;
  reset: () => void;
};

const initialState: State = {
  walletAddress: null,
  isConnected: false,
};

type walletSliceType = State & Actions;

const walletSlice: StateCreator<walletSliceType, [], [], walletSliceType> = (
  set
) => ({
  ...initialState,
  setWalletAddress: (address) => {
    set((state) => ({
      ...state,
      walletAddress: address,
      isConnected: true,
    }));
  },
  reset: () => {
    set(initialState);
  },
});

const useWalletStore = create(
  devtools(
    persist(walletSlice, {
      name: "user",
    })
  )
);

export default useWalletStore;
