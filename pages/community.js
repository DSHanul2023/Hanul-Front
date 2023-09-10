import React, { useEffect, useState } from "react";
import Head from "next/head";
import CommunityComponents from "../components/custom/Community-components";
import { useRouter } from 'next/router';
import Loading from "./loading";

export default function Community() {
  const router = useRouter();
  const { query } = router;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login");
    } else{
      setLoading(false);
    }
  }, []);

  // 쿼리 매개변수에 접근하기
  const { id } = query;
    return (
      <div>
        {loading?<Loading/>:(
          <>
        <Head>
          <title>We:lover - Community</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CommunityComponents /></>)}
      </div>
    );
  }
