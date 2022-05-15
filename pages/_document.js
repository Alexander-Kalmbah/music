import Document, { Html, Head, Main, NextScript } from 'next/document';

import { APP_LANGUAGE, APP_KEYWORDS, APP_DESCRIPTION } from './../src/constants/public';


class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  };

  render() {
    return (
      <Html lang={APP_LANGUAGE}>
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />

          <meta name="robots" content="index, follow" />
          <meta name="keywords" content={APP_KEYWORDS} />
          <meta name="description" content={APP_DESCRIPTION} />

          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
};

export default MainDocument;