import React, { Component, ComponentProps } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import '../components/styles/nprogress.css';
import Page from '../components/Page';
import withData from '../lib/withData';
import { AppContext } from 'next/app';
import { IPageProps } from '../interfaces';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }: ComponentProps<any>) {
  console.log('APollo', apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps: IPageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
