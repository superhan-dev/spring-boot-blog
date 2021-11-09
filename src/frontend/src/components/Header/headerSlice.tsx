import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState, AppThunk } from "../../states/store";
import AppsIcon from "@mui/icons-material/Apps";

export interface Menu {
  name: string;
  icon: ReactNode;
  path: string;
}

export interface HeaderState {
  mobileOpen: boolean;
  changeColorOnScroll: {
    height: number;
    color: string;
  };
  menus: Menu[];
}

const initialState: HeaderState = {
  mobileOpen: false,
  changeColorOnScroll: {
    height: 200,
    color: "white",
  },
  menus: [
    { name: "components", icon: <AppsIcon />, path: "components" },
    { name: "about", icon: <AppsIcon />, path: "about" },
  ],
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.mobileOpen = true;
    },
    closeSidebar: (state) => {
      state.mobileOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar } = headerSlice.actions;

export const getMenus = (state: RootState) => state.header.menus;

export default headerSlice.reducer;
