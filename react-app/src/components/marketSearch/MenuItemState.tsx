import "../../css/MenuItemState.css";

interface ObjType {
  [key: string]: any;
}

export interface IMenuItemStateProps {
  key: number;
  text?: ObjType | string;
  state?: "default" | "selected";
  componentName?: string;
  onClick?: () => void; // Add onClick handler
}

export const MenuItemState = ({
  key,
  text,
  state = "selected",
  componentName,
  onClick,
  ...props
}: IMenuItemStateProps) => {
  const variantsClassName = "state-" + state;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {componentName === "Tab" && typeof text === "string" && (
        <div
          key={key}
          className={`tab-${state} tab-item`}
          onClick={handleClick}
        >
          {text}
        </div>
      )}
      {componentName === "Menu" && typeof text === "object" && (
        <div
          key={key}
          className={`menu-item-state-${state} ${variantsClassName}`}
          onClick={handleClick}
        >
          <div className="item">
            {text.kor_name}
            {"_"}
            {text.market}
          </div>
        </div>
      )}
    </>
  );
};
