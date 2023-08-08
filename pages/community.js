import Head from "next/head";
import CommunityComponents from "../components/custom/Community-components";
import { useRouter } from 'next/router';

export default function Community() {
  const router = useRouter();
  const { query } = router;

  // 쿼리 매개변수에 접근하기
  const { id } = query;
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