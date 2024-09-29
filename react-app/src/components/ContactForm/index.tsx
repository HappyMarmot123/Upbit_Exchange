import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps } from "./types";
import { Button } from "../../common/Button";
import { ContactContainer } from "./styles";
import { useContext, useEffect, useState } from "react";
import DepositModalOpen from "../Modal/ModalPopup";
import moment from "moment";
import { ButtonWrapper } from "./styles";
import { Container, Content, TextWrapper } from "../Block/styles";
import { ContextModule } from "../../context/ContextProvider";

interface historyProp {
  amount: string;
  created_at: string;
  currency: string;
  done_at: null;
  fee: string;
  net_type: null;
  state: string;
  transaction_type: string;
  txid: string;
  type: string;
  uuid: string;
}

const Contact = ({ title, content, id, t }: ContactProps) => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;

  const [txid, setTxid] = useState("");
  const [status, setStatus] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [history, setHistory] = useState<historyProp | null>(null);

  useEffect(() => {
    userAccounts();
  }, []);

  const userAccounts = async () => {
    const response = await fetch("/v1/accounts");
    const data = await response.json();

    if (data.length > 0) {
      setAccounts(data);
      setContextValue("userKRW", data[0].balance);
    } else {
      console.error("accounts failed:");
    }
  };

  const handleRefresh = () => {
    if (history) {
      try {
        userAccounts();
        depositHistory();
      } catch (e) {
        alert("refresh fetch error");
        alert(e);
      }
    }
  };

  const depositHistory = async () => {
    const response = await fetch(
      `/v1/deposit/history?txid=${encodeURIComponent(txid)}`
    );
    const data = await response.json();
    processDeposit(data);
  };

  const sendDeposit = async () => {
    const response = await fetch("/v1/deposit/send");
    const data = await response.json();
    processDeposit(data, "sendDeposit");
  };

  const processDeposit = (data: any, param?: any) => {
    if (data.length > 0) {
      const created_at = moment(data[0]?.created_at).format("YYYY.MM.DD_HH:mm");
      const amount = data[0].amount.replace(/\.0+$/, "").toLocaleString();

      switch (data[0].state) {
        case "PROCESSING":
          setStatus("입금 진행중");
          break;
        case "REJECTED":
          setStatus("입금 실패");
          break;
        case "ACCEPTED":
          setStatus("입금 완료");
          break;
      }
      setContextValue("depositStatus", data[0].state);
      setHistory({ ...data[0], created_at: created_at, amount: amount });

      if (param === "sendDeposit") {
        setTxid(data[0].txid);
      }
    }
  };

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const openModal = () => {
    if (countdown <= 0) {
      setDepositModalOpen(true);
      setIsCountdown(true);
      setCountdown(30);
      sendDeposit();
    }
  };
  const closeModal = () => {
    setDepositModalOpen(false);
  };

  const [countdown, setCountdown] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCountdown) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(timer);
            setIsCountdown(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCountdown]);

  return (
    <ContactContainer id={id}>
      <Row
        justify="space-between"
        align="middle"
        style={{
          padding: "2rem 1rem",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <Col
          lg={12}
          md={11}
          sm={24}
          xs={24}
          style={{ display: "grid", justifyContent: "center" }}
        >
          <Slide direction="left" triggerOnce>
            <Container>
              <h6 style={{ fontSize: "20px", marginTop: "0" }}>{t(title)}</h6>
              <TextWrapper>
                <Content>{t(content)}</Content>
              </TextWrapper>
            </Container>
            <ButtonWrapper>
              <Button onClick={openModal}>
                {isCountdown ? countdown : "입금하기"}
              </Button>
              <Button color="white" onClick={handleRefresh}>
                새로고침
              </Button>
            </ButtonWrapper>
            {history && (
              <>
                <p
                  className="css-1kn6t8k"
                  style={{ width: "400px", borderBottom: "1px solid #d6d8db" }}
                >
                  {history?.created_at}
                </p>
                <div style={{ width: "400px" }}>
                  <div
                    className="css-1nmeflg"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="css-139b19o">
                      <span
                        className="css-ibgu1b"
                        style={{
                          lineHeight: "21px",
                          fontWeight: "inherit",
                          fontSize: "14px",
                          color: "rgb(200, 74, 49)",
                        }}
                      >
                        {status && status}
                      </span>
                      <div className="css-0">
                        <span
                          className="css-be1fqg"
                          style={{
                            lineHeight: "19px",
                            fontWeight: "inherit",
                            fontSize: "13px",
                            color: "rgb(142, 146, 155)",
                          }}
                        >
                          txid: {history.txid}
                        </span>
                      </div>
                    </div>
                    <div className="css-1fuc94h">
                      <p className="css-c48ud8">
                        <b>{history.amount}</b> <i>{history.currency}</i>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right" triggerOnce>
            <div className="css-1s4fxp9">
              <table className="css-8atqhb">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <thead className="css-142tlk6 css-xdiq7k">
                  <tr className="css-1ssbn0c">
                    <th className="css-1njmbmf">코인명</th>
                    <th className="css-14t5sgh">
                      <a href="" className="css-1efmu1c">
                        보유수량
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          className="css-1hgro7d"
                        >
                          <use href="#N_sort_12"></use>
                        </svg>
                      </a>
                    </th>
                    <th className="css-dbissl">
                      <a href="" className="css-124urwl">
                        평가금액
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="css-11avl2t"
                        >
                          <use href="#N_switch_16"></use>
                        </svg>
                      </a>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "400px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0px",
                  overflowY: "scroll",
                  marginRight: "-17px",
                  marginBottom: "-17px",
                }}
              >
                <div className="css-tev1mt">
                  <table className="css-8atqhb" style={{ width: "100%" }}>
                    <colgroup>
                      <col style={{ width: "30%" }} />
                      <col style={{ width: "30%" }} />
                      <col style={{ width: "40%" }} />
                    </colgroup>
                    <tbody className="css-1k04qh9" style={{ width: "520px" }}>
                      {accounts.length > 0 &&
                        accounts.map((item: any) => (
                          <tr
                            className="css-1gouakb"
                            style={{
                              borderTop: "1px solid var(--theme-colors-line_1)",
                            }}
                          >
                            <td className="css-kub49d">
                              <div className="css-makz8n">
                                <em className="logo"></em>
                                <div className="css-0">
                                  <p className="css-1v9p6ny">{item.currency}</p>
                                </div>
                              </div>
                            </td>
                            <td className="css-v7390g">
                              <div
                                className="css-rhx1db"
                                style={{ width: "0%" }}
                              >
                                <span className="css-l1ok">{item.balance}</span>
                              </div>
                            </td>
                            <td className="css-jcklev">
                              <p className="css-12jjfyd">
                                <b>{item.avg_buy_price.replace(/\.0+$/, "")}</b>{" "}
                                <i>{item.unit_currency}</i>
                              </p>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Slide>
        </Col>
      </Row>
      {depositModalOpen && (
        <DepositModalOpen
          closeModal={closeModal}
          title={"인증 전송"}
          content={
            "카카오톡 지갑으로 서명 요청을 전송하였습니다. 금액이 5,000 KRW 인지 확인하세요."
          }
        />
      )}
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
