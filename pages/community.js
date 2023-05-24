import Head from "next/head";
import CommunityComponents from "../components/custom/Community-components";

export default function Community() {
    return (
      <div>
        <Head>
          <title>We:lover - Community</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CommunityComponents />
      </div>
    );
  }