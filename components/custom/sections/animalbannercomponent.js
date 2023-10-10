import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import Image from "next/image";
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import siginupimage from "../../../assets/images/form-banners/banner1/siginupimage.jpg";
import dog1 from "../../../public/profile/dog11.png";
import dog2 from "../../../public/profile/dog12.png";
import dog3 from "../../../public/profile/Group 10.png";
import dog4 from "../../../public/profile/Group 11.png";
import dog5 from "../../../public/profile/Group 13.png";
import dog6 from "../../../public/profile/Group 14.png";
import dog7 from "../../../public/profile/Group 15.png";
import dog8 from "../../../public/profile/Group 17.png";
import dog9 from "../../../public/profile/Group 18.png";
import dog10 from "../../../public/profile/Group 19.png";
import { useRouter } from "next/router";
import Link from 'next/link';
import { petcontents,petlist } from "./petImages";
const AnimalBannerComponent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1); 

  const handleImageClick = (index) => {
    if (selectedImageIndex === index) {
      setSelectedImageIndex(-1);
      gsap.to(".image-container", { scale: 1 });
      gsap.to(`#dogImage${selectedImageIndex}`, { scale: 1 });
    } else {
      setSelectedImageIndex(index);
      gsap.to(`#dogImage${index}`, { scale: 1.1 });
      if (selectedImageIndex !== -1) {
        gsap.to(`#dogImage${selectedImageIndex}`, { scale: 1 });
      }
    }
  };

  const dogImages = [
    dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8, dog9, dog10
  ];

  return (
    <div>
      <div className="bg-light">
        <section>
          <div id="banner1" className="banner" style={{paddingTop:"100px", paddingBottom:"100px"}}>
            <Container>
              <Row className="anibanner justify-content-center">
                <Col lg="12" md="7" className="align-self-center">
                  <h2 className="title text-darkbrown font-bold" style={{ fontSize: "30px" }}>
                    CHOOSE YOUR PETBOT!
                  </h2><h3 className="title text-darkbrown font-bold">다양한 강아지 펫봇을 만나보세요!</h3>
                  <div className="d-flex justify-content-center align-items-end">
                    {dogImages.map((dogImage, index) => (
                      <div
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`image-container ${selectedImageIndex !== -1 && selectedImageIndex !== index ? "blurred" : ""}`}
                      >
                        <Image
                          id={`dogImage${index}`}
                          src={dogImage}
                          alt="We are Digital Agency"
                          width={90}
                        />
                      </div>
                    ))}
                  </div>
                  <Col className="d-flex align-items-center justify-content-center">
                    <div className="chat-div text-center">
                    {selectedImageIndex !== -1 ? (
                    <>
                    <h4>{petlist[selectedImageIndex]}</h4>
                    <p style={{marginBottom:"0px"}}>{petcontents[selectedImageIndex]}</p>
                    </>
                    ) : (
                    <p style={{marginBottom:"0px"}}>강아지를 클릭해 더 자세히 알아보세요!</p>
                    )}
                    </div>
                  </Col>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimalBannerComponent;
