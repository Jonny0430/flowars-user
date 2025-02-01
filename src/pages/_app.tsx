import "../styles/globals.css";
import '@fontsource/roboto'
import 'react-multi-carousel/lib/styles.css'

import { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "src/config/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "src/i18n";
import { Client, HydrationProvider } from 'react-hydration-provider'
import { Provider } from "react-redux";
import { store } from "src/store/store";
import NProgress from 'nprogress'
import { SessionProvider } from 'next-auth/react'
import AuthProvider from "src/provider/auth.provider";
import { useEffect } from "react";
import { Router } from "next/router";
import { SocketProvider } from "src/context/SocketContext";
import ChatDrawer from "src/components/chat/chat-drawer";


NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);


  return (
    <HydrationProvider>
      <Provider store={store}>
        <SessionProvider session={session}>
          <I18nextProvider i18n={i18n}>
            <ChakraProvider theme={theme} >
              <SocketProvider>
                <Client>
                  <AuthProvider>
                    <Component {...pageProps} />
                  </AuthProvider>
                </Client>
              </SocketProvider>
            </ChakraProvider>
          </I18nextProvider>
        </SessionProvider>
      </Provider>
    </HydrationProvider>

  )
}
