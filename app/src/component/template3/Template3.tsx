import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';

interface Template3Props {
  formData: FormData;
}

const Template3: React.FC<Template3Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  // Parse amount
  const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 18.539255;
  const amountDisplay = formData.amount ? `-${formData.amount}USDT` : "-18.539255USDT";

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
        }
        .groups {
          position: absolute;
          height: 800px;
          top: 0;
          right: 0;
          left: 0;
          background: #1f2630;
          z-index: 2;
        }
        .groups-1 {
          position: relative;
          width: 369.375px;
          height: 37.5px;
          margin: 0 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 50;
        }
        .button {
          position: absolute;
          width: 63.75px;
          height: 25px;
          right: 272.5px;
          bottom: 6.25px;
          background: rgba(0, 0, 0, 0);
          z-index: 54;
        }
        .background {
          position: relative;
          width: 58.75px;
          height: 20px;
          margin: 3.125px 0 0 2.5px;
          background: #2bb34f;
          border: 0.63px solid #2ebd50;
          z-index: 55;
          border-radius: 10.313px;
        }
        .time-marker {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 12.5px;
          right: 14.375px;
          bottom: 3.75px;
          color: #a3e3af;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 400;
          line-height: 12.5px;
          text-align: left;
          white-space: nowrap;
          z-index: 56;
        }
        .network-type {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 13.75px;
          right: 60.625px;
          bottom: 8.75px;
          color: #afb4ba;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 13.75px;
          text-align: left;
          white-space: nowrap;
          z-index: 52;
        }
        .image {
          position: absolute;
          width: 26.875px;
          height: 13.125px;
          right: 28.125px;
          bottom: 8.75px;
          background: url(${assetBase}template3/iFBk3mpHKY.png)
            no-repeat center;
          background-size: cover;
          z-index: 51;
        }
        .image-2 {
          position: absolute;
          width: 19.375px;
          height: 12.5px;
          right: 84.375px;
          bottom: 9.375px;
          background: url(${assetBase}template3/5SBUOOKqf8.png)
            no-repeat center;
          background-size: cover;
          z-index: 53;
        }
        .groups-3 {
          position: relative;
          width: 369.375px;
          height: 40px;
          margin: 0.63px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 46;
        }
        .withdrawal-details {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 16.25px;
          right: 118.75px;
          bottom: 10.625px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 13.75px;
          font-weight: 700;
          line-height: 16.25px;
          text-align: left;
          white-space: nowrap;
          z-index: 48;
        }
        .image-4 {
          position: absolute;
          width: 14.375px;
          height: 13.75px;
          right: 18.75px;
          bottom: 11.875px;
          background: url(${assetBase}template3/2WpsDYMZXr.png)
            no-repeat center;
          background-size: cover;
          z-index: 47;
        }
        .image-5 {
          position: absolute;
          width: 13.125px;
          height: 10px;
          right: 336.875px;
          bottom: 13.75px;
          background: url(${assetBase}template3/wPCxEMPJXr.png)
            no-repeat center;
          background-size: cover;
          z-index: 49;
        }
        .groups-6 {
          position: relative;
          width: 369.375px;
          margin: 1.875px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 12;
          overflow: visible auto;
        }
        .groups-7 {
          position: relative;
          width: 369.375px;
          height: 148.125px;
          margin: 0 0 0 0;
          font-size: 0px;
          background: rgba(0, 0, 0, 0);
          z-index: 40;
          overflow: visible auto;
        }
        .minus-usdt {
          display: flex;
          position: relative;
          height: 25px;
          justify-content: center;
          margin: 20px 0 0 0px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 23.125px;
          font-weight: 700;
          line-height: 25px;
          text-align: center;
          white-space: nowrap;
          z-index: 45;
        }
        .flex-row-d {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 15px;
          margin: 14.375px 0 0 0px;
          gap: 3.375px;
          z-index: 44;
        }
        .image-8 {
          flex-shrink: 0;
          position: relative;
          width: 15.625px;
          height: 15px;
          background: url(${assetBase}template3/0cayj6xxzs.png)
            no-repeat center;
          background-size: cover;
          z-index: 44;
        }
        .completed {
          flex-shrink: 0;
          position: relative;
          height: 14.375px;
          color: #3d8170;
          font-family: Inter, var(--default-font-family);
          font-size: 10.625px;
          font-weight: 700;
          line-height: 14.375px;
          text-align: left;
          white-space: nowrap;
          z-index: 43;
        }
        .crypto-transferr {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 28.75px;
          margin: 8.125px 0 0 0px;
          color: #575e68;
          font-family: Inter, var(--default-font-family);
          font-size: 9.375px;
          font-weight: 400;
          line-height: 12.188px;
          text-align: center;
          text-overflow: initial;
          z-index: 42;
          overflow: hidden;
        }
        .why-not-arrived {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 13.125px;
          margin: 1.25px 0 0 0px;
          color: #827535;
          font-family: Inter, var(--default-font-family);
          font-size: 9.375px;
          font-weight: 400;
          line-height: 11.346px;
          text-align: left;
          white-space: nowrap;
          z-index: 41;
        }
        .background-9 {
          position: relative;
          width: 369.375px;
          height: 1.875px;
          margin: -0.63px 0 0 0;
          background: url(${assetBase}template3/ja0A2fk3DE.png)
            no-repeat center;
          background-size: cover;
          z-index: 39;
        }

        /* ---------- FLEX DETAILS (preserves exact original styles) ---------- */
        .groups-a {
          width: 369.375px;
          margin: -0.63px 0 0 0;
          padding: 29px 11.875px 0 11.875px;   /* same as original right/left */
          background: rgba(0, 0, 0, 0);
          z-index: 13;
          display: flex;
          flex-direction: column;
          gap: 11px;   /* we'll use margin on rows to match original spacing */
        }

        /* Each detail row uses flex with space-between */
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 12px;   /* matches original vertical rhythm */
        }

        /* TxID row (specific to original .groups-b styling) */
        .txid-row {
          margin-bottom: 2.5px;   /* adjusted to match original */
        }

        .txid-label {
          color: #5d646e;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 12.5px;
          white-space: nowrap;
        }

        .txid-value {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 15.7px;
          text-align: right;
          word-break: break-all;
          max-width: 220px;
        }

        .txid-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .copy-icon-txid {
          width: 11.25px;
          height: 11.875px;
          background: url(${assetBase}template3/eAVgFbQxa2.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Amount row */
        .amount-label {
          color: #606972;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.125px;
          white-space: nowrap;
        }

        .amount-value {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 14px;
          text-align: right;
        }

        /* Network fee row */
        .fee-label {
          color: #5d656f;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.125px;
          white-space: nowrap;
        }

        .fee-value {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 13.125px;
          text-align: right;
        }

        /* Withdrawal Wallet / Spot Wallet (double row) */
        .wallet-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 12px;
        }

        .withdrawal-wallet-label {
          color: #5d656e;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.615px;
        }

        .spot-wallet-label {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.615px;
        }

        /* Date row */
        .date-label {
          color: #5f6670;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 12.5px;
          white-space: nowrap;
        }

        .date-value {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 13.75px;
          text-align: right;
        }

        /* Network row */
        .network-label {
          color: #5e666f;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 11.875px;
          white-space: nowrap;
        }

        .network-value {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 11.875px;
          text-align: right;
        }

        /* Address row */
        .address-label {
          color: #5e656f;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 12.5px;
          white-space: nowrap;
        }

        .address-value {
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 15.7px;
          text-align: right;
          word-break: break-all;
          max-width: 200px;
        }

        .address-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .copy-icon-address {
          width: 11.25px;
          height: 11.25px;
          background: url(${assetBase}template3/2gHAqx7RqX.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Bottom buttons */
        .groups-17 {
          position: relative;
          width: 348.75px;
          height: 46.875px;
          margin: 187.125px 0 0 10px;
          background: rgba(0, 0, 0, 0);
          z-index: 5;
          display: flex;
          justify-content: space-between;
        }
        .button-18 {
          width: 171.25px;
          height: 46.875px;
          background: rgba(0, 0, 0, 0);
          z-index: 9;
        }
        .background-19 {
          width: 165px;
          height: 41.25px;
          margin: 3.75px 0 0 3.125px;
          background: #323a47;
          border: 0.63px solid #303842;
          border-radius: 3.75px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scam-report {
          color: #b7bdc5;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 15.128px;
          white-space: nowrap;
        }
        .button-1a {
          width: 170.625px;
          height: 46.875px;
          background: rgba(0, 0, 0, 0);
          z-index: 6;
        }
        .background-1b {
          width: 164.375px;
          height: 41.25px;
          margin: 3.75px 0 0 3.125px;
          background: #323a47;
          border: 0.63px solid #303842;
          border-radius: 3.75px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .save-address {
          color: #a7aeb6;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 15.128px;
          white-space: nowrap;
        }
        .background-1c {
          position: relative;
          width: 131.875px;
          height: 4.375px;
          margin: 26.875px 0 0 118.75px;
          background: url(${assetBase}template3/3K4fuVtH6T.png)
            no-repeat center;
          background-size: cover;
          z-index: 4;
        }
      `}</style>

      <div className="main-container">
        <div className="groups">
          <StatusBar defaultTheme="dark" />
          <div className="groups-3">
            <span className="withdrawal-details">Withdrawal Details</span>
            <div className="image-4"></div>
            <div className="image-5"></div>
          </div>
          <div className="groups-6">
            <div className="groups-7">
              <span className="minus-usdt">{amountDisplay}</span>
              <div className="flex-row-d">
                <div className="image-8"></div>
                <span className="completed">Completed</span>
              </div>
              <span className="crypto-transferr">
                Crypto transferred out of Binance. Please contact the recipient
                platform for<br />your transaction receipt.
              </span>
              <span className="why-not-arrived">Why hasn't my withdrawal arrived?</span>
            </div>
            <div className="background-9"></div>

            {/* ----- FLEX DETAILS (exact original look) ----- */}
            <div className="groups-a">

               {/* Network */}
              <div className="detail-row">
                <span className="network-label">Network</span>
                <span className="network-value">TRX</span>
              </div>


                  {/* Address */}
              <div className="detail-row">
                <span className="address-label">Address</span>
                <div className="address-wrapper">
                  <span className="address-value">{formData.receiver || "TDfyFTe1cxpV3JmfgEznJmV7vsFtCc589H"}</span>
                  <div className="copy-icon-address"></div>
                </div>
              </div>


              {/* TxID */}
              <div className="detail-row txid-row">
                <span className="txid-label">Txid</span>
                <div className="txid-wrapper">
                  <span className="txid-value">{formData.sender || "c215dd230cbdc710adee7a3b07fabde76cf3d1f81f9eea805676bf767896cccf"}</span>
                  <div className="copy-icon-txid"></div>
                </div>
              </div>

              {/* Amount */}
              <div className="detail-row">
                <span className="amount-label">Amount</span>
                <span className="amount-value">{formData.amount ? `${formData.amount} USDT` : "19.539255 USDT"}</span>
              </div>

              {/* Network fee */}
              <div className="detail-row">
                <span className="fee-label">Network fee</span>
                <span className="fee-value">{formData.fee || "1"} USDT</span>
              </div>

              {/* Withdrawal Wallet / Spot Wallet */}
              <div className="wallet-row">
                <span className="withdrawal-wallet-label">Withdrawal Wallet</span>
                <span className="spot-wallet-label">Spot Wallet</span>
              </div>

              {/* Date */}
              <div className="detail-row">
                <span className="date-label">Date</span>
                <span className="date-value">{Dates.formatTemplate3(formData.date)}</span>
              </div>

             

          
            </div>
          </div>

          <div className="groups-17">
            <div className="button-18">
              <div className="background-19">
                <span className="scam-report">Scam Report</span>
              </div>
            </div>
            <div className="button-1a">
              <div className="background-1b">
                <span className="save-address">Save Address</span>
              </div>
            </div>
          </div>
          <div className="background-1c"></div>
        </div>
      </div>
    </>
  );
};

export default Template3;