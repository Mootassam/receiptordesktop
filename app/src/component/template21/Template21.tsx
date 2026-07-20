import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template21Props {
  formData: FormData;
}

const Template21: React.FC<Template21Props> = ({ formData }) => {
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
  background: #ffffff;
}
.groups {
  position: absolute;
  height: 800px;
  top: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
}
.groups-1 {
  position: relative;
  width: 369.375px;
  height: 44.375px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 61;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 282.5px;
  bottom: 11.5px;
  color: #383838;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 600;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 66;
}
.image {
  position: absolute;
  width: 26.875px;
  height: 13.75px;
  right: 36.5px;
  bottom: 12.625px;
  background: url(${assetBase}template21/DVD6JLHKMQ.png)
    no-repeat center;
  background-size: cover;
  z-index: 64;
}
.image-2 {
  position: absolute;
  width: 19.375px;
  height: 13.125px;
  right: 91.25px;
  bottom: 13.25px;
  background: url(${assetBase}template21/AkRj9uVh5S.png)
    no-repeat center;
  background-size: cover;
  z-index: 62;
}
.image-3 {
  position: absolute;
  width: 16.25px;
  height: 12.5px;
  right: 69.125px;
  bottom: 13.875px;
  background: url(${assetBase}template21/RszF2sCg9f.png)
    no-repeat center;
  background-size: cover;
  z-index: 65;
}
.image-4 {
  position: absolute;
  width: 12.5px;
  height: 11.875px;
  right: 266.25px;
  bottom: 13.5px;
  background: url(${assetBase}template21/5uWvfa884F.png)
    no-repeat center;
  background-size: cover;
  z-index: 63;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 2.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 58;
}
.sent-bitcoin {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 141.875px;
  bottom: 10.125px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 700;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 59;
}
.image-6 {
  position: absolute;
  width: 15px;
  height: 13.75px;
  right: 336.875px;
  bottom: 12px;
  background: url(${assetBase}template21/xPFWKEiv1E.png)
    no-repeat center;
  background-size: cover;
  z-index: 60;
}
.groups-7 {
  position: relative;
  width: 369.375px;
  height: 103.125px;
  margin: 13.25px 0 0 0;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 55;
  overflow: visible auto;
}
.minus-btc {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 16.25px;
  color: #79797a;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 57;
}
.negative-value {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 30.625px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 24.375px;
  font-weight: 400;
  line-height: 29.499px;
  text-align: left;
  white-space: nowrap;
  z-index: 56;
}
.background {
  position: relative;
  width: 368.75px;
  height: 0.63px;
  margin: 1.75px 0 0 0;
  background: #dddddd;
  z-index: 54;
}
.groups-8 {
  position: relative;
  width: 369.375px;
  height: 508.75px;
  margin: 12.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 21;
  overflow: visible auto;
}
.groups-9 {
  position: relative;
  width: 369.375px;
  height: 46.875px;
  margin: 75.625px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 48;
}
.currency-value {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 18.75px;
  bottom: 14.375px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 18.153px;
  text-align: left;
  white-space: nowrap;
  z-index: 49;
}
.price-per-coin {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 265.375px;
  bottom: 15.625px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15.884px;
  text-align: left;
  white-space: nowrap;
  z-index: 50;
}
.groups-a {
  position: relative;
  width: 369.375px;
  height: 48.75px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 44;
}
.bitcoin {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 19.375px;
  bottom: 18.75px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 45;
}
.image-b {
  position: absolute;
  width: 14.375px;
  height: 14.375px;
  right: 74.375px;
  bottom: 19.375px;
  background: url(${assetBase}template21/6Xsfda7kZD.png)
    no-repeat center;
  background-size: cover;
  z-index: 46;
}
.network {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 292.625px;
  bottom: 16.875px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 47;
}
.groups-c {
  position: relative;
  width: 369.375px;
  height: 49.375px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 41;
}
.btc-value {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 19.375px;
  bottom: 18.125px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 42;
}
.network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 269.875px;
  bottom: 16.875px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 43;
}
.groups-d {
  position: relative;
  width: 369.375px;
  height: 49.375px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 38;
}
.number {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 19.375px;
  bottom: 17.5px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 39;
}
.confirmations {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 259.125px;
  bottom: 17.5px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 40;
}
.groups-e {
  position: relative;
  width: 369.375px;
  height: 49.375px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 35;
}
.random-text {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 19px;
  right: 19.5px;
  bottom: 13.5px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 400;
  line-height: 18.91px;
  text-align: left;
  white-space: nowrap;
  z-index: 36;
}
.transaction-hash {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right:245.25px;
  bottom: 17.5px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 37;
}
.groups-f {
  position: relative;
  width: 369.375px;
  height: 48.125px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 32;
}
.time-stamp {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18px;
  right: 19.375px;
  bottom: 15.25px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 16.25px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  white-space: nowrap;
  z-index: 33;
}
.date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 316.25px;
  bottom: 16.875px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.background-10 {
  position: relative;
  width: 369.375px;
  height: 1.875px;
  margin: 1.25px 0 0 0;
  background: url(${assetBase}template21/M0Pq1D2x02.png)
    no-repeat center;
  background-size: cover;
  z-index: 31;
}
.groups-11 {
  position: relative;
  width: 369.375px;
  height: 131.25px;
  margin: 3.125px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 22;
  overflow: hidden;
}
.groups-12 {
  position: relative;
  width: 369.375px;
  height: 63.125px;
  margin: -0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 27;
}
.image-13 {
  position: absolute;
  width: 35px;
  height: 36.875px;
  right: 311.25px;
  bottom: 10.625px;
  background: url(${assetBase}template21/McAfYA0CkU.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.completed {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 19.375px;
  right: 19.375px;
  bottom: 21.25px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 400;
  line-height: 18.91px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.status {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 256.25px;
  bottom: 23.75px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 29;
}
.groups-14 {
  position: relative;
  width: 369.375px;
  height: 71.875px;
  margin: -2.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 23;
  overflow: visible auto;
}
.button {
  position: relative;
  width: 330px;
  height: 55px;
  margin: 5.625px 0 0 18.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 24;
  overflow: visible auto;
}
.background-15 {
  position: relative;
  width: 323.75px;
  height: 51.25px;
  margin: 1.875px 0 0 4.25px;
  background: #eeeff3;
  z-index: 25;
  border-radius: 23.125px;
}
.view-on-block-ex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17px;
  right: 79.75px;
  bottom: 17.25px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 26;
}
.groups-16 {
  position: absolute;
  width: 369.375px;
  height: 75px;
  right: 0;
  bottom: 433.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 51;
}
.to {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 330.5px;
  bottom: 41.25px;
  color: #0f0f0f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 53;
}
.text-content {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 192.5px;
  height: 59px;
  right: 16.875px;
  bottom: 430.375px;
  color: #5b5b5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 19.492px;
  text-align: right;
  text-overflow: initial;
  z-index: 52;
  overflow: hidden;
}
.groups-17 {
  position: relative;
  width: 369.375px;
  height: 67.5px;
  margin: 3.75px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
  overflow: visible auto;
}
.flex-row-c {
  position: relative;
  width: 368.75px;
  height: 58.75px;
  margin: 0.63px 0 0 0;
  z-index: 20;
}
.background-18 {
  position: absolute;
  width: 368.125px;
  height: 0.63px;
  right: 0.63px;
  bottom: 58.125px;
  background: #e4e4e4;
  z-index: 20;
}
.groups-19 {
  position: absolute;
  width: 74.375px;
  height: 53.125px;
  right: 221.25px;
  bottom: 5.625px;
  background: rgba(0, 0, 0, 0);
  z-index: 14;
}
.image-1a {
  position: relative;
  width: 18.75px;
  height: 18.75px;
  margin: 9.375px 0 0 30.625px;
  background: url(${assetBase}template21/UqjrkS6fyp.png)
    no-repeat center;
  background-size: cover;
  z-index: 16;
}
.my-assets {
  display: block;
  position: relative;
  height: 11.25px;
  margin: 1.25px 0 0 17.5px;
  color: #a6a6a7;
  font-family: Inter, var(--default-font-family);
  font-size: 8.75px;
  font-weight: 400;
  line-height: 10.589px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.groups-1b {
  position: absolute;
  width: 70.625px;
  height: 54.375px;
  right: 150px;
  bottom: 4.375px;
  background: rgba(0, 0, 0, 0);
  z-index: 11;
}
.image-1c {
  position: relative;
  width: 16.875px;
  height: 16.25px;
  margin: 10px 0 0 27.5px;
  background: url(${assetBase}template21/Ve0CWAcOvm.png)
    no-repeat center;
  background-size: cover;
  z-index: 13;
}
.trade {
  display: block;
  position: relative;
  height: 10.625px;
  margin: 2.5px 0 0 21.875px;
  color: #a3a3a4;
  font-family: Inter, var(--default-font-family);
  font-size: 9.375px;
  font-weight: 400;
  line-height: 10.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.groups-1d {
  position: absolute;
  width: 73.125px;
  height: 54.375px;
  right: 76.25px;
  bottom: 4.375px;
  background: rgba(0, 0, 0, 0);
  z-index: 8;
}
.image-1e {
  position: relative;
  width: 15px;
  height: 14.375px;
  margin: 11.25px 0 0 28.125px;
  background: url(${assetBase}template21/s4C0QgXeOY.png)
    no-repeat center;
  background-size: cover;
  z-index: 10;
}
.earn {
  display: block;
  position: relative;
  height: 10px;
  margin: 3.75px 0 0 25px;
  color: #a4a4a4;
  font-family: Inter, var(--default-font-family);
  font-size: 8.75px;
  font-weight: 700;
  line-height: 10px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.groups-1f {
  position: absolute;
  width: 76.875px;
  height: 58.125px;
  right: 291.875px;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 17;
}
.image-20 {
  position: relative;
  width: 16.875px;
  height: 18.125px;
  margin: 8.75px 0 0 33.125px;
  background: url(${assetBase}template21/MjrfZYObC9.png)
    no-repeat center;
  background-size: cover;
  z-index: 19;
}
.home {
  display: block;
  position: relative;
  height: 11px;
  margin: 1.25px 0 0 28.125px;
  color: #7f95b4;
  font-family: Inter, var(--default-font-family);
  font-size: 8.75px;
  font-weight: 700;
  line-height: 10.589px;
  text-align: left;
  white-space: nowrap;
  z-index: 18;
}
.groups-21 {
  position: absolute;
  width: 80px;
  height: 50.625px;
  right: 0;
  bottom: 7.5px;
  background: rgba(0, 0, 0, 0);
  z-index: 5;
}
.image-22 {
  position: relative;
  width: 18.75px;
  height: 16.25px;
  margin: 10px 0 0 27.5px;
  background: url(${assetBase}template21/35WsgZuXW1.png)
    no-repeat center;
  background-size: cover;
  z-index: 7;
}
.web3 {
  display: block;
  position: relative;
  height: 11px;
  margin: 1.875px 0 0 24.375px;
  color: #a2a2a3;
  font-family: Inter, var(--default-font-family);
  font-size: 8.75px;
  font-weight: 700;
  line-height: 10.589px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.background-23 {
  position: relative;
  width: 131.25px;
  height: 4.375px;
  margin: -3.125px 0 0 118.75px;
  background: url(${assetBase}template21/UJ1dr6LBZd.png)
    no-repeat center;
  background-size: cover;
  z-index: 4;
}
.image-24 {
  position: absolute;
  height: 800px;
  top: 0;
  right: 0;
  left: 0;
  background: url(${assetBase}template21/B6xWiAg4em.png)
    no-repeat center;
  background-size: cover;
  z-index: 2;
}
      `}</style>

      <div className="main-container">
        <div className="root">
          <div className="groups">
            <StatusBar defaultTheme="light" />
            <div className="groups-5">
              <span className="sent-bitcoin">Sent Bitcoin</span>
              <div className="image-6" />
            </div>
            <div className="groups-7">
              <span className="minus-btc">
                {showLoading ? 'Loading...' : `-${amountBTCFormatted} BTC`}
              </span>
              <span className="negative-value">
                {showLoading ? 'Loading...' : `-${amountUSDFormatted}`}
              </span>
            </div>
            <div className="background" />
            <div className="groups-8">
              <div className="groups-9">
                <span className="currency-value">
                  {showLoading ? 'Loading...' : pricePerCoinFormatted}
                </span>
                <span className="price-per-coin">Price per coin</span>
              </div>
              <div className="groups-a">
                <span className="bitcoin">Bitcoin</span>
                <div className="image-b" />
                <span className="network">Network</span>
              </div>
              <div className="groups-c">
                <span className="btc-value">
                  {showLoading ? 'Loading...' : `${feeBTCFormatted} BTC`}
                </span>
                <span className="network-fee">Network fee</span>
              </div>
              <div className="groups-d">
                <span className="number">22</span>
                <span className="confirmations">Confirmations</span>
              </div>
              <div className="groups-e">
                <span className="random-text">
                  {formatTxid(formData.txid)}
                </span>
                <span className="transaction-hash">Transaction hash</span>
              </div>
              <div className="groups-f">
                <span className="time-stamp">{Dates.formatTemplate21(formData.date)}</span>
                <span className="date">Date</span>
              </div>
              <div className="background-10" />
              <div className="groups-11">
                <div className="groups-12">
                  <div className="image-13" />
                  <span className="completed">Completed</span>
                  <span className="status">Status</span>
                </div>
                <div className="groups-14">
                  <div className="button">
                    <div className="background-15">
                      <span className="view-on-block-ex">
                        View on block explorer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="groups-16">
                <span className="to">To</span>
              </div>
              <span className="text-content">
                {formatAddress(formData.sender)}
              </span>
            </div>
            <div className="groups-17">
              <div className="flex-row-c">
                <div className="background-18" />
                <div className="groups-19">
                  <div className="image-1a" />
                  <span className="my-assets">My assets</span>
                </div>
                <div className="groups-1b">
                  <div className="image-1c" />
                  <span className="trade">Trade</span>
                </div>
                <div className="groups-1d">
                  <div className="image-1e" />
                  <span className="earn">Earn</span>
                </div>
                <div className="groups-1f">
                  <div className="image-20" />
                  <span className="home">Home</span>
                </div>
                <div className="groups-21">
                  <div className="image-22" />
                  <span className="web3">Web3</span>
                </div>
              </div>
              <div className="background-23" />
            </div>
          </div>
        </div>
        <div className="image-24" />
      </div>
    </>
  );
};

export default Template21;