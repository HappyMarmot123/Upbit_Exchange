import styled from "styled-components";

export const ScrollWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 10;
`;

export const ScrollUpContainer = styled("div")<{
  show: boolean;
}>`
  color: white;
  padding: 10px;
  cursor: pointer;
  background: linear-gradient(
      180deg,
      #241355,
      #131c5559 61.77988648414612%,
      #131c5500
    ),
    linear-gradient(270deg, #0f0627, #0f0627);
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${(p) => (p.show ? "visible" : "hidden")};
  opacity: ${(p) => (p.show ? "1" : "0")};
  display: flex;

  &:hover {
    background: linear-gradient(
        rgb(75, 50, 150),
        rgba(50, 80, 150, 0.35) 61.7799%,
        rgba(50, 80, 150, 0)
      ),
      linear-gradient(270deg, rgb(60, 30, 100), rgb(60, 30, 100));
  }
`;

export const Div = styled("div")`
  padding: 5px;
`;
