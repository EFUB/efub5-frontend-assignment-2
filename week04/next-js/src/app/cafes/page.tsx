import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import MemoInput from "./MemoInput";
import styles from "./page.module.css";

export default function CafesPage() {
  const cafes = [
    { 
      id: 1, 
      name: "블루포트 이화여대헬렌관점", 
      img: "/cafe.jpg", 
      desc: "카공하기 좋은 넓은 공간, 콘센트 있음" 
    },
    { 
      id: 2, 
      name: "스타벅스 이대ECC점", 
      img: "/star.jpg", 
      desc: "ECC 지하 4층, 항상 사람 많음" 
    },
    { 
      id: 3, 
      name: "이화상점", 
      img: "/latte.jpg", 
      desc: "교내 건물 곳곳에 위치, 저렴한 가격" 
    },
    { 
      id: 4, 
      name: "공차 이대익스프레스점", 
      img: "/gong.jpg", 
      desc: "정문 근처, 다양한 음료, 테이크아웃 위주" 
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>이화여대 카페 탐방</h1>
        <p className={styles.subtitle}>
          이대 주변 카페들을 저장하고 메모를 남겨보세요!
        </p>
      </div>

      <div className={styles.grid}>
        {cafes.map((cafe) => (
          <div key={cafe.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image 
                src={cafe.img} 
                alt={cafe.name} 
                width={240} 
                height={160} 
                className={styles.image}
              />
              <div className={styles.overlay}></div>
            </div>
            <h3 className={styles.cafeName}>{cafe.name}</h3>
            <p className={styles.cafeDesc}>{cafe.desc}</p>
            <div className={styles.actions}>
              <FavoriteButton name={cafe.name} />
              <MemoInput cafeId={cafe.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
