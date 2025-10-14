import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>책장을 둘러보세요</h1>
      <div className={styles.subtitle}>
        📚
      </div>
    </div>
  );
}
