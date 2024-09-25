import styled from "styled-components";

export const MiddleBlockSection = styled("section")`
  position: relative;
  margin: 55px 0 0 0;
  padding: 5rem 0 3rem;
  text-align: center;
  display: flex;
  justify-content: center;
  background: #f9fafc
    url(https://cdn.upbit.com/upbit-web/images/main_gal_map.55adf02.png)
    no-repeat center;

  @media screen and (max-width: 1024px) {
    padding: 4rem 0 3rem;
  }
`;

export const Content = styled("p")`
  padding: 0.75rem 0 0.75rem;
`;

export const ContentWrapper = styled("div")`
  max-width: 570px;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const BitconImage = styled("i")`
  position: absolute;
  top: 255px;
  left: 60px;
  width: 62px;
  height: 82px;
  background: rgba(0, 0, 0, 0)
    url(https://cdn.upbit.com/upbit-web/images/ico01.64bffa8.png) no-repeat
    center center;
`;
