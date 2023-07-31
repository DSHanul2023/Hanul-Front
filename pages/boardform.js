import Head from "next/head";
import BoardFormComponent from "../components/custom/sections/boardformcomponent";

export default function boardForm() {
    return (
        <div>
        <Head>
            <title>We:lover - Board create</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BoardFormComponent />
        </div>
    );
}