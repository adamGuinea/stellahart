import { ComponentProps } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css'
import Page from '../components/Page';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: ComponentProps<any>) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
