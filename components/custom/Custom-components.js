import React, { useState } from "react";

// core components
import Banner2 from "../banner/Banner2";

// sections for this page
import FormBannerComponent from "./sections/formbannercomponent";
import AnimalBannerComponent from "./sections/animalbannercomponent";
import { Row } from "reactstrap";

const CustomComponents = () => {
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false);
  const [currentSection, setCurrentSection] = useState("banner2");

  // 배경 색상 상태 추가
  const [divBackgroundColor, setDivBackgroundColor] = useState("#EFA374");

  const toggleSection = (sectionName) => {
    setCurrentSection(sectionName);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "banner2":
        return <Banner2 />;
      case "animal":
        return <AnimalBannerComponent />;
      case "form":
        return !isLocalStorageAvailable ? <FormBannerComponent /> : null;
      default:
        return null;
    }
  };

  return (
    <div>
      <Row style={{ backgroundColor: divBackgroundColor, justifyContent: "center" }}>
        <button onClick={() => toggleSection("banner2")} style={{ color: "#645E4E", border: "none", marginRight: "10px", backgroundColor: divBackgroundColor }}>●</button>
        <button onClick={() => toggleSection("form")} style={{ color: "#645E4E", border: "none", marginRight: "10px", backgroundColor: divBackgroundColor }}>●</button>
        <button onClick={() => toggleSection("animal")} style={{color: "#645E4E",  border: "none", backgroundColor: divBackgroundColor}}>●</button>
      </Row>


      {renderCurrentSection()}
    </div>
  );
};

export default CustomComponents;
