import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template7Props {
  formData: FormData;
}

const Template7: React.FC<Template7Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  // Prepare dynamic values
  const senderAddress = formData.sender || "TA7mLh3Zy1sHj2n9u5XoV8w9e6r4q3b2c1";
  const amountValue = formData.amount || 70;
  const feeValue = formData.fee !== undefined ? formData.fee : 0;
  const referenceNo = formData.referenceNo || "358056349021";

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
          width: 503.125px;
          height: 800px;
          margin: 0 auto;
          background: #1e252f;
        }

        .groups {
          position: absolute;
          width: 503.125px;
          height: 800px;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
        }

        /* ---------- UPDATED SECTION : groups‑1 and its children ---------- */
        .groups-1 {
          position: relative;
          // width: 503.125px;
          padding : 0 20px ;
          height: 473.125px;
          margin: 297.5px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        .groups-2 {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 1.25px;          /* space between Network row and Address/Txid row */
          box-sizing: border-box;
        }

        /* Network row */
        .groups-3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0px 0 0px;
          height: 48.75px;
          width: 100%;
          box-sizing: border-box;
          margin-top: 25px;      /* original top margin */
        }

        .trx {
          color: #b8bdc4;
          font-family: Inter, var(--default-font-family);
          font-size: 18.125px;
          font-weight: 400;
          line-height: 18.125px;
          text-align: left;
          white-space: nowrap;
        }

        .network {
          color: #727983;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 18.75px;
          text-align: left;
          white-space: nowrap;
        }

        /* Address / Txid row */
        .groups-4 {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0 0px 0 0px;
          width: 100%;
          box-sizing: border-box;
          margin-top: 0;        /* gap is handled by groups-2 */
        }

        .flex-column {
          display: flex;
          flex-direction: column;
          width: 70px;
          flex-shrink: 0;
        }

        .address {
          display: block;
          height: 18.75px;
          margin: 0;
          color: #767d87;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 18.75px;
          text-align: left;
          white-space: nowrap;
        }

        .txid {
          display: block;
          height: 18.125px;
          margin: 71.875px 0 0 0;  /* original vertical gap */
          color: #79808a;
          font-family: Inter, var(--default-font-family);
          font-size: 16.875px;
          font-weight: 400;
          line-height: 18.125px;
          text-align: left;
          white-space: nowrap;
        }

        .flex-column-b {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .tnypi-ao-ft-wsxv {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 8.75px;
          color: #afb3bc;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 23.237px;
          text-align: right;
          white-space: pre-line;
          word-break: break-all;
          overflow-wrap: break-word;
          max-width: 246px;
        }

        .save-address {
          display: block;
          height: 17px;
          margin: 9.375px 0 0 0;
          color: #9a8541;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 700;
          line-height: 17px;
          text-align: right;
          padding-right: 27px;
          white-space: nowrap;
        }

        .chain__off {
          display: flex;
          align-items: center;
          gap: 8.75px;
          justify-content: flex-end;
          margin: 16.75px 0 0 0;
        }

        .off-chain-transf {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 23.125px;
          color: #a5a9b2;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 21.179px;
          text-align: left;
          white-space: nowrap;
        }

        .text-6 {
          display: flex;
          justify-content: flex-end;
          height: 23.125px;
          margin: 0;
          color: #a6aab3;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 21.179px;
          text-align: left;
          white-space: nowrap;
        }

        /* Icons inside the row */
        .image {
          position: relative;
          width: 18.125px;
          height: 18.125px;
          background: url(${assetBase}template7/8Qnv2RNFk2.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        .image-5 {
          position: relative;
          width: 18.125px;
          height: 18.75px;
          background: url(${assetBase}template7/f0KgnrPDuU.png) no-repeat center;
          background-size: cover;
        }

        /* Amount row */
        .groups-6 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0px 0 0px;
          height: 47.5px;
          width: 100%;
          box-sizing: border-box;
          margin-top: 1.25px;
        }

        .usdt {
          color: #a7abb4;
          font-family: Inter, var(--default-font-family);
          font-size: 18.125px;
          font-weight: 400;
          line-height: 19.375px;
          text-align: left;
          white-space: nowrap;
        }

        .amount {
          color: #79808a;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 18.75px;
          text-align: left;
          white-space: nowrap;
        }

        /* Network fee row */
        .groups-7 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0px 0 0px;
          height: 48.75px;
          width: 100%;
          box-sizing: border-box;
          margin-top: 1.875px;
        }

        .network-fee {
          color: #727983;
          font-family: Inter, var(--default-font-family);
          font-size: 18.125px;
          font-weight: 400;
          line-height: 21.935px;
          text-align: left;
          white-space: nowrap;
        }

        .ousdt {
          color: #b3b7bf;
          font-family: Inter, var(--default-font-family);
          font-size: 18.125px;
          font-weight: 400;
          line-height: 19.375px;
          text-align: left;
          white-space: nowrap;
        }

        /* Wallet row */
        .groups-8 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0px 0 0px;
          height: 50.625px;
          width: 100%;
          box-sizing: border-box;
          margin-top: 0.63px;
        }

        .wallet {
          color: #79808a;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 18.75px;
          text-align: left;
          white-space: nowrap;
        }

        .spot-wallet {
          color: #aaaeb6;
          font-family: Inter, var(--default-font-family);
          font-size: 17.5px;
          font-weight: 400;
          line-height: 21.179px;
          text-align: left;
          white-space: nowrap;
        }

        /* Date row */
        .groups-9 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0px 0 0px;
          height: 53.75px;
          width: 100%;
          box-sizing: border-box;
          margin-top: -3.75px;  /* original negative margin */
        }

        .time-stamp {
          color: #abafb7;
          font-family: Inter, var(--default-font-family);
          font-size: 18.75px;
          font-weight: 400;
          line-height: 22.692px;
          text-align: left;
          white-space: nowrap;
        }

        .date {
          color: #79808a;
          font-family: Inter, var(--default-font-family);
          font-size: 16.875px;
          font-weight: 400;
          line-height: 18.125px;
          text-align: left;
          white-space: nowrap;
        }

        /* Bottom row – replaces absolute positioning */
        .groups-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          margin-top: auto;
          width: 100%;
          box-sizing: border-box;
        }

        .image-a {
          width: 19.375px;
          height: 20px;
          background: url('/template7/ZrWWeExejc.png') no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        .scam-report {
          color: #7a818b;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 700;
          line-height: 17.397px;
          white-space: nowrap;
        }

        /* ---------- UNCHANGED SECTIONS BELOW ---------- */
        .groups-b {
          position: absolute;
          width: 503.125px;
          height: 293.75px;
          right: 0;
          bottom: 506.25px;
          background: rgba(0, 0, 0, 0);
          z-index: 29;
        }
        .groups-c {
          position: relative;
          width: 503.125px;
          height: 60.625px;
          margin: 9.375px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 37;
        }
        .withdrawal-details {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 28.75px;
          right: 135px;
          bottom: 17.5px;
          color: #bfc3ca;
          font-family: Inter, var(--default-font-family);
          font-size: 24.375px;
          font-weight: 700;
          line-height: 28.75px;
          text-align: left;
          white-space: nowrap;
          z-index: 39;
        }
        .image-d {
          position: absolute;
          width: 23.125px;
          height: 20.625px;
          right: 21.875px;
          bottom: 21.25px;
          background: url(${assetBase}template7/whDie95cR4.png) no-repeat center;
          background-size: cover;
          z-index: 38;
        }
        .image-e {
          position: absolute;
          width: 20.625px;
          height: 15.625px;
          right: 459.375px;
          bottom: 23.75px;
          background: url(${assetBase}template7/RUrRkdeW6m.png) no-repeat center;
          background-size: cover;
          z-index: 40;
        }
        .groups-f {
          position: absolute;
          width: 503.125px;
          height: 211.25px;
          right: 0;
          bottom: 502.5px;
          font-size: 0px;
          background: rgba(0, 0, 0, 0);
          z-index: 30;
        }
        .usdt-10 {
          display: flex;
          justify-content: center;
          position: relative;
          height: 36.25px;
          margin: 17.5px 0 0 0px;
          color: #cdd0d6;
          font-family: Inter, var(--default-font-family);
          font-size: 35.625px;
          font-weight: 700;
          line-height: 36.25px;
          text-align: left;
          white-space: nowrap;
          z-index: 36;
        }
        .flex-row-f {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8.75px;
          position: relative;
          height: 24.375px;
          margin: 19.375px 0 0 0px;
          z-index: 35;
        }
        .image-11 {
          flex-shrink: 0;
          position: relative;
          width: 20.625px;
          height: 21.25px;
          background: url(${assetBase}template7/6CHSM2iqWw.png) no-repeat center;
          background-size: cover;
          z-index: 35;
        }
        .completed {
          flex-shrink: 0;
          position: relative;
          height: 24.375px;
          color: #3e8470;
          font-family: Inter, var(--default-font-family);
          font-size: 18.125px;
          font-weight: 400;
          line-height: 24.375px;
          text-align: left;
          white-space: nowrap;
          z-index: 34;
        }
        .crypto-transferr {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 42.5px;
          margin: 12.5px 0 0 0px;
          color: #6f7680;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 400;
          line-height: 17.988px;
          text-align: center;
          text-overflow: initial;
          z-index: 33;
          overflow: hidden;
        }
        .why-hasnt-my-wi {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 18.75px;
          margin: 3.125px 0 0 0px;
          color: #93803d;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 700;
          line-height: 17.397px;
          text-align: left;
          white-space: nowrap;
          z-index: 32;
        }
        .background {
          position: relative;
          width: 503.125px;
          height: 1.875px;
          margin: 33.125px 0 0 0;
          background: #272e38;
          z-index: 31;
        }
      `}</style>

      <div className="main-container">
        <div className="groups">
          {/* --- FLEX‑BASED DETAIL ROWS --- */}
          <div className="groups-1">
            <div className="groups-2">
              <div className="groups-3">
                <span className="network">Network</span>
                <span className="trx">TRX</span>
              </div>
              <div className="groups-4">
                <div className="flex-column">
                  <span className="address">Address</span>
                  <span className="txid">Txid</span>
                </div>
                <div className="flex-column-b">
                  <div>
                    <span className="tnypi-ao-ft-wsxv">
                      {senderAddress}
                      <div className="image" />
                    </span>
                    <span className="save-address">Save Address</span>
                  </div>
                  <div className="chain__off">
                    <div>
                      <span className="off-chain-transf">Off-chain Transfer</span>
                      <span className="text-6">{referenceNo}</span>
                    </div>
                    <div className="image-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="groups-6">
              <span className="amount">Amount</span>
              <span className="usdt">{amountValue} USDT</span>
            </div>
            <div className="groups-7">
              <span className="network-fee">Network fee</span>
              <span className="ousdt">{feeValue} USDT</span>
            </div>
            <div className="groups-8">
              <span className="wallet">Wallet</span>
              <span className="spot-wallet">Spot Wallet</span>
            </div>
            <div className="groups-9">
              <span className="date">Date</span>
              <span className="time-stamp">{Dates.formatTemplate7(formData.date)}</span>
            </div>

            <div className="groups-bottom">
              <div className="image-a" />
              <span className="scam-report">Scam Report</span>
            </div>
          </div>

          {/* --- HEADER & AMOUNT DISPLAY (unchanged) --- */}
          <div className="groups-b">
            <div className="groups-c">
              <span className="withdrawal-details">Withdrawal Details</span>
              <div className="image-d" />
              <div className="image-e" />
            </div>
          </div>
          <div className="groups-f">
            <span className="usdt-10">-{amountValue} USDT</span>
            <div className="flex-row-f">
              <div className="image-11" />
              <span className="completed">Completed</span>
            </div>
            <span className="crypto-transferr">
              Crypto transferred out of Binance. Please contact the recipient
              <br />
              platform for your transaction receipt.
            </span>
            <span className="why-hasnt-my-wi">
              Why hasn't my withdrawal arrived?
            </span>
            <div className="background" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Template7;