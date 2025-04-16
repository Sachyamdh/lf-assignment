"use client";
import { useState } from "react";
import { FiMenu, FiLogIn, FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { NAV_ITEMS, AUTH_ITEMS } from "@/src/utils/routes";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useUser, useLogout } from "@/src/hooks/authHook";
import { ButtonPrimary } from "@/src/components/atoms/buttons/ButtonPrimary";
import IconButton from "../../atoms/buttons/IconButtons";
export function NavbarMobile() {
  const { data: authState } = useUser();
  const { mutate: logout } = useLogout();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  if (authState === null) {
    return null;
  }

  const toggleDrawer = () => {
    if (isAnimating) return;
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setDrawerOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header className={styles.navbarMobile__header}>
        <IconButton
          onClick={toggleDrawer}
          aria-label="Open menu"
          icon={<FiMenu />}
          className={styles.navbarMobile__menuButton}
        />

        {authState ? (
          <IconButton
            onClick={() => logout()}
            aria-label="Sign out"
            icon={<FiLogOut />}
            className={styles.navbar__authButton}
          />
        ) : (
          <Link href="/auth" passHref>
            <ButtonPrimary
              icon={<AUTH_ITEMS.signIn.icon />}
              className={styles.navbar__authButton}
            >
              {AUTH_ITEMS.signIn.name}
            </ButtonPrimary>
          </Link>
        )}
      </header>

      {drawerOpen && (
        <div
          className={`${styles.navbarMobile__drawer} ${
            isAnimating
              ? styles["navbarMobile__drawerExit"]
              : styles["navbarMobile__drawerEnter"]
          }`}
        >
          <div className={styles.navbarMobile__closeButton}>
            <IconButton
              onClick={closeDrawer}
              aria-label="Close menu"
              icon={<IoMdClose />}
            />
          </div>

          <nav className={styles.navbarMobile__nav}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeDrawer}
                  className={styles.navbarMobile__navLink}
                >
                  <Icon />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
      {drawerOpen && (
        <div className={styles.navbarMobile__backdrop} onClick={closeDrawer} />
      )}
    </>
  );
}
