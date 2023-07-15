import { create } from "zustand";
import userSlice from "./slices/user";

const useStore = create((set) => ({
  ...userSlice(set),
}));

export default useStore;
