"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { NAV_ITEMS, AUTH_ITEMS } from "@/src/utils/routes";
import Link from "next/link";
import Image from "next/image";
import { ButtonSecondary } from "@/src/components/atoms/buttons/ButtonSecondary";
import styles from "./navbar.module.scss";

export function NavbarDesktop() {
  const { user, signIn, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldRenderDropdown, setShouldRenderDropdown] = useState(false);

  // Handle dropdown animation states
  useEffect(() => {
    if (menuOpen) {
      setShouldRenderDropdown(true);
    } else {
      // Only set to false after animation completes
      const timer = setTimeout(() => {
        setShouldRenderDropdown(false);
      }, 300); // Matches animation duration
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className="object-cover"
          objectFit="contain"
          priority
        />
      </div>
      <nav className={styles.navbar__container}>
        <div className={styles.navbar__links}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={styles.navbar__link}
                onClick={closeMenu}
              >
                <Icon className="w-20 h-20" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {user ? (
          <div className={styles.navbar__auth}>
            <button
              onClick={toggleMenu}
              className={styles.navbar__userButton}
              aria-expanded={menuOpen}
              aria-controls="user-dropdown"
            >
              <div className={styles.navbar__avatar} />
              <span>{user.name}</span>
            </button>

            {shouldRenderDropdown && (
              <div
                id="user-dropdown"
                className={`${styles.navbar__dropdown} ${
                  menuOpen
                    ? styles.navbar__dropdownOpen
                    : styles.navbar__dropdownClosed
                }`}
                onAnimationEnd={() => {
                  if (!menuOpen) setShouldRenderDropdown(false);
                }}
              >
                <button onClick={closeMenu}>Profile</button>
                <button
                  onClick={() => {
                    closeMenu();
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <ButtonSecondary
            onClick={signIn}
            icon={<AUTH_ITEMS.signIn.icon className="w-4 h-4" />}
            className={styles.navbar__authButton}
          >
            {AUTH_ITEMS.signIn.name}
          </ButtonSecondary>
        )}
      </nav>
    </header>
  );
}
