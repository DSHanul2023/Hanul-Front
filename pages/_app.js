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
    // 3초 후에 로딩 상태를 변경하여 메인 페이지로 이동
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const isRootPath = router.pathname === '/';

  return (
    <div>
        {isLoading ? <div id="main-wrapper"><Loading /></div> : <div id="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="container-fluid">{isRootPath ? (
                <CustomComponents />
              ) : (
                <Component {...pageProps} />
              )}</div>
      </div>
      <Footer />
    </div>}
    </div>
    
  );
}

export default MyApp;
