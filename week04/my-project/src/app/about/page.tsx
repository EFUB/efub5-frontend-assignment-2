import Image from 'next/image';
import styles from './page.module.css';
import cafe from '../../../public/cafe.jpg';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.description}>I like...❤️✨🍒🫧</p>

      <div className={styles.imageWrapper}>
        <Image
          src='/festival.jpg'
          alt='festival'
          width={400}
          height={300}
          placeholder='blur'
          blurDataURL='/festival.jpg'
        />
        <Image
          src='https://pbs.twimg.com/media/G1YW_zpaMAEABEG?format=jpg&name=medium'
          alt='actor'
          width={300}
          height={300}
          placeholder='blur'
          blurDataURL='https://pbs.twimg.com/media/G1YW_zpaMAEABEG?format=jpg&name=medium'
        />
        <Image
          src='https://pbs.twimg.com/media/FGFL9tpUYAAkVD7.jpg'
          alt='anime'
          width={533}
          height={300}
          placeholder='blur'
          blurDataURL='https://pbs.twimg.com/media/FGFL9tpUYAAkVD7.jpg'
        />
        <Image
          src={cafe}
          alt='cafe'
          width={225}
          height={300}
          placeholder='blur'
          blurDataURL={cafe.src}
        />
      </div>
    </main>
  );
}
