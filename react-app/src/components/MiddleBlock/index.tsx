import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import {
  MiddleBlockSection,
  Content,
  ContentWrapper,
  BitconImage,
  JustBannerA,
  JustBannerB,
  JustBannerC,
} from "./styles";
import { useContext } from "react";
import { ContextModule } from "../../context/ContextProvider";
import DepositModalOpen from "../Modal/ModalPopup";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface MiddleBlockProps {
  title: string;
  content: string;
  button: string;
  t: TFunction;
}

const MiddleBlock = ({ title, content, button, t }: MiddleBlockProps) => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;

  const openExchange = () => {
    if (
      contextValue.depositStatus === "PROCESSING" ||
      contextValue.depositStatus === "ACCEPTED" ||
      contextValue.depositStatus === "REJECTED"
    ) {
      setContextValue("openExchange", "true");
    }
  };

  return (
    <>
      <MiddleBlockSection id="middle-block-section">
        <BitconImage />
        <Slide direction="up" triggerOnce>
          <Row justify="center" align="middle">
            <ContentWrapper>
              <Col lg={24} md={24} sm={24} xs={24}>
                <h1 className="middle-block-title">{t(title)}</h1>
                <Content>{t(content)}</Content>
                {button && (
                  <>
                    <Button name="submit" onClick={openExchange}>
                      {t(button)}
                    </Button>
                  </>
                )}
              </Col>
            </ContentWrapper>
          </Row>
        </Slide>
      </MiddleBlockSection>
      <Swiper
        direction="vertical"
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        height={80}
        className="mySwiper"
        modules={[
          Autoplay,
          // , Pagination, Navigation
        ]}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
      >
        <SwiperSlide>
          <JustBannerA />
        </SwiperSlide>
        <SwiperSlide>
          <JustBannerB />
        </SwiperSlide>
        <SwiperSlide>
          <JustBannerC />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default withTranslation()(MiddleBlock);
