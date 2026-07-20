import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template20Props {
  formData: FormData;
}

const Template20: React.FC<Template20Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  const [btcUsdRate, setBtcUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live BTC/USD rate from CoinGecko
  useEffect(() => {
    const fetchBtcUsdRate = async () => {
      try {
          const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'bitcoin',
              vs_currencies: 'usd'
            }
          }
        )
        const data = await response.data;
        const rate = data.bitcoin?.usd;
        if (rate && typeof rate === 'number' && rate > 0) {
          setBtcUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch BTC/USD rate:', err);
        setBtcUsdRate(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBtcUsdRate();
  }, []);

  // Parse USD amount (remove commas if any) with default 2600.39
  const rawAmountUSD = (() => {
    if (formData.amount) {
      const parsed = parseFloat(String(formData.amount).replace(/,/g, ''));
      return isNaN(parsed) ? 2600.39 : parsed;
    }
    return 2600.39;
  })();

  // Compute BTC value - use API value, handle 0 rate
  const effectiveRate = btcUsdRate !== null && btcUsdRate > 0 ? btcUsdRate : 0;
  const amountBTC = effectiveRate > 0 ? rawAmountUSD / effectiveRate : 0;

  // Format BTC with 8 decimal places
  const formatBTC = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const amountBTCFormatted = formatBTC(amountBTC);

  // Format USD for display
  const formattedAmountUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rawAmountUSD);

  // Helper (unused but kept for consistency)
  const formatReceiver = (address: string) => {
    const splitIndex = 23;
    const firstLine = address.slice(0, splitIndex);
    const secondLine = address.slice(splitIndex);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span>{firstLine}</span>
        <span style={{ marginLeft: '24px' }}>{secondLine}</span>
      </div>
    );
  };

  return (
    <>
      <style>{`
    :root {
  --default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
    "Source Han Sans CN", sans-serif;
}

.main-container {
  overflow: hidden;
}

.main-container,
.main-container * {
  box-sizing: border-box;
}

input,
select,
textarea,
button {
  outline: 0;
}

.main-container {
  position: relative;
  width: 368.125px;
  height: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
}
.root {
  position: absolute;
  height: 800px;
  top: 0;
  right: 0;
  left: 0;
  background: #eef2fb;
}
.groups {
  position: relative;
  width: 368.125px;
  height: 42.5px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 22;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 292.5px;
  bottom: 8.125px;
  color: #2f3034;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 700;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.image {
  position: absolute;
  width: 26.875px;
  height: 13.75px;
  right: 33.75px;
  bottom: 8.75px;
  background: url(${assetBase}template20/J4sKMXYBmC.png)
    no-repeat center;
  background-size: cover;
  z-index: 23;
}
.image-1 {
  position: absolute;
  width: 16.25px;
  height: 12.5px;
  right: 66.25px;
  bottom: 9.375px;
  background: url(${assetBase}template20/Q5QK7eSzt9.png)
    no-repeat center;
  background-size: cover;
  z-index: 24;
}
.image-2 {
  position: absolute;
  width: 18.125px;
  height: 11.25px;
  right: 88.75px;
  bottom: 10px;
  background: url(${assetBase}template20/7PZsStmYOn.png)
    no-repeat center;
  background-size: cover;
  z-index: 25;
}
.image-3 {
  position: absolute;
  width: 12.5px;
  height: 12.5px;
  right: 274.375px;
  bottom: 8.75px;
  background: url(${assetBase}template20/OBVMEV6Cpq.png)
    no-repeat center;
  background-size: cover;
  z-index: 26;
}
.groups-4 {
  position: relative;
  width: 368.125px;
  height: 36.25px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 19;
}
.crypto-sent-comp {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 124.375px;
  bottom: 5px;
  color: #43454a;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 700;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.image-5 {
  position: absolute;
  width: 15.625px;
  height: 13.125px;
  right: 333.125px;
  bottom: 7.5px;
  background: url(${assetBase}template20/nvg1syLs8C.png)
    no-repeat center;
  background-size: cover;
  z-index: 21;
}
.groups-6 {
  position: relative;
  width: 350px;
  height: 279.375px;
  margin: 3.125px 0 0 8.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  overflow: visible auto;
}
.groups-7 {
  position: relative;
  width: 343.125px;
  height: 97.5px;
  margin: 0 0 0 3.125px;
  background: rgba(0, 0, 0, 0);
  z-index: 12;
  overflow: visible auto;
}
.background {
  position: relative;
  width: 340.625px;
  height: 95px;
  margin: 1.875px 0 0 1.875px;
  background: #fefefe;
  z-index: 13;
  border-radius: 20px;
}
.plus-btc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 15px;
  bottom: 35.625px;
  color: #669387;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 13.615px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.image-8 {
  position: absolute;
  width: 40.625px;
  height: 40px;
  right: 288.125px;
  bottom: 9.375px;
  background: url(${assetBase}template20/fYT7ho2Oay.png)
    no-repeat center;
  background-size: cover;
  z-index: 14;
}
.bitcoin-btc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 201.25px;
  bottom: 35px;
  color: #545454;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 13.615px;
  text-align: left;
  white-space: nowrap;
  z-index: 18;
}
.currency {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.125px;
  right: 16.25px;
  bottom: 18.125px;
  color: #616161;
  font-family: Inter, var(--default-font-family);
  font-size: 9.375px;
  font-weight: 600;
  line-height: 11.346px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.date-time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.75px;
  right: 171.875px;
  bottom: 16.25px;
  color: #5b5b5b;
  font-family: Inter, var(--default-font-family);
  font-size: 10px;
  font-weight: 700;
  line-height: 12.102px;
  text-align: left;
  white-space: nowrap;
  z-index: 16;
}
.groups-9 {
  position: relative;
  width: 350px;
  height: 48.125px;
  margin: 8.125px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 8;
  overflow: visible auto;
}
.background-a {
  position: relative;
  width: 340px;
  height: 45px;
  margin: 1.25px 0 0 5.625px;
  background: #fefefe;
  z-index: 9;
  border-radius: 20.625px;
}
.blockchain-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 65.625px;
  bottom: 20.625px;
  color: #5c5c5c;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 500;
  line-height: 13.615px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.image-b {
  position: absolute;
  width: 18.125px;
  height: 18.125px;
  right: 306.875px;
  bottom: 15px;
  background: url(${assetBase}template20/NEgZ4r7gai.png)
    no-repeat center;
  background-size: cover;
  z-index: 10;
}
.source {
  display: block;
  position: relative;
  height: 13.75px;
  margin: 19.375px 0 0 5px;
  color: #4e5054;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 700;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 7;
}
.groups-c {
  position: relative;
  width: 347.5px;
  height: 80px;
  margin: 12.5px 0 0 1.25px;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
  overflow: visible auto;
}
.background-d {
  position: relative;
  width: 340.625px;
  height: 76.25px;
  margin: 1.25px 0 0 3.75px;
  font-size: 0px;
  background: #fefefe;
  z-index: 3;
  overflow: visible auto;
  border-radius: 21.875px;
}
.span {
  display: block;
  position: relative;
  height: 15px;
  margin: 11.875px 0 0 14.375px;
  color: #606060;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 13.615px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.external-crypto {
  display: block;
  position: relative;
  height: 14.375px;
  margin: 3.75px 0 0 13.125px;
  color: #676767;
  font-family: Inter, var(--default-font-family);
  font-size: 10px;
  font-weight: 700;
  line-height: 12.102px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.show-transaction {
  display: block;
  position: relative;
  height: 14.375px;
  margin: 3.125px 0 0 12.5px;
  color: #779fb8;
  font-family: Inter, var(--default-font-family);
  font-size: 10px;
  font-weight: 700;
  line-height: 12.102px;
  text-align: left;
  white-space: nowrap;
  z-index: 4;
}


      `}</style>

      <>
        <div className="main-container">
          <div className="root">
            <StatusBar defaultTheme="light" />
            <div className="groups-4">
              <span className="crypto-sent-comp">Crypto sent-Completed</span>
              <div className="image-5" />
            </div>
            <div className="groups-6">
              <div className="groups-7">
                <div className="background">
                  <span className="plus-btc">
                    {loading ? 'Loading...' : `+${amountBTCFormatted} BTC`}
                  </span>
                  <div className="image-8" />
                  <span className="bitcoin-btc">Bitcoin (BTC)</span>
                  <span className="currency">{formattedAmountUSD}</span>
                  <span className="date-time">{Dates.formatTemplate20(formData.date)}</span>
                </div>
              </div>
              <div className="groups-9">
                <div className="background-a">
                  <span className="blockchain-info">
                    The transfer was added to the blockchain.
                  </span>
                  <div className="image-b" />
                </div>
              </div>
              <span className="source">From</span>
              <div className="groups-c">
                <div className="background-d">
                  <span className="span">
                    {formData.sender || "bc1q7cfxwf8qdkn4xr3awjhgkr3lq5fc7mpvf55lv8"}
                  </span>
                  <span className="external-crypto">External crypto address</span>
                  <span className="show-transaction">Show transaction info</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Template20;