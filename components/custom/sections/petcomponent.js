import React, { useState } from "react";
import { Container, ButtonGroup, Button, Row, Col } from "reactstrap";
import Image from "next/image";
import { useRouter } from 'next/router';
import { petimages,petlist } from "./petImages";
import signupimage from "../../../assets/images/logos/Group 40.png"; // 추가 이미지 경로

const PetComponent = () => {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % petimages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? petimages.length - 1 : prevIndex - 1
        );
    };

    const handlePageChange = (newIndex) => {
        setCurrentImageIndex(newIndex);
    };

    const handleImageClick = () => {
        console.log("선택된 이미지의 배열 번호:", currentImageIndex);
        localStorage.setItem("PET_NUM", currentImageIndex);
        router.push('/chat');
    };

    const currentImage = petimages[currentImageIndex];

    return (
        <div className="d-flex flex-column align-items-center justify-content-center full-height">
            <Container className="pet text-center">
                <div className="pettitle">
                    <h2>Choose Your Pet Bot</h2>
                    <h5>채팅하고 싶은 펫을 골라보세요</h5>
                </div>
                <div className="petcontent">
                <ButtonGroup>
                    <div className="paginationdiv">
                        <Button className="paginationbtn" onClick={handlePrevImage}>{"<"}</Button>
                    </div>
                    <div className="petcard">
                    <div className="petimg">
                        <Image
                            src={currentImage}
                            alt="img"
                            className="img"
                            width="175"
                            height="auto"
                            onClick={handleImageClick}
                        />
                    </div>
                    <h5>
                        {petlist[currentImageIndex]}
                    </h5> 
                    </div>
                    <div className="paginationdiv">
                        <Button className="paginationbtn" onClick={handleNextImage}>{">"}</Button>
                    </div>
                </ButtonGroup>
                <div className="pagination mt-4 d-flex justify-content-center">
                    {petimages.map((image, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`square-button ${
                                currentImageIndex === index ? "active" : ""
                            }`}
                        >
                        </Button>
                    ))}
                </div>
                </div>
            </Container>
            <div className="text-center"style={{ marginBottom: "40px" }}>
                <Image
                    src={signupimage}
                    alt="Signup"
                    className="img"
                    width="auto"
                    height={250}
                />
            </div>
        </div>
    );
};

export default PetComponent;
