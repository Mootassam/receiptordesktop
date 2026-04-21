import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template27Props {
  formData: FormData;
}

const Template27: React.FC<Template27Props> = ({ formData }) => {
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
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
}
.root {
  position: absolute;
  height: 800px;
  top: 0;
  right: 0;
  left: 0;
  background: #070709;
}
.groups {
  position: relative;
  width: 369.375px;
  height: 43.75px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 61;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 303.125px;
  bottom: 13.125px;
  color: #c1c1c2;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 600;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 65;
}
.image {
  position: absolute;
  width: 24.375px;
  height: 12.5px;
  right: 16.875px;
  bottom: 14.375px;
  background: url(${assetBase}template27/CVmhFSqN9O.png)
    no-repeat center;
  background-size: cover;
  z-index: 62;
}
.image-1 {
  position: absolute;
  width: 15.625px;
  height: 11.875px;
  right: 46.25px;
  bottom: 14.375px;
  background: url(${assetBase}template27/Mojk6ZffGL.png)
    no-repeat center;
  background-size: cover;
  z-index: 63;
}
.image-2 {
  position: absolute;
  width: 16.25px;
  height: 10.625px;
  right: 66.875px;
  bottom: 15px;
  background: url(${assetBase}template27/0NpwevXjvN.png)
    no-repeat center;
  background-size: cover;
  z-index: 64;
}
.groups-3 {
  position: relative;
  width: 369.375px;
  height: 47.5px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 59;
}
.activity {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 26.25px;
  right: 261.875px;
  bottom: 6.875px;
  color: #414142;
  font-family: Inter, var(--default-font-family);
  font-size: 21.25px;
  font-weight: 700;
  line-height: 25.717px;
  text-align: left;
  white-space: nowrap;
  z-index: 60;
}
.groups-4 {
  position: relative;
  width: 362.5px;
  height: 38.75px;
  margin: 1.875px 0 0 6.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 49;
}
.groups-5 {
  position: absolute;
  width: 82.5px;
  height: 38.75px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 50;
}
.predicti {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 14.375px;
  bottom: 16.25px;
  color: #272729;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 51;
}
.groups-6 {
  position: absolute;
  width: 117.5px;
  height: 35.625px;
  right: 245px;
  bottom: 2.5px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 56;
}
.transactions {
  display: block;
  position: relative;
  height: 16.875px;
  margin: 6.25px 0 0 8.125px;
  color: #404042;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 700;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 58;
}
.background {
  position: relative;
  width: 100px;
  height: 1.875px;
  margin: 8.75px 0 0 8.125px;
  background: url(${assetBase}template27/zFznSSH9zm.png)
    no-repeat center;
  background-size: cover;
  z-index: 57;
}
.groups-7 {
  position: absolute;
  width: 73.75px;
  height: 36.25px;
  right: 83.125px;
  bottom: 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 52;
}
.perps {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17.5px;
  right: 11.875px;
  bottom: 12.5px;
  color: #2a2a2c;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 53;
}
.groups-8 {
  position: absolute;
  width: 91.25px;
  height: 35.625px;
  right: 153.125px;
  bottom: 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 54;
}
.transfers {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 11.25px;
  bottom: 13.75px;
  color: #28282a;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 55;
}
.groups-9 {
  position: relative;
  width: 181.875px;
  height: 44.375px;
  margin: 6.875px 0 0 11.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 44;
  overflow: visible auto;
}
.text {
  position: relative;
  width: 178.125px;
  height: 40.625px;
  margin: 1.875px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 45;
}
.background-a {
  position: absolute;
  width: 178.125px;
  height: 40.625px;
  right: 0;
  bottom: 0;
  background: #060609;
  z-index: 46;
}
.popular-networks {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17px;
  right: 35.625px;
  bottom: 11.75px;
  color: #3b3b3c;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 48;
}
.image-b {
  position: absolute;
  width: 13.125px;
  height: 7.5px;
  right: 14.375px;
  bottom: 16.25px;
  background: url(${assetBase}template27/QyxJHUokz4.png)
    no-repeat center;
  background-size: cover;
  z-index: 47;
}
.image-c {
  position: relative;
  width: 16.875px;
  height: 2.5px;
  margin: 4.375px 0 0 21.25px;
  background: url(${assetBase}template27/W2byu6XV5q.png)
    no-repeat center;
  background-size: cover;
  z-index: 43;
}
.background-d {
  position: relative;
  width: 369.375px;
  height: 1.875px;
  margin: 35.625px 0 0 0;
  background: #08080a;
  z-index: 40;
}
.eth {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 14.375px;
  bottom: 593.75px;
  color: #29292b;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 41;
}
.confirmed {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 230.625px;
  bottom: 591.875px;
  color: #323b1f;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 700;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 42;
}
.groups-e {
  position: absolute;
  width: 369.375px;
  height: 246.875px;
  right: 0;
  bottom: 318.125px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 17;
}
.oct-at-6am {
  display: block;
  position: relative;
  height: 14px;
  margin: 10px 0 0 14.375px;
  color: #333335;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 13.615px;
  text-align: left;
  white-space: nowrap;
  z-index: 36;
}
.groups-f {
  position: relative;
  width: 369.375px;
  height: 75.625px;
  margin: 3.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 31;
  overflow: visible auto;
}
.background-10 {
  position: relative;
  width: 37.5px;
  height: 3.75px;
  margin: 6.25px 0 0 166.25px;
  background: url(${assetBase}template27/EQ5zTuX9Wx.png)
    no-repeat center;
  background-size: cover;
  z-index: 35;
}
.sent-eth {
  display: block;
  position: relative;
  height: 18.75px;
  margin: 8.75px 0 0 142.5px;
  color: #d3d4d5;
  font-family: Inter, var(--default-font-family);
  font-size: 18.75px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.image-11 {
  position: relative;
  width: 13.75px;
  height: 13.75px;
  margin: -4.375px 0 0 331.25px;
  background: url(${assetBase}template27/QNqtivwTcC.png)
    no-repeat center;
  background-size: cover;
  z-index: 32;
}
.oct-time {
  display: block;
  position: relative;
  height: 15.625px;
  margin: -3.75px 0 0 133.125px;
  color: #747577;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 33;
}
.groups-12 {
  position: relative;
  width: 369.375px;
  height: 61.25px;
  margin: 1.875px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 26;
  overflow: visible auto;
}
.flex-row-ad {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 339.375px;
  height: 11.25px;
  margin: 6.875px 0 0 15px;
  z-index: 30;
}
.status {
  flex-shrink: 0;
  position: relative;
  height: 11px;
  color: #6c6d6f;
  font-family: Inter, var(--default-font-family);
  font-size: 9.375px;
  font-weight: 400;
  line-height: 11px;
  text-align: left;
  white-space: nowrap;
  z-index: 30;
}
.date {
  flex-shrink: 0;
  position: relative;
  height: 11.25px;
  color: #6e6f71;
  font-family: Inter, var(--default-font-family);
  font-size: 8.75px;
  font-weight: 400;
  line-height: 11.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 29;
}
.flex-row-ebc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 339.375px;
  height: 16.875px;
  margin: 10.625px 0 0 15px;
  z-index: 28;
}
.confirmed-13 {
  flex-shrink: 0;
  position: relative;
  height: 13.125px;
  color: #92ad53;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.oct-time-14 {
  flex-shrink: 0;
  position: relative;
  height: 16.875px;
  color: #bfc0c1;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.background-15 {
  position: relative;
  width: 341.875px;
  height: 1.875px;
  margin: 1.875px 0 0 13.125px;
  background: url(${assetBase}template27/xeAVendUEn.png)
    no-repeat center;
  background-size: cover;
  z-index: 25;
}
.groups-16 {
  position: relative;
  width: 369.375px;
  height: 75px;
  margin: -0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 18;
  overflow: visible auto;
}
.flex-row-ed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 339.375px;
  height: 11.25px;
  margin: 18.125px 0 0 15px;
  z-index: 24;
}
.text-11 {
  flex-shrink: 0;
  position: relative;
  height: 11px;
  color: #6b6c6e;
  font-family: Inter, var(--default-font-family);
  font-size: 8.75px;
  font-weight: 400;
  line-height: 11px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.text-12 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  width: 10.625px;
  height: 11.25px;
  color: #6e6f71;
  font-family: Inter, var(--default-font-family);
  font-size: 8.125px;
  font-weight: 400;
  line-height: 11.25px;
  text-align: center;
  white-space: nowrap;
  z-index: 23;
}
.group-3 {
  position: relative;
  width: 340px;
  height: 23.125px;
  margin: 8.125px 0 0 15px;
  z-index: 22;
}
.pic-5 {
  position: absolute;
  width: 23.125px;
  height: 23.125px;
  right: 316.875px;
  bottom: 0;
  background: url(${assetBase}template27/rJsrpgsJnh.png)
    no-repeat center;
  background-size: cover;
  z-index: 22;
}
.img-6 {
  position: absolute;
  width: 23.125px;
  height: 23.125px;
  right: 110.625px;
  bottom: 0;
  background: url(${assetBase}template27/JL0TFPkwfj.png)
    no-repeat center;
  background-size: cover;
  z-index: 20;
}
.text-13 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 206.25px;
  bottom: 4.375px;
  color: #a6a7a9;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 21;
}
.text-14 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 0;
  bottom: 4.375px;
  color: #a7a8aa;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.img-7 {
  position: relative;
  width: 342.5px;
  height: 1.875px;
  margin: 0 0 0 13.125px;
  background: url(${assetBase}template27/rmzVcQxc7A.png)
    no-repeat center;
  background-size: cover;
  z-index: 16;
}
.section-9 {
  position: absolute;
  width: 369.375px;
  height: 540.625px;
  right: 0;
  bottom: 0;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
}
.text-15 {
  display: block;
  position: relative;
  height: 11.875px;
  margin: 238.125px 0 0 15px;
  color: #67686a;
  font-family: Inter, var(--default-font-family);
  font-size: 9.375px;
  font-weight: 400;
  line-height: 11.346px;
  text-align: left;
  white-space: nowrap;
  z-index: 39;
}
.text-16 {
  display: block;
  position: relative;
  height: 15px;
  margin: 11.875px 0 0 14.375px;
  color: #abacae;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 38;
}
.group-4 {
  position: relative;
  width: 346.875px;
  height: 144.375px;
  margin: 22.5px 0 0 10.625px;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
}
.section-a {
  position: absolute;
  width: 340.625px;
  height: 71.875px;
  right: 3.125px;
  bottom: 69.375px;
  background: rgba(0, 0, 0, 0);
  z-index: 11;
}
.wrapper-7 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 307.5px;
  height: 13.75px;
  margin: 22.5px 0 0 17.5px;
  z-index: 15;
}
.text-17 {
  flex-shrink: 0;
  position: relative;
  height: 12.5px;
  color: #a0a1a3;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 400;
  line-height: 12.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.eth-17 {
  flex-shrink: 0;
  position: relative;
  height: 13.75px;
  color: #a4a5a7;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 14;
}
.flex-row-f {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 306.875px;
  height: 14.375px;
  margin: 10.625px 0 0 18.125px;
  z-index: 13;
}
.estimated-gas-fee {
  flex-shrink: 0;
  position: relative;
  height: 13.75px;
  color: #999a9c;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 13;
}
.eth-18 {
  flex-shrink: 0;
  position: relative;
  height: 14px;
  color: #a9aaac;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.background-19 {
  position: relative;
  width: 310px;
  height: 1.875px;
  margin: 9.375px 0 0 15.625px;
  background: url(${assetBase}template27/VECydxaZJr.png)
    no-repeat center;
  background-size: cover;
  z-index: 10;
}
.background-1a {
  position: absolute;
  width: 339.375px;
  height: 139.375px;
  right: 3.125px;
  bottom: 0.63px;
  background: #121315;
  border: 1.25px solid #212224;
  z-index: 5;
  border-radius: 6.25px;
}
.groups-1b {
  position: absolute;
  width: 340.625px;
  height: 68.125px;
  right: 3.125px;
  bottom: 0.63px;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
}
.flex-row-ce {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 307.5px;
  height: 14px;
  margin: 10.625px 0 0 16.875px;
  z-index: 9;
}
.total-amount {
  flex-shrink: 0;
  position: relative;
  height: 13.125px;
  color: #b8b9ba;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.eth-1c {
  flex-shrink: 0;
  position: relative;
  height: 14px;
  color: #bababc;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 14px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.dollar {
  display: block;
  position: relative;
  height: 13.125px;
  margin: 11px 0 0 285.625px;
  color: #aaacad;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 7;
}
.view-on-etherscan {
  display: block;
  position: relative;
  height: 17px;
  margin: 20.625px 0 0 118.75px;
  color: #7376a9;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 37;
}
.background-1d {
  position: relative;
  width: 130.625px;
  height: 5px;
  margin: 46.75px 0 0 119.375px;
  background: url(${assetBase}template27/7Y1KbXopma.png)
    no-repeat center;
  background-size: cover;
  z-index: 3;
}
.background-1e {
  position: absolute;
  width: 369.375px;
  height: 537.5px;
  right: 0;
  bottom: 0;
  background-color: #131416 ;
  background-size: cover;
  z-index: 0;
}



      `}</style>

      <>

        <div className="main-container">
          <div className="root">
            <div className="groups">
              <span className="time">2:47</span>
              <div className="image" />
              <div className="image-1" />
              <div className="image-2" />
            </div>
            <div className="groups-3">
              <span className="activity">Activity</span>
            </div>
            <div className="groups-4">
              <div className="groups-5">
                <span className="predicti">Predicti</span>
              </div>
              <div className="groups-6">
                <span className="transactions">Transactions</span>
                <div className="background" />
              </div>
              <div className="groups-7">
                <span className="perps">Perps</span>
              </div>
              <div className="groups-8">
                <span className="transfers">Transfers</span>
              </div>
            </div>
            <div className="groups-9">
              <div className="text">
                <div className="background-a">
                  <span className="popular-networks">Popular networks</span>
                  <div className="image-b" />
                </div>
              </div>
            </div>
            <div className="image-c" />
            <div className="background-d" />
            <span className="eth">0.09633ETH</span>
            <span className="confirmed">Confirmed</span>
            <div className="groups-e">
              <span className="oct-at-6am">Oct 9 at 6:00am</span>
              <div className="groups-f">
                <div className="background-10" />
                <span className="sent-eth">Sent ETH</span>
                <div className="image-11" />
                <span className="oct-time">Oct 9 at 5:42 am</span>
              </div>
              <div className="groups-12">
                <div className="flex-row-ad">
                  <span className="status">Status</span>
                  <span className="date">Date</span>
                </div>
                <div className="flex-row-ebc">
                  <span className="confirmed-13">Confirmed</span>
                  <span className="oct-time-14">Oct 9 at 5:42 am</span>
                </div>
              </div>
              <div className="background-15" />
              <div className="groups-16">
                <div className="flex-row-ed">
                  <span className="text-11">From</span>
                  <span className="text-12">To</span>
                </div>
                <div className="group-3">
                  <div className="pic-5" />
                  <div className="img-6" />
                  <span className="text-13">OxbB31B...2ca85</span>
                  <span className="text-14">Oxe20da...5808f</span>
                </div>
              </div>
              <div className="img-7" />
            </div>
            <div className="section-9">
              <span className="text-15">NONCE</span>
              <span className="text-16">#17</span>
              <div className="group-4">
                <div className="section-a">
                  <div className="wrapper-7">
                    <span className="text-17">Amount</span>
                    <span className="eth-17">0.00883 ETH</span>
                  </div>
                  <div className="flex-row-f">
                    <span className="estimated-gas-fee">Estimated gas fee</span>
                    <span className="eth-18">0.00005 ETH</span>
                  </div>
                  <div className="background-19" />
                </div>
                <div className="background-1a" />
                <div className="groups-1b">
                  <div className="flex-row-ce">
                    <span className="total-amount">Total amount</span>
                    <span className="eth-1c">0.00888 ETH</span>
                  </div>
                  <span className="dollar">$20.60</span>
                </div>
              </div>
              <span className="view-on-etherscan">View on Etherscan</span>
              <div className="background-1d" />
            </div>
          </div>
          <div className="background-1e" />
        </div>
        {/* Generated by Codia AI - https://codia.ai/ */}
      </>



    </>
  );
};

export default Template27;