import * as React from "react";
import { Box, Fade, useScrollTrigger } from "@mui/material";

interface ScrollTopProps {
  children: React.ReactNode;
}

export const ScrollTop: React.FC<ScrollTopProps> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    console.log(event);
    const anchor = (
      (event.target as Element).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 75, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};
