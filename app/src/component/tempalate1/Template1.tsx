import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';


interface Template1Props {
    formData: FormData;
}

const Template1: React.FC<Template1Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

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
            overflow: hidden;
        }

        .root {
            position: absolute;
            height: auto;
            min-height: 800px;
            top: 0;
            right: 0;
            left: 0;
            background: #ffffff;
        }

        .groups {
            position: relative;
            width: 369.375px;
            height: 40px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 37;
        }

        .time {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 16.25px;
            right: 305.625px;
            bottom: 10px;
            color: #262626;
            font-family: Inter, var(--default-font-family);
            font-size: 13.75px;
            font-weight: 700;
            line-height: 16.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 42;
        }

        .image {
            position: absolute;
            width: 23.75px;
            height: 12.5px;
            right: 14.375px;
            bottom: 11.25px;
            background: url(${assetBase}tempalate1/Q9jOZWnLsQ.png) no-repeat center;
            background-size: cover;
            z-index: 38;
        }

        .number {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.875px;
            right: 4.375px;
            bottom: 0.63px;
            color: #bcf0c6;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.875px;
            text-align: left;
            white-space: nowrap;
            z-index: 41;
        }

        .image-1 {
            position: absolute;
            width: 15px;
            height: 11.25px;
            right: 43.125px;
            bottom: 11.875px;
            background: url(${assetBase}tempalate1/FO8o9jBY5k.png) no-repeat center;
            background-size: cover;
            z-index: 39;
        }

        .image-2 {
            position: absolute;
            width: 16.875px;
            height: 10.625px;
            right: 63.125px;
            bottom: 11.875px;
            background: url(${assetBase}tempalate1/MLBMGXJ0ai.png) no-repeat center;
            background-size: cover;
            z-index: 40;
        }

        .groups-3 {
            position: relative;
            width: 369.375px;
            height: 40.625px;
            margin: 1.25px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 33;
        }

        .deposit-details {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 19.375px;
            right: 125px;
            bottom: 6.875px;
            color: #3d3e43;
            font-family: Inter, var(--default-font-family);
            font-size: 15.625px;
            font-weight: 600;
            line-height: 18.91px;
            text-align: left;
            white-space: nowrap;
            z-index: 35;
        }

        .image-4 {
            position: absolute;
            width: 13.75px;
            height: 15.625px;
            right: 18.75px;
            bottom: 9.375px;
            background: url(${assetBase}tempalate1/NymmjhJuQx.png) no-repeat center;
            background-size: cover;
            z-index: 34;
        }

        .image-5 {
            position: absolute;
            width: 15px;
            height: 11.875px;
            right: 336.25px;
            bottom: 11.25px;
            background: url(${assetBase}tempalate1/zqRA8nKray.png) no-repeat center;
            background-size: cover;
            z-index: 36;
        }

        .groups-6 {
            position: relative;
            width: 369.375px;
            height: auto;
            min-height: 451.875px;
            margin: 15.625px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 2;
            overflow: visible auto;
        }

        .groups-7 {
            position: relative;
            width: 369.375px;
            height: 86.25px;
            margin: 0 0 0 0;
            font-size: 0px;
            background: rgba(0, 0, 0, 0);
            z-index: 29;
            overflow: visible auto;
        }

        .plus-usdt {
            display: flex;
            justify-content: center;
            position: relative;
            height: 31.875px;
            margin: 13.75px 0 0 0px;
            color: #3c3f46;
            font-family: Inter, var(--default-font-family);
            font-size: 25.625px;
            font-weight: 700;
            line-height: 31.012px;
            text-align: left;
            white-space: nowrap;
            z-index: 32;
        }

        .flex-row-c {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: max-content;
            height: 16.875px;
            margin: 13.125px 0 0 140.625px;
            z-index: 31;
            gap: 6px;
        }

        .image-8 {
            flex-shrink: 0;
            position: relative;
            width: 15px;
            height: 15px;
            background: url(${assetBase}tempalate1/gqTwxEswFV.png) no-repeat center;
            background-size: cover;
            z-index: 31;
        }

        .completed {
            flex-shrink: 0;
            position: relative;
            height: 16.875px;
            color: #64bb9b;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 16.875px;
            text-align: left;
            white-space: nowrap;
            z-index: 30;
        }

        .background {
            position: relative;
            width: 368.75px;
            height: 0.63px;
            margin: 23.125px 0 0 0;
            background: #ececec;
            z-index: 28;
        }

        .groups-9 {
            position: relative;
            width: 369.375px;
            height: auto;
            min-height: 243.75px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 12;
            overflow: visible auto;
        }

        .flex-row-c-a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 341.875px;
            height: 25px;
            margin: 26.875px 0 0 15px;
            z-index: 27;
        }

        .network {
            flex-shrink: 0;
            position: relative;
            height: 15px;
            color: #adb0b4;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 15px;
            text-align: left;
            white-space: nowrap;
            z-index: 27;
        }

        .button {
            flex-shrink: 0;
            position: relative;
            width: 36.875px;
            height: 25px;
            background: rgba(0, 0, 0, 0);
            z-index: 24;
        }

        .background-b {
            position: relative;
            width: 31.875px;
            height: 20px;
            margin: 3.125px 0 0 2.5px;
            background: url(${assetBase}tempalate1/nmkSCnhphG.png) no-repeat center;
            background-size: cover;
            z-index: 25;
        }

        .trx {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.875px;
            right: 4.375px;
            bottom: 4.375px;
            color: #d5c05c;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 11.875px;
            text-align: left;
            white-space: nowrap;
            z-index: 26;
        }

        .flex-row-ffa {
            position: relative;
            width: 337.5px;
            min-height: 37.5px;
            margin: 12.5px 0 0 14.375px;
            z-index: 23;
        }

        .tyfdwdhhzigjrc {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            width: 176.25px;
            min-height: 40.5px;
            right: 15px;
            bottom: 0;
            color: #4e4f52;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 16.943px;
            text-align: right;
            white-space: normal;
            word-break: break-all;
            overflow-wrap: break-word;
            text-overflow: unset;
            overflow: visible;
            z-index: 22;
        }

        .address {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.75px;
            right: 289.625px;
            bottom: 21.25px;
            color: #abaeb2;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 23;
        }

        .image-c {
            position: absolute;
            width: 10.625px;
            height: 11.875px;
            right: 0;
            bottom: 23.125px;
            background: url(${assetBase}tempalate1/KGZRJamQOK.png) no-repeat center;
            background-size: cover;
            z-index: 21;
        }

        .groups-d {
            position: relative;
            width: 369.375px;
            min-height: 53.125px;
            margin: 2.5px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 17;
        }

        .internal-transfer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            width: 175px;
            min-height: 36.25px;
            right: 31.875px;
            bottom: 5.625px;
            color: #58595c;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 17.695px;
            text-align: right;
            white-space: normal;
            word-break: break-all;
            overflow-wrap: break-word;
            text-overflow: unset;
            overflow: visible;
            z-index: 19;
        }

        .txid {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14.375px;
            right: 330.75px;
            bottom: 25.625px;
            color: #aaadb1;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 14.375px;
            text-align: left;
            white-space: nowrap;
            z-index: 20;
        }

        .image-e {
            position: absolute;
            width: 10.625px;
            height: 11.875px;
            right: 17.5px;
            bottom: 27.5px;
            background: url(${assetBase}tempalate1/9d7XRQmpwL.png) no-repeat center;
            background-size: cover;
            z-index: 18;
        }

        .flex-row-f {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 339.375px;
            height: 16.875px;
            margin: 13.125px 0 0 15.625px;
            z-index: 16;
        }

        .deposit-wallet {
            flex-shrink: 0;
            position: relative;
            height: 16.875px;
            color: #9c9fa4;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 16.875px;
            text-align: left;
            white-space: nowrap;
            z-index: 16;
        }

        .spot-wallet {
            flex-shrink: 0;
            position: relative;
            height: 16.25px;
            color: #4f4f52;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 16.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 15;
        }

        .flex-row-d {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 338.125px;
            height: 15.625px;
            margin: 20.625px 0 0 15.625px;
            z-index: 14;
        }

        .date {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #aaacb1;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 14;
        }

        .text-f {
            flex-shrink: 0;
            position: relative;
            height: 15.625px;
            color: #4f4f52;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 13;
        }

        .groups-f {
            position: relative;
            width: 341.875px;
            height: 84.375px;
            margin: 13.125px 0 0 13.125px;
            background: rgba(0, 0, 0, 0);
            z-index: 3;
            overflow: visible auto;
        }

        .background-10 {
            position: relative;
            width: 339.375px;
            height: 82.5px;
            margin: 1.875px 0 0 1.875px;
            background: #fefefe;
            border: 0.63px solid #eaeaea;
            z-index: 4;
            overflow: visible auto;
            border-radius: 11.875px;
        }

        .flex-row-bab {
            position: relative;
            width: 305.625px;
            height: 38.75px;
            margin: 16.25px 0 0 14.375px;
            z-index: 11;
        }

        .btc-usdt {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 16.875px;
            right: 229.375px;
            bottom: 21.875px;
            color: #434449;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 15.884px;
            text-align: left;
            white-space: nowrap;
            z-index: 11;
        }

        .image-11 {
            position: absolute;
            width: 36.875px;
            height: 37.5px;
            right: 0;
            bottom: 1.25px;
            background: url(${assetBase}tempalate1/cSjqdWrB24.png) no-repeat center;
            background-size: cover;
            z-index: 8;
        }

        .number-text {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 17.5px;
            right: 237.5px;
            bottom: 0;
            color: #58595d;
            font-family: Inter, var(--default-font-family);
            font-size: 15px;
            font-weight: 400;
            line-height: 17.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 10;
        }

        .percentage-text {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15.625px;
            right: 183.75px;
            bottom: 1.875px;
            color: #e07185;
            font-family: Inter, var(--default-font-family);
            font-size: 14.375px;
            font-weight: 400;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 9;
        }

        .flex-row-a {
            position: relative;
            width: 33.75px;
            height: 3.125px;
            margin: 12.5px 0 0 133.75px;
            z-index: 7;
        }

        .background-12 {
            position: absolute;
            width: 8.125px;
            height: 3.125px;
            right: 25.625px;
            bottom: 0;
            background: url(${assetBase}tempalate1/B2nEcnbCgU.png) no-repeat center;
            background-size: cover;
            z-index: 7;
        }

        .background-13 {
            position: absolute;
            width: 8.125px;
            height: 3.125px;
            right: 13.125px;
            bottom: 0;
            background: url(${assetBase}tempalate1/KZfPN1bZCN.png) no-repeat center;
            background-size: cover;
            z-index: 6;
        }

        .background-14 {
            position: absolute;
            width: 8.125px;
            height: 3.125px;
            right: 0;
            bottom: 0;
            background: url(${assetBase}tempalate1/q23esefv8g.png) no-repeat center;
            background-size: cover;
            z-index: 5;
        }

        .background-15 {
            position: relative;
            width: 131.875px;
            height: 4.375px;
            margin: 238.125px 0 0 118.75px;
            background: bcLjYNQKv1;
            background-size: cover;
            z-index: 1;
        }
      `}</style>

            <div className="main-container">
                <div className="root">
                    <div className="groups">
                        <span className="time">{formData.time || "8:03"}</span>
                        <div className="image"><span className="number">80</span></div>
                        <div className="image-1"></div>
                        <div className="image-2"></div>
                    </div>
                    <div className="groups-3">
                        <span className="deposit-details">Deposit Details</span>
                        <div className="image-4"></div>
                        <div className="image-5"></div>
                    </div>
                    <div className="groups-6">
                        <div className="groups-7">
                            <span className="plus-usdt">{formData.amount ? `+${formData.amount} USDT` : "+1,033 USDT"}</span>
                            <div className="flex-row-c">
                                <div className="image-8"></div>
                                <span className="completed">Completed</span>
                            </div>
                        </div>
                        <div className="background"></div>
                        <div className="groups-9">
                            <div className="flex-row-c-a">
                                <span className="network">Network</span>
                                <div className="button">
                                    <div className="background-b"><span className="trx">TRX</span></div>
                                </div>
                            </div>
                            <div className="flex-row-ffa">
                                <span className="tyfdwdhhzigjrc">{formData.sender || "TYF8dWd5HHZiGjrcVGVEUq1N4LpLnRDdix"}</span>
                                <span className="address">Address</span>
                                <div className="image-c"></div>
                            </div>
                            <div className="groups-d">
                                <span className="internal-transfer">{formData.receiver || "Internal transfer 132554919104"}</span>
                                <span className="txid">Txid</span>
                                <div className="image-e"></div>
                            </div>
                            <div className="flex-row-f">
                                <span className="deposit-wallet">Deposit Wallet</span><span className="spot-wallet">Spot Wallet</span>
                            </div>
                            <div className="flex-row-d">
                                <span className="date">Date</span><span className="text-f">{Dates.formatTemplate1(formData.date)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="background-15"></div>
                </div>
            </div>
        </>
    );
};

export default Template1;