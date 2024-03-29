import Head from "next/head";
import Components from "../components/basic/AllComponents";
import CustomMyComponents from "../components/custom/Custom-MyComponents";
import Cards from "../components/basic/cards";

export default function mypage() {
    return (
      <div>
        <Head>
          <title>My Page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CustomMyComponents />
      </div>
    );
  }