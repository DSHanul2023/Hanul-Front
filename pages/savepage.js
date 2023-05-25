import Head from "next/head";
import CustomSaveComponents from "../components/custom/Custom-SaveComponents";

export default function mypage() {
    return (
      <div>
        <Head>
          <title>My Page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CustomSaveComponents />
      </div>
    );
  }