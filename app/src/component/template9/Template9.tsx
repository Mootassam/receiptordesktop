import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template9Props {
  formData: FormData;
}

// Helper: truncate a string to show first N and last M characters
const truncateString = (str: string, startChars: number, endChars: number): string => {
  if (!str) return '';
  if (str.length <= startChars + endChars) return str;
  const start = str.slice(0, startChars);
  const end = str.slice(-endChars);
  return `${start}...${end}`;
};

// Format txid: first 5, last 5 → "3dcb4...50100"
const formatTxid = (txid: string) => truncateString(txid, 5, 5);

// Format USD amount with commas and 2 decimal places
const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Small exchange rate USDT → USD (realistic variation)
const USDT_TO_USD_RATE = 1.001;

const Template9: React.FC<Template9Props> = ({ formData }) => {
  const assetBase = window.location.protocol === 'file:' ? './' : '/';

  // Parse amount (remove commas if any)
  const rawAmount = formData.amount
    ? parseFloat(String(formData.amount).replace(/,/g, ''))
    : 700.7;
  const amountDisplay = formData.amount ? `${formData.amount}` : '700.7';
  const usdValue = rawAmount * USDT_TO_USD_RATE;
  const usdFormatted = formatUSD(usdValue);

  // Format txid
  const txidFormatted = formatTxid(formData.txid || '3dcb450100');

  // Address lines
  const addressLine1 = formData.receiver || 'TNyp9iAoFtWS5xv5YCCFSJlkHIL55KHNIOHH';
  const addressLine2 = 'Q7WWhG3Qn1tQKCp'; // second line (can be made dynamic if needed)

  // Fee display
  const feeDisplay = formData.fee !== undefined ? `${formData.fee}` : '2.3';

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
          background-color: #000;
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

        .flex-row-ee {
          position: relative;
          width: 369.375px;
          height: 289.375px;
          margin: 0 0 0 0;
          z-index: 46;
        }

        .groups {
          position: absolute;
          width: 369.375px;
          height: 38.125px;
          right: 0;
          bottom: 251.25px;
          background: #000;
          z-index: 46;
        }

        .button {
          position: absolute;
          width: 58.75px;
          height: 24.375px;
          right: 291.875px;
          bottom: 8.75px;
          background: rgba(0, 0, 0, 0);
          z-index: 50;
        }

        .background {
  display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 53.75px;
    height: 21.25px;
    margin: 3.125px 0 0 2.5px;
    background: #30d157;
    border: 0.63px solid #36df60;
    z-index: 51;
    border-radius: 10.781px;
        }

        .time {
          display: flex;
          align-items: center;
          position: absolute;
          height: 13.125px;
          color: #9eecad;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 700;
          line-height: 13.125px;
          text-align: center;
          white-space: nowrap;
          z-index: 52;
        }

        .network-4g {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 12.5px;
          right: 41.875px;
          bottom: 10px;
          color: #ababab;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 12.5px;
          text-align: left;
          white-space: nowrap;
          z-index: 48;
        }

        .image {
          position: absolute;
          width: 24.375px;
          height: 12.5px;
          right: 13.75px;
          bottom: 9.375px;
          background: url(${assetBase}template9/O2nYhPEHhv.png) no-repeat center;
          background-size: cover;
          z-index: 47;
        }

        .image-1 {
          position: absolute;
          width: 16.875px;
          height: 10.625px;
          right: 63.125px;
          bottom: 10px;
          background: url(${assetBase}template9/OjDXYAnEgS.png) no-repeat center;
          background-size: cover;
          z-index: 49;
        }

        .groups-2 {
          position: absolute;
          width: 369.375px;
          height: 261.875px;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 34;
        }

        .groups-3 {
          position: relative;
          width: 369.375px;
          height: 46.25px;
          margin: 11.875px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 44;
          overflow: visible auto;
        }

        .image-4 {
          position: relative;
          width: 7.5px;
          height: 16.25px;
          margin: 17.5px 0 0 23.75px;
          background: url(${assetBase}template9/wszEYqNHbR.png) no-repeat center;
          background-size: cover;
          z-index: 45;
        }

        .groups-5 {
          position: relative;
          width: 369.375px;
          height: 125.625px;
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 40;
          overflow: visible auto;
        }

        .image-6 {
          position: relative;
          width: 39.375px;
          height: 39.375px;
          margin: 7.5px 0 0 165px;
          background: url(${assetBase}template9/EmrGi4Mp4j.png) no-repeat center;
          background-size: cover;
          z-index: 43;
        }

        .withdrawn {
          display: flex;
          justify-content: center;
          position: relative;
          height: 25px;
          margin: 8.75px 0 0 0px;
          color: #d9d9d9;
          font-family: Inter, var(--default-font-family);
          font-size: 22.5px;
          font-weight: 700;
          line-height: 25px;
          text-align: left;
          white-space: nowrap;
          z-index: 42;
        }

        .withdrawn-amount {
          display: block;
          position: relative;
          height: 17px;
          margin: 5.625px 0 0 151.25px;
          color: #7a7a7a;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 17px;
          text-align: left;
          white-space: nowrap;
          z-index: 41;
        }

        .groups-7 {
          position: relative;
          width: 369.375px;
          height: 63.75px;
          margin: 8.125px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 36;
        }

        .image-8 {
          position: absolute;
          width: 31.25px;
          height: 31.25px;
          right: 314.375px;
          bottom: 21.875px;
          background: url(${assetBase}template9/HRQ96FoKzA.png) no-repeat center;
          background-size: cover;
          z-index: 39;
        }

        .completed {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 18.75px;
          right: 23.125px;
          bottom: 27.5px;
          color: #9e9e9e;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 18.153px;
          text-align: left;
          white-space: nowrap;
          z-index: 37;
        }

        .status {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15.625px;
          right: 255.625px;
          bottom: 30px;
          color: #bcbcbc;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 700;
          line-height: 15.625px;
          text-align: left;
          white-space: nowrap;
          z-index: 38;
        }

        .background-9 {
          position: relative;
          height: 1.875px;
          margin: 0.63px 0 0 0;
          background: #080808;
          z-index: 35;
        }

        /* ========== FLEXIBLE DETAIL CONTAINER ========== */
        .detail-container {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 0 23.75px;            /* equal left/right padding */
          margin-top: 20.625px;
          background: rgba(0, 0, 0, 0);
          z-index: 10;
        }

        /* ----- address row (two lines) ----- */
        .address-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          height: 67.5px;               /* match original groups-b height */
          padding-top: 12.5px;
          width: 100%;
        }

        .address-label {
          color: #c5c5c5;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 16.25px;
          white-space: nowrap;
        }

        .address-value {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #959595;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 19.375px;
          text-align: right;
          white-space: pre-line;
          word-break: break-all;
          overflow-wrap: break-word;
          max-width: 220px;
        }

        .address-second-line {
          display: block;
          height: 19.375px;
          margin-top: -5px;
          margin-left: 166.875px;        /* original offset from left */
          color: #909090;
          font-family: Inter, var(--default-font-family);
          font-size: 15.625px;
          font-weight: 400;
          line-height: 18.91px;
          text-align: left;
          white-space: nowrap;
        }

        /* ----- price row ----- */
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          margin-top: 1.875px;
          width: 100%;
        }

        .price-left {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #d3d3d3;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 16.25px;
          white-space: nowrap;
        }

        .price-right {
          color: #969696;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 18px;
          text-align: left;
          white-space: nowrap;
        }

        /* ----- network row ----- */
        .network-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50.625px;
          margin-top: 0.63px;
          width: 100%;
        }

        .network-label {
          color: #b9b9b9;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 15.625px;
          white-space: nowrap;
        }

        .network-value {
          color: #969696;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 17.397px;
          text-align: left;
          white-space: nowrap;
        }

        /* ----- fee row ----- */
        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50.625px;
          margin-top: 0.63px;
          width: 100%;
        }

        .fee-label {
          color: #d0d0d0;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 16.25px;
          white-space: nowrap;
        }

        .fee-value {
          color: #848484;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 16.875px;
          text-align: left;
          white-space: nowrap;
        }

        /* ----- txid row ----- */
        .txid-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50.625px;
          margin-top: 0.63px;
          width: 100%;
        }

        .txid-label {
          color: #d2d2d2;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 16.875px;
          white-space: nowrap;
        }

        .txid-value {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #989898;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 17.5px;
          white-space: nowrap;
        }

        /* ----- submitted time row ----- */
        .time-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 53.125px;
          margin-top: 1.25px;
          width: 100%;
        }

        .time-label {
          color: #cccccc;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 700;
          line-height: 16.875px;
          white-space: nowrap;
        }

        .time-value {
          color: #888888;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 18.153px;
          white-space: nowrap;
        }

        /* icons inside value texts */
        .copy-icon {
          width: 11.875px;
          height: 11.875px;
          background: url(${assetBase}template9/KVwRCpYOzD.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        .link-icon {
          width: 11.875px;
          height: 12.5px;
          background: url(${assetBase}template9/cFCpPQbbT9.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        .info-icon {
          width: 13.75px;
          height: 13.75px;
          background: url(${assetBase}template9/k6zCPATNEx.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* ---- Button and footer (unchanged) ---- */
        .flex-row-b {
          position: relative;
          width: 369.375px;
          height: 103.125px;
          margin: 24.375px 0 0 0;
          z-index: 7;
        }

        .button-16 {
          position: absolute;
          width: 327.5px;
          height: 51.25px;
          right: 21.25px;
          bottom: 51.875px;
          background: rgba(0, 0, 0, 0);
          z-index: 7;
        }

        .background-17 {
          position: relative;
          width: 321.875px;
          height: 47.5px;
          margin: 3.75px 0 0 3.125px;
          background: #bcfd30;
          border: 0.63px solid #9dc638;
          z-index: 8;
          border-radius: 21.875px;
        }

        .view-blockchain-explorer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 17.5px;
          right: 68.125px;
          bottom: 15px;
          color: #324a13;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 700;
          line-height: 15.884px;
          text-align: left;
          white-space: nowrap;
          z-index: 9;
        }

        .groups-18 {
          position: absolute;
          width: 369.375px;
          height: 100px;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 3;
        }

        .image-19 {
          position: absolute;
          width: 30.625px;
          height: 28.75px;
          right: 315.625px;
          bottom: 16.25px;
          background: #000000;
          z-index: 6;
        }

        .image-1a {
          position: absolute;
          width: 25.625px;
          height: 23.75px;
          right: 26.25px;
          bottom: 20.625px;
          background: #000000;
          z-index: 4;
        }

        .transaction-arrived {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 19.375px;
          right: 59.375px;
          bottom: 21.25px;
          color: #c2c2c2;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 18.153px;
          text-align: left;
          white-space: nowrap;
          z-index: 5;
        }

        .background-1b {
          position: relative;
          width: 131.875px;
          height: 5px;
          margin: 21.875px 0 0 118.75px;
          background: url(${assetBase}template9/n7XDdPfQKH.png) no-repeat center;
          background-size: cover;
          z-index: 2;
        }
      `}</style>

      <div className="main-container">
        <div className="flex-row-ee">
          <div className="groups">
            <div className="button">
              <div className="background"><span className="time">{formData.time || '9:37'}</span></div>
            </div>
            <span className="network-4g">4G</span>
            <div className="image"></div>
            <div className="image-1"></div>
          </div>
          <div className="groups-2">
            <div className="groups-3">
              <div className="image-4"></div>
            </div>
            <div className="groups-5">
              <div className="image-6"></div>
              <span className="withdrawn">Withdrawn {amountDisplay} USDT</span>
              <span className="withdrawn-amount">{usdFormatted}</span>
            </div>
            <div className="groups-7">
              <div className="image-8"></div>
              <span className="completed">Completed</span><span className="status">Status</span>
            </div>
            <div className="background-9"></div>
          </div>
        </div>

        {/* ========== FLEX DETAIL SECTION ========== */}
        <div className="detail-container">
          {/* Address */}
          <div className="address-row">
            <span className="address-label">Address</span>
            <span className="address-value">
              {addressLine1}
              <div className="copy-icon" />
            </span>
          </div>

          {/* Price */}
          <div className="price-row">
            <div className="price-left">
              Price
              <div className="info-icon" />
            </div>
            <span className="price-right">$1/USDT</span>
          </div>

          {/* Network */}
          <div className="network-row">
            <span className="network-label">Network</span>
            <span className="network-value">Tron (TRC20)</span>
          </div>

          {/* Network fee */}
          <div className="fee-row">
            <span className="fee-label">Network fee</span>
            <span className="fee-value">{feeDisplay} USDT</span>
          </div>

          {/* Transaction ID */}
          <div className="txid-row">
            <span className="txid-label">Transaction ID</span>
            <span className="txid-value">
              {txidFormatted}
              <div className="link-icon" />
            </span>
          </div>

          {/* Submitted time */}
          <div className="time-row">
            <span className="time-label">Submitted time</span>
            <span className="time-value">{Dates.formatTemplate9(formData.date)}</span>
          </div>
        </div>

        <div className="flex-row-b">
          <div className="button-16">
            <div className="background-17">
              <span className="view-blockchain-explorer">View on blockchain explorer</span>
            </div>
          </div>
          <div className="groups-18">
            <div className="image-19"></div>
            <div className="image-1a"></div>
            <span className="transaction-arrived">Why hasn't my transaction arrived?</span>
          </div>
        </div>
        <div className="background-1b"></div>
      </div>
    </>
  );
};

export default Template9;