import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import ColorTheme from './../src/component/ColorTheme';
import Loader from '../src/component/Loader';

import { APP_TITLE } from './../src/constants/public';

import store from '../src/redux/store';

import './../public/style/font.css';
import './../public/style/globals.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <ColorTheme />
        <Component {...pageProps} />
        <Loader />
      </Provider>
    </>
  );
};

export default MyApp;
