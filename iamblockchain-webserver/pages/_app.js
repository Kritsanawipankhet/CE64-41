import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
  console.log(Component, pageProps);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
