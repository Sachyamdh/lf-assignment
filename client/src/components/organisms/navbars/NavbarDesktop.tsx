"use client";
import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { NAV_ITEMS, AUTH_ITEMS } from "@/src/utils/routes";
import Link from "next/link";
import Image from "next/image";
import { ButtonPrimary } from "@/src/components/atoms/buttons/ButtonPrimary";
import styles from "./navbar.module.scss";

export function NavbarDesktop() {
  const { user, signIn, signOut } = useAuth();

  const closeMenu = () => {
    // Placeholder in case you want to use it later
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

            <button onClick={signOut} className={styles.navbar__authButton}>
              Sign Out
            </button>
          </div>
        ) : (
          <ButtonPrimary
            onClick={signIn}
            icon={<AUTH_ITEMS.signIn.icon />}
            className={styles.navbar__authButton}
          >
            {AUTH_ITEMS.signIn.name}
          </ButtonPrimary>
        )}
      </nav>
    </header>
  );
}
