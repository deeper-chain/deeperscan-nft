import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import Header from '../components/Header/Header'
import { Footer } from '../components/Foot'

const Homepage = () => {

  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <>
      <main>
        <Header />
        <hr style={{ marginTop: 20, width: '90%' }} />
        <div>
          <Link
            href='/'
            locale={router.locale === 'en' ? 'zh' : 'en'}
          >
            <button>
              {t('change-locale', { changeTo: router.locale === 'en' ? 'zh' : 'en' })}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}



export default Homepage