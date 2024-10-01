import { useContext, useEffect, useState } from "react";
import { ContextModule } from "../../context/ContextProvider";
import TickerInfo from "./tickerInfo";
import React from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import ModalPopup from "../Modal/ModalPopup";
import axios from "axios";
import { Bounce, ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Refresh from "../../images/icon_refresh.svg";
import { addAutoComma, removeComma } from "../../common/Util";

interface TickerProps {
  ticker: {
    code: string;
    acc_trade_volume_24h: number; //거래량
    acc_trade_price_24h: number; //거래 대금
    high_price: number; //당일고가
    low_price: number; //당일저가
    trade_price: number; //현재가
  };
  socketRef2: any;
  orderStatus: any;
}

const Ticker = ({
  ticker,
  socketRef2,
  orderStatus,
}: TickerProps): JSX.Element => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;

  const [ableAmount, setAbleAmount] = useState(
    parseInt(contextValue?.userKRW) || 0
  );
  const [title, setTitle] = useState("매수 안내");
  const [content, setContent] = useState("");
  const [useConfirm, setUseConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [purchase, setPurchase] = useState("0");
  const [orderQuantity, setOrderQuantity] = useState("0");
  const [orderPrice, setOrderPrice] = useState("0");
  const [tradeInfo, setTradeInfo] = useState<any>({});

  useEffect(() => {
    const chase = parseInt(removeComma(purchase));
    const quantity = parseInt(removeComma(orderQuantity));
    const price = chase * quantity || 0;

    setOrderPrice(addAutoComma(price.toString()));
  }, [purchase, orderQuantity]);

  useEffect(() => {
    if (parseInt(removeComma(orderPrice)) > 10000) {
      setOrderQuantity("0");
      setOrderPrice("0");
      setContent("주문 총액은 1만원 미만으로 제한하고 있습니다.");
      return openModal();
    }
  }, [orderPrice]);

  useEffect(() => {
    console.log(orderStatus);
    setTradeInfo(orderStatus);
  }, [orderStatus]);

  useEffect(() => {
    if (tradeInfo?.state === "wait") {
      toastInfo();
    }
    if (tradeInfo?.state === "cancel") {
      toast.dismiss();
      toastError();
    }
    if (tradeInfo?.state === "trade" || tradeInfo?.state === "done") {
      console.log(tradeInfo);
      toast.dismiss();
      toastSuccess();
    }
  }, [tradeInfo]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setUseConfirm(false);
  };
  const handleNext = () => {
    closeModal();
    submitForm();
  };

  const isLoad = () => {
    if (contextValue.selectedMarket !== ticker.code) {
      return <LoadingSpinner />;
    }
  };

  const formatNum = (num: number) => {
    return parseFloat(num.toFixed(3)).toLocaleString();
  };

  const handlePurchaseMinus = () => {
    if (!purchase || purchase === "") {
      return;
    }
    const value = parseInt(removeComma(purchase)) - 50;
    return setPurchase(addAutoComma(value.toString()));
  };
  const handlePurchasePluse = () => {
    if (!purchase || purchase === "") {
      return;
    }
    const value = parseInt(removeComma(purchase)) + 50;
    return setPurchase(addAutoComma(value.toString()));
  };

  const handlePurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = removeComma(e.target.value).replace(/^0+/, "");
    setPurchase(addAutoComma(inputValue));
  };
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderQuantity(addAutoComma(e.target.value));
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderPrice(addAutoComma(e.target.value));
    setOrderQuantity("0");
  };

  const handleFieldValue = () => {
    setPurchase("0");
    setOrderQuantity("0");
    setOrderPrice("0");
  };

  const handleValidate = async () => {
    const removedCommaPrice = parseInt(removeComma(orderPrice));
    if (parseInt(purchase) <= 0 || purchase === "") {
      setContent("매수가격을 입력해주세요.");
      return openModal();
    }
    if (parseInt(orderQuantity) <= 0 || orderQuantity === "") {
      setContent("주문수량을 입력해주세요.");
      return openModal();
    }
    if (removedCommaPrice <= 0 || orderPrice === "") {
      setContent("주문총액을 입력해주세요.");
      return openModal();
    }
    if (removedCommaPrice >= 10000) {
      setContent("주문 총액은 1만원 미만으로 제한하고 있습니다.");
      return openModal();
    }
    if (removedCommaPrice <= 5000) {
      setContent("최소주문금액 이상으로 주문해주세요");
      return openModal();
    }

    setUseConfirm(true);
    setContent("주문을 하시겠습니까?");
    return openModal();
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("market", ticker.code);
    formData.append("side", "bid");
    formData.append("volume", orderQuantity);
    formData.append("price", removeComma(purchase));
    formData.append("ord_type", "limit");
    // const formData = {
    //   market: ticker.code,
    //   side: "bid",
    //   volume: orderQuantity,
    //   price: removeComma(orderPrice),
    //   ord_type: "price",
    // };

    axios
      .post("/v1/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          socketRef2.current.send("success_send_trade_order");
          setTradeInfo(response.data);

          setTimeout(() => {
            myOrder(response);
          }, 2000);
          return;
        } else {
          setContent("다시 시도해주세요. (devTool network 확인할 것) ");
          openModal();
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const myOrder = (param: any) => {
    axios
      .post("/v1/order", { uuid: param.data.uuid })
      .then((r: any) => {
        const response = r?.data;
        if (response?.state === "trade" || response?.state === "done") {
          setTradeInfo(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const toastInfo = () =>
    toast("주문이 완료되었습니다. 체결이 완료되는 대로 알려드려요.", {
      position: "top-center",
      isLoading: true,
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  const toastSuccess = () =>
    toast.success("체결이 완료되었습니다.", {
      position: "top-center",
      draggable: true,
      progress: undefined,
      transition: Bounce,
    });
  const toastError = () =>
    toast.error("주문을 취소하였습니다.", {
      position: "top-center",
      draggable: true,
      progress: undefined,
      transition: Bounce,
    });

  return (
    <div className="ticker-wrapper">
      {isLoad()}
      <TickerInfo ticker={ticker} />
      <div className="control">
        <div className="css-makz8n">
          <div className="css-0">주문가능</div>
          <div className="css-rp19l">
            <span className="css-1go6adv">{formatNum(ableAmount)}</span>
            <span className="css-vzydk5">KRW</span>
          </div>
        </div>
        <div className="css-1z0ow5i"></div>
        <div className="css-kj0ywf">
          <div className="css-0">
            매수가격 <span className="css-1nodk1f">(KRW)</span>
          </div>
          <div className="css-0">
            <div className="css-ihz6y5">
              <div className="css-xx6yfy">
                <input
                  type="text"
                  className="css-sw8u0u"
                  value={purchase}
                  onChange={handlePurchase}
                  maxLength={6}
                />
                <div className="css-sw8u0u-btn-box">
                  <button
                    className="css-sw8u0u-btn"
                    title="-"
                    onClick={handlePurchaseMinus}
                  >
                    -
                  </button>
                  <button
                    className="css-sw8u0u-btn"
                    title="+"
                    onClick={handlePurchasePluse}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="css-kj0ywf">
          <div className="css-0">주문수량</div>
          <div className="css-0">
            <div className="css-ihz6y5">
              <div className="css-xx6yfy">
                <input
                  type="text"
                  className="css-sw8u0u"
                  value={orderQuantity}
                  onChange={handleQuantity}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="css-kj0ywf">
          <div className="css-0">주문총액</div>
          <div className="css-0">
            <div className="css-ihz6y5">
              <div className="css-xx6yfy">
                <input
                  type="text"
                  className="css-sw8u0u"
                  value={orderPrice}
                  onChange={handlePrice}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="css-bttz06">
          <div className="css-8u2gvj">
            <div className="css-1ae2wvk">
              <span className="css-1vr1881">최소주문금액: 5,000.0 KRW</span>
            </div>
            <div className="css-1ae2wvk">
              <span className="css-1vr1881">수수료(부가세 포함): 0.05%</span>
            </div>
          </div>
          <div className="css-5cufzs">
            <a
              title="초기화"
              className="css-1xupxm9"
              onClick={handleFieldValue}
            >
              초기화
            </a>
            <a
              title="매수"
              className="css-1xupxm9"
              style={{ backgroundColor: "#c84a31" }}
              onClick={handleValidate}
            >
              매수
            </a>
          </div>
        </div>
      </div>
      <ToastContainer newestOnTop={false} transition={bounce} />
      {modalOpen && (
        <ModalPopup
          confirm={useConfirm}
          handleNext={handleNext}
          closeModal={closeModal}
          title={title}
          content={content}
        />
      )}
    </div>
  );
};

export default React.memo(Ticker);
