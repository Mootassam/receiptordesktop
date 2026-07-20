import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template24Props {
  formData: FormData;
}

const Template24: React.FC<Template24Props> = ({ formData }) => {
  const assetBase = window.location.protocol === 'file:' ? './' : '/';

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
              vs_currencies: 'usd',
            },
          }
        );
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

  // Amount in USD
  const amountUSD = parseNumber(formData.amount, 108.51);
  const feeUSD = parseNumber(formData.fee, 0.5);

  const rate = btcUsdRate !== null && btcUsdRate > 0 ? btcUsdRate : 0;

  const amountBTC = rate > 0 ? amountUSD / rate : 0;
  const feeBTC = rate > 0 ? feeUSD / rate : 0;

  const formatBTC = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const amountBTCFormatted = formatBTC(amountBTC);
  const feeBTCFormatted = formatBTC(feeBTC);

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

  const formatTxid = (txid: string | undefined): string => {
    const defaultTxid = 'qdkswz...f5y0it';
    if (!txid) return defaultTxid;
    if (txid.length <= 13) return txid;
    return `${txid.slice(0, 6)}...${txid.slice(-6)}`;
  };

  const formatAddress = (address: string | undefined): string => {
    const defaultAddr = 'bclqzw8hywvtyws6r4zn5x4vkxnj70wxe0z9wynquk';
    return address || defaultAddr;
  };

  const showLoading = loading && btcUsdRate === null;

  // Prepare dynamic values
  const displayChain = formData.chain || 'TRON (TRC20)';
  const displayTime = Dates.formatTemplate22(formData.date || '2026-04-04 11:20:19');
  const displayAddress = formData.sender || 'TE5vtrL4xyS198GDX76wmCeMuTAzeSKxKu';
  const displayTxid = formData.txid || 'fdc9c7d6a78b637bd202ee1ad9fd71d2d527c778b5237d85d75bba66fabf11c5';

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
          background: url(${assetBase}template24/N0PXyygpDk.png) no-repeat center;
          background-size: cover;
          z-index: 28;
        }

        .image-1 {
          position: absolute;
          width: 15.625px;
          height: 11.875px;
          right: 46.25px;
          bottom: 17.5px;
          background: url(${assetBase}template24/rW6ttMqnMm.png) no-repeat center;
          background-size: cover;
          z-index: 29;
        }

        .image-2 {
          position: absolute;
          width: 16.25px;
          height: 10.625px;
          right: 66.875px;
          bottom: 18.125px;
          background: url(${assetBase}template24/BAj0k1a2sW.png) no-repeat center;
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
          background: url(${assetBase}template24/OSBoAVAb4r.png) no-repeat center;
          background-size: cover;
          z-index: 26;
        }

        .groups-5 {
          position: relative;
          width: 369.375px;
          // height: 341.875px;
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
          display: flex;
          justify-content: center;
          align-items: center;
          height: 16.25px;
          margin: 6.875px 0 0 0px;
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
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 24.375px;
          margin: 6.875px 0 0 0px;
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
          justify-content: center;
          align-items: center;
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
          background: url(${assetBase}template24/YXJ2vqsrxy.png) no-repeat center;
          background-size: cover;
          z-index: 21;
        }

        /* ---------- REFACTORED FLEX SECTION ---------- */
        .groups-8 {
          width: 369.375px;
          margin: 47.5px 0 0 0;
          padding: 0 18.125px 0 18.125px; /* matches original right/left positions */
          display: flex;
          flex-direction: column;
          gap: 18px; /* spacing between rows, tweaked to match original */
          background: rgba(0, 0, 0, 0);
          z-index: 7;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .detail-label {
          color: #5d5d5e; /* same as original .transaction-hash */
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          white-space: nowrap;
        }

        .detail-value {
          color: #bdbdbd; /* same as original .deposit-address */
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 300;
          line-height: 1.4;
          text-align: right;
          word-break: break-word;
          max-width: 198px;
        }

        /* For the special two-column header row */
        .double-label-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .funding-account-new {
          color: #bbbbbb;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
        }

        .deposit-account-new {
          color: #565658;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 300;
          line-height: 1.4;
          text-align: left;
        }

        /* Address & Txid can wrap multiple lines, right-aligned */
        .address-value,
        .txid-value {
          text-align: right;
          line-height: 1.5;
        }

        /* Maintain exact spacing as before */
        .groups-b {
       position: absolute;
       bottom: 10px;
       left: 0;
       right: 0;
       margin: 0 auto;
    width: 346.875px;
    display: flex;
    flex-direction: column;
    gap: 26px;
    align-items: center;
    justify-content: center;
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
             display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 130px;
    height: 5px;
    background: url(/template24/q4YgcoFgG0.png) no-repeat center;
    background-size: cover;
    z-index: 1;
        }
      `}</style>

      <div className="main-container">
        <div className="root">
          <StatusBar defaultTheme="dark" />
          <div className="groups-3">
            <span className="deposit-details">Deposit Details</span>
            <div className="image-4" />
          </div>
          <div className="groups-5">
            <div className="groups-6">
              <span className="quantity">Quantity</span>
              <span className="usdt">{formData.amount || '1,274.0506'} USDT</span>
              <span className="succeeded">Succeeded</span>
              <div className="image-7" />
            </div>

            {/* ----- REFACTORED GROUPS-8 WITH FLEX ----- */}
            <div className="groups-8">
              {/* Double-label row (preserves original "Funding Account" / "Deposit Account" visual) */}
              <div className="double-label-row">
                <span className="deposit-account-new">Deposit Account</span>
                <span className="funding-account-new">Funding Account</span>
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

              {/* Deposit Address */}
              <div className="detail-row">
                <span className="detail-label">Deposit Address</span>
                <span className="detail-value address-value">{displayAddress}</span>
              </div>

              {/* Transaction Hash */}
              <div className="detail-row">
                <span className="detail-label">Transaction Hash</span>
                <span className="detail-value txid-value">{displayTxid}</span>
              </div>
            </div>
          </div>
          <div className="groups-b">
            <div className="button">
              <div className="background">
                <span className="view-in-blockcha">View in Blockchain Explorer</span>
              </div>
            </div>
          <div className="background-c" />

          </div>
        </div>
      </div>
    </>
  );
};

export default Template24;