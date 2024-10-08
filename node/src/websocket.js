const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");

const access_key = process.env.UPBIT_ACCESS_KEY;
const secret_key = process.env.UPBIT_SECRET_KEY;

const publicWS = (obj) => {
  return new Promise((resolve, reject) => {
    const payload = {
      access_key: access_key,
      nonce: uuidv4(),
    };

    const jwtToken = jwt.sign(payload, secret_key);

    let ws = new WebSocket(`wss://api.upbit.com/websocket/v1`, {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    });

    ws.on("open", () => {
      ws.send(
        `[{"ticket":"${uuidv4()}"},{"type":"${obj.type}","codes":["${
          obj.codes
        }"],"isOnlyRealtime": true}]`
      );
    });

    ws.on("message", (msg) => {
      const dataString = msg.toString();
      resolve(dataString);
    });

    ws.on("error", (error) => {
      reject(error);
    });

    ws.on("close", () => {
      console.log("WebSocket disconnected");
    });
  });
};

const privateWS = (obj) => {
  return new Promise((resolve, reject) => {
    const payload = {
      access_key: access_key,
      nonce: uuidv4(),
    };

    const jwtToken = jwt.sign(payload, secret_key);

    let ws = new WebSocket(`wss://api.upbit.com/websocket/v1/private`, {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    });

    ws.on("open", () => {
      ws.send(
        `[{"ticket":"${uuidv4()}"},{"type":"${
          obj.type
        }","isOnlyRealtime": true}]`
      );
    });

    ws.on("message", (msg) => {
      const dataString = msg.toString();
      resolve(dataString);
    });

    ws.on("error", (error) => {
      reject(error);
    });

    ws.on("close", () => {
      console.log("WebSocket disconnected");
    });
  });
};

module.exports = { publicWS, privateWS };
