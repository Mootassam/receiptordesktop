import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
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

  const amountUSD = parseNumber(formData.amount, 108.51);
  const feeUSD = parseNumber(formData.fee, 0.50);
  const rate = btcUsdRate !== null && btcUsdRate > 0 ? btcUsdRate : 0;

  const amountBTC = rate > 0 ? amountUSD / rate : 0;
  const feeBTC = rate > 0 ? feeUSD / rate : 0;

  const formatBTC = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const amountBTCFormatted = formatBTC(amountBTC);
  const feeBTCFormatted = formatBTC(feeBTC);
  const amountUSDFormatted = formatUSD(amountUSD);
  const feeUSDFormatted = formatUSD(feeUSD);
  const pricePerCoinFormatted = formatUSD(rate);

  const formatTxid = (txid: string | undefined): string => {
    const defaultTxid = 'qdkswz...f5y0it';
    if (!txid) return defaultTxid;
    if (txid.length <= 13) return txid;
    return `${txid.slice(0, 6)}...${txid.slice(-6)}`;
  };

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

  const showLoading = loading && btcUsdRate === null;

  // Prepare dynamic values
  const displayQuantity = formData.amount || '638';
   const displayTime = Dates.formatTemplate22(formData.date);
  const displayAddress = formData.receiver || 'TYNfFDdew9qjJynQG6ZXMRWUHB5yFngMm4';
  const displayTxid = formData.txid || '127a41421b1a3cbae799d18f256373b130a4014e977d326caOfc9cc435af3d45';
  const displayChain = formData.chain || 'TRON (TRC20)';
  const displayFee = formData.fee ? formatUSD(parseNumber(formData.fee, 0.5)) : '$0.50';

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
          background: url(${assetBase}template22/NwHhM5wYV4.png) no-repeat center;
          background-size: cover;
          z-index: 29;
        }

        .image-1 {
          position: absolute;
          width: 15.625px;
          height: 11.875px;
          right: 46.25px;
          bottom: 17.5px;
          background: url(${assetBase}template22/GSWEOq59Sk.png) no-repeat center;
          background-size: cover;
          z-index: 30;
        }

        .image-2 {
          position: absolute;
          width: 16.25px;
          height: 11.25px;
          right: 66.875px;
          bottom: 18.125px;
          background: url(${assetBase}template22/5X3x2Oqqu5.png) no-repeat center;
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
          background: url(${assetBase}template22/WFL7iHNs5j.png) no-repeat center;
          background-size: cover;
          z-index: 27;
        }

        .groups-5 {
          position: relative;
          width: 369.375px;
          margin: 30.625px 0 0 0;
          font-size: 0px;
          background: rgba(0, 0, 0, 0);
          z-index: 6;
          overflow: visible auto;
        }

        .quantity {
         display: flex;
          justify-content:center; 
          align-items:center ; 
          position: relative;
          height: 16.25px;
          margin: 0 0 0 0px;
          color: #565656;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 300;
          line-height: 15.884px;
          text-align: center;
          white-space: nowrap;
          z-index: 24;
        }

        .usdt {
          display: flex;
          justify-content:center; 
          align-items:center ; 
          position: relative;
          height: 23px;
          margin: 6.875px 0 0 0px;
          color: #dadada;
          font-family: Inter, var(--default-font-family);
          font-size: 18.75px;
          font-weight: 700;
          line-height: 22.692px;
          text-align: center;
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
          background: url(${assetBase}template22/Weu1PyCmbT.png) no-repeat center;
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

        /* ---------- REFACTORED FLEX SECTION ---------- */
        .groups-7 {
          width: 369.375px;
          margin: 55px 0 0 0;
          padding: 0 14.375px 0 14.375px; /* Matches original right/left spacing */
          display: flex;
          flex-direction: column;
          gap: 20px; /* Adjust spacing to mimic original absolute positions */
          background: rgba(0, 0, 0, 0);
          z-index: 7;
        }

        .double-label-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 5px;
        }

        .withdrawal-accou-new {
          color: #4c4d4f;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 300;
          line-height: 1.4;
          text-align: left;
        }

        .funding-account-new {
          color: #bbbbbb;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .detail-label {
          color: #505051; /* matches original .fees, .chain-type, .time-a, .withdrawal-address, .span-b */
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          white-space: nowrap;
        }

        .detail-value {
          color: #c6c6c6; /* matches original .number-one, .tron-trc, .time-9, .ty-nf-fd, .span */
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 400;
          line-height: 1.5;
          text-align: right;
          word-break: break-word;
          max-width: 198px;
        }

        /* Specific tweaks for address and txid to allow multiline */
        .address-value,
        .txid-value {
          font-size: 14.375px;
          font-weight: 300;
          color: #bebebe;
        }

        .txid-value {
          font-size: 13.75px;
          color: #a0a0a0;
        }

        .div {
          position: absolute;
          bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16.375px;
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
          background: url(${assetBase}template22/V943KeeqNG.png) no-repeat center;
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
         display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 130.625px;
    height: 5px;
    background: url(/template22/k6XZU3WEiY.png) no-repeat center;
    background-size: cover;
    z-index: 1;
        }
      `}</style>

      <div className="main-container">
        <div className="root">
          <StatusBar defaultTheme="dark" />
          <div className="groups-3">
            <span className="withdrawal-details">Withdrawal Details</span>
            <div className="image-4" />
          </div>
          <div className="groups-5">
            <span className="quantity">Quantity</span>
            <span className="usdt">{displayQuantity} USDT</span>
            <div className="flex-row-dd">
              <div className="image-6" />
              <span className="withdrawal-compl">Withdrawal Completed</span>
            </div>

            {/* ----- REFACTORED GROUPS-7 WITH FLEX ----- */}
            <div className="groups-7">
              {/* Double-label header row */}
              <div className="double-label-row">
                <span className="withdrawal-accou-new">Withdrawal Account</span>
                <span className="funding-account-new">Funding Account</span>
              </div>

              {/* Fees */}
              <div className="detail-row">
                <span className="detail-label">Fees</span>
                <span className="detail-value">{displayFee}</span>
              </div>

              {/* Chain Type */}
              <div className="detail-row">
                <span className="detail-label">Chain Type</span>
                <span className="detail-value">{displayChain}</span>
              </div>

              {/* Time */}
              <div className="detail-row">
                <span className="detail-label">Time</span>
                <span className="detail-value">{displayTime}</span>
              </div>

              {/* Withdrawal Address */}
              <div className="detail-row">
                <span className="detail-label">Withdrawal Address</span>
                <span className="detail-value address-value">{displayAddress}</span>
              </div>

              {/* Transaction Hash */}
              <div className="detail-row">
                <span className="detail-label">Transaction Hash</span>
                <span className="detail-value txid-value">{displayTxid}</span>
              </div>
            </div>
          </div>

          <div className="div">
            <div className="div-c">
              <div className="div-d">
                <span className="span-e">View in Blockchain Explorer</span>
              </div>
            </div>
          <div className="div-f" />

          </div>
        </div>
      </div>
    </>
  );
};

export default Template23;