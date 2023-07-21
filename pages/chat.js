import Head from "next/head";
import CommunityComponents from "../components/custom/Community-components";
import ChatComponent from "../components/custom/sections/chatcomponent";

export default function Chat() {
    return (
      <div>
        <Head>
          <title>We:lover - Chat</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ChatComponent />
      </div>
    );
  }