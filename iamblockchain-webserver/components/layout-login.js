import Head from "next/head";
import Styles from "../styles/Login.module.css";

export default function Layout({ children }) {
  return (
    <div className={Styles.page}>
      <Head>
        <title>Sign in to IAMBlockchain · IAMBlockchain</title>
      </Head>
      {children}
    </div>
  );
}
