import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  role: string;
  totalPoints: number;

  token: string;
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  token: "",
  phoneNumber: "",
  address: "",
  profilePicture: "",
  role: "",
  totalPoints: 0
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.profilePicture = action.payload.profilePicture;
      state.phoneNumber = action.payload.phoneNumber;
      state.role = action.payload.role;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.name = "";
      state.email = "";
      state.token = "";
      state.profilePicture = "";
      state.phoneNumber = "";
      state.role = "";
    },
    updateUserAction: (state, action: PayloadAction<Partial<UserState>>) => {
      const { id, name, email, phoneNumber, address, profilePicture } = action.payload;
      if (id !== undefined) state.id = id;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
      if (address !== undefined) state.address = address;
      if (profilePicture !== undefined) state.profilePicture = profilePicture;
    },
  },
});

export const { loginAction, logoutAction, updateUserAction } = userSlice.actions;
export default userSlice.reducer;
