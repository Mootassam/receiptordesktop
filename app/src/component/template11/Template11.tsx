import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template11Props {
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

// Format txid: first 5, last 5 â†’ "0x13b...294c4"
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

// Small exchange rate USDT â†’ USD (realistic variation)
const USDT_TO_USD_RATE = 1.001;

const Template11: React.FC<Template11Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

    // Parse amount (remove commas if any)
    const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 58.860333;
    const amountDisplay = formData.amount ? `${formData.amount}USDT` : "58.860333USDT";
    const usdValue = rawAmount * USDT_TO_USD_RATE;
    const usdFormatted = formatUSD(usdValue); // e.g., "$58.92"
    const usdDisplay = usdFormatted.replace('$', '~$'); // "~$58.92" to match original style

    // Format txid
    const txidFormatted = formatTxid(formData.txid || "0x13b294c4");

    // Address: allow wrapping via CSS
    const senderAddress = formData.sender || "0x98af70c4339476438a4c47f3796726d119097534";

    // Fee display
    const feeDisplay = formData.fee !== undefined ? `${formData.fee}` : "0.15";

    // Date and time combined
    const dateTimeDisplay = `${formData.date || "Jan 18, 2026, 9:29 PM"}`;

    // Reference number
    const referenceNo = formData.referenceNo || "372620932";

    return (
        <>
            <style>{`   :root {
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

          prices { 
           font-family: Inter, var(--default-font-family) !important;
            font-size: 12.5px !important;
            font-weight: 400 !important;
            line-height: 13.965px !important;
            text-align: right !important;
            
            }


        .main-container {
            position: relative;
            width: 359.375px;
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
            background: rgba(0, 0, 0, 0);
        }

        .groups {
            position: relative;
            width: 359.375px;
            height: 43.75px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 47;
        }

        .time {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15.625px;
            right: 289.375px;
            bottom: 10.625px;
            color: #353535;
            font-family: Inter, var(--default-font-family);
            font-size: 14.375px;
            font-weight: 700;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 53;
        }

        .image {
            position: absolute;
            width: 28.75px;
            height: 14.375px;
            right: 31.25px;
            bottom: 10.625px;
            background: url(${assetBase}template11/dU7BYQnb1j.png) no-repeat center;
            background-size: cover;
            z-index: 48;
        }

        .image-1 {
            position: absolute;
            width: 17.5px;
            height: 13.125px;
            right: 89.375px;
            bottom: 11.25px;
            background: url(${assetBase}template11/sMpUjnsXT8.png) no-repeat center;
            background-size: cover;
            z-index: 50;
        }

        .image-2 {
            position: absolute;
            width: 16.875px;
            height: 13.125px;
            right: 66.25px;
            bottom: 11.25px;
            background: url(${assetBase}template11/oLFOhVzcHw.png) no-repeat center;
            background-size: cover;
            z-index: 49;
        }

        .image-3 {
            position: absolute;
            width: 11.875px;
            height: 12.5px;
            right: 271.25px;
            bottom: 11.25px;
            background: url(${assetBase}template11/pKc5G9DM4p.png) no-repeat center;
            background-size: cover;
            z-index: 52;
        }

        .image-4 {
            position: absolute;
            width: 12.5px;
            height: 6.875px;
            right: 250.625px;
            bottom: 13.75px;
            background: url(${assetBase}template11/iUCbzrNnPb.png) no-repeat center;
            background-size: cover;
            z-index: 51;
        }

        .groups-5 {
            position: relative;
            width: 359.375px;
            height: 520.625px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 7;
            overflow: visible auto;
        }

        .groups-6 {
            position: relative;
            width: 359.375px;
            height: 206.25px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 35;
            overflow: visible auto;
        }

        .groups-7 {
            position: relative;
            width: 359.375px;
            height: 43.75px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 45;
            overflow: visible auto;
        }

        .image-8 {
            position: relative;
            width: 6.25px;
            height: 10.625px;
            margin: 20.625px 0 0 19.375px;
            background: url(${assetBase}template11/yWQiG2TOCi.png) no-repeat center;
            background-size: cover;
            z-index: 46;
        }

        .groups-9 {
            position: relative;
            width: 359.375px;
            height: 95.625px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 41;
            overflow: visible auto;
        }

        .image-a {
            position: relative;
            width: 33.125px;
            height: 33.125px;
            margin: 5px 0 0 163.125px;
            background: url(${assetBase}template11/OyRgi3FVHB.png) no-repeat center;
            background-size: cover;
            z-index: 44;
        }

        .withdrawn {
            display: flex;
            justify-content: center;
            position: relative;
            height: 16.875px;
            margin: 6.25px 0 0 0px;
            color: #2a2a2a;
            font-family: Inter, var(--default-font-family);
            font-size: 15px;
            font-weight: 700;
            line-height: 16.875px;
            text-align: left;
            white-space: nowrap;
            z-index: 43;
        }

        .withdrawn-amount {
            display: block;
            position: relative;
            height: 13.75px;
            margin: 5px 0 0 159.375px;
            color: #afafaf;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 42;
        }

        .groups-b {
            position: relative;
            width: 359.375px;
            height: 58.75px;
            margin: 3.125px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 37;
        }

        .image-c {
            position: absolute;
            width: 25.625px;
            height: 26.25px;
            right: 314.375px;
            bottom: 18.125px;
            background: url(${assetBase}template11/rF10jm2PCr.png) no-repeat center;
            background-size: cover;
            z-index: 40;
        }

        .completed {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15px;
            right: 18.75px;
            bottom: 23.125px;
            color: #8d8d8d;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 14.371px;
            text-align: left;
            white-space: nowrap;
            z-index: 38;
        }

        .status {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 266.875px;
            bottom: 25px;
            color: #616161;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 39;
        }

        .background {
            position: relative;
            width: 359.375px;
            height: 1.875px;
            margin: 0.63px 0 0 0;
            background: url(${assetBase}template11/gdoQL29TRD.png) no-repeat center;
            background-size: cover;
            z-index: 36;
        }

        .groups-d {
            position: relative;
            width: 359.375px;
            height: auto;
            min-height: 310.625px;
            margin: 3.75px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 8;
            overflow: visible auto;
        }

        .groups-e {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 55.625px;
            margin: 7.5px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 31;
            padding: 0 18.75px;
        }

        .xafc {
            display: flex;
            align-items: start;
            justify-content: flex-end;
            gap: 5px;
            width: 166.25px;
            min-height: 33.125px;
            right: 36.25px;
            bottom: 9.375px;
            color: #8d8d8d;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.965px;
            text-align: right;
            white-space: pre-line;
            word-break: break-all;
            overflow-wrap: break-word;
            z-index: 33;
            overflow: visible;
        }

        .address {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 13.125px;
            right: 294.25px;
            bottom: 27.5px;
            font-weight: 500;
            color: #000;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 34;
        }

        .image-f {
            width: 10px;
            height: 10px;
            right: 20.625px;
            bottom: 18.75px;
            background: url(${assetBase}template11/vjN0AqgajB.png) no-repeat center;
            background-size: cover;
            z-index: 32;
            flex-shrink: 0;
        }

        .groups-10 {
            position: relative;
            width: 359.375px;
            height: 41.875px;
            margin: 1.25px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 27;
        }


        .price {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15px;
            right: 18.75px;
            bottom: 13.125px;
            color: #8d8d8d;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            
            line-height: 14.371px;
            text-align: left;
            white-space: nowrap;
            z-index: 28;
        }

        .price-11 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 312px;
            bottom: 14.375px;
            font-weight: 500;
            color: #000;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 30;
        }

        .image-12 {
            position: absolute;
            width: 11.25px;
            height: 11.25px;
            right: 295px;
            bottom: 14.375px;
            background: url(${assetBase}template11/N5ZUvMUgaj.png) no-repeat center;
            background-size: cover;
            z-index: 29;
        }

        .groups-13 {
            position: relative;
            width: 359.375px;
            height: 40.625px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 23;
        }

        .ethereum-network {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14.375px;
            right: 18.125px;
            bottom: 13.125px;
            color: #8a8b8a;
            font-family: Inter, var(--default-font-family) !important;
            font-size: 12.5px !important;
            font-weight: 400 !important;
            line-height: 13.965px !important;
            text-align: right !important;
            white-space: nowrap;
            z-index: 24;
        }

        .network {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 291.375px;
            bottom: 14.375px;
            font-weight: 500;
            color: #000;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
       
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 26;
        }

        .image-14 {
            position: absolute;
            width: 11.875px;
            height: 11.875px;
         right: 118.125px;
            bottom: 13.75px;
            background: url(${assetBase}template11/po3TdbxcBr.png) no-repeat center;
            background-size: cover;
            z-index: 25;
        }

        .groups-15 {
            position: relative;
            width: 359.375px;
            height: 40.625px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 20;
        }

        .usdt {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14.375px;
            right: 18.125px;
            bottom: 14.375px;
            color: #8b8b8b;
               font-family: Inter, var(--default-font-family) !important;
            font-size: 12.5px !important;
            font-weight: 400 !important;
            line-height: 13.965px !important;
            text-align: right !important;
            white-space: nowrap;
            z-index: 21;
        }

        .network-fee {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
          right: 274.125px;
            bottom: 14.375px;
            font-weight: 500;
            color: #000;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;

            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 22;
        }

        .groups-16 {
            position: relative;
            width: 359.375px;
            min-height: 35.625px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 16;
        }

        .xb-c {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: auto;
            min-height: 13.75px;
            right: 34.375px;
            bottom: 9.375px;
            color: #8b8b8b;
            font-family: Inter, var(--default-font-family) !important;
            font-size: 12.5px !important;
            font-weight: 400 !important;
            line-height: 13.965px !important;
            text-align: right !important;
            white-space: normal;
            word-break: break-all;
            z-index: 18;
        }

        .transaction-id {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 263.625px;
            bottom: 10px;
            font-weight: 500;
            color: #000;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 22;
        }

        .image-17 {
            position: absolute;
            width: 10px;
            height: 10px;
            right: 20.625px;
            bottom: 10px;
            background: url(${assetBase}template11/yb3uAjK1sV.png) no-repeat center;
            background-size: cover;
            z-index: 17;
        }

        .groups-18 {
            position: relative;
            width: 351.875px;
            height: 37.5px;
            margin: 1.25px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 13;
        }

        .jan-date {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15px;
            right: 11.25px;
            bottom: 12.5px;
            color: #8e8e8e;
     font-family: Inter, var(--default-font-family) !important;
            font-size: 12.5px !important;
            font-weight: 400 !important;
            line-height: 13.965px !important;
            text-align: right !important;
            white-space: nowrap;
            z-index: 14;
        }

        .submitted-time {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
            right: 248.875px;
            bottom: 13.75px;
            font-weight: 500;
            color: #000;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;

            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 15;
        }

        .groups-19 {
            position: relative;
            width: 359.375px;
            height: 42.5px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 9;
        }

        .reference-no {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.75px;
            right: 35px;
            bottom: 15.625px;
           font-weight: 400;
                    color: #8e8e8e;
             font-family: Inter, var(--default-font-family) !important;
            font-size: 12.5px !important;
            font-weight: 400 !important;
            line-height: 13.965px !important;
            text-align: right !important;
            white-space: nowrap;
            z-index: 11;
        }

        .text-13 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
            right: 266.75px;
            bottom: 15.625px;
   
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 500;
                    color: #000;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 22;
        }

        .image-1a {
            position: absolute;
            width: 10px;
            height: 10px;
            right: 20.625px;
            bottom: 16.25px;
            background: url(${assetBase}template11/xtBePPB5bh.png) no-repeat center;
            background-size: cover;
            z-index: 10;
        }

        .button {
            position: relative;
            width: 325px;
            height: 44.375px;
            margin: 93.125px 0 0 16.875px;
            background: rgba(0, 0, 0, 0);
            z-index: 4;
            overflow: visible auto;
        }

        .background-1b {
            position: relative;
            width: 320.625px;
            height: 38.75px;
            margin: 3.125px 0 0 2.5px;
            background: #2a6c16;
            border: 0.63px solid #3c682e;
            z-index: 5;
            border-radius: 18.75px;
        }

        .view-blockchain-explorer {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14.375px;
            right: 85.625px;
            bottom: 11.875px;
            color: #b5d0ad;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 700;
            line-height: 12.859px;
            text-align: left;
            white-space: nowrap;
            z-index: 6;
        }

        .transaction-arrived {
            display: block;
            position: relative;
            height: 14.375px;
            margin: 18.75px 0 0 88.125px;
            color: #4a4a4a;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 700;
            line-height: 12.102px;
            text-align: left;
            white-space: nowrap;
            z-index: 54;
        }

        .background-1c {
            position: relative;
            width: 85.625px;
            height: 3.125px;
            margin: 52.5px 0 0 136.875px;
            background: url(${assetBase}template11/O8fvXbjBsf.png) no-repeat center;
            background-size: cover;
            z-index: 3;
        }

        .image-1d {
            position: absolute;
            width: 359.375px;
            height: 251.875px;
            right: 0;
            bottom: 548.125px;
   background:#fff;
            background-size: cover;
            z-index: 1;
        }

        .image-1e {
            position: absolute;
            width: 359.375px;
            height: 555px;
            right: 0;
            bottom: 0;
            background:#fff;
            
            z-index: 2;
        }
        
        .price_usdt { 
            display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    height: 14.375px;
    right: 18.125px;
    bottom: 14.375px;
    color: #8b8b8b;
    font-family: Inter, var(--default-font-family) !important;
    font-size: 12.5px !important;
    font-weight: 400 !important;
    line-height: 13.965px !important;
    text-align: right !important;
    white-space: nowrap;
    z-index: 21;
        }
        
      
        
        `}</style>

            <div className="main-container">
                <div className="root">
                    <div className="groups">
                        <span className="time">{formData.time || "10:32"}</span>
                        <div className="image"></div>
                        <div className="image-1"></div>
                        <div className="image-2"></div>
                        <div className="image-3"></div>
                        <div className="image-4"></div>
                    </div>
                    <div className="groups-5">
                        <div className="groups-6">
                            <div className="groups-7">
                                <div className="image-8"></div>
                            </div>
                            <div className="groups-9">
                                <div className="image-a"></div>
                                <span className="withdrawn">Withdrawn {amountDisplay}</span>
                                <span className="withdrawn-amount">{usdDisplay}</span>
                            </div>
                            <div className="groups-b">
                                <div className="image-c"></div>
                                <span className="completed">Completed</span>
                                <span className="status">Status</span>
                            </div>
                            <div className="background"></div>
                        </div>
                        <div className="groups-d">
                            <div className="groups-e">
                                <span className="address">Address</span>
                                <span className="xafc">
                                    {senderAddress}
                                    <div className="image-f"></div>
                                </span>
                            </div>
                            <div className="groups-10">
                                <span className="price_usdt">$0.99/USDT</span>
                                <span className="price-11">Price</span>
                                <div className="image-12"></div>
                            </div>
                            <div className="groups-13">
                                <span className="ethereum-network">Ethereum(ERC20)</span>
                                <span className="network">Network</span>
                                <div className="image-14"></div>
                            </div>
                            <div className="groups-15">
                                <span className="usdt">{feeDisplay} USDT</span>
                                <span className="network-fee">Network fee</span>
                            </div>
                            <div className="groups-16">
                                <span className="xb-c">{txidFormatted}</span>
                                <span className="transaction-id">Transaction ID</span>
                                <div className="image-17"></div>
                            </div>
                            <div className="groups-18">
                                <span className="jan-date">{Dates.formatTemplate11(formData.date)}</span>
                                <span className="submitted-time">Submitted time</span>
                            </div>
                            <div className="groups-19">
                                <span className="reference-no prices">{referenceNo}</span>
                                <span className="text-13">Reference no.</span>
                                <div className="image-1a"></div>
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <div className="background-1b">
                            <span className="view-blockchain-explorer">View on blockchain explorer</span>
                        </div>
                    </div>
                    <span className="transaction-arrived">Why hasn't my transaction arrived?</span>
                    <div className="background-1c"></div>
                </div>
                <div className="image-1d"></div>
                <div className="image-1e"></div>
            </div>
        </>
    );
};

export default Template11;