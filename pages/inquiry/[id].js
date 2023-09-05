import Head from "next/head";
import { useRouter } from 'next/router';
import InquiryInsideComponent from "../../components/custom/sections/inquiryinsidecomponent";

export default function InquiryInside({ id }) {
    return (
        <div>
            <Head>
                <title>We:lover - Board create</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <InquiryInsideComponent id={id} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    // 여기에 쿼리 값을 가져와서 처리하는 로직을 추가합니다.
    const id = query.id; // 예시로 쿼리에서 id 값을 가져옴

    // 가져온 데이터나 처리한 결과를 props로 반환합니다.
    return { props: { id } };
}