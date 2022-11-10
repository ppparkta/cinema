import { useState, useEffect } from "react";

function Coin_tracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [need, setNeed] = useState(0);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const selectCoin = (event) => {
    setNeed(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={selectCoin}>
            {coins.map((coin, index) => {
              return (
                <option key={index} value={coin.quotes.USD.price}>
                  {coin.name}({coin.symbol}): {coin.quotes.USD.price.toFixed(2)}
                  USD
                </option>
              );
            })}
          </select>
          <h4>Please enter the amount</h4>
          <input
            type="number"
            value={money}
            placeholder="Enter the money want to change"
            onChange={onChange}
          ></input>
          <h4>
            Coins you can buy:{" "}
            {need > 0 ? (money / need).toFixed(2) : `can't get information`}
          </h4>
        </div>
      )}
    </div>
  );
}

export default Coin_tracker;
