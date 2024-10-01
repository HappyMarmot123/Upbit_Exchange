# 업비트 API

실제 업비트 계정을 연동하여 자산을 더욱 쉽게 관리해보세요! 🎉   
이제 단 몇 번의 클릭만으로 자산 조회, 원화 입금, 그리고 자산 매수가 가능합니다.   

사용 가능한 기능   
✔️ 자산 조회: 내 업비트 계정의 자산 현황을 한눈에 확인합니다.   
✔️ 원화 입금: 간편하게 원화 입금 기능을 통해 자산을 충전합니다.   
✔️ 자산 매수: 간단한 절차로 원하는 가상 자산을 매수합니다.   

❌ 그 외 기능은 구현하지 않았습니다.   
❌ 주의: 실제 계정이 연결되므로 사용에 유의하시기 바랍니다.   

## 🚀 시작하기   

###  업비트 오픈 API 발급   

업비트에서 발급받은 API키를 .env 파일안에 선언하세요.   
정상적으로 연동되면 프로젝트 실행 후 문제없이 모든 기능을 사용할 수 있습니다.   
(https://upbit.com/service_center/open_api_guide)   

### 로컬서버 실행   

1. 먼저 리액트와 노드의 라이브러리 패키지를 다운로드 받습니다. (npm i)   
2. 리액트 파일을 빌드합니다. 해당 프로젝트는 번들 도구인 Vite를 지원합니다. (npm run build:vite)   
3. 노드 서버를 실행합니다. (npm run dev)   

### 원화입금   

원화를 입금하기 위해 연동된 실명계좌 (예: 케이뱅크) 잔액이 존재할 경우 실제로 입금됩니다.   
계좌에 잔액이 부족할 경우 카카오 인증 후 `잔액 또는 지불 가능 잔액 부족` 사유로 실패됩니다.   
원화 입금은 `5,000원`으로 제한합니다.   

### 종목

원화 거래가 가능한 종목만 조회할 수 있습니다.   
가격 변동폭이 적은 테더(USDT)로 리스크 없는 매수 시도하시기 바랍니다.   
주문금액은 `최소 5,000KRW 최대 10,000KRW` 입니다.   

### 웹소켓   

컴퓨터 성능에 따른 앱 크래쉬 이슈가 발생할 수 있으므로 interval 간격을 `2~3초 이상`으로 세팅할 것을 권장합니다.   
웹소켓이 적용된 기능: `호가조회, 종목정보, 매수상태`   
