import styles from "./hero.module.scss";
import Link from "next/link";
import { ButtonPrimary } from "@/src/components/atoms/buttons/ButtonPrimary";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__heroTitle}>Write Notes Instantly</h1>
        <p className={styles.hero__subtitle}>
          Your thoughts, organized and accessible anywhere
        </p>
        <Link href="/notes/new">
          <ButtonPrimary className={styles.heroButton}>
            Write Note
          </ButtonPrimary>
        </Link>
      </div>
    </section>
  );
}
