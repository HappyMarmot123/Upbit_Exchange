import React, { createContext, useState, ReactNode } from "react";

// **********************************************************************
// *** 사용하는 아이디 리스트 ***
// depositStatus - 입금 상태
// selectedMarket - 선택한 상품
// selectedMarketName - 선택한 상품 이름
// userKRW - 원화 소유금액
// **********************************************************************

interface DepositContextProps {
  contextValue: { [key: string]: string };
  setContextValue: (id: string, value: string) => void;
}

// 페이지에서 임포트해서 사용할 모듈
export const ContextModule = createContext<DepositContextProps | undefined>(
  undefined
);

// 실제 콘텍스트 로직
export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contextValue, setting] = useState<{ [key: string]: string }>({});

  const setContextValue = (id: string, value: string) => {
    setting((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <ContextModule.Provider value={{ contextValue, setContextValue }}>
      {children}
    </ContextModule.Provider>
  );
};
