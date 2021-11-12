import React, { useEffect } from 'react'
import {
  Drawer,
  Hidden,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  User as UserIcon,
} from "react-feather";
import { useLocation } from 'react-router-dom';
import { NavigationList } from '../../components/Navigation/NavigationList';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';



interface AdminSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
  width:number;
}

const items =[
  {
    href: "/admin/blog",
    icon: BarChartIcon,
    title: "Blog",
  },
  {
    href: "/admin/user",
    icon: UserIcon,
    title: "Users",
  },

]


export const AdminSidebar:React.FC<AdminSidebarProps> = ({onMobileClose , openMobile,width}) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname,openMobile,onMobileClose]);


    return (
      <>
        <Hidden lgUp>
          <Drawer
            anchor="left"
            onClose={onMobileClose}
            open={openMobile}
            variant="temporary"
            PaperProps={{
              sx: {
                width: width,
              },
            }}
          >
            <NavigationList user={user} items={items} />
          </Drawer>
        </Hidden>
        <Hidden xlDown>
          <Drawer
            anchor="left"
            open
            variant="persistent"
            PaperProps={{
              sx: {
                width: width,
                height: "100%",
              },
            }}
          >
            <NavigationList user={user} items={items} />
            
          </Drawer>
        </Hidden>
      </>
    );
}
