import { lazy, useContext, useEffect, useState } from "react";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
import ContactContent from "../content/ContactContent.json";
import { ContextModule } from "../context/ContextProvider";
import React from "react";

const Contact = lazy(() => import("../components/ContactForm"));
const MiddleBlock = lazy(() => import("../components/MiddleBlock"));
const Container = lazy(() => import("../common/Container"));
const ScrollToTop = lazy(() => import("../common/ScrollToTop"));
const Exchange = lazy(() => import("./Exchange"));
const Header = lazy(() => import("./Header"));

const Home = () => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;
  const [showup, setShowup] = useState(false);

  useEffect(() => {
    if (contextValue.openExchange === "true") {
      setShowup(true);
    }
  }, [contextValue]);

  useEffect(() => {
    const element = document.getElementById("scroll-footer") as HTMLDivElement;
    if (showup && element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [showup]);

  return (
    <>
      <Header />
      <Container>
        <ScrollToTop />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
        />
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        />
        {true && <Exchange />}
      </Container>
    </>
  );
};

export default React.memo(Home);
