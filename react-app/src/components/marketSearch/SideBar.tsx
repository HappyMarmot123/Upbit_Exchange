import "../../css/SideBar.css";
import { MenuItemState } from "./MenuItemState";
import { useContext, useEffect, useState } from "react";
import { ContextModule } from "../../context/ContextProvider";

interface ISideBarProps {
  className?: string;
  marketData?: any[];
}

export const SideBar = ({
  className,
  marketData,
  ...props
}: ISideBarProps): JSX.Element => {
  const context = useContext(ContextModule);

  if (!context) {
    throw new Error("Input must be used within an InputProvider-");
  }

  const { contextValue, setContextValue } = context;

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const [tabItems, setTabItems] = useState([
    {
      id: 0,
      text: "전체",
    },
    {
      id: 1,
      text: "상단10",
    },
    {
      id: 2,
      text: "추천",
    },
  ]);

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [allMenu, setAllMenu] = useState<any[]>([]);
  const [top10Menu, setTop10Menu] = useState<any[]>([]);
  const [recommandMenu, setRecommandMenu] = useState<any[]>([]);

  useEffect(() => {
    if (marketData) {
      const data = marketData.map((item, index) => ({
        id: index,
        kor_name: item.korean_name,
        market: item.market,
      }));

      if (data.length > 0) {
        const top10 = data.slice(0, 10);
        const recommand = data.filter((item: any) => item.kor_name === "테더");

        setAllMenu(data);
        setTop10Menu(top10);
        setRecommandMenu(recommand);
        if (isFirstRender) {
          console.log("here???");
          setContextValue("selectedMarket", data[0].market);
          setContextValue("selectedMarketName", data[0].kor_name);
          setIsFirstRender(false);
        }
      }
    }
  }, [marketData]);

  useEffect(() => {
    switch (selectedTab) {
      case 0:
        setMenuItems(allMenu);
        break;
      case 1:
        setMenuItems(top10Menu);
        break;
      case 2:
        setMenuItems(recommandMenu);
        break;
    }
  }, [selectedTab, allMenu, top10Menu, recommandMenu]);

  const handleTabClick = (id: number) => {
    setSelectedTab(id);
  };
  const handleMenuClick = (item: any) => {
    console.log("click???");
    setSelectedMenu(item.id);
    setContextValue("selectedMarket", item.market);
    setContextValue("selectedMarketName", item.kor_name);
  };

  return (
    <div className={"side-bar " + className}>
      <div className="header">
        <div className="tab-wrapper">
          {tabItems.map((item) => (
            <MenuItemState
              key={item.id}
              text={item.text}
              state={item.id === selectedTab ? "selected" : "default"}
              onClick={() => handleTabClick(item.id)}
              componentName="Tab"
            />
          ))}
        </div>
      </div>
      <div className="main">
        <div className="menu">
          <div className="links">
            {menuItems.length > 0 &&
              menuItems.map((item) => (
                <MenuItemState
                  key={item.id} // Use unique key for each item
                  text={item}
                  state={item.id === selectedMenu ? "selected" : "default"}
                  onClick={() => handleMenuClick(item)}
                  componentName="Menu"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
