import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template3Props {
  formData: FormData;
}

// Helper: format USD with small rate (optional, keep consistent)
const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const USDT_TO_USD_RATE = 1.001;

const Template3: React.FC<Template3Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  // Parse amount
  const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 18.539255;
  const amountDisplay = formData.amount ? `-${formData.amount}USDT` : "-18.539255USDT";
  const usdEquivalent = formatUSD(rawAmount * USDT_TO_USD_RATE);
  // For simplicity, we keep the original amount display as is; USD not shown in this template but we can add if needed.

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
          height: 441.875px;
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
        .groups-a {
          position: relative;
          width: 369.375px;
          height: auto;
          min-height: 293.125px;
          margin: -0.63px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 13;
          overflow: visible auto;
        }
        .groups-b {
          position: relative;
          width: 369.375px;
          min-height: 60.625px;
          margin: 92.5px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 26;
        }
        .cddcbdc {
    display: flex;
    align-items: start;
    justify-content: flex-end;
    position: absolute;
    width: 189px;
    min-height: 48.75px;
    right: 29.5px;
    bottom: 2.5px;
    color: #E4E9EF;
    font-family: Inter, var(--default-font-family);
    font-size: 11.88px;
    font-weight: 400;
    line-height: 15.7px;
    text-align: right;
    white-space: pre-line;
    word-break: break-all;
    overflow-wrap: break-word;
    z-index: 28;
    gap: 1.88px;
    overflow: visible;
        }

        .txid {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 12.5px;
          right: 333.75px;
          bottom: 37.5px;
          color: #5d646e;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 12.5px;
          text-align: left;
          white-space: nowrap;
          z-index: 29;
        }
        .image-c {
          position: absolute;
          width: 11.25px;
          height: 11.875px;
          right: 14.375px;
          bottom: 37.5px;
          background: url(${assetBase}template3/eAVgFbQxa2.png)
            no-repeat center;
          background-size: cover;
          z-index: 27;
        }
        .groups-d {
          position: relative;
          width: 369.375px;
          height: 33.125px;
          margin: 2.5px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 23;
        }
        .usdt {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 14px;
          right: 11.875px;
          bottom: 9.75px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 14px;
          text-align: left;
          white-space: nowrap;
          z-index: 24;
        }
        .amount {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 13.125px;
          right: 313.75px;
          bottom: 9.375px;
          color: #606972;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.125px;
          text-align: left;
          white-space: nowrap;
          z-index: 25;
        }
        .groups-e {
          position: relative;
          width: 369.375px;
          height: 32.5px;
          margin: 0.63px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 20;
        }
        .usdt-f {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 13.125px;
          right: 11.875px;
          bottom: 10.625px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 13.125px;
          text-align: left;
          white-space: nowrap;
          z-index: 21;
        }
        .network-fee {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 13.125px;
          right: 293px;
          bottom: 10px;
          color: #5d656f;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.125px;
          text-align: left;
          white-space: nowrap;
          z-index: 22;
        }
        .groups-10 {
          position: relative;
          width: 369.375px;
          height: 32.5px;
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 17;
        }
        .withdrawal-wallet {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 14.375px;
          right: 263px;
          bottom: 10px;
          color: #5d656e;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.615px;
          text-align: left;
          white-space: nowrap;
          z-index: 19;
        }
        .spot-wallet {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 14.375px;
          right: 11.875px;
          bottom: 9.375px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 13.615px;
          text-align: left;
          white-space: nowrap;
          z-index: 18;
        }
        .groups-11 {
          position: relative;
          width: 369.375px;
          height: 33.75px;
          margin: 0.63px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 14;
        }
        .date {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 13.75px;
          right: 11.875px;
          bottom: 12.5px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 13.75px;
          text-align: left;
          white-space: nowrap;
          z-index: 15;
        }
        .date-12 {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 12.5px;
          right: 330.625px;
          bottom: 13.125px;
          color: #5f6670;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 12.5px;
          text-align: left;
          white-space: nowrap;
          z-index: 16;
        }
        .groups-13 {
          position: absolute;
          width: 369.375px;
          height: 64.375px;
          right: 0;
          bottom: 201.25px;
          background: rgba(0, 0, 0, 0);
          z-index: 30;
        }
        .network {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 11.875px;
          right: 310.625px;
          bottom: 50.625px;
          color: #5e666f;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 11.875px;
          text-align: left;
          white-space: nowrap;
          z-index: 38;
        }
        .trx {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 11.875px;
          right: 11.875px;
          bottom: 50.625px;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 11.875px;
          text-align: left;
          white-space: nowrap;
          z-index: 37;
        }
        .groups-14 {
          position: absolute;
          width: 369.375px;
          height: auto;
          min-height: 45.625px;
          right: 0;
          bottom: 198.75px;
          background: rgba(0, 0, 0, 0);
          z-index: 31;
        }
        .flex-row-bf {
          position: relative;
          min-height: 15.625px;
          margin: 7.75px 0 0 16.15px;
          z-index: 36;
          display: flex;
          align-items: start;
          justify-content: space-between;
        }
        .tdfy-ftecxp-vjmf {
          display: flex;
          align-items: start;
          justify-content: flex-start;
          width: 196px;
          min-height: 15.625px;
          right: 15px;
          bottom: 0;
          color: #E4E9EF;
          font-family: Inter, var(--default-font-family);
          font-size: 11.88px;
    font-weight: 400;
    line-height: 15.7px;
          text-align: right;
          white-space: pre-line;
          word-break: break-all;
          overflow-wrap: break-word;
          z-index: 35;
        }
        .address {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 12.5px;
          right: 298.5px;
          bottom: 1.875px;
          color: #5e656f;
          font-family: Inter, var(--default-font-family);
          font-size: 11.25px;
          font-weight: 400;
          line-height: 12.5px;
          text-align: left;
          white-space: nowrap;
          z-index: 36;
        }
        .image-15 {
          width: 11.25px;
          height: 11.25px;
          right: 0;
          bottom: 3.125px;
          background: url(${assetBase}template3/2gHAqx7RqX.png)
            no-repeat center;
          background-size: cover;
          z-index: 34;
        }
        .flex-row-a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          width: 38.75px;
          height: 13.125px;
          margin: 0.63px 0 0 316.25px;
          z-index: 33;
        }
        .h {
          flex-shrink: 0;
          position: relative;
          height: 11.875px;
          color: #a6acb2;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 11.875px;
          text-align: left;
          white-space: nowrap;
          z-index: 33;
        }
        .image-16 {
          flex-shrink: 0;
          position: relative;
          width: 13.125px;
          background: #1f2630;
          z-index: 32;
        }
        .groups-17 {
          position: relative;
          width: 348.75px;
          height: 46.875px;
          margin: 193.125px 0 0 10px;
          background: rgba(0, 0, 0, 0);
          z-index: 5;
        }
        .button-18 {
          position: absolute;
          width: 171.25px;
          height: 46.875px;
          right: 177.5px;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 9;
        }
        .background-19 {
          position: relative;
          width: 165px;
          height: 41.25px;
          margin: 3.75px 0 0 3.125px;
          background: #323a47;
          border: 0.63px solid #303842;
          z-index: 10;
          border-radius: 3.75px;
        }
        .scam-report {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 16.875px;
          right: 41.25px;
          bottom: 11.25px;
          color: #b7bdc5;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 400;
          line-height: 15.128px;
          text-align: left;
          white-space: nowrap;
          z-index: 11;
        }
        .button-1a {
          position: absolute;
          width: 170.625px;
          height: 46.875px;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 6;
        }
        .background-1b {
          position: relative;
          width: 164.375px;
          height: 41.25px;
          margin: 3.75px 0 0 3.125px;
          background: #323a47;
          border: 0.63px solid #303842;
          z-index: 7;
          border-radius: 3.75px;
        }
        .save-address {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15.625px;
          right: 38.125px;
          bottom: 12.5px;
          color: #a7aeb6;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 15.128px;
          text-align: left;
          white-space: nowrap;
          z-index: 8;
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
        .image-1d {
          position: absolute;
          height: 800px;
          top: 0;
          right: 0;
          left: 0;
          background-size: cover;
          z-index: 3;
        }

        .receiver__amount { 
        display: flex;
        align-items: start;
        justify-content: flex-start;
            padding-right: 13px;
        gap: 3.75px;}
      `}</style>

      <div className="main-container">
        <div className="groups">
          <div className="groups-1">
            <div className="button">
              <div className="background"><span className="time-marker">{formData.time || "1:38"}</span></div>
            </div>
            <span className="network-type">4G</span>
            <div className="image"></div>
            <div className="image-2"></div>
          </div>
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
              <span className="crypto-transferr"
              >Crypto transferred out of Binance. Please contact the recipient
                platform for<br />your transaction receipt.</span
              ><span className="why-not-arrived"
              >Why hasn't my withdrawal arrived?</span
              >
            </div>
            <div className="background-9"></div>
            <div className="groups-a">
              <div className="groups-b">
                <span className="cddcbdc"
                >{formData.sender || "c215dd230cbdc710adee7a3b07fabde76cf3d1f81f9eea805676bf767896cccf"}</span>
                <span className="txid">Txid</span>
                <div className="image-c"></div>
              </div>
              <div className="groups-d">
                <span className="usdt">{formData.amount ? `${formData.amount} USDT` : "19.539255 USDT"}</span>
                <span className="amount">Amount</span>
              </div>
              <div className="groups-e">
                <span className="usdt-f">{formData.fee || "1"} USDT</span>
                <span className="network-fee">Network fee</span>
              </div>
              <div className="groups-10">
                <span className="withdrawal-wallet">Withdrawal Wallet</span>
                <span className="spot-wallet">Spot Wallet</span>
              </div>
              <div className="groups-11">
                <span className="date">{Dates.formatTemplate3(formData.date)}</span>
                <span className="date-12">Date</span>
              </div>
              <div className="groups-13">
                <span className="network">Network</span><span className="trx">TRX</span>
              </div>
              <div className="groups-14">
                <div className="flex-row-bf">
                  <span className="address">Address</span>


                  <div className='receiver__amount'>
                    <span className="tdfy-ftecxp-vjmf"
                    >{formData.receiver || "TDfyFTe1cxpV3JmfgEznJmV7vsFtCc589H"}
                    </span>
                    <div className="image-15"></div>

                  </div>
                </div>
            
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