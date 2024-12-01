import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeoInfoState {
  isLoading: boolean;
  error: null | string;
  data: {
    city: string;
    region: string;
    country: string;
    org: string;
    postal: string;
    timezone: string;
    language: string;
  } | null;
}

interface UpdateGeoInfoPayload {
  language: string;
  region: string;
}

interface FetchGeoInfoSuccessPayload {
  city: string;
  region: string;
  country: string;
  org: string;
  postal: string;
  timezone: string;
  language: string;
}

interface FetchGeoInfoFailurePayload {
  error: string;
}

const initialState: GeoInfoState = {
  isLoading: false,
  error: null,
  data: {
    city: "",
    region: "",
    country: "",
    org: "",
    postal: "",
    timezone: "",
    language: ""
  }
};

const geoInfo = createSlice({
  name: "geoInfo",
  initialState,
  reducers: {
    fetchGeoInfoStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    fetchGeoInfoSuccess: (state, action: PayloadAction<FetchGeoInfoSuccessPayload>) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    updateGeoInfo: (state, action: PayloadAction<UpdateGeoInfoPayload>) => {
      if (state.data) {
        state.data.language = action.payload.language;
        state.data.region = action.payload.region;
      }
    },
    fetchGeoInfoFailure: (state, action: PayloadAction<FetchGeoInfoFailurePayload>) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.data = null;
    },
  }
});

export const { fetchGeoInfoStart, fetchGeoInfoSuccess, updateGeoInfo, fetchGeoInfoFailure } = geoInfo.actions;
export default geoInfo.reducer;