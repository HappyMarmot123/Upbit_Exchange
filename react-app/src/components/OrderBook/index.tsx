import React, { useContext, useLayoutEffect, useState } from "react";
import "../../css/orderbook.css";
import styled from "styled-components";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { ContextModule } from "../../context/ContextProvider";

interface OrderBookProps {
  order: {
    level: number;
    code: string;
    orderbook_units: any[];
    timestamp: number;
    total_ask_size: number; //일괄취소
    total_bid_size: number; //총수량
  };
}

const OrderBook = ({ order }: OrderBookProps): JSX.Element => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;

  const gage = (item: any) => {
    const percentage = (item / order.total_bid_size) * 100;
    return Math.max(10, Math.min(percentage, 90));
  };

  const formatNum = (num: number) => {
    return parseFloat(num.toFixed(3)).toLocaleString();
  };

  const isLoad = () => {
    if (contextValue.selectedMarket !== order.code) {
      return <LoadingSpinner />;
    }
  };

  return (
    <>
      <div className="order-wrapper">
        {isLoad()}
        <div className="order-overflow-wrapper">
          <table className="order-table">
            <tbody className="order-table-body">
              {order.orderbook_units.map((item: any, index) => (
                <tr>
                  <td className="order-td high-price">
                    <strong className="order-price">
                      {index === 0 && <span>평균가</span>}{" "}
                      {index === order.orderbook_units.length - 1 && (
                        <span>최고가</span>
                      )}{" "}
                      {item.ask_price.toLocaleString()}
                    </strong>
                  </td>
                  <td className="order-td order-quantity high-price">
                    <BidGage width={gage(item.ask_size)}>
                      <a>{formatNum(item.ask_size)}</a>
                    </BidGage>
                  </td>
                  <td className="order-td low-price">
                    <strong className="order-price">
                      {index === 0 && <span>평균가</span>}{" "}
                      {index === order.orderbook_units.length - 1 && (
                        <span>최저가</span>
                      )}{" "}
                      {item.bid_price.toLocaleString()}
                    </strong>
                  </td>
                  <td className="order-td order-quantity low-price">
                    <AskGage width={gage(item.bid_size)}>
                      {formatNum(item.bid_size)}
                    </AskGage>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <table className="total-table">
          <tbody className="order-table-body">
            <tr className="total">
              <td colSpan={2}>{formatNum(order.total_ask_size)}</td>
              <td>수량</td>
              <td>{formatNum(order.total_bid_size)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const BidGage = styled.a<{ width: any }>`
  width: ${(props) => props.width}%;
  height: 100%;
  float: right;
  background: rgba(18, 97, 196, 0.15);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;
const AskGage = styled.a<{ width: any }>`
  width: ${(props) => props.width}%;
  height: 100%;
  float: right;
  background: rgba(200, 74, 49, 0.15);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;

export default React.memo(OrderBook);
