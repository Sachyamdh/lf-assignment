"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
}
