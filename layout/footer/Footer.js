/* eslint-disable */
import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer4 b-t spacer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Address</h5>
            {/* <p>덕성여자대학교</p> 
            <p>대한민국 서울특별시 도봉구 삼양로 144길 33</p>
            <p>우편번호: 01369</p> */}
            <p>덕성여자대학교</p> 
            <p>대한민국 서울특별시 도봉구<br/>삼양로 144길 33<br/></p>
            <p>우편번호: 01369</p>

            {/* <p>덕성여자대학교<br/> 
            대한민국 서울특별시 도봉구 삼양로 144길 33<br/>
            우편번호: 01369</p> */}

          </Col>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Phone</h5>
            <p>
              Reception : +82 2 901 7000 <br />
              Office : +82 2 901 8341
            </p>
          </Col>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Email</h5>
            <p>
              Office : 
              <Link href="#" className="link">
              hanul8939@gmail.com
              </Link>
              {/* <br />
              Site :
              <Link href="https://www.wrappixel.com" className="link">
                wrappixel.com
              </Link> */}
            </p>
          </Col>
          <Col lg="3" md="6">
            <h5 className="m-b-20">Social</h5>
            <div className="round-social light">
              <Link href="https://www.facebook.com/DukSungWU" className="link">

                <i className="fa fa-facebook"></i>

              </Link>

              <Link href="https://blog.naver.com/dswuniv_blog" className="link">

              <i className="fa fa-bold"></i>

              </Link>
              <Link href="https://www.youtube.com/channel/UCrda7r7df_GPinyBULMA6CA" className="link">

                <i className="fa fa-youtube-play"></i>

              </Link>
              <Link href="https://www.instagram.com/duksung_official/" className="link">

                <i className="fa fa-instagram"></i>

              </Link>
            </div>
          </Col>
        </Row>

        {/* <div className="f4-bottom-bar">
          <Row>
            <Col md="12">
              <div className="d-flex font-14">
                <div className="m-t-10 m-b-10 copyright">
                  All Rights Reserved by{" "}
                  <Link href="https://www.wrappixel.com" className="link">
                    wrappixel.com
                  </Link>
                </div>
                <div className="links ml-auto m-t-10 m-b-10">
                  <Link href="#" className="p-10 p-l-0">
                    Terms of Use
                  </Link>
                  <Link href="#" className="p-10">
                    Legal Disclaimer
                  </Link>
                  <Link href="#" className="p-10">
                    Privacy Policy
                  </Link>
                </div>
              </div> 
            </Col>
          </Row>
        </div> */}

      </Container>
    </div>
  );
};
export default Footer;
