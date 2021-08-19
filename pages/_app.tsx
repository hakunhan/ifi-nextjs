import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps }) {
  <Provider session = {pageProps.session}>
    return <Component {...pageProps} />
  </Provider>
}

export default MyApp;