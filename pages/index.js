import Head from "next/head";
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react';
import CustomComponents from "../components/custom/Custom-components";

export default function Home() {
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
      <CustomComponents />
    </div>
  );
}
