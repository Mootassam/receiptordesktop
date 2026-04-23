import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template26Props {
  formData: FormData;
}

const Template26: React.FC<Template26Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  const [ethUsdRate, setEthUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live ETH/USD rate from CoinGecko
  useEffect(() => {
    const fetchEthUsdRate = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'ethereum',
              vs_currencies: 'usd'
            }
          }
        );
        const data = await response.data;
        const rate = data.ethereum?.usd;
        if (rate && typeof rate === 'number' && rate > 0) {
          setEthUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch ETH/USD rate:', err);
        setEthUsdRate(0);
      } finally {
        setLoading(false);
      }
    };
    fetchEthUsdRate();
  }, []);

  // Helper: parse number from string (remove commas)
  const parseNumber = (value: string | number | undefined, defaultValue: number): number => {
    if (value === undefined || value === null) return defaultValue;
    const parsed = parseFloat(String(value).replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Amount in USD (from formData.amount)
  const amountUSD = parseNumber(formData.amount, 1602.29);
  // Fee not displayed in this template, but keep for consistency
  const feeUSD = parseNumber(formData.fee, 0);

  const rate = ethUsdRate !== null && ethUsdRate > 0 ? ethUsdRate : 0;

  // Convert to ETH
  const amountETH = rate > 0 ? amountUSD / rate : 0;
  const feeETH = rate > 0 ? feeUSD / rate : 0;

  const formatETH = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
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

  const amountETHFormatted = formatETH(amountETH);
  const amountUSDFormatted = formatUSD(amountUSD);
  const pricePerCoinFormatted = rate > 0
    ? `$${rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ETH`
    : '$0/ETH';

  // Format txid with ellipsis
  const formatTxid = (txid: string | undefined): string => {
    const defaultTxid = '0x80e...c8856';
    if (!txid) return defaultTxid;
    if (txid.length <= 13) return txid;
    return `${txid.slice(0, 6)}...${txid.slice(-6)}`;
  };

  // Prepare display values
  const displayTime = formData.time || '2:45';
  const displayAmountETH = amountETHFormatted;
  const displayAmountUSD = formData.amount ? `~$${formData.amount}` : '~$1,602.29';
  const displayReceiver = formData.receiver || '0xe20da998dfecd9bf1d886770b59ceb50c125808f';
  const displayPrice = pricePerCoinFormatted;
  const displayNetwork = formData.chain || 'Ethereum (ERC20)';
  const displayTxid = formatTxid(formData.txid);
  const displayDate = formData.date || 'Apr 8,2026 12:24AM';
  const displayStatus = formData.status || 'Completed';

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
          background: url(${assetBase}template26/gfa3C08ah1.png) no-repeat center;
          background-size: cover;
          z-index: 41;
        }

        .image-3 {
          position: absolute;
          width: 15.625px;
          height: 11.875px;
          right: 46.25px;
          bottom: 12.5px;
          background: url(${assetBase}template26/nT4bYqAoFJ.png) no-repeat center;
          background-size: cover;
          z-index: 42;
        }

        .image-4 {
          position: absolute;
          width: 16.25px;
          height: 10.625px;
          right: 66.875px;
          bottom: 13.125px;
          background: url(${assetBase}template26/pQvq1RWJx7.png) no-repeat center;
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
          background: url(${assetBase}template26/8T5Ukf6jzM.png) no-repeat center;
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
                display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 34.375px;
          height: 34.375px;
          margin: 6.25px auto 0 auto;
          background: url(${assetBase}template26/xcUPLjUY5a.png) no-repeat center;
          background-size: cover;
          z-index: 37;
        }

        .deposited {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 26.875px;
          margin: 10px 0 0 0px;
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
       display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 16.875px;
          margin: 3.125px 0 0 0px;
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
          background: url(${assetBase}template26/dg7U7nocwX.png) no-repeat center;
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

        /* ---------- REFACTORED FLEX DETAILS SECTION ---------- */
        .groups-b {
          width: 369.375px;
          margin: 18.75px 0 0 0;
          padding: 0 21.875px 0 21.875px;
          display: flex;
          flex-direction: column;
          gap: 33px;
          background: rgba(0, 0, 0, 0);
          z-index: 9;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .detail-label {
          color: #b6b6b6;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          white-space: nowrap;
        }

        .detail-value {
          color: #919191;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
          word-break: break-word;
          max-width: 210px;
        }

        /* Price row with info icon */
        .price-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-icon {
          width: 13.125px;
          height: 12.5px;
          background: url(${assetBase}template26/CXOx6RZ8Yf.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Network row with icon */
        .network-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .network-icon {
          width: 13.75px;
          height: 14.375px;
          background: url(${assetBase}template26/OkqF1C9GOs.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Transaction ID row with copy icon */
        .txid-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .txid-copy-icon {
          width: 13.125px;
          height: 13.125px;
          background: url(${assetBase}template26/iqngHerTxC.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Address row with copy icon */
        .address-row {
          align-items: flex-start;
        }

        .address-value-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          max-width: 220px;
        }

        .address-text {
          color: #838383;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
          word-break: break-all;
        }

        .address-copy-icon {
          width: 13.125px;
          height: 13.125px;
          background: url(${assetBase}template26/XUDS49yZP3.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Time row (no icon) */
        .time-value {
          color: #8e8e8e;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.4;
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
          background: url(${assetBase}template26/ENec1fFnum.png) no-repeat center;
          background-size: cover;
          z-index: 2;
        }
      `}</style>

      <div className="main-container">
        <div className="groups">
          <div className="groups-1">
            <div className="groups-2">
              <span className="time-marker">{displayTime}</span>
              <div className="image" />
              <div className="image-3" />
              <div className="image-4" />
            </div>
            <div className="groups-5">
              <div className="image-6" />
            </div>
            <div className="groups-7">
              <div className="image-8" />
              <span className="deposited">Deposited {displayAmountETH} ETH</span>
              <span className="amount">{displayAmountUSD}</span>
            </div>
            <div className="image-9" />
            <span className="completed">{displayStatus}</span>
            <span className="status">Status</span>
          </div>
          <div className="groups-a">
            <div className="background" />
            {/* ----- FLEX DETAILS SECTION ----- */}
            <div className="groups-b">
              {/* Price */}
              <div className="detail-row">
                <span className="detail-label">Price</span>
                <div className="price-value-wrapper">
                  <span className="detail-value">{displayPrice}</span>
                  <div className="info-icon" />
                </div>
              </div>

              {/* Network */}
              <div className="detail-row">
                <span className="detail-label">Network</span>
                <div className="network-value-wrapper">
                  <span className="detail-value">{displayNetwork}</span>
                  <div className="network-icon" />
                </div>
              </div>

              {/* Transaction ID */}
              <div className="detail-row">
                <span className="detail-label">Transaction ID</span>
                <div className="txid-value-wrapper">
                  <span className="detail-value">{displayTxid}</span>
                  <div className="txid-copy-icon" />
                </div>
              </div>

              {/* Address */}
              <div className="detail-row address-row">
                <span className="detail-label">Address</span>
                <div className="address-value-wrapper">
                  <span className="address-text">{displayReceiver}</span>
                  <div className="address-copy-icon" />
                </div>
              </div>

              {/* Time */}
              <div className="detail-row">
                <span className="detail-label">Time</span>
                <span className="detail-value time-value">{displayDate}</span>
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
    </>
  );
};

export default Template26;