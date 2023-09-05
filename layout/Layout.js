import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useRouter } from 'next/router';


const Layout = ({ children }) => {
  const router = useRouter();

  if (router.pathname === "/loading") {
    return (
      <div id="main-wrapper">
        <div className="page-wrapper">
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div id="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="container-fluid">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
