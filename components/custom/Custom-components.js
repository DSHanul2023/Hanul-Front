import React, { useState } from "react";

// core components
import Banner2 from "../banner/Banner2";

// sections for this page
import FormBannerComponent from "./sections/formbannercomponent";
import AnimalBannerComponent from "./sections/animalbannercomponent";

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
      <div style={{ backgroundColor: divBackgroundColor }}>
        <button onClick={() => toggleSection("banner2")}>Banner2</button>
        <button onClick={() => toggleSection("form")}>Form</button>
        <button onClick={() => toggleSection("animal")}>Animal</button>
      </div>
      {renderCurrentSection()}
    </div>
  );
};

export default CustomComponents;
