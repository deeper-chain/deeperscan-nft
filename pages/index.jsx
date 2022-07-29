import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from 'components/Header/Header';
import { useRequest } from 'ahooks';
import { getNftClassList, searchDeeperChain } from 'services/polkadot';

import styles from './index.module.scss';

import { Input } from 'antd';
import { useEffect, useState } from 'react';

const Homepage = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const router = useRouter();
  const { t } = useTranslation('common');
  const { loading, data: classMetaList } = useRequest(getNftClassList);
  const {
    loading: searchLoading,
    data: searchDeeperChainData,
    run: searchDeeperChainRun,
  } = useRequest(searchDeeperChain, {
    manual: true,
  });
  const toSearchDeeperChain = val => {
    setSearchAddress(val);
    searchDeeperChainRun(val);
  };

  useEffect(() => {
    console.log(searchDeeperChainData);
  }, [searchDeeperChainData]);

  useEffect(() => {
    if (router.query.address) {
      toSearchDeeperChain(router.query.address);
    }
  }, [router.query]);

  return (
    <>
      <Header></Header>
      <main>
        <div className={styles['class-list-box']}>
          <div className={styles['inner-box']}>
            {classMetaList &&
              classMetaList.map((it, index) => {
                return (
                  <div className={styles['class-item-box']} key={index}>
                    <img src={it.imageFile} alt="" />
                  </div>
                );
              })}
          </div>

          <div className={styles['search-box']}>
            <div className={styles['input-box']}>
              <Input.Search
                placeholder={t('Search by account')}
                allowClear
                enterButton={t('Search')}
                size="large"
                onSearch={toSearchDeeperChain}
              ></Input.Search>
            </div>
          </div>
        </div>
        {searchAddress && (
          <div className={styles['owner-box']}>
            <div style={{ wordBreak: 'break-all' }}>
              {t('Owner')}: <b>{searchAddress}</b>
            </div>
            <div>
              {t('Count')}: <b>{searchDeeperChainData && searchDeeperChainData.length}</b>
            </div>
          </div>
        )}
        <div className={styles['nft-list-box']}>
          {searchDeeperChainData &&
            searchDeeperChainData.map((it, index) => {
              return (
                <div key={index} className={styles['nft-item-box']}>
                  <div className={styles['item-image-box']}>
                    <img src={it.imageFile} alt="" />
                  </div>
                  <div className={styles['item-text-box']}>
                    <div className={styles['name-text']}>{it.name}</div>
                    <div className={styles['description-box']}>
                      <div dangerouslySetInnerHTML={{ __html: it.description }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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
