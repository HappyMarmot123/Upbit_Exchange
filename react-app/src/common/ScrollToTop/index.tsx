import { useCallback, useEffect, useState } from "react";
import { ScrollUpContainer, ScrollWrapper, Div } from "./styles";
import arrow from "../../images/sel-on.png";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    const offsetFromTop = window.scrollY;

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true);
    } else if (offsetFromTop <= 350) {
      setShowScroll(false);
    }
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [checkScrollTop]);

  const scrollUp = () => {
    const element = document.getElementById(
      "middle-block-section"
    ) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <ScrollWrapper id="sticky-remote-controller">
      <ScrollUpContainer onClick={scrollUp} show={showScroll}>
        <Div>위로</Div>
      </ScrollUpContainer>
    </ScrollWrapper>
  );
};

export default ScrollToTop;
