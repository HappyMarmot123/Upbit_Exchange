import styled from "styled-components";

export const MiddleBlockSection = styled("section")`
  position: relative;
  margin: 55px 0 0 0;
  height: 400px;
  padding: 5rem 0 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafc
    url(https://cdn.upbit.com/upbit-web/images/main_gal_map.55adf02.png)
    no-repeat center;

  @media screen and (max-width: 1024px) {
    padding: 4rem 0 0;
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

export const JustBannerA = styled("div")`
  height: 5rem;
  background: no-repeat 100%
    url(https://api-manager-production.s3.ap-northeast-2.amazonaws.com/admbnn/1601:bc5c0a94-fbda-4039-85db-b9b0435be781.png?1668503636)
    rgb(2, 50, 173);
  background-size: cover;
`;
export const JustBannerB = styled("div")`
  height: 5rem;
  background: no-repeat 100%
    url(https://api-manager-production.s3.ap-northeast-2.amazonaws.com/admbnn/2227:ce38ee6c-12a3-4994-bab6-945eed2a16bb.png?1696892404)
    rgb(220, 230, 253);
  background-size: cover;
`;
export const JustBannerC = styled("div")`
  height: 5rem;
  background: no-repeat 100%
    url(https://api-manager-production.s3.ap-northeast-2.amazonaws.com/admbnn/2825:d48e44f0-f779-4526-bdde-1167d6181e52.png?1719204832)
    rgb(22, 22, 22);
  background-size: cover;
`;
