import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationLatLng: {},
  location: '',
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderLocationLatLng: (state, actions) => {
      state.senderLocationLatLng = actions.payload
    },
    setLocation: (state, actions) => {
      state.location = actions.payload
    },
  }
});

export const { setSenderLocationLatLng, setLocation } = locationSlice.actions;
export default locationSlice.reducer;