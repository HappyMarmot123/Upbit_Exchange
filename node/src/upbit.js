const jwt = require("jsonwebtoken");
const sign = require("jsonwebtoken").sign;
const request = require("request");
const { v4: uuidv4 } = require("uuid");
const queryEncode = require("querystring").encode;
const crypto = require("crypto");

const access_key = process.env.UPBIT_ACCESS_KEY;
const secret_key = process.env.UPBIT_SECRET_KEY;
const server_url = process.env.UPBIT_SERVER_URL;

const payload = {
  access_key: access_key,
  nonce: uuidv4(),
};

const token = jwt.sign(payload, secret_key);

//////////////////////////////////////////////
//////////////////////////////////////////////

const options = {
  method: "GET",
  url: server_url + "/v1/accounts",
  headers: { Authorization: `Bearer ${token}` },
};

const accounts = (callback) => {
  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

const deposit = (callback) => {
  const body = {
    amount: "5000",
    two_factor_type: "kakao",
  };

  const query = queryEncode(body);
  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };
  const token = sign(payload, secret_key);

  const options = {
    method: "POST",
    url: server_url + "/v1/deposits/krw",
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };
  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

const depositsList = (txid, callback) => {
  const currency = "KRW";
  const txids = [txid];
  const non_array_body = {
    currnecy: currency,
  };
  const array_body = {
    txids: txids,
  };
  const body = {
    ...non_array_body,
    ...array_body,
  };
  const txid_query = txids.map((id) => `txids[]=${id}`).join("&");
  const query = queryEncode(non_array_body) + "&" + txid_query;

  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = jwt.sign(payload, secret_key);

  const options = {
    method: "GET",
    url: server_url + "/v1/deposits?" + query,
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };

  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

const order = (uuid, callback) => {
  const body = {
    uuid: uuid,
    // uuid: '94332e99-3a87-4a35-ad98-28b0c969f830'
  };

  const query = queryEncode(body);

  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = sign(payload, secret_key);

  const options = {
    method: "GET",
    url: server_url + "/v1/order?" + query,
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };

  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};
//////////////////////////////////////////////
//////////////////////////////////////////////

const marketList = (callback) => {
  const options = {
    uri: "https://api.upbit.com/v1/market/all?isDetails=false",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

const candle = (market, callback) => {
  const options = {
    uri: `https://api.upbit.com/v1/candles/days?market=${market}&count=100`,
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

const orders = (orderData, callback) => {
  const query = queryEncode(orderData);
  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = sign(payload, secret_key);

  const options = {
    method: "POST",
    url: server_url + "/v1/orders",
    headers: { Authorization: `Bearer ${token}` },
    json: orderData,
  };

  request(options, (error, response, body) => {
    if (callback) {
      callback(error, body);
    }
  });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

module.exports = {
  accounts,
  deposit,
  depositsList,
  order,
  marketList,
  candle,
  orders,
};
