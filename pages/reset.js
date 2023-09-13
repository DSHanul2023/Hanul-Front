import Head from "next/head";
import ResetComponent from "../components/custom/sections/resetcomponent";

export default function Reset() {
    return (
      <div>
        <Head>
          <title>We:lover - ResetPassword</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ResetComponent />
      </div>
    );
  }