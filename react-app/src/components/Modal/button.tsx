import { Link } from "react-router-dom";
import cx from "classnames";

interface ButtonProps {
  href?: boolean;
  // className?: string;
  className?: "type_border" | string;
  buttonStyle?: React.CSSProperties;
  text: string;
  useCamera?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  text,
  className,
  buttonStyle,
  href,
  isDisabled,
  useCamera,
  onClick,
}: ButtonProps) {
  return (
    <>
      {href ? (
        <Link to="/" className={cx(className, "btn")}>
          {text}
        </Link>
      ) : (
        <button
          style={{ ...buttonStyle }}
          className={cx(className, "btn")}
          onClick={onClick}
          disabled={isDisabled}
        >
          {text}
        </button>
      )}
    </>
  );
}
