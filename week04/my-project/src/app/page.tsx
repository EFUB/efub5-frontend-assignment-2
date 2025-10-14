import Image from 'next/image';
import styles from './page.module.css';
import frontImg from '../../public/pageImg.jpg';

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>About Me!</h1>
      <p className={styles.description}>My name is Seoyun 😊</p>
      <Image src={frontImg} alt='front' width={300} />
    </main>
  );
}
