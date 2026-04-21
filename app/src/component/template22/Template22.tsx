import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template23Props {
  formData: FormData;
}

const Template23: React.FC<Template23Props> = ({ formData }) => {
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
}
.root {
  position: absolute;
  height: 800px;
  top: 0;
  right: 0;
  left: 0;
  background: #000000;
}
.groups {
  position: relative;
  width: 369.375px;
  height: 46.875px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 28;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 304.375px;
  bottom: 16.25px;
  color: #bebebe;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 32;
}
.image {
  position: absolute;
  width: 23.75px;
  height: 12.5px;
  right: 17.5px;
  bottom: 17.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/NwHhM5wYV4.png)
    no-repeat center;
  background-size: cover;
  z-index: 29;
}
.image-1 {
  position: absolute;
  width: 15.625px;
  height: 11.875px;
  right: 46.25px;
  bottom: 17.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/GSWEOq59Sk.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.image-2 {
  position: absolute;
  width: 16.25px;
  height: 11.25px;
  right: 66.875px;
  bottom: 18.125px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/5X3x2Oqqu5.png)
    no-repeat center;
  background-size: cover;
  z-index: 31;
}
.groups-3 {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 25;
}
.withdrawal-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 115px;
  bottom: 10.625px;
  color: #c6c6c6;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 26;
}
.image-4 {
  position: absolute;
  width: 15.625px;
  height: 15.625px;
  right: 335px;
  bottom: 10.625px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/WFL7iHNs5j.png)
    no-repeat center;
  background-size: cover;
  z-index: 27;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 365px;
  margin: 30.625px 0 0 0;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
  overflow: visible auto;
}
.quantity {
  display: block;
  position: relative;
  height: 16.25px;
  margin: 0 0 0 158.75px;
  color: #565656;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.usdt {
  display: block;
  position: relative;
  height: 23px;
  margin: 6.875px 0 0 139.375px;
  color: #dadada;
  font-family: Inter, var(--default-font-family);
  font-size: 18.75px;
  font-weight: 700;
  line-height: 22.692px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.flex-row-dd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 160.625px;
  height: 17.5px;
  margin: 7px 0 0 103.125px;
  z-index: 22;
}
.image-6 {
  flex-shrink: 0;
  position: relative;
  width: 13.75px;
  height: 13.75px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/Weu1PyCmbT.png)
    no-repeat center;
  background-size: cover;
  z-index: 22;
}
.withdrawal-compl {
  flex-shrink: 0;
  position: relative;
  height: 17.5px;
  color: #2d8760;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 17.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 21;
}
.groups-7 {
  position: relative;
  width: 369.375px;
  height: 239.375px;
  margin: 55px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 7;
  overflow: visible auto;
}
.groups-8 {
  position: relative;
  width: 369.375px;
  height: 35px;
  margin: -0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 18;
}
.withdrawal-accou {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 227.5px;
  bottom: 9px;
  color: #4c4d4f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.funding-account {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 14.375px;
  bottom: 8.125px;
  color: #bbbbbb;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.fees {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.125px;
  right: 324.375px;
  bottom: 184.375px;
  color: #505051;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.number-one {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 5.625px;
  height: 12.5px;
  right: 15px;
  bottom: 184.375px;
  color: #c6c6c6;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 400;
  line-height: 12.5px;
  text-align: center;
  white-space: nowrap;
  z-index: 16;
}
.tron-trc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 15px;
  bottom: 151.5px;
  color: #a7a7a7;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 14;
}
.chain-type {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 283.125px;
  bottom: 150px;
  color: #595a5b;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.time-9 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 14.375px;
  bottom: 120.25px;
  color: #a3a3a3;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.time-a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.75px;
  right: 323.125px;
  bottom: 121.25px;
  color: #4e4e4e;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 13;
}
.ty-nf-fd {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  width: 200.625px;
  height: 36.25px;
  right: 13.125px;
  bottom: 70.625px;
  color: #bebebe;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 300;
  line-height: 17.275px;
  text-align: left;
  text-overflow: initial;
  z-index: 10;
  overflow: hidden;
}
.withdrawal-address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 228.125px;
  bottom: 88.375px;
  color: #4e4e4e;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.span {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  width: 201.25px;
  height: 51.25px;
  right: 13.125px;
  bottom: 8.125px;
  color: #a0a0a0;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 15.781px;
  text-align: left;
  text-overflow: initial;
  z-index: 8;
  overflow: hidden;
}
.span-b {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 245px;
  bottom: 41.875px;
  color: #4e4e4f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.div {
  position: relative;
  width: 369.375px;
  height: 46.25px;
  margin: 239.375px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
  overflow: visible auto;
}
.div-c {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 2.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
}
.div-d {
  position: absolute;
  width: 369.375px;
  height: 41.875px;
  right: 0;
  bottom: 0;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/V943KeeqNG.png)
    no-repeat center;
  background-size: cover;
  z-index: 4;
}
.span-e {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 97.5px;
  bottom: 11.875px;
  color: #c7c7c7;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 500;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.div-f {
  position: relative;
  width: 130.625px;
  height: 5px;
  margin: 16.875px 0 0 120px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-20/k6XZU3WEiY.png)
    no-repeat center;
  background-size: cover;
  z-index: 1;
}


      `}</style>
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generated by Codia AI</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  />
  <link rel="stylesheet" href="index.css" />
  <div className="main-container">
    <div className="root">
      <div className="groups">
        <span className="time">7:16</span>
        <div className="image" />
        <div className="image-1" />
        <div className="image-2" />
      </div>
      <div className="groups-3">
        <span className="withdrawal-details">Withdrawal Details</span>
        <div className="image-4" />
      </div>
      <div className="groups-5">
        <span className="quantity">Quantity</span>
        <span className="usdt">638 USDT</span>
        <div className="flex-row-dd">
          <div className="image-6" />
          <span className="withdrawal-compl">Withdrawal Completed</span>
        </div>
        <div className="groups-7">
          <div className="groups-8">
            <span className="withdrawal-accou">Withdrawal Account</span>
            <span className="funding-account">Funding Account</span>
          </div>
          <span className="fees">Fees</span>
          <span className="number-one">1</span>
          <span className="tron-trc">TRON (TRC20)</span>
          <span className="chain-type">Chain Type</span>
          <span className="time-9">2026-04-0707:13:51</span>
          <span className="time-a">Time</span>
          <span className="ty-nf-fd">
            TYNfFDdew9qjJynQG6ZXMR
            <br />
            WUHB5yFngMm4
          </span>
          <span className="withdrawal-address">Withdrawal Address</span>
          <span className="span">
            127a41421b1a3cbae799d18f2
            <br />
            56373b130a4014e977d326ca
            <br />
            Ofc9cc435af3d45
          </span>
          <span className="span-b">Transaction Hash</span>
        </div>
      </div>
      <div className="div">
        <div className="div-c">
          <div className="div-d">
            <span className="span-e">View in Blockchain Explorer</span>
          </div>
        </div>
      </div>
      <div className="div-f" />
    </div>
  </div>
  {/* Generated by Codia AI - https://codia.ai/ */}
</>


    </>
  );
};

export default Template23;