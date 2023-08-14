import Head from "next/head";
import MovieDetailComponent from "../components/custom/sections/movieDetailcomponent";

export default function moviedetail() {
    return (
      <div>
        <Head>
          <title>We:lover - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MovieDetailComponent />
      </div>
    );
  }