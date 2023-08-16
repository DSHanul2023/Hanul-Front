import Head from "next/head";
import InquiryBoard from "../components/custom/sections/inquiryboardcomponent";
import { useRouter } from 'next/router';

export default function Inquiry() {
    return (
        <div>
            <Head>
            <title>We:lover - Board create</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
            <InquiryBoard />
        </div>
    );
}
