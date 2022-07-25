import logoImg from 'public/logo.png'
import styles from './Header.module.scss';
import Image from 'next/image'
import {useTranslation} from 'react-i18next'

export default function Header() {
  const {t, i18n} = useTranslation()

  const changeLang = () => {
    console.log(i18n)
    if (i18n.language == 'en') {
      i18n.changeLanguage('zh')
    }
    if (i18n.language == 'zh') {
      i18n.changeLanguage('en')
    }
  }

  return <header className={styles.header}>
    <div className={styles.logoBox}>
      <Image src={logoImg}></Image>
      <div>DEEPER NETWORK</div>
    </div>
    <div className={styles.langBox}>
      <div onClick={changeLang} className={styles.langBtn}>
        EN / 中文
      </div>
    </div>
  </header>
}