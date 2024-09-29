require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const upload = multer();
const { WebSocketServer } = require("ws");
const PORT = process.env.PORT || 4000;
const app = express();

const upbit = require("./upbit");
const { publicWS, privateWS } = require("./websocket");

//////////////////////////////////////////////
//////////////////////////////////////////////

app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 으로 API 서버가 실행되었습니다.`);
});

//////////////////////////////////////////////
//////////////////////////////////////////////

let marketName = null;

const socket = new WebSocketServer({
  port: 4001,
});
const socket2 = new WebSocketServer({
  port: 4002,
});

// orderbook: 호가조회
// ticker: 종목 정보
socket.on("connection", (ws) => {
  ws.interval = setInterval(async () => {
    if (ws.readyState === ws.OPEN && marketName) {
      const orderbook = await publicWS({
        type: "orderbook",
        codes: marketName,
      });
      ws.send(orderbook);
    }
  }, 2000);
});

socket2.on("connection", (ws) => {
  ws.interval = setInterval(async () => {
    if (ws.readyState === ws.OPEN && marketName) {
      const myOrder = await privateWS({
        type: "myOrder",
        codes: "KRW-DOGE",
      });
      console.log(myOrder);
      ws.send(myOrder);
    }
  }, 2000);
  ws.interval = setInterval(async () => {
    if (ws.readyState === ws.OPEN && marketName) {
      const ticker = await publicWS({
        type: "ticker",
        codes: marketName,
      });
      ws.send(ticker);
    }
  }, 2000);

  ws.on("message", async (data) => {
    const teestst = data.toString("utf-8");

    if (teestst === "283462378y48uwguio") {
    }
  });
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// 웹소켓 시작
app.get("/local/websocket/api", (req, res) => {
  const market = req.query.market || undefined;

  if (!market) {
    return res.status(400).send("market is required");
  }

  try {
    console.log(market);
    marketName = market;

    res.send("success request data to node");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//////////////////////////////////////////////
//////////////////////////////////////////////

const consoleLog = (label, data) => {
  // console.log(label);
  // console.log(data);
};

// 계좌조회
app.get("/v1/accounts", (req, res) => {
  upbit.accounts((error, data) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    consoleLog("계좌조회:", data);
    res.send(data);
  });
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// 입금
app.get("/v1/deposit/send", async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    upbit.deposit((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });

  const deposit = await new Promise((resolve, reject) => {
    upbit.depositsList(data.txid, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });

  consoleLog("입금조회:", deposit);
  res.send(deposit);
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// 입금 리스트 조회
app.get("/v1/deposit/history", async (req, res) => {
  const txid = req.query.txid;

  if (!txid) {
    return res.status(400).send("txid is required");
  }

  const deposit = await new Promise((resolve, reject) => {
    upbit.depositsList(txid, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });

  consoleLog("입금조회:", deposit);
  res.send(deposit);
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// 마켓 조회
app.get("/v1/market", async (req, res) => {
  const market = await new Promise((resolve, reject) => {
    upbit.marketList((error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });

  consoleLog("마켓조회:", market);
  res.send(market);
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// 캔들 (일 단위)
app.get("/v1/candle", async (req, res) => {
  const market = req.query.market;

  if (!market) {
    return res.status(400).send("market is required");
  }

  const candle = await new Promise((resolve, reject) => {
    upbit.candle(market, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });

  consoleLog("캔들 (일 단위):", candle);
  res.send(candle);
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// 매수
app.post("/v1/orders", upload.none(), async (req, res) => {
  const orderData = req.body;

  if (!orderData) {
    return res.status(400).send("필수값을 body에 담아 요청하세요.");
  }
  if (parseInt(orderData.price) > 10000) {
    return res.status(400).send("1만원 미만으로 매수 시도하세요.");
  }

  const orders = await new Promise((resolve, reject) => {
    upbit.orders(orderData, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });

  consoleLog("매수:", orders);
  res.send(orders);
});

//////////////////////////////////////////////
//////////////////////////////////////////////
//TODO: 항상 최하단에 위치해야 합니다

app.use(express.static(path.join(__dirname, "../../react-app/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../react-app/build", "index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../react-app/build", "index.html"));
});
