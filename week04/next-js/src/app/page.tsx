import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>이화여대 카페 탐방</h1>
        <p className={styles.subtitle}>
          이대 주변 카페들을 저장하고 메모를 남겨보세요!
        </p>
      </div>

      <div className={styles.description}>
        <p>
          Campus Cafe Explorer는 캠퍼스 근처의 카페를 쉽게 찾고 공유할 수 있는 서비스입니다.
        </p>
      </div>

      <div className={styles.imageWrapper}>
        <div className={styles.imageGrid}>
          <div className={styles.imageContainer}>
            <Image
              src="/campus.jpg"
              alt="Campus"
              width={380}
              height={240}
              className={styles.mainImage}
            />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/school.jpg"
              alt="campus2"
              width={380}
              height={240}
              className={styles.mainImage}
            />
            <div className={styles.overlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
