import Head from "next/head";
import { useRouter } from 'next/router';
import InquiryInsideComponent from "../../components/custom/sections/inquiryinsidecomponent";
const BoardInside = () => {
    const router = useRouter();
    const { query } = router;
    const { id } = query;

    return (
        <div>
        <Head>
            <title>We:lover - Board create</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <InquiryInsideComponent />
        </div>
    );
};

export default BoardInside;