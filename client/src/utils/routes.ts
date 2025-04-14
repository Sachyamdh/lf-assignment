import { FiHome, FiBook, FiUsers, FiLogIn, FiUser } from "react-icons/fi";

export type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  protected?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    path: "/",
    icon: FiHome,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: FiBook,
    protected: true,
  },
  {
    name: "Writers",
    path: "/writers",
    icon: FiUsers,
    protected: true,
  },
];

export const AUTH_ITEMS = {
  signIn: {
    name: "Sign In",
    icon: FiLogIn,
  },
  profile: {
    name: "Profile",
    icon: FiUser,
  },
};
