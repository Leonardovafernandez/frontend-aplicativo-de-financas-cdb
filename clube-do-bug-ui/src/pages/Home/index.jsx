import { useState } from "react";
import Page from "../../components/General/Page";
import Home from "../../components/PageHome/Home";
import "./style.css";
import { HomeProvider } from "../../contexts/HomeContext";

function HomePage() {
  const [validateSideBar, setValidateSideBar] = useState(0);

  return (
    <HomeProvider>
      <Page validateSideBar={validateSideBar} setValidateSideBar={setValidateSideBar}>        
        <Home />
      </Page>
    </HomeProvider>
  );
}

export default HomePage;
