import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template25Props {
  formData: FormData;
}

const Template25: React.FC<Template25Props> = ({ formData }) => {
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
  height: 41.25px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 44;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 303.125px;
  bottom: 10.625px;
  color: #bebebe;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 48;
}
.image {
  position: absolute;
  width: 23.75px;
  height: 11.875px;
  right: 17.5px;
  bottom: 11.875px;
  background: url(${assetBase}template25/60x0yixYKv.png)
    no-repeat center;
  background-size: cover;
  z-index: 45;
}
.image-1 {
  position: absolute;
  width: 15.625px;
  height: 11.875px;
  right: 46.25px;
  bottom: 11.875px;
  background: url(${assetBase}template25/44whL4tWDv.png)
    no-repeat center;
  background-size: cover;
  z-index: 46;
}
.image-2 {
  position: absolute;
  width: 16.25px;
  height: 10.625px;
  right: 66.875px;
  bottom: 12.5px;
  background: url(${assetBase}template25/rWfsTdv8Kj.png)
    no-repeat center;
  background-size: cover;
  z-index: 47;
}
.groups-3 {
  position: relative;
  width: 369.375px;
  height: 42.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 42;
  overflow: visible auto;
}
.image-4 {
  position: relative;
  width: 7.5px;
  height: 15px;
  margin: 15.625px 0 0 22.5px;
  background: url(${assetBase}template25/s56wFp9qQc.png)
    no-repeat center;
  background-size: cover;
  z-index: 43;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 122.5px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 38;
  overflow: visible auto;
}
.image-6 {
  position: relative;
  width: 34.375px;
  height: 34.375px;
  margin: 10px 0 0 167.5px;
  background: url(${assetBase}template25/s8uW9SyYkz.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.text-2 {
  display: block;
  position: relative;
  height: 25px;
  margin: 9.375px 0 0 35px;
  color: #dedede;
  font-family: Inter, var(--default-font-family);
  font-size: 21.25px;
  font-weight: 700;
  line-height: 25px;
  text-align: left;
  white-space: nowrap;
  z-index: 40;
}
.text-3 {
  display: block;
  position: relative;
  height: 17px;
  margin: 5px 0 0 156.25px;
  color: #767676;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 39;
}
.group-2 {
  position: relative;
  width: 369.375px;
  height: 67.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 34;
}
.img-3 {
  position: absolute;
  width: 30.625px;
  height: 30.625px;
  right: 316.25px;
  bottom: 21.25px;
  background: url(${assetBase}template25/Ggge2DOSBX.png)
    no-repeat center;
  background-size: cover;
  z-index: 37;
}
.text-4 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.125px;
  right: 21.875px;
  bottom: 26.875px;
  color: #949494;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17.397px;
  text-align: left;
  white-space: nowrap;
  z-index: 35;
}
.text-5 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 260px;
  bottom: 28.75px;
  color: #b3b3b3;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 36;
}
.group-3 {
  position: relative;
  width: 369.375px;
  height: 458.75px;
  margin: 24.375px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  overflow: visible auto;
}
.box {
  position: relative;
  width: 369.375px;
  height: 65px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 29;
}
.text-6 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 186.875px;
  height: 40.625px;
  right: 39.375px;
  bottom: 13.75px;
  color: #939393;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 18.711px;
  text-align: right;
  text-overflow: initial;
  z-index: 31;
  overflow: hidden;
}
.text-7 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 288.75px;
  bottom: 37.5px;
  color: #b5b5b5;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 32;
}
.image-7 {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 23.75px;
  bottom: 28.125px;
  background: url(${assetBase}template25/DGON2Zdu4y.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.groups-8 {
  position: relative;
  width: 369.375px;
  height: 42.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 25;
}
.btc-price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18px;
  right: 21.875px;
  bottom: 10.75px;
  color: #9d9d9d;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  white-space: nowrap;
  z-index: 26;
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
  z-index: 28;
}
.image-9 {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 295px;
  bottom: 13.75px;
  background: url(${assetBase}template25/2EJYvnYGtA.png)
    no-repeat center;
  background-size: cover;
  z-index: 27;
}
.groups-a {
  position: relative;
  width: 369.375px;
  height: 46.875px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 21;
}
.network {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 286.875px;
  bottom: 18.75px;
  color: #b7b7b7;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.bitcoin {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 22.5px;
  bottom: 17.5px;
  color: #898989;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.image-b {
  position: absolute;
  width: 13.75px;
  height: 13.75px;
  right: 73.75px;
  bottom: 18.75px;
  background: url(${assetBase}template25/W1E4UzXzrU.png)
    no-repeat center;
  background-size: cover;
  z-index: 23;
}
.groups-c {
  position: relative;
  width: 369.375px;
  height: 48.75px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 18;
}
.btc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 21.875px;
  bottom: 17.5px;
  color: #919191;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 261.25px;
  bottom: 18.75px;
  color: #b8b8b8;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.groups-d {
  position: relative;
  width: 369.375px;
  height: 48.75px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 14;
}
.transaction-id {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 246.875px;
  bottom: 18.75px;
  color: #c8c8c8;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.efe {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 41.25px;
  bottom: 16.875px;
  color: #939393;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 16;
}
.image-e {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 23.75px;
  bottom: 19.375px;
  background: url(${assetBase}template25/NMrbBXQyqq.png)
    no-repeat center;
  background-size: cover;
  z-index: 15;
}
.groups-f {
  position: relative;
  width: 369.375px;
  height: 49.375px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 11;
}
.submitted-time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 240px;
  bottom: 19.375px;
  color: #c4c4c4;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 13;
}
.apr-9-a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 21.875px;
  bottom: 16.25px;
  color: #8d8d8d;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 18.153px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.groups-10 {
  position: relative;
  width: 369.375px;
  height: 50.625px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 7;
}
.reference-no {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 251.25px;
  bottom: 21.25px;
  color: #cccccc;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 700;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;
}
.number {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 41.25px;
  bottom: 20.625px;
  color: #9a9a9a;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.image-11 {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 23.75px;
  bottom: 21.875px;
  background: url(${assetBase}template25/mruFnv7Gc3.png)
    no-repeat center;
  background-size: cover;
  z-index: 8;
}
.groups-12 {
  position: relative;
  width: 369.375px;
  height: 92.5px;
  margin: 10px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
  overflow: visible auto;
}
.button {
  position: relative;
  width: 328.75px;
  height: 48.75px;
  margin: 1.875px 0 0 20px;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
  overflow: visible auto;
}
.background {
  position: relative;
  width: 323.125px;
  height: 45.625px;
  margin: 1.25px 0 0 3.125px;
  background: #bafe2f;
  border: 0.63px solid #9ec739;
  z-index: 5;
  border-radius: 24.375px;
}
.view-on-blockchain {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 71.875px;
  bottom: 14.375px;
  color: #334c12;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 700;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.transaction-arrival {
  display: block;
  position: relative;
  height: 18.125px;
  margin: 9.375px 0 0 65px;
  color: #bbbbbb;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 400;
  line-height: 17.397px;
  text-align: left;
  white-space: nowrap;
  z-index: 3;
}
.background-13 {
  position: relative;
  width: 130.625px;
  height: 5px;
  margin: 27.5px 0 0 120px;
  background: url(${assetBase}template25/DBy7dYiUFP.png)
    no-repeat center;
  background-size: cover;
}
.background-14 {
  position: absolute;
  width: 369.375px;
  height: 1.875px;
  right: 0;
  bottom: 521.875px;
  background: url(${assetBase}template25/uZKPScuzsO.png)
    no-repeat center;
  background-size: cover;
  z-index: 33;
}



      `}</style>

<>

  <div className="main-container">
    <div className="groups">
      <span className="time">2:44</span>
      <div className="image" />
      <div className="image-1" />
      <div className="image-2" />
    </div>
    <div className="groups-3">
      <div className="image-4" />
    </div>
    <div className="groups-5">
      <div className="image-6" />
      <span className="text-2">Withdrawn 0.00071753 BTC</span>
      <span className="text-3">~$52.88</span>
    </div>
    <div className="group-2">
      <div className="img-3" />
      <span className="text-4">Completed</span>
      <span className="text-5">Status</span>
    </div>
    <div className="group-3">
      <div className="box">
        <span className="text-6">
          38N87V6h6edvpgTm3EML
          <br />
          qnUg5xHqJH9XFh
        </span>
        <span className="text-7">Address</span>
        <div className="image-7" />
      </div>
      <div className="groups-8">
        <span className="btc-price">$73,708.1/BTC</span>
        <span className="price">Price</span>
        <div className="image-9" />
      </div>
      <div className="groups-a">
        <span className="network">Network</span>
        <span className="bitcoin">Bitcoin</span>
        <div className="image-b" />
      </div>
      <div className="groups-c">
        <span className="btc">0.000015BTC</span>
        <span className="network-fee">Network fee</span>
      </div>
      <div className="groups-d">
        <span className="transaction-id">Transaction ID</span>
        <span className="efe">efe21...6a8de</span>
        <div className="image-e" />
      </div>
      <div className="groups-f">
        <span className="submitted-time">Submitted time</span>
        <span className="apr-9-a">Apr 9,2026 8:01AM</span>
      </div>
      <div className="groups-10">
        <span className="reference-no">Reference no.</span>
        <span className="number">392059425</span>
        <div className="image-11" />
      </div>
      <div className="groups-12">
        <div className="button">
          <div className="background">
            <span className="view-on-blockchain">
              View on blockchain explorer
            </span>
          </div>
        </div>
        <span className="transaction-arrival">
          Why hasn't my transaction arrived?
        </span>
      </div>
    </div>
    <div className="background-13" />
    <div className="background-14" />
  </div>
  {/* Generated by Codia AI - https://codia.ai/ */}
</>


    </>
  );
};

export default Template25;