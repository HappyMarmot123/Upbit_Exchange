import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { SideBar } from "../components/marketSearch/SideBar";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "../css/exchange.css";
import sample from "../exchange-sample.json"; // 데이터 차트용 샘플
import OrderBook from "../components/OrderBook";
import { ContextModule } from "../context/ContextProvider";
import Ticker from "../components/Ticker";
import React from "react";

const Exchange = () => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;
  const intervalRef = useRef<any>();

  const [selectedMarket, setSelectedMarket] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [candleData, setCandleData] = useState([]);
  const [marketOrder, setMarketOrder] = useState(null);
  const [marketTicker, setMarketTicker] = useState(null);

  const socketRef = useRef<any>(null);
  const socketRef2 = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:4001");
    socketRef2.current = new WebSocket("ws://localhost:4002");

    socketRef.current.onopen = () => {
      console.log("웹소켓1 연결 성공");
      setIsConnected(true);
    };
    socketRef2.current.onopen = () => {
      console.log("웹소켓2 연결 성공");
    };

    socketRef.current.onmessage = (event: { data: any }) => {
      const data = JSON.parse(event.data);
      setMarketOrder(data);
    };
    socketRef2.current.onmessage = (event: { data: any }) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === "ticker") {
        setMarketTicker(data);
      }
      if (data.type === "myOrder") {
        console.log("myOrdermyOrdermyOrdermyOrdermyOrdermyOrdermyOrdermyOrdermyOrdermyOrder");
        setMarketTicker(data);
      }
    };

    return () => {
      if (socketRef.current) {
        console.log("웹소켓 연결 끊김");
        socketRef.current.close();
        setIsConnected(false);
      }
      if (socketRef2.current) {
        console.log("웹소켓 연결 끊김");
        socketRef2.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const market = contextValue?.selectedMarket || undefined;
    if (market) {
      setSelectedMarket(market);
    }
  }, [contextValue]);

  useEffect(() => {
    userAccounts();
    if (selectedMarket) {
      candle();
      mySocket();
    }
  }, [selectedMarket]);

  const userAccounts = async () => {
    const response = await fetch("/v1/market");
    const data: [] = await response.json();
    if (data.length > 0) {
      const filterData = data.filter((item: any) => {
        const [one, two] = item.market.split("-");
        return one === "KRW";
      });
      setMarketData(filterData);
    }
  };

  const candle = async () => {
    if (selectedMarket) {
      const response = await fetch(
        `/v1/candle?market=${encodeURIComponent(selectedMarket)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const candleData = data.map((item: any) => [
          item.timestamp,
          item.opening_price,
          item.high_price,
          item.low_price,
          item.trade_price,
        ]);
        setCandleData(candleData.reverse());
      }
    }
  };

  const mySocket = async () => {
    if (selectedMarket) {
      try {
        console.log("mySocket");
        console.log(selectedMarket);
        await fetch(
          `/local/websocket/api?market=${encodeURIComponent(selectedMarket)}`
        );
      } catch (error) {
        console.error("orderbook fetch error:", error);
      }
    }
  };

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  const test = () => {
    if (isConnected) {
      socketRef.current.send("hi");
    }
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    chart: {
      style: {
        height: 450,
      },
    },
    title: {
      text: contextValue?.selectedMarketName,
    },
    rangeSelector: {
      selected: 1,
    },
    navigator: {
      series: {
        color: "#000000",
      },
    },
    series: [
      {
        type: "candlestick",
        color: "#FF7F7F",
        upColor: "#90EE90",
        data: candleData,
        lastPrice: {
          enabled: true,
          label: {
            enabled: true,
            backgroundColor: "#FF7F7F",
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="exchange-wrapper">
        <div className="left-wrapper">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            constructorType={"stockChart"}
          />
          <div className="components-wrapper">
            {marketOrder && <OrderBook order={marketOrder} />}
            {marketTicker && (
              <Ticker ticker={marketTicker} socketRef2={socketRef2} />
            )}
          </div>
        </div>
        <SideBar marketData={marketData} />
      </div>
      <div id="scroll-footer" onClick={test} />
    </>
  );
};

export default React.memo(Exchange);
