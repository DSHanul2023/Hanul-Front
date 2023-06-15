import Head from "next/head";
import CommunityComponents from "../components/custom/Community-components";
import ChatComponent from "../components/custom/sections/chatcomponent";
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