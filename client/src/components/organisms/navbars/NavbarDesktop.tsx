"use client";
import { NAV_ITEMS, AUTH_ITEMS } from "@/src/utils/routes";
import Link from "next/link";
import Image from "next/image";
import { ButtonPrimary } from "@/src/components/atoms/buttons/ButtonPrimary";
import styles from "./navbar.module.scss";
import { useUser, useLogout } from "@/src/hooks/authHook";

export function NavbarDesktop() {
  const { data: authState } = useUser();
  const { mutate: logout } = useLogout();

  if (authState === null) {
    return null; 
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className={styles.navbar__logoImage}
          style={{ objectFit: "contain" }}
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
              >
                <Icon className={styles.navbar__icon} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {authState ? (
          <button
            onClick={() => logout()}
            className={styles.navbar__authButton}
          >
            Sign Out
          </button>
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
      </nav>
    </header>
  );
}
