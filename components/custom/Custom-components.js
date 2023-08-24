import React, { useEffect, useState } from "react";

// core components
import Banner2 from "../banner/Banner2";

// sections for this page

import FormBannerComponent from "./sections/formbannercomponent";
import LoginComponent from "./sections/logincomponent";
import ChatComponent from "./sections/chatcomponent";

const CustomComponents = () => {
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("__test_key__", "test_value");
      localStorage.removeItem("__test_key__");
      setIsLocalStorageAvailable(true);
    } catch (error) {
      setIsLocalStorageAvailable(false);
    }
  }, []);
  const token = isLocalStorageAvailable ? localStorage.getItem("ACCESS_TOKEN") : null;

  return (
    <div>
      <Banner2 />
      {!isLocalStorageAvailable || !token ? <FormBannerComponent /> : null}
    </div>
  );
};

export default CustomComponents;
