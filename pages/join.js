import Head from "next/head";
import JoinComponent from "../components/custom/sections/joincomponent";
export default function Join() {
    return (
        <div>
            <Head>
            <title>We:lover - Join</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <JoinComponent />
        </div>
        );
    }