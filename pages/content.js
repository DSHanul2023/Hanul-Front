import Head from "next/head";
import ContentList from '../components/custom/sections/contentlistcomponent';

export default function Content() {
        return (
        <div>
        <Head>
          <title>We:lover - Chat</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ContentList />
      </div>
        );
}