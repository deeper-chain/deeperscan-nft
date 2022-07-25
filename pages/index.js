import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from 'components/Header/Header'

const Homepage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Header></Header>
      <main>
        {t('hello')}
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Homepage;
