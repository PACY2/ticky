const userSlice = (set) => ({
  user: null,
  setUser: (user) => {
    return set({ user });
  },
  removeUser: () => {
    return set({ user: null });
  },
});

export default userSlice;
