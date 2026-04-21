import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template22Props {
  formData: FormData;
}

const Template22: React.FC<Template22Props> = ({ formData }) => {
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
  background: #000000;
}
.groups {
  position: relative;
  width: 369.375px;
  height: 41.25px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 42;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 303.125px;
  bottom: 10.625px;
  color: #bababa;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 700;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 46;
}
.image {
  position: absolute;
  width: 23.75px;
  height: 12.5px;
  right: 17.5px;
  bottom: 11.875px;
  background: url(${assetBase}template23/YgVw2zxC9c.png)
    no-repeat center;
  background-size: cover;
  z-index: 43;
}
.text-2 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 12.5px;
  right: 45px;
  bottom: 11.875px;
  color: #adadad;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 12.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 44;
}
.image-1 {
  position: absolute;
  width: 16.25px;
  height: 11.25px;
  right: 66.875px;
  bottom: 12.5px;
  background: url(${assetBase}template23/gYHCr7y34U.png)
    no-repeat center;
  background-size: cover;
  z-index: 45;
}
.groups-2 {
  position: relative;
  width: 369.375px;
  height: 42.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 40;
  overflow: visible auto;
}
.image-3 {
  position: relative;
  width: 7.5px;
  height: 15px;
  margin: 15.625px 0 0 22.5px;
  background: url(${assetBase}template23/5dLYuxouvK.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.groups-4 {
  position: relative;
  width: 369.375px;
  height: 543.75px;
  margin: 2.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 5;
  overflow: visible auto;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 117.5px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 36;
  overflow: visible auto;
}
.image-6 {
  position: relative;
  width: 34.375px;
  height: 34.375px;
  margin: 8.125px 0 0 167.5px;
  background: url(${assetBase}template23/hqKrsDQLAx.png)
    no-repeat center;
  background-size: cover;
  z-index: 39;
}
.withdrawing {
  display: block;
  position: relative;
  height: 28.125px;
  margin: 9.375px 0 0 25.625px;
  color: #dedede;
  font-family: Inter, var(--default-font-family);
  font-size: 21.25px;
  font-weight: 700;
  line-height: 25.717px;
  text-align: left;
  white-space: nowrap;
  z-index: 38;
}
.withdraw-amount {
  display: block;
  position: relative;
  height: 17px;
  margin: 1.875px 0 0 156.25px;
  color: #7f7f7f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 37;
}
.flex-row-fab {
  position: relative;
  width: 323.125px;
  height: 30.625px;
  margin: 20px 0 0 22.5px;
  z-index: 35;
}
.image-7 {
  position: absolute;
  width: 30.625px;
  height: 30.625px;
  right: 292.5px;
  bottom: 0;
  background: url(${assetBase}template23/okLOHGVFNn.png)
    no-repeat center;
  background-size: cover;
  z-index: 35;
}
.status {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 236.25px;
  bottom: 7.5px;
  color: #b3b3b3;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.pending {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17px;
  right: 17.125px;
  bottom: 6.125px;
  color: #909090;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 33;
}
.image-8 {
  position: absolute;
  width: 13.125px;
  height: 12.5px;
  right: 0;
  bottom: 8.75px;
  background: url(${assetBase}template23/YHckQzzCvw.png)
    no-repeat center;
  background-size: cover;
  z-index: 32;
}
.processing-message {
  display: block;
  position: relative;
  height: 16.875px;
  margin: 2.5px 0 0 145px;
  color: #747474;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 14.371px;
  text-align: left;
  white-space: nowrap;
  z-index: 31;
}
.background {
  position: relative;
  width: 369.375px;
  height: 1.875px;
  margin: 19.375px 0 0 0;
  background: url(${assetBase}template23/R5qNuU3XRY.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.groups-9 {
  position: relative;
  width: 369.375px;
  height: 103.75px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 24;
  overflow: visible auto;
}
.flex-row-a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 306.25px;
  height: 17.625px;
  margin: 35px 0 0 22.5px;
  z-index: 29;
}
.address {
  flex-shrink: 0;
  position: relative;
  height: 15.625px;
  color: #b7b7b7;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 29;
}
.x-d {
  flex-shrink: 0;
  position: relative;
  height: 17px;
  color: #9e9e9e;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.flex-row-d {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 196.875px;
  height: 17px;
  margin: 1.75px 0 0 148.75px;
  z-index: 27;
}
.a-fdbe-f {
  flex-shrink: 0;
  position: relative;
  height: 17px;
  color: #949494;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.image-a {
  flex-shrink: 0;
  position: relative;
  width: 13.125px;
  height: 13.125px;
  background: url(${assetBase}template23/yZQDrbfGfp.png)
    no-repeat center;
  background-size: cover;
  z-index: 26;
}
.four {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 10.625px;
  height: 13.75px;
  margin: 3.625px 0 0 318.125px;
  color: #8f8f8f;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: center;
  white-space: nowrap;
  z-index: 25;
}
.groups-b {
  position: relative;
  width: 369.375px;
  height: 43.125px;
  margin: 4.375px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 20;
}
.eth-price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.125px;
  right: 21.875px;
  bottom: 10.625px;
  color: #919191;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17.397px;
  text-align: left;
  white-space: nowrap;
  z-index: 21;
}
.price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 311.25px;
  bottom: 13.125px;
  color: #b2b2b2;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.image-c {
  position: absolute;
  width: 13.125px;
  height: 12.5px;
  right: 295px;
  bottom: 14.375px;
  background: url(${assetBase}template23/Oi3wzveLoA.png)
    no-repeat center;
  background-size: cover;
  z-index: 22;
}
.groups-d {
  position: relative;
  width: 369.375px;
  height: 41.875px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
}
.network {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 286.875px;
  bottom: 14.375px;
  color: #b0b0b0;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 700;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.ethereum-erc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17.5px;
  right: 21.875px;
  bottom: 11.25px;
  color: #8f8f8f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.image-e {
  position: absolute;
  width: 13.75px;
  height: 14.375px;
  right: 151.875px;
  bottom: 13.75px;
  background: url(${assetBase}template23/yXcqcMsiqw.png)
    no-repeat center;
  background-size: cover;
  z-index: 18;
}
.groups-f {
  position: relative;
  width: 369.375px;
  height: 41.25px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.eth {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 21.875px;
  bottom: 12.5px;
  color: #9e9e9e;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 14;
}
.network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 261.25px;
  bottom: 14.375px;
  color: #b5b5b5;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.groups-10 {
  position: relative;
  width: 369.375px;
  height: 45px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 10;
}
.submitted-time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 239.375px;
  bottom: 18.125px;
  color: #b7b7b7;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.apr-8-a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18px;
  right: 21.875px;
  bottom: 15.125px;
  color: #8d8d8d;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.groups-11 {
  position: relative;
  width: 369.375px;
  height: 53.125px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
}
.reference-no {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 251.25px;
  bottom: 21.875px;
  color: #cccccc;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.number {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 41.25px;
  bottom: 21.25px;
  color: #919191;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.image-12 {
  position: absolute;
  width: 13.125px;
  height: 13.75px;
  right: 23.75px;
  bottom: 22.5px;
  background: url(${assetBase}template23/yu4g91LADp.png)
    no-repeat center;
  background-size: cover;
  z-index: 7;
}
.button {
  position: relative;
  width: 328.75px;
  height: 51.875px;
  margin: 72.5px 0 0 20px;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
  overflow: visible auto;
}
.background-13 {
  position: relative;
  width: 323.125px;
  height: 45.625px;
  margin: 3.125px 0 0 3.125px;
  background: #123d05;
  border: 0.63px solid #16390d;
  z-index: 3;
  border-radius: 23.125px;
}
.cancel-withdrawal {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 102.5px;
  bottom: 14.375px;
  color: #96cc3e;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 700;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 4;
}
.background-14 {
  position: relative;
  width: 130px;
  height: 5px;
  margin: 31.875px 0 0 120px;
  background: url(${assetBase}template23/Bo0CJNCWoH.png)
    no-repeat center;
  background-size: cover;
  z-index: 1;
}

      `}</style>

      <>

        <div className="main-container">
          <div className="root">
            <div className="groups">
              <span className="time">4:37</span>
              <div className="image" />
              <span className="text-2">4G</span>
              <div className="image-1" />
            </div>
            <div className="groups-2">
              <div className="image-3" />
            </div>
            <div className="groups-4">
              <div className="groups-5">
                <div className="image-6" />
                <span className="withdrawing">Withdrawing 0.02433294 ETH</span>
                <span className="withdraw-amount">~$52.05</span>
              </div>
              <div className="flex-row-fab">
                <div className="image-7" />
                <span className="status">Status</span>
                <span className="pending">Pending</span>
                <div className="image-8" />
              </div>
              <span className="processing-message">
                We're processing your withdrawal.
              </span>
              <div className="background" />
              <div className="groups-9">
                <div className="flex-row-a">
                  <span className="address">Address</span>
                  <span className="x-d">0x9096498474448D8Ec4</span>
                </div>
                <div className="flex-row-d">
                  <span className="a-fdbe-f">aF3837498d43b3eFf6f66</span>
                  <div className="image-a" />
                </div>
                <span className="four">4</span>
              </div>
              <div className="groups-b">
                <span className="eth-price">$2,139.11/ETH</span>
                <span className="price">Price</span>
                <div className="image-c" />
              </div>
              <div className="groups-d">
                <span className="network">Network</span>
                <span className="ethereum-erc">Ethereum (ERC20)</span>
                <div className="image-e" />
              </div>
              <div className="groups-f">
                <span className="eth">0.000075 ETH</span>
                <span className="network-fee">Network fee</span>
              </div>
              <div className="groups-10">
                <span className="submitted-time">Submitted time</span>
                <span className="apr-8-a">Apr 8,2026 4:36AM</span>
              </div>
              <div className="groups-11">
                <span className="reference-no">Reference no.</span>
                <span className="number">391788550</span>
                <div className="image-12" />
              </div>
            </div>
            <div className="button">
              <div className="background-13">
                <span className="cancel-withdrawal">Cancel withdrawal</span>
              </div>
            </div>
            <div className="background-14" />
          </div>
        </div>
        {/* Generated by Codia AI - https://codia.ai/ */}
      </>

    </>
  );
};

export default Template22;