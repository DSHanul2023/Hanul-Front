import Head from "next/head";
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Loading from './loading';
import { useEffect, useState } from 'react';
import CustomComponents from "../components/custom/Custom-components";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3초 후에 로딩 상태를 변경하여 메인 페이지로 이동
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".img-fluid", {
      scrollTrigger: {
      trigger: ".img-fluid",
      toggleActions: "restart none reverse none",
      //markers: true,
      start: "top center"
    },
    rotation: 100, x: 300, duration: 1, opacity: 0});
  }, []);

  
  return (
    <div>
      <Head>
        <title>We:lover</title>
        <meta
          name="description"
          content="NextJs UI kit | Free UI kit built with bootstrap"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
