import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';

interface Template8Props {
  formData: FormData;
}

const Template8: React.FC<Template8Props> = ({ formData }) => {
  const assetBase = window.location.protocol === 'file:' ? './' : '/';

  // Prepare dynamic values
  const amountDisplay = formData.amount ? `-${formData.amount}USDT` : '-88USDT';
  const amountNumber = formData.amount ? `${formData.amount} USDT` : '89 USDT';
  const receiverAddress = formData.receiver || 'TB9ZZYYYmtjRPbMC5qWKpM7EKsVYML32ff';
  const txidValue =
    formData.txid || 'f5f5f013857f2c065ed3b1d0e95a72620a1f6096b8c8ce985ff22cb203360334';
  const feeDisplay = formData.fee !== undefined ? `${formData.fee}USDT` : '15 USDT';
  const dateTimeDisplay = formData.date || '2026-01-28 02:12:57';

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
          width: 359.375px;
          height: 800px;
          margin: 0 auto;
          background: #fff;
        }

        /* Top status bar – unchanged */
        .groups {
          position: relative;
          width: 359.375px;
          height: 44.375px;
          margin: 0.63px 0 0 0;
          background: #fff;
          z-index: 47;
        }

        .time-stamp {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 16.875px;
          right: 298.125px;
          bottom: 10.625px;
          color: #2d2d2d;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 500;
          line-height: 16.875px;
          text-align: left;
          white-space: nowrap;
          z-index: 53;
        }

        .lte {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 17.5px;
          right: 88.125px;
          bottom: 10px;
          color: #272727;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 400;
          line-height: 15.884px;
          text-align: left;
          white-space: nowrap;
          z-index: 50;
        }

        .image {
          position: absolute;
          width: 25.625px;
          height: 14.375px;
          right: 34.375px;
          bottom: 11.25px;
          background: url(${assetBase}template8/iG0WNOzkgh.png) no-repeat center;
          background-size: cover;
          z-index: 48;
        }

        .image-1 {
          position: absolute;
          width: 17.5px;
          height: 13.125px;
          right: 66.25px;
          bottom: 11.875px;
          background: url(${assetBase}template8/kFJiTQqjQh.png) no-repeat center;
          background-size: cover;
          z-index: 49;
        }

        .image-2 {
          position: absolute;
          width: 13.75px;
          height: 13.75px;
          right: 278.75px;
          bottom: 11.25px;
          background: url(${assetBase}template8/42pQHRWzCv.png) no-repeat center;
          background-size: cover;
          z-index: 52;
        }

        .image-3 {
          position: absolute;
          width: 13.75px;
          height: 10px;
          right: 259.375px;
          bottom: 13.125px;
          background: url(${assetBase}template8/R8rmhQBaio.png) no-repeat center;
          background-size: cover;
          z-index: 51;
        }

        /* Withdrawal header – unchanged */
        .groups-4 {
          position: relative;
          width: 359.375px;
          height: 37.5px;
          margin: 4.375px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 43;
        }

        .withdrawal-details {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15.625px;
          right: 111.875px;
          bottom: 8.75px;
          color: #353535;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 700;
          line-height: 15.625px;
          text-align: left;
          white-space: nowrap;
          z-index: 45;
        }

        .image-5 {
          position: absolute;
          width: 13.75px;
          height: 12.5px;
          right: 13.125px;
          bottom: 10px;
          background: url(${assetBase}template8/RiVeOcB2A4.png) no-repeat center;
          background-size: cover;
          z-index: 44;
        }

        .image-6 {
          position: absolute;
          width: 11.875px;
          height: 10px;
          right: 333.125px;
          bottom: 11.25px;
          background: url(${assetBase}template8/9BN5H2wvw3.png) no-repeat center;
          background-size: cover;
          z-index: 46;
        }

        /* ------------------------------------------------------------
           FLEX BASED DETAIL SECTION (replaces old absolute positions)
        ------------------------------------------------------------ */
        .groups-7 {
          position: relative;
          width: 359.375px;
          height: 445px;
          margin: 8.75px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 6;
          overflow: visible auto;
        }

        .groups-8 {
          position: relative;
          width: 359.375px;
          height: 126.25px;
          margin: 0 0 0 0;
          font-size: 0px;
          background: rgba(0, 0, 0, 0);
          z-index: 37;
          overflow: visible auto;
        }

        .usdt {
          display: flex;
          justify-content: center;
          position: relative;
          height: 23.75px;
          margin: 12.5px 0 0 0px;
          color: #1f1f1f;
          font-family: Inter, var(--default-font-family);
          font-size: 21.875px;
          font-weight: 700;
          line-height: 23.75px;
          text-align: left;
          white-space: nowrap;
          z-index: 42;
        }

        .flex-row-f {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          gap: 5px;
          height: 13.75px;
          margin: 10.625px 0 0 0px;
          z-index: 41;
        }

        .image-9 {
          flex-shrink: 0;
          position: relative;
          width: 12.5px;
          height: 11.875px;
          background: url(${assetBase}template8/6q22e3hWd3.png) no-repeat center;
          background-size: cover;
          z-index: 41;
        }

        .completed {
          flex-shrink: 0;
          position: relative;
          height: 13px;
          color: #87c2af;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 13px;
          text-align: left;
          white-space: nowrap;
          z-index: 40;
        }

        .crypto-transferr {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 26.875px;
          margin: 7.5px 0 0 0px;
          color: #b6b6b6;
          font-family: Inter, var(--default-font-family);
          font-size: 8.75px;
          font-weight: 400;
          line-height: 12.305px;
          text-align: center;
          text-overflow: initial;
          z-index: 39;
          overflow: hidden;
        }

        .why-hasnt-my-wi {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 11.875px;
          margin: 0.63px 0 0 0px;
          color: #d6c886;
          font-family: Inter, var(--default-font-family);
          font-size: 8.75px;
          font-weight: 400;
          line-height: 10.589px;
          text-align: left;
          white-space: nowrap;
          z-index: 38;
        }

        .background {
          position: relative;
          width: 359.375px;
          height: 1.875px;
          margin: 0.63px 0 0 0;
          background: #fcfcfc;
          z-index: 36;
        }

        /* ---- FLEXIBLE DETAIL CONTAINER ---- */
        .groups-a {
          position: relative;
          width: 359.375px;
          min-height: 306.875px;
          margin: 9.375px 0 0 0;
          padding: 0 13px 0 12.5px;
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0);
          z-index: 7;
          box-sizing: border-box;
        }

        /* Network row (Network / TRX) */
        .network-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 11.25px;
          margin-top: 11.875px;
        }

        .network-label {
          color: #a0a0a0;
          font-family: Inter, var(--default-font-family);
          font-size: 10px;
          font-weight: 400;
          line-height: 11.25px;
          text-align: left;
          white-space: nowrap;
        }

        .network-value {
          color: #525252;
          font-family: Inter, var(--default-font-family);
          font-size: 10px;
          font-weight: 400;
          line-height: 11.25px;
          text-align: left;
          white-space: nowrap;
        }

        /* Address row */
        .address-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          min-height: 29.375px;
          margin-top: 16.25px;
        }

        .address-label {
          color: #9f9f9f;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 10.625px;
          white-space: nowrap;
          padding-top: 1px;
        }

        .address-value {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 5px;
          color: #5f5f5f;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 13.906px;
          text-align: right;
          white-space: pre-line;
          word-break: break-all;
          overflow-wrap: break-word;
          max-width: 160px;
        }

        .save-address {
          align-self: flex-end;
          margin-top: 5px;
          height: 11.25px;
          color: #cbbc71;
          font-family: Inter, var(--default-font-family);
          font-size: 8.75px;
          font-weight: 400;
          line-height: 10.589px;
          text-align: left;
          white-space: nowrap;
        }

        /* Txid row */
        .txid-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          min-height: 13.75px;
          margin-top: 10px;
        }

        .txid-label {
          color: #a1a1a1;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        .txid-value {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          color: #595959;
          font-family: Inter, var(--default-font-family);
          font-size: 10px;
          font-weight: 400;
          line-height: 13.75px;
          text-align: right;
          white-space: pre-line;
          word-break: break-all;
          overflow-wrap: break-word;
          max-width: 161px;
        }

        /* Amount row */
        .amount-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 28.125px;
          margin-top: 0;
        }

        .amount-label {
          color: #9e9e9e;
          font-family: Inter, var(--default-font-family);
          font-size: 10px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        .amount-value {
          color: #595959;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        /* Fee row */
        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 28.75px;
          margin-top: 0.625px;
        }

        .fee-label {
          color: #a9a9a9;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        .fee-value {
          color: #626262;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        /* Wallet row */
        .wallet-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 28.125px;
          margin-top: 1.25px;
        }

        .wallet-label {
          color: #9f9f9f;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        .wallet-value {
          color: #5b5b5b;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 12.5px;
          white-space: nowrap;
        }

        /* Date row */
        .date-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 30px;
          margin-top: 0.63px;
        }

        .date-label {
          color: #a2a2a2;
          font-family: Inter, var(--default-font-family);
          font-size: 10px;
          font-weight: 400;
          line-height: 11.25px;
          white-space: nowrap;
        }

        .date-value {
          color: #5b5b5b;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 400;
          line-height: 11.875px;
          white-space: nowrap;
        }

        /* Scam report row – pushed to bottom */
        .scam-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: auto;
          padding-bottom: 4.375px;
          gap: 3.125px;
        }

        .scam-report {
          height: 11px;
          color: #a0a0a0;
          font-family: Inter, var(--default-font-family);
          font-size: 8.75px;
          font-weight: 700;
          line-height: 10.589px;
          white-space: nowrap;
        }

        .image-17 {
          width: 11.875px;
          height: 11.25px;
          background: url(${assetBase}template8/6ckR8Ndn4m.png) no-repeat center;
          background-size: cover;
        }

        /* Copy icon for address */
        .image-c {
          width: 18.625px;
          height: 11.25px;
          background: url(${assetBase}template8/f67YyS34ws.png) no-repeat center;
          background-size: cover;
        }

        /* Copy icon for txid */
        .image-e {
          width: 18.625px;
          height: 11.25px;
          background: url(${assetBase}template8/f67YyS34ws.png) no-repeat center;

          background-size: cover;
        }

        /* Remaining static elements */
        .button {
          position: relative;
          width: 340px;
          height: 43.75px;
          margin: 186.25px 0 0 9.375px;
          background: rgba(0, 0, 0, 0);
          z-index: 3;
          overflow: visible auto;
        }

        .background-18 {
          position: relative;
          width: 335.625px;
          height: 38.75px;
          margin: 2.5px 0 0 2.5px;
          background: #fbd433;
          border: 0.63px solid #eed85f;
          z-index: 4;
          border-radius: 4.375px;
        }

        .withdraw-again {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15.625px;
          right: 121.25px;
          bottom: 11.25px;
          color: #836d29;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 700;
          line-height: 13.615px;
          text-align: left;
          white-space: nowrap;
          z-index: 5;
        }

        .background-19 {
          position: relative;
          width: 85.625px;
          height: 3.125px;
          margin: 18.125px 0 0 136.875px;
          background: url(${assetBase}template8/BmSwgtXRFJ.png) no-repeat center;
          background-size: cover;
          z-index: 2;
        }

        .image-1b {
          position: absolute;
          width: 359.375px;
          height: 580px;
          right: 0;
          bottom: 0;
          background-size: cover;
          z-index: 1;
        }
      `}</style>

      <div className="main-container">
        <StatusBar defaultTheme="light" />
        <div className="groups-4">
          <span className="withdrawal-details">Withdrawal Details</span>
          <div className="image-5"></div>
          <div className="image-6"></div>
        </div>
        <div className="groups-7">
          <div className="groups-8">
            <span className="usdt">{amountDisplay}</span>
            <div className="flex-row-f">
              <div className="image-9"></div>
              <span className="completed">Completed</span>
            </div>
            <span className="crypto-transferr">
              Crypto transferred out of Binance. Please contact the recipient
              platform for your<br />transaction receipt.
            </span>
            <span className="why-hasnt-my-wi">Why hasn't my withdrawal arrived?</span>
          </div>
          <div className="background"></div>

          {/* ===== FLEX DETAIL SECTION ===== */}
          <div className="groups-a">
            {/* Network */}
            <div className="network-row">
              <span className="network-label">Network</span>
              <span className="network-value">TRX</span>
            </div>

            {/* Address */}
            <div className="address-row">
              <span className="address-label">Address</span>
              <span className="address-value">
                {receiverAddress}
                <div className="image-c" />
              </span>
            </div>
            <span className="save-address">Save Address</span>

            {/* Txid */}
            <div className="txid-row">
              <span className="txid-label">Txid</span>
              <span className="txid-value">
                {txidValue}
                <div className="image-e" />
              </span>
            </div>

            {/* Amount */}
            <div className="amount-row">
              <span className="amount-label">Amount</span>
              <span className="amount-value">{amountNumber}</span>
            </div>

            {/* Network fee */}
            <div className="fee-row">
              <span className="fee-label">Network fee</span>
              <span className="fee-value">{feeDisplay}</span>
            </div>

            {/* Wallet */}
            <div className="wallet-row">
              <span className="wallet-label">Wallet</span>
              <span className="wallet-value">Spot Wallet</span>
            </div>

            {/* Date */}
            <div className="date-row">
              <span className="date-label">Date</span>
              <span className="date-value">{Dates.formatTemplate8(formData.date)}</span>
            </div>

            {/* Scam Report (pushed to bottom) */}
            <div className="scam-row">
              <span className="scam-report">Scam Report</span>
              <div className="image-17" />
            </div>
          </div>
        </div>
        <div className="button">
          <div className="background-18">
            <span className="withdraw-again">Withdraw Again</span>
          </div>
        </div>
        <div className="background-19"></div>
        <div className="image-1b"></div>
      </div>
    </>
  );
};

export default Template8;