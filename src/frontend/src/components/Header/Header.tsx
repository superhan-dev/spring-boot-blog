import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Hidden,
  Drawer,
  Box,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../../states/hooks";
import { RootState } from "../../states/store";
import { CustomContainer, HeaderLinks } from "..";

/**
 * tradeOff :
 * props를 destructuring 으로 사용하면 자식 객체에서 props를 붙이지 않아도 되지만
 * 상위 객체에서 전달한 값인지 가시성이 떨어지게 된다.
 * 또한 color를 동일한 변수명으로 정의할 수 없으므로 상위 객체에서 내려온 값은 props를 사용한다.
 */
export const Header: React.FC = (props) => {
  const { changeColorOnScroll, menus } = useAppSelector(
    (state: RootState) => state.header
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const trigger = useScrollTrigger();
  const [color, setColor] = useState<string>("transparent");
  const [elevation, setElevation] = useState<number>(0);
  // changeColorOnScroll 가 null 정의 되어 있었다면
  // window.addEvent에 headerColorChange function을 바인딩한다.

  // 스크롤 이벤트가 감지되면, color값을 변경해야 한다.
  // sx prop을 사용해서 정의해야 하므로, color값은 state로 관리되어야 한다.
  const headerColorChange = useCallback(() => {
    const windowsScrollTop = window.pageYOffset;
    if (
      windowsScrollTop > changeColorOnScroll.height ||
      windowsScrollTop === 0
    ) {
      setColor("transparent");
      setElevation(0);
    } else {
      setColor("white");
      setElevation(1);
    }
  }, [changeColorOnScroll]);

  useEffect(() => {
    headerColorChange();
  }, [trigger, headerColorChange]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * component 정의시 destructuring의 장점을 살리기 위해
   * 컴포넌트 정의 부에서 destructuring을 정의한다.
   * */
  const brandComponent = (
    <Button
      sx={{
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: color === "white" ? "black" : "white",
        padding: "8px 16px",
        letterSpacing: "unset",
        "&:hover,&:focus": {
          color: color === "white" ? "black" : "white",
          background: "transparent",
        },
      }}
    >
      {"Material Ui Kit"}
    </Button>
  );

  return (
    <AppBar
      enableColorOnDark
      sx={{
        paddingTop: color !== "transparent" ? "0" : "25px",
        backgroundColor: color,
      }}
      elevation={elevation}
      position={`fixed`}
    >
      <CustomContainer>
        <Toolbar>
          <Box sx={{ width: "230px" }}>
            {menus.length > 0 ? brandComponent : null}
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            {menus.length > 0 ? (
              <Hidden mdDown implementation="css">
                {menus.map((menu, i) => {
                  return (
                    <Button
                      key={menu.name + i}
                      startIcon={menu.icon}
                      sx={{ color: color === "white" ? "black" : "white" }}
                    >
                      {menu.name}
                    </Button>
                  );
                })}
              </Hidden>
            ) : (
              brandComponent
            )}
          </Box>
          <Hidden mdUp implementation="js">
            <IconButton
              sx={{ color: color === "white" ? "black" : "white" }}
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </CustomContainer>

      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Box sx={{ margin: "20px 10px" }}>
            <HeaderLinks />
          </Box>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};
