"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiLogIn } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "@/src/contexts/AuthContext";
import { NAV_ITEMS, AUTH_ITEMS } from "@/src/utils/routes";
import Link from "next/link";
import IconButton from "../../atoms/buttons/IconButtons";
import styles from "./navbar.module.scss";

export function NavbarMobile() {
  const { user, signIn, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
        <button
          className={styles.navbarMobile__menuButton}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        {user ? (
          <div className={styles.navbarMobile__avatar} />
        ) : (
          <button
            className={styles.navbarMobile__menuButton}
            onClick={signIn}
            aria-label="Sign in"
          >
            <FiLogIn />
          </button>
        )}
      </header>

      {/* Drawer */}
      {drawerOpen && (
        <div
          className={`${styles.navbarMobile__drawer} ${
            isAnimating
              ? styles["navbarMobile__drawerExit"]
              : styles["navbarMobile__drawerEnter"]
          }`}
        >
          <div className={styles.navbarMobile__closeButton}>
            <button onClick={closeDrawer} aria-label="Close menu">
              <IoMdClose />
            </button>
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

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className={styles.navbarMobile__backdrop}
          onClick={closeDrawer}
        />
      )}
    </>
  );
}