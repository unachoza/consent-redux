  //@ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConsentState {
  functional: boolean,
  analytics: boolean,
  advertising: boolean,
  saleOfInfo: boolean,
  govRequired: boolean,
  curserTracking: boolean,
  essential: boolean,
  unknown: boolean,
}

const initialState: ConsentState = {
  functional: false,
  analytics: false,
  advertising: false,
  saleOfInfo: false,
  govRequired: false,
  curserTracking: false,
  essential: false,
  unknown: false,
}

const stateKeys = Object.keys(initialState);

const stateRetrievers: any = {};
const reducers = {};

stateKeys.forEach((key) => {
  stateRetrievers[key] = (state: any) => {
    if (!state.consent) {
      return null;
    }
    return state.consent[key];
  };
  reducers[key] = (state:any, action: any) => {
    state[key] = action.payload;
  };
});

export const consentSlice = createSlice({
  name: 'consent',
  initialState,
  reducers: {
    reducers: reducers

    //yes all consent
    // no all consent
  },
})

export const retrievers = stateRetrievers;

// Action creators are generated for each case reducer function
export const { updaters } = consentSlice.actions

export default consentSlice.reducer