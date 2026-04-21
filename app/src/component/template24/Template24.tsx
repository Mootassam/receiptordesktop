import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template24Props {
  formData: FormData;
}

const Template24: React.FC<Template24Props> = ({ formData }) => {
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
  z-index: 27;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 303.125px;
  bottom: 16.25px;
  color: #bebebe;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 31;
}
.image {
  position: absolute;
  width: 23.75px;
  height: 11.875px;
  right: 17.5px;
  bottom: 17.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/N0PXyygpDk.png)
    no-repeat center;
  background-size: cover;
  z-index: 28;
}
.image-1 {
  position: absolute;
  width: 15.625px;
  height: 11.875px;
  right: 46.25px;
  bottom: 17.5px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/rW6ttMqnMm.png)
    no-repeat center;
  background-size: cover;
  z-index: 29;
}
.image-2 {
  position: absolute;
  width: 16.25px;
  height: 10.625px;
  right: 66.875px;
  bottom: 18.125px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/BAj0k1a2sW.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.groups-3 {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 24;
}
.deposit-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17.5px;
  right: 128.125px;
  bottom: 9.375px;
  color: #cecece;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 600;
  line-height: 17.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 25;
}
.image-4 {
  position: absolute;
  width: 15.625px;
  height: 15.625px;
  right: 335px;
  bottom: 10.625px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/OSBoAVAb4r.png)
    no-repeat center;
  background-size: cover;
  z-index: 26;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 341.875px;
  margin: 25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
  overflow: visible auto;
}
.groups-6 {
  position: relative;
  width: 167.5px;
  height: 81.875px;
  margin: 0 0 0 101.25px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 19;
  overflow: visible auto;
}
.quantity {
  display: block;
  position: relative;
  height: 16.25px;
  margin: 5.625px 0 0 57.5px;
  color: #565656;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.usdt {
  display: block;
  position: relative;
  height: 24.375px;
  margin: 6.875px 0 0 6.875px;
  color: #d0d0d0;
  font-family: Inter, var(--default-font-family);
  font-size: 18.75px;
  font-weight: 400;
  line-height: 22.692px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.succeeded {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 40px;
  bottom: 6.5px;
  color: #287c57;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.image-7 {
  position: absolute;
  width: 13.75px;
  height: 13.75px;
  right: 116.25px;
  bottom: 6.875px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/YXJ2vqsrxy.png)
    no-repeat center;
  background-size: cover;
  z-index: 21;
}
.groups-8 {
  position: relative;
  width: 369.375px;
  height: 212.5px;
  margin: 47.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 7;
  overflow: visible auto;
}
.groups-9 {
  position: relative;
  width: 369.375px;
  height: 31.25px;
  margin: 3.125px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
}
.funding-account {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 18.125px;
  bottom: 6.25px;
  color: #bbbbbb;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.deposit-account {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 245.625px;
  bottom: 6.25px;
  color: #565658;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 18;
}
.tron-trc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 18.75px;
  bottom: 154px;
  color: #a9a9a9;
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
  height: 16.25px;
  right: 278.75px;
  bottom: 153.125px;
  color: #5a5a5c;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 300;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.time-a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 18.125px;
  bottom: 122.75px;
  color: #a3a3a3;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.tevtrlxysgd {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 318.75px;
  bottom: 123.75px;
  color: #4e4e4f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 300;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 13;
}
.deposit-address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  width: 194.375px;
  height: 35px;
  right: 16.875px;
  bottom: 74.375px;
  color: #bdbdbd;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 300;
  line-height: 16.074px;
  text-align: left;
  text-overflow: initial;
  z-index: 10;
  overflow: hidden;
}
.transaction-hash {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 246.875px;
  bottom: 90.625px;
  color: #5d5d5e;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.text-e {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  width: 199.375px;
  height: 51.25px;
  right: 16.875px;
  bottom: 10.625px;
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
.text-f {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16px;
  right: 241.25px;
  bottom: 44px;
  color: #4e4f50;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.groups-b {
  position: relative;
  width: 346.875px;
  height: 47.5px;
  margin: 248.75px 0 0 6.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
  overflow: visible auto;
}
.button {
  position: relative;
  width: 335.625px;
  height: 43.125px;
  margin: 2.5px 0 0 9.375px;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
  overflow: visible auto;
}
.background {
  position: relative;
  width: 330.625px;
  height: 38.125px;
  margin: 3.125px 0 0 3.125px;
  background: #000000;
  border: 0.63px solid #333333;
  z-index: 4;
  border-radius: 18.75px;
}
.view-in-blockcha {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17.5px;
  right: 77.5px;
  bottom: 10px;
  color: #c8c8c8;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 500;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.background-c {
  position: relative;
  width: 130px;
  height: 5px;
  margin: 35px 0 0 120px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-21/q4YgcoFgG0.png)
    no-repeat center;
  background-size: cover;
  z-index: 1;
}


      `}</style>

<>

  <div className="main-container">
    <div className="root">
      <div className="groups">
        <span className="time">2:42</span>
        <div className="image" />
        <div className="image-1" />
        <div className="image-2" />
      </div>
      <div className="groups-3">
        <span className="deposit-details">Deposit Details</span>
        <div className="image-4" />
      </div>
      <div className="groups-5">
        <div className="groups-6">
          <span className="quantity">Quantity</span>
          <span className="usdt">1,274.0506 USDT</span>
          <span className="succeeded">Succeeded</span>
          <div className="image-7" />
        </div>
        <div className="groups-8">
          <div className="groups-9">
            <span className="funding-account">Funding Account</span>
            <span className="deposit-account">Deposit Account</span>
          </div>
          <span className="tron-trc">TRON (TRC20)</span>
          <span className="chain-type">Chain Type</span>
          <span className="time-a">2026-04-0411:20:19</span>
          <span className="tevtrlxysgd">Time</span>
          <span className="deposit-address">
            TE5vtrL4xyS198GDX76wmC
            <br />
            eMuTAzeSKxKu
          </span>
          <span className="transaction-hash">Deposit Address</span>
          <span className="text-e">
            fdc9c7d6a78b637bd202ee1a
            <br />
            d9fd71d2d527c778b5237d8
            <br />
            5d75bba66fabf11c5
          </span>
          <span className="text-f">Transaction Hash</span>
        </div>
      </div>
      <div className="groups-b">
        <div className="button">
          <div className="background">
            <span className="view-in-blockcha">
              View in Blockchain Explorer
            </span>
          </div>
        </div>
      </div>
      <div className="background-c" />
    </div>
  </div>
  {/* Generated by Codia AI - https://codia.ai/ */}
</>

    </>
  );
};

export default Template24;