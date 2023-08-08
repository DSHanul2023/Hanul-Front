import Head from "next/head";
import { useRouter } from 'next/router';
import BoardInsideComponent from "../../components/custom/sections/boardinsidecomponent";
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
        <BoardInsideComponent />
        </div>
    );
};

export default BoardInside;