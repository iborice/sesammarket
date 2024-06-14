// Header.js
import { useTranslation } from 'react-i18next';
import i18n from  'i18next';

import * as React from 'react';


import Header from './layout/Header';
import Layout from './layout/Layout';

const lngs = [
  { code: 'en', nativeName: 'English' },
  { code: 'fr', nativeName: 'Francais' },
];

const Home = () => {

  const { t } = useTranslation();

  return (
    
    <Layout/>
    // <div>
    //   <div>{t('Welcome.title')}</div>
    //   <button className='button' onClick={() => dispatch(logout())}>
    //   {t('Welcome.logout')}
    //   </button>
    //   <div>
    //     {/** code permettant de changer la langue */}
    //     {lngs.map((lng) => {
    //       return (
    //         <button
    //           className="m-4 p-2 bg-blue-600 rounded"
    //           key={lng.code}
    //           type="submit"
    //           onClick={() => i18n.changeLanguage(lng.code)}
    //         >
    //           {lng.nativeName}
    //         </button>
    //       );
    //     })}
    //   </div>
    // </div>
  )
}
export default Home