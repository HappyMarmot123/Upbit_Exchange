const TickerInfo = (ticker: any) => {
  return (
    <>
      <span className="first">
        <div className="css-makz8n">
          <em className="logo"></em>
          <div className="css-0">
            <p className="css-1v9p6ny">{ticker?.ticker?.code}</p>
          </div>
        </div>
        <strong>{ticker?.ticker?.trade_price?.toLocaleString()}</strong>
        <em>KRW</em>
      </span>
      <dl>
        <dt>거래량</dt>
        <dd>
          {ticker?.ticker?.acc_trade_volume_24h?.toLocaleString()} <i>(24h)</i>
        </dd>
        <dt>거래대금</dt>
        <dd>
          {ticker?.ticker?.acc_trade_price_24h?.toLocaleString()} <i>백만원</i>
        </dd>
      </dl>
      <dl>
        <dt>당일고가</dt>
        <dd className="up">
          {ticker?.ticker?.high_price}
          <em className="up">+</em>
        </dd>
        <dt>당일저가</dt>
        <dd className="down">
          {ticker?.ticker?.low_price}
          <em className="down">-</em>
        </dd>
      </dl>
    </>
  );
};

export default TickerInfo;
