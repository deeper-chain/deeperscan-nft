import logoImg from 'public/logo.png';
import styles from './Header.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();

  const changeLang = () => {};

  return (
    <header className={styles.header}>
      <div className={styles.logoBox}>
        <Image src={logoImg}></Image>
        <div>DEEPER NETWORK</div>
      </div>
      <div className={styles.langBox}>
        <Link href="/" locale={router.locale === 'en' ? 'zh' : 'en'}>
          <div onClick={changeLang} className={styles.langBtn}>
            EN / 中文
          </div>
        </Link>
      </div>
    </header>
  );
}
