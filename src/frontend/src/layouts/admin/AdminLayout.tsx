import { styled } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';

const AdminLayoutRoot = styled("div")(({theme}) => ({
  backgroundColro:theme.palette.background.default,
  display:"flex",
  height:"100%",
  overflow:"hidden",
  width:"100%"
}));

const SidebarWidth = 265;

const AdminLayoutWrapper = styled("div")(({theme}) => ({
  display:"flex",
  flex:"1 1 auto",
  overflow:"hidden",
  paddingTop:64,
  // lg사이즈가 넘어가면 사이드바를 항시 나타내기 위해 265사이즈로 고정한다.
  [theme.breakpoints.up("lg")]:{
    paddingLeft:SidebarWidth
  }
}));

const AdminLayoutCountainer = styled("div")({
  display:"flex",
  flex:"1 1 auto",
  overflow:"hidden"
});

const AdminLayoutContent = styled("div")({
  flex:"1 1 auto",
  height:"100%",
  overflow:"auto"
});

export const AdminLayout:React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  return (
    <AdminLayoutRoot>
      <AdminNavbar onMobileNavOpen={() => setIsMobileNavOpen(true)} />
      <AdminSidebar
        onMobileClose={() => setIsMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        width={SidebarWidth}
      />
      <AdminLayoutWrapper>
        <AdminLayoutCountainer>
          <AdminLayoutContent>
            <Outlet />
          </AdminLayoutContent>
        </AdminLayoutCountainer>
      </AdminLayoutWrapper>
    </AdminLayoutRoot>
  );
}
