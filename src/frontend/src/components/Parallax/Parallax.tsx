import { Box } from "@mui/system";
import React from "react";

interface ParallaxProps {
  filter?: boolean;
  image?: string;
  small?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  image,
  small,
}) => {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );

  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }

    console.log("transform:", transform, window.innerWidth);

    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        maxHeight: "1000px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: "url(" + image + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transform: transform,
      }}
    >
      {children}
    </Box>
  );
};
