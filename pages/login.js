import Head from "next/head";
import LoginComponent from "../components/custom/sections/logincomponent";

export default function Login() {
    return (
      <div>
        <Head>
          <title>We:lover - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LoginComponent />
      </div>
    );
  }