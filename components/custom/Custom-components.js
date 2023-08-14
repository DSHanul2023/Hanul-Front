import React from "react";

// core components
import Banner2 from "../banner/Banner2";

// sections for this page

import FormBannerComponent from "./sections/formbannercomponent";
import LoginComponent from "./sections/logincomponent";
import ChatComponent from "./sections/chatcomponent";

const CustomComponents = () => {
  return (
    <div>
      <Banner2 />
      <FormBannerComponent />
    </div>
  );
};

export default CustomComponents;
