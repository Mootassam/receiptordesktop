import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template12Props {
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

// Format txid: first 5, last 5 â†’ "Ox14f...97d0a"
const formatTxid = (txid: string) => truncateString(txid, 5, 5);

// Format USD amount with commas and 2 decimals
const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Small exchange rate USDT â†’ USD (realistic variation)
const USDT_TO_USD_RATE = 0.999; // slightly below 1

const Template12: React.FC<Template12Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

    // Parse amount
    const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 210;
    const amountDisplay = formData.amount ? `Deposited ${formData.amount}USDT` : "Deposited 210USDT";
    const usdValue = rawAmount * USDT_TO_USD_RATE;
    const usdEquivalent = formatUSD(usdValue);

    // Format txid
    const txidFormatted = formatTxid(formData.txid || "Ox14f97d0a");

    // Receiver address: no truncation, but will wrap naturally via CSS (word break)
    const receiverAddress = formData.receiver || "0x507e7c8da475463ff743b6b7b65333ac8dc22f26";

    // Combine date and time
    const dateTimeDisplay = `${formData.date || "Nov 9, 2025, 8:15 PM"}`;

    // Status bar time
    const timeDisplay = formData.time || "10:31";

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
            z-index: 40;
        }

        .time {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15.625px;
            right: 291.25px;
            bottom: 10.625px;
            color: #353535;
            font-family: Inter, var(--default-font-family);
            font-size: 14.375px;
            font-weight: 700;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 46;
        }

        .image {
            position: absolute;
            width: 28.75px;
            height: 14.375px;
            right: 31.25px;
            bottom: 10.625px;
            background: url(${assetBase}template12/A7KoDdogQh.png) no-repeat center;
            background-size: cover;
            z-index: 41;
        }

        .image-1 {
            position: absolute;
            width: 17.5px;
            height: 13.125px;
            right: 89.375px;
            bottom: 11.25px;
            background: url(${assetBase}template12/S489gxidGu.png) no-repeat center;
            background-size: cover;
            z-index: 43;
        }

        .image-2 {
            position: absolute;
            width: 16.875px;
            height: 13.125px;
            right: 66.25px;
            bottom: 11.25px;
            background: url(${assetBase}template12/GuQooxZGaz.png) no-repeat center;
            background-size: cover;
            z-index: 42;
        }

        .image-3 {
            position: absolute;
            width: 11.25px;
            height: 12.5px;
            right: 273.125px;
            bottom: 11.25px;
            background: url(${assetBase}template12/j94GQ8Uh84.png) no-repeat center;
            background-size: cover;
            z-index: 45;
        }

        .image-4 {
            position: absolute;
            width: 12.5px;
            height: 6.875px;
            right: 252.5px;
            bottom: 13.75px;
            background: url(${assetBase}template12/eNjSxeQFpo.png) no-repeat center;
            background-size: cover;
            z-index: 44;
        }

        .button {
            position: relative;
            width: 325.625px;
            height: 44.375px;
            margin: 662.5px 0 0 16.25px;
            background: rgba(0, 0, 0, 0);
            z-index: 4;
            overflow: visible auto;
        }

        .background {
            position: relative;
            width: 320.625px;
            height: 38.75px;
            margin: 3.125px 0 0 3.125px;
            background: #2a6c15;
            border: 0.63px solid #356e25;
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
            color: #afcba7;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 700;
            line-height: 12.859px;
            text-align: left;
            white-space: nowrap;
            z-index: 6;
        }

        .background-5 {
            position: relative;
            width: 85.625px;
            height: 3.125px;
            margin: 37.5px 0 0 136.875px;
            background: url(${assetBase}template12/UVALzT8ECo.png) no-repeat center;
            background-size: cover;
            z-index: 3;
        }

        .groups-6 {
            position: absolute;
            width: 359.375px;
            height: 45.625px;
            right: 0;
            bottom: 709.375px;
            background: rgba(0, 0, 0, 0);
            z-index: 38;
        }

        .image-7 {
            position: relative;
            width: 6.25px;
            height: 10.625px;
            margin: 20.625px 0 0 19.375px;
            background: url(${assetBase}template12/bYwz0S4pV8.png) no-repeat center;
            background-size: cover;
            z-index: 39;
        }

        .groups-8 {
            position: absolute;
            width: 359.375px;
            height: 448.125px;
            right: 0;
            bottom: 304.375px;
            background: rgba(0, 0, 0, 0);
            z-index: 7;
        }

        .groups-9 {
            position: relative;
            width: 359.375px;
            height: 198.75px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 29;
            overflow: visible auto;
        }

        .groups-a {
            position: relative;
            width: 359.375px;
            height: 100px;
            margin: 39.375px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 34;
            overflow: visible auto;
        }

        .image-b {
            position: relative;
            width: 33.125px;
            height: 33.125px;
            margin: 7.5px 0 0 163.125px;
            background: url(${assetBase}template12/tCmF2JxAp4.png) no-repeat center;
            background-size: cover;
            z-index: 37;
        }

        .deposited-usd {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            height: 17.5px;
            margin: 6.875px 0 0 0px;
            color: #282828;
            font-family: Inter, var(--default-font-family);
            font-size: 16.25px;
            font-weight: 700;
            line-height: 17.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 36;
        }

        .dollar-amount {
            display: block;
            position: relative;
            height: 13.75px;
            margin: 3.75px 0 0 155.625px;
            color: #b0b0b0;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 35;
        }

        .groups-c {
            position: relative;
            width: 359.375px;
            height: 53.75px;
            margin: 3.125px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 30;
        }

        .image-d {
            position: absolute;
            width: 25.625px;
            height: 26.25px;
            right: 314.375px;
            bottom: 15px;
            background: url(${assetBase}template12/mpQkbMo9LX.png) no-repeat center;
            background-size: cover;
            z-index: 33;
        }

        .completed {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15px;
            right: 18.75px;
            bottom: 20px;
            color: #8d8d8d;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 14.371px;
            text-align: left;
            white-space: nowrap;
            z-index: 31;
        }

        .status {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 266.875px;
            bottom: 21.875px;
            color: #616161;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 32;
        }

        .background-e {
            position: relative;
            width: 359.375px;
            height: 1.875px;
            margin: 0.63px 0 0 0;
            background: url(${assetBase}template12/8iUW8UMdaK.png) no-repeat center;
            background-size: cover;
            z-index: 28;
        }

        .groups-f {
            position: relative;
            width: 359.375px;
            height: 244.375px;
            margin: 2.5px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 8;
            overflow: visible auto;
        }

        .groups-10 {
            position: relative;
            width: 359.375px;
            height: 48.75px;
            margin: 7.5px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 24;
        }

        .price-amount {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15px;
            right: 18.75px;
            bottom: 15.625px;
            color: #8a8a8a;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 14.371px;
            text-align: left;
            white-space: nowrap;
            z-index: 25;
        }

        .price {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 310px;
            bottom: 16.875px;
            color: #393939;
            font-family: Inter, var(--default-font-family);
            font-size: 11.25px;
            font-weight: 400;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 27;
        }

        .image-11 {
            position: absolute;
            width: 11.25px;
            height: 11.25px;
            right: 295px;
            bottom: 16.875px;
            background: url(${assetBase}template12/bjUjY2W0Do.png) no-repeat center;
            background-size: cover;
            z-index: 26;
        }

        .groups-12 {
            position: relative;
            width: 359.375px;
            height: 43.125px;
            margin: 1.25px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 20;
        }

        .ethereum-erc {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14px;
            right: 18.75px;
            bottom: 12.875px;
            color: #878787;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 14px;
            text-align: left;
            white-space: nowrap;
            z-index: 21;
        }

        .network {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 290px;
            bottom: 13.75px;
            color: #3d3d3d;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 23;
        }

        .image-13 {
            position: absolute;
            width: 11.875px;
            height: 11.875px;
            right: 128.125px;
            bottom: 13.125px;
            background: url(${assetBase}template12/VoFXiJqgV6.png) no-repeat center;
            background-size: cover;
            z-index: 22;
        }

        .groups-14 {
            position: relative;
            width: 359.375px;
            height: 40.625px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 16;
        }

        .transaction-id {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
            right: 255.625px;
            bottom: 13.75px;
            color: #4f4f4f;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 19;
        }

        .oxf-ada {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
            right: 34.375px;
            bottom: 13.75px;
            color: #919191;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 18;
        }

        .image-15 {
            position: absolute;
            width: 10px;
            height: 10px;
            right: 20.625px;
            bottom: 14.375px;
            background: url(${assetBase}template12/DzqxVEa6Q9.png) no-repeat center;
            background-size: cover;
            z-index: 17;
        }

        .groups-16 {
            position: relative;
            width: 359.375px;
            height: 53.125px;
            margin: 1.875px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 12;
        }

        .text-d {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            width: 162.5px;
            height: 32.5px;
            right: 36.25px;
            bottom: 10.625px;
            color: #8f8f8f;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 15.049px;
            text-align: right;
            /* Allow wrapping */
            white-space: normal;
            word-break: break-all;
            overflow-wrap: break-word;
            text-overflow: unset;
            overflow: visible;
            z-index: 14;
        }

        .text-e {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
            right: 291.25px;
            bottom: 28.125px;
            color: #474747;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 15;
        }

        .img-8 {
            position: absolute;
            width: 10px;
            height: 10px;
            right: 20.625px;
            bottom: 19.375px;
            background: url(${assetBase}template12/JfULESMLEh.png) no-repeat center;
            background-size: cover;
            z-index: 13;
        }

        .box-4 {
            position: relative;
            width: 359.375px;
            height: 44.375px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 9;
        }

        .text-f {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15px;
            right: 18.75px;
            bottom: 15px;
            color: #8e8e8e;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 14.371px;
            text-align: left;
            white-space: nowrap;
            z-index: 10;
        }

        .text-10 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 310.625px;
            bottom: 16.25px;
            color: #464646;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 11;
        }

        .img-9 {
            position: absolute;
            width: 359.375px;
            height: 251.25px;
            right: 0;
            bottom: 548.75px;
            background:#fff;
            background-size: cover;
            z-index: 1;
        }

        .img-a {
            position: absolute;
            width: 359.375px;
            height: 555.625px;
            right: 0;
            bottom: 0;
            background:#fff;
            background-size: cover;
            z-index: 2;
        }
        `}</style>

            <div className="main-container">
                <div className="root">
                    <div className="groups">
                        <span className="time">{timeDisplay}</span>
                        <div className="image"></div>
                        <div className="image-1"></div>
                        <div className="image-2"></div>
                        <div className="image-3"></div>
                        <div className="image-4"></div>
                    </div>
                    <div className="button">
                        <div className="background">
                            <span className="view-blockchain-explorer">View on blockchain explorer</span>
                        </div>
                    </div>
                    <div className="background-5"></div>
                    <div className="groups-6">
                        <div className="image-7"></div>
                    </div>
                    <div className="groups-8">
                        <div className="groups-9">
                            <div className="groups-a">
                                <div className="image-b"></div>
                                <span className="deposited-usd">{amountDisplay}</span>
                                <span className="dollar-amount">{usdEquivalent}</span>
                            </div>
                            <div className="groups-c">
                                <div className="image-d"></div>
                                <span className="completed">Completed</span>
                                <span className="status">Status</span>
                            </div>
                        </div>
                        <div className="background-e"></div>
                        <div className="groups-f">
                            <div className="groups-10">
                                <span className="price-amount">$0.99/USDT</span>
                                <span className="price">Price</span>
                                <div className="image-11"></div>
                            </div>
                            <div className="groups-12">
                                <span className="ethereum-erc">Ethereum (ERC20)</span>
                                <span className="network">Network</span>
                                <div className="image-13"></div>
                            </div>
                            <div className="groups-14">
                                <span className="transaction-id">Transaction ID</span>
                                <span className="oxf-ada">{txidFormatted}</span>
                                <div className="image-15"></div>
                            </div>
                            <div className="groups-16">
                                <span className="text-d">{receiverAddress}</span>
                                <span className="text-e">Address</span>
                                <div className="img-8"></div>
                            </div>
                            <div className="box-4">
                                <span className="text-f">{Dates.formatTemplate12(formData.date)}</span>
                                <span className="text-10">Time</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-9"></div>
                <div className="img-a"></div>
            </div>

        </>
    );
};

export default Template12;