# Info 🚀

❌ No Clone Coding

1. 노드와 리액트(TypeScript)를 연동한 프로젝트 입니다.
2. 서버 관련은 노드에서, 페이지와 라우팅 그리고 API 모듈은 리액트가 담당합니다.

# 실행 방법 🚀

1. 개발 환경과 같은 Visual Studio Code에서 프로젝트를 클론합니다.
2. 리액트와 노드의 라이브러리 패키지를 다운로드 받습니다. (npm i)
3. 리액트 파일을 리액트 프로젝트 경로에서 html으로 빌드합니다. (npm run build)
4. 노드 프로젝트 경로에서 서버를 실행합니다. (npm run dev)

# 모듈 관련 🚀

1. 카카오 맵의 경우 개인 키를 발급받아 도메인을 적용해야 합니다. 경로: react-app/public/index.html (https://apis.map.kakao.com/web/guide/)
2. 페이먼츠 API는 테스트용으로 키 발급이 필요하지 않습니다. (https://docs.tosspayments.com/guides/v2/payment-widget/integration?frontend=react)
3. 페이먼츠 API는 테스트용으로 실제로 결제가 되지 않습니다.
4. 스크립트 모듈은 public 디렉토리의 index.html에 선언합니다.
5. 라이브러리 모듈을 새로운 객체로서 페이지에서 사용하려면 tsconfig 세팅이 필요합니다. (예: "types": ["kakao.maps.d.ts"] )

# 그 외 🚀

1. 타입스크립트 세팅(tsconfig.json) 완료된 상태입니다.
2. 리액트 인덱스에 BrowserRouter 컴포넌트로 앱을 감싸주지 않으면 에러(react-dom.production.min.js:188)가 발생합니다.
3. 페이먼츠 API 관련 에러는 다음과 같습니다.

- Uncaught (in promise) Invalid Selector Error: selector가 유효하지 않습니다.

원화를 입금하기 위해 연동된 입출금계좌 (예: 케이뱅크) 잔액이 존재할 경우 실제로 입금 됩니다. 잔액이 없을 경우 `잔액 또는 지불가능잔액 부족` 사유로 입금 시도는 실패됩니다.
