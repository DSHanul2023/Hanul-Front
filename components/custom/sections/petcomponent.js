import React, { useState } from "react";
import { Container, ButtonGroup, Button } from "reactstrap";
import Image from "next/image";
import { useRouter } from 'next/router';
import { petimages } from "./petImages";
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
        <Container className="pet text-center">
            <div className="pettitle"><h2>Choose Your Pet Bot</h2>
            <h5>채팅하고 싶은 펫을 골라보세요</h5>
            </div>
            <br/>
            <ButtonGroup>
                <div className="paginationdiv">
                <Button className="paginationbtn" onClick={handlePrevImage}>{"<"}</Button></div>
                <div className="petimg">
                <Image
                    src={currentImage}
                    alt="img"
                    className="img"
                    width={150}
                    height={150}
                    onClick={handleImageClick}/>
                </div>
                <div className="paginationdiv">
                <Button className="paginationbtn" onClick={handleNextImage}>{">"}</Button></div>
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
        </Container>
    );
};

export default PetComponent;