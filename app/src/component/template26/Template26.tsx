import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template26Props {
  formData: FormData;
}

const Template26: React.FC<Template26Props> = ({ formData }) => {
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

  // Helper: parse number from string (remove commas)
  const parseNumber = (value: string | number | undefined, defaultValue: number): number => {
    if (value === undefined || value === null) return defaultValue;
    const parsed = parseFloat(String(value).replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Amount in USD (from formData.amount) â€“ default $108.51
  const amountUSD = parseNumber(formData.amount, 108.51);
  // Fee in USD (from formData.fee) â€“ default $0.000011? But fee is in USD, so we'll use a small default like 0.000011 USD? Actually the original placeholder was "0.000011BTC". Since fee is now in USD, we set a sensible default e.g. 0.50 USD.
  // But to match the visual, we'll assume the client provides fee in USD. Default 0.50 USD (approx 0.00000833 BTC at 60k)
  const feeUSD = parseNumber(formData.fee, 0.50);

  // Effective rate - use API value, show 0 if unavailable
  const rate = btcUsdRate !== null && btcUsdRate > 0 ? btcUsdRate : 0;

  // Convert to BTC (divide USD by rate to get BTC)
  const amountBTC = rate > 0 ? amountUSD / rate : 0;
  const feeBTC = rate > 0 ? feeUSD / rate : 0;

  // Format BTC with 8 decimals
  const formatBTC = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const amountBTCFormatted = formatBTC(amountBTC);
  const feeBTCFormatted = formatBTC(feeBTC);

  // Format USD values
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const amountUSDFormatted = formatUSD(amountUSD);
  const feeUSDFormatted = formatUSD(feeUSD);
  const pricePerCoinFormatted = formatUSD(rate);

  // Format transaction hash (txid) with ellipsis
  const formatTxid = (txid: string | undefined): string => {
    const defaultTxid = 'qdkswz...f5y0it';
    if (!txid) return defaultTxid;
    if (txid.length <= 13) return txid;
    return `${txid.slice(0, 6)}...${txid.slice(-6)}`;
  };

  // Format address into two lines with indentation on second line
  const formatAddress = (address: string | undefined): React.ReactNode => {
    const defaultAddr = 'bclqzw8hywvtyws6r4zn5x4vkxnj70wxe0z9wynquk';
    const addr = address || defaultAddr;
    const splitIndex = 23;
    const firstLine = addr.slice(0, splitIndex);
    const secondLine = addr.slice(splitIndex);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span>{firstLine}</span>
        <span style={{ marginLeft: '24px' }}>{secondLine}</span>
      </div>
    );
  };

  // Loading or error handling â€“ we always show values (with fallback rate)
  const showLoading = loading && btcUsdRate === null;

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
  width: 369.375px;
  height: 800px;
  margin: 0 auto;
  background: #000000;
}
.groups {
  position: relative;
  width: 369.375px;
  height: 593.125px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 7;
  overflow: visible auto;
}
.groups-1 {
  position: relative;
  width: 369.375px;
  height: 301.25px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 30;
  overflow: visible auto;
}
.groups-2 {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 40;
}
.time-marker {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 303.125px;
  bottom: 11.25px;
  color: #bcbcbc;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 700;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 44;
}
.image {
  position: absolute;
  width: 23.75px;
  height: 11.875px;
  right: 17.5px;
  bottom: 12.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/gfa3C08ah1.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.image-3 {
  position: absolute;
  width: 15.625px;
  height: 11.875px;
  right: 46.25px;
  bottom: 12.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/nT4bYqAoFJ.png)
    no-repeat center;
  background-size: cover;
  z-index: 42;
}
.image-4 {
  position: absolute;
  width: 16.25px;
  height: 10.625px;
  right: 66.875px;
  bottom: 13.125px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/pQvq1RWJx7.png)
    no-repeat center;
  background-size: cover;
  z-index: 43;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 38;
  overflow: visible auto;
}
.image-6 {
  position: relative;
  width: 7.5px;
  height: 15px;
  margin: 15.625px 0 0 22.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/8T5Ukf6jzM.png)
    no-repeat center;
  background-size: cover;
  z-index: 39;
}
.groups-7 {
  position: relative;
  width: 369.375px;
  height: 120px;
  margin: 27.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 34;
  overflow: visible auto;
}
.image-8 {
  position: relative;
  width: 34.375px;
  height: 34.375px;
  margin: 6.25px 0 0 167.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/xcUPLjUY5a.png)
    no-repeat center;
  background-size: cover;
  z-index: 37;
}
.deposited {
  display: block;
  position: relative;
  height: 26.875px;
  margin: 10px 0 0 53.125px;
  color: #d9d9d9;
  font-family: Inter, var(--default-font-family);
  font-size: 21.875px;
  font-weight: 700;
  line-height: 26.474px;
  text-align: left;
  white-space: nowrap;
  z-index: 36;
}
.amount {
  display: block;
  position: relative;
  height: 16.875px;
  margin: 3.125px 0 0 146.25px;
  color: #525252;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 35;
}
.image-9 {
  position: absolute;
  width: 30.625px;
  height: 30px;
  right: 316.25px;
  bottom: 23.125px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/dg7U7nocwX.png)
    no-repeat center;
  background-size: cover;
  z-index: 33;
}
.completed {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17px;
  right: 21.875px;
  bottom: 29.875px;
  color: #9d9d9d;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 31;
}
.status {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 260px;
  bottom: 30.625px;
  color: #b7b7b7;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 32;
}
.groups-a {
  position: relative;
  width: 369.375px;
  height: 295px;
  margin: -3.125px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 8;
  overflow: visible auto;
}
.background {
  position: relative;
  width: 369.375px;
  height: 1.875px;
  margin: 1.25px 0 0 0;
  background: #010101;
  z-index: 29;
}
.groups-b {
  position: relative;
  width: 369.375px;
  height: 268.75px;
  margin: 18.75px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 9;
  overflow: visible auto;
}
.groups-c {
  position: relative;
  width: 369.375px;
  height: 49.375px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 25;
}
.eth-price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.125px;
  right: 21.875px;
  bottom: 15.625px;
  color: #919191;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17.397px;
  text-align: left;
  white-space: nowrap;
  z-index: 26;
}
.price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 311.25px;
  bottom: 16.875px;
  color: #c8c8c8;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.image-d {
  position: absolute;
  width: 13.125px;
  height: 12.5px;
  right: 293.75px;
  bottom: 18.125px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/CXOx6RZ8Yf.png)
    no-repeat center;
  background-size: cover;
  z-index: 27;
}
.groups-e {
  position: relative;
  width: 369.375px;
  height: 48.75px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 21;
}
.ethereum-erc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.125px;
  right: 21.875px;
  bottom: 16.875px;
  color: #818181;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.network {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 286.875px;
  bottom: 18.125px;
  color: #b6b6b6;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.image-f {
  position: absolute;
  width: 13.75px;
  height: 14.375px;
  right: 151.875px;
  bottom: 18.75px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/OkqF1C9GOs.png)
    no-repeat center;
  background-size: cover;
  z-index: 23;
}
.groups-10 {
  position: relative;
  width: 369.375px;
  height: 49.375px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 17;
}
.transaction-id {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17px;
  right: 41.25px;
  bottom: 18.625px;
  color: #999999;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.transaction-id-11 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 246.875px;
  bottom: 18.75px;
  color: #cacaca;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.image-12 {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 23.75px;
  bottom: 20px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/iqngHerTxC.png)
    no-repeat center;
  background-size: cover;
  z-index: 18;
}
.groups-13 {
  position: relative;
  width: 369.375px;
  height: 63.125px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.oxedadfecd {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 189.375px;
  height: 36.875px;
  right: 38.75px;
  bottom: 15px;
  color: #838383;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.074px;
  text-align: right;
  text-overflow: initial;
  z-index: 15;
  overflow: hidden;
}
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 288.75px;
  bottom: 34.375px;
  color: #b6b6b6;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 16;
}
.image-14 {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 23.75px;
  bottom: 26.25px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/XUDS49yZP3.png)
    no-repeat center;
  background-size: cover;
  z-index: 14;
}
.groups-15 {
  position: relative;
  width: 369.375px;
  height: 53.75px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 10;
}
.apr-date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 21.875px;
  bottom: 21.25px;
  color: #8e8e8e;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 18.153px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 311.875px;
  bottom: 23.75px;
  color: #b8b8b8;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 700;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.groups-16 {
  position: relative;
  width: 369.375px;
  height: 53.125px;
  margin: 110px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
  overflow: visible auto;
}
.button {
  position: relative;
  width: 328.75px;
  height: 49.375px;
  margin: 1.875px 0 0 20px;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
  overflow: visible auto;
}
.background-17 {
  position: relative;
  width: 323.125px;
  height: 45.625px;
  margin: 1.875px 0 0 3.125px;
  background: #bbfe2f;
  border: 0.63px solid #a6cf46;
  z-index: 5;
  border-radius: 24.375px;
}
.view-blockchain {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 71.875px;
  bottom: 13.75px;
  color: #344e12;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 700;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.background-18 {
  position: relative;
  width: 130px;
  height: 5px;
  margin: 31.25px 0 0 120px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/ENec1fFnum.png)
    no-repeat center;
  background-size: cover;
  z-index: 2;
}



      `}</style>

<>
 
  <title>Generated by Codia AI</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  />
  <link rel="stylesheet" href="index.css" />
  <div className="main-container">
    <div className="groups">
      <div className="groups-1">
        <div className="groups-2">
          <span className="time-marker">2:45</span>
          <div className="image" />
          <div className="image-3" />
          <div className="image-4" />
        </div>
        <div className="groups-5">
          <div className="image-6" />
        </div>
        <div className="groups-7">
          <div className="image-8" />
          <span className="deposited">Deposited 0.690741 ETH</span>
          <span className="amount">~$1,602.29</span>
        </div>
        <div className="image-9" />
        <span className="completed">Completed</span>
        <span className="status">Status</span>
      </div>
      <div className="groups-a">
        <div className="background" />
        <div className="groups-b">
          <div className="groups-c">
            <span className="eth-price">$2,319.67/ETH</span>
            <span className="price">Price</span>
            <div className="image-d" />
          </div>
          <div className="groups-e">
            <span className="ethereum-erc">Ethereum (ERC20)</span>
            <span className="network">Network</span>
            <div className="image-f" />
          </div>
          <div className="groups-10">
            <span className="transaction-id">0x80e...c8856</span>
            <span className="transaction-id-11">Transaction ID</span>
            <div className="image-12" />
          </div>
          <div className="groups-13">
            <span className="oxedadfecd">
              Oxe20da998dfecd9bf1d88
              <br />
              6770b59ceb50c125808f
            </span>
            <span className="address">Address</span>
            <div className="image-14" />
          </div>
          <div className="groups-15">
            <span className="apr-date">Apr 8,2026 12:24AM</span>
            <span className="time">Time</span>
          </div>
        </div>
      </div>
    </div>
    <div className="groups-16">
      <div className="button">
        <div className="background-17">
          <span className="view-blockchain">View on blockchain explorer</span>
        </div>
      </div>
    </div>
    <div className="background-18" />
  </div>
  {/* Generated by Codia AI - https://codia.ai/ */}
</>


    </>
  );
};

export default Template26;