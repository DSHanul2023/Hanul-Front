import "../styles/scss/style.scss";
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import Layout from "../layout/Layout";
import Loading from './loading';
import { useEffect, useState } from 'react';
import CustomComponents from '../components/custom/Custom-components';

function MyApp({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행됨
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  const isRootPath = router.pathname === '/';

  return (
    <div id="main-wrapper">
      {isRootPath ? (
        isLoading ? (
          <Loading />
        ) : (<div>
          <Header />
          <CustomComponents />
          <Footer />
        </div>
        )
      ) : (
        <div>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default MyApp;
