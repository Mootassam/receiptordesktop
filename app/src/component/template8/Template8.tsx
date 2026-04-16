import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template8Props {
    formData: FormData;
}

const Template8: React.FC<Template8Props> = ({ formData }) => {
    // Prepare dynamic values
    const amountDisplay = formData.amount ? `-${formData.amount}USDT` : "-88USDT";
    const amountNumber = formData.amount ? `${formData.amount} USDT` : "89 USDT";
    const receiverAddress = formData.receiver || "TB9ZZYYYmtjRPbMC5qWKpM7EKsVYML32ff";
    const txidValue = formData.txid || "f5f5f013857f2c065ed3b1d0e95a72620a1f6096b8c8ce985ff22cb203360334";
    const feeDisplay = formData.fee !== undefined ? `${formData.fee}USDT` : "15 USDT";
    const dateTimeDisplay = formData.date || "2026-01-28 02:12:57";

    return (
        <>
            <style>
                {`
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
            background: #fff
        }

        .groups {
            position: relative;
            width: 359.375px;
            height: 44.375px;
            margin: 0.63px 0 0 0;
            background: #fff ; 
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
            background: url(./template8/iG0WNOzkgh.png) no-repeat center;
            background-size: cover;
            z-index: 48;
        }

        .image-1 {
            position: absolute;
            width: 17.5px;
            height: 13.125px;
            right: 66.25px;
            bottom: 11.875px;
            background: url(./template8/kFJiTQqjQh.png) no-repeat center;
            background-size: cover;
            z-index: 49;
        }

        .image-2 {
            position: absolute;
            width: 13.75px;
            height: 13.75px;
            right: 278.75px;
            bottom: 11.25px;
            background: url(./template8/42pQHRWzCv.png) no-repeat center;
            background-size: cover;
            z-index: 52;
        }

        .image-3 {
            position: absolute;
            width: 13.75px;
            height: 10px;
            right: 259.375px;
            bottom: 13.125px;
            background: url(./template8/R8rmhQBaio.png) no-repeat center;
            background-size: cover;
            z-index: 51;
        }

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
            background: url(./template8/RiVeOcB2A4.png) no-repeat center;
            background-size: cover;
            z-index: 44;
        }

        .image-6 {
            position: absolute;
            width: 11.875px;
            height: 10px;
            right: 333.125px;
            bottom: 11.25px;
            background: url(./template8/9BN5H2wvw3.png) no-repeat center;
            background-size: cover;
            z-index: 46;
        }

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
    /* width: 75px; */
    height: 13.75px;
    margin: 10.625px 0 0 0px;
    z-index: 41;
        }

        .image-9 {
            flex-shrink: 0;
            position: relative;
            width: 12.5px;
            height: 11.875px;
            background: url(./template8/6q22e3hWd3.png) no-repeat center;
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
            width: 338.125px;
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

        .groups-a {
            position: relative;
            width: 359.375px;
            height: auto;
            min-height: 306.875px;
            margin: 9.375px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 7;
            overflow: visible auto;
        }

        .groups-b {
            position: relative;
            width: 359.375px;
            height: auto;
            min-height: 142.5px;
            margin: 3.125px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 24;
            overflow: visible auto;
        }

        .flex-row-b {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 335.625px;
            height: 11.25px;
            margin: 11.875px 0 0 12.5px;
            z-index: 35;
        }

        .network {
            flex-shrink: 0;
            position: relative;
            height: 11.25px;
            color: #a0a0a0;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 35;
        }

        .trx {
            flex-shrink: 0;
            position: relative;
            height: 11.25px;
            color: #525252;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 34;
        }

        .flex-row-cc {
            position: relative;
            min-height: 29.375px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 16.25px 0 0 0px;
            padding: 0 13px 0 11.875px;
            z-index: 33;
        }

        .tbzzyyymtjrpbbmc {
            display: flex;
            align-items: start;
            justify-content: flex-end;
            gap: 5px;
            width: 160px;
            min-height: 29.375px;
            bottom: 0;
            color: #5f5f5f;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 13.906px;
            text-align: right;
            white-space: pre-line;
            word-break: break-all;
            overflow-wrap: break-word;
            z-index: 32;
            overflow: visible;
        }

        .image-c {
            width: 10.625px;
            height: 11.25px;
            right: 0;
            bottom: 16.25px;
            background: url(./template8/f67YyS34ws.png) no-repeat center;
            background-size: cover;
            z-index: 31;
            flex-shrink: 0;
        }

        .address {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 10.625px;
            bottom: 16.25px;
            color: #9f9f9f;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 10.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 33;
        }

        .save-address {
            display: block;
            position: relative;
            height: 11.25px;
            margin: 5px 0 0 268.75px;
            color: #cbbc71;
            font-family: Inter, var(--default-font-family);
            font-size: 8.75px;
            font-weight: 400;
            line-height: 10.589px;
            text-align: left;
            white-space: nowrap;
            z-index: 30;
        }

        .flex-row-eeb {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            min-height: 13.75px;
            margin: 10px 0 0 0px;
            padding: 0 13px 0 11.875px;
            z-index: 29;
        }

        .txid {
            flex-shrink: 0;
            position: relative;
            height: 11.25px;
            color: #a1a1a1;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 29;
        }

        .f5f5f013857f2c065ed3b1d0e95 {
            flex-shrink: 1;
            position: relative;
            min-height: 13.75px;
            color: #595959;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: right;
            white-space: pre-line;
            word-break: break-all;
            overflow-wrap: break-word;
            display: flex;
            gap: 5px;
            align-items: start;
            z-index: 28;
            max-width: 161px;
        }

        .flex-row-b-d {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 173.75px;
            height: 13.75px;
            margin: 1.25px 0 0 172.5px;
            z-index: 27;
        }

        .aa {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #626262;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 27;
        }

        .image-e {
            flex-shrink: 0;
            position: relative;
            width: 10.625px;
            height: 10.625px;
            background: url(./template8/epYNUnQLk7.png) no-repeat center;
            background-size: cover;
            z-index: 26;
        }

        .cb {
            display: block;
            position: relative;
            height: 13.125px;
            margin: 1.25px 0 0 257.5px;
            color: #585858;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 12.102px;
            text-align: left;
            white-space: nowrap;
            z-index: 25;
        }

        .groups-f {
            position: absolute;
            width: 359.375px;
            height: 28.125px;
            right: 0;
            bottom: 130px;
            background: rgba(0, 0, 0, 0);
            z-index: 21;
        }

        .usdt-10 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.25px;
            right: 11.25px;
            bottom: 8.75px;
            color: #595959;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 22;
        }

        .amount {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.25px;
            right: 311.875px;
            bottom: 8.125px;
            color: #9e9e9e;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 23;
        }

        .groups-11 {
            position: absolute;
            width: 359.375px;
            height: 134.375px;
            right: 0;
            bottom: 22.5px;
            background: rgba(0, 0, 0, 0);
            z-index: 11;
        }

        .groups-12 {
            position: relative;
            width: 359.375px;
            height: 28.75px;
            margin: 27.5px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 18;
        }

        .usdt-13 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.25px;
            right: 11.25px;
            bottom: 8.75px;
            color: #626262;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 19;
        }

        .network-fee {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.25px;
            right: 291px;
            bottom: 8.125px;
            color: #a9a9a9;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 20;
        }

        .groups-14 {
            position: relative;
            width: 359.375px;
            height: 28.125px;
            margin: 1.25px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 15;
        }

        .spot-wallet {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 12.5px;
            right: 10.625px;
            bottom: 7.5px;
            color: #5b5b5b;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 12.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 16;
        }

        .wallet {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.25px;
            right: 318.625px;
            bottom: 8.75px;
            color: #9f9f9f;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 17;
        }

        .groups-15 {
            position: relative;
            width: 359.375px;
            height: 30px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 12;
        }

        .date-time {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.875px;
            right: 11.25px;
            bottom: 9.375px;
            color: #5b5b5b;
            font-family: Inter, var(--default-font-family);
            font-size: 10.625px;
            font-weight: 400;
            line-height: 11.875px;
            text-align: left;
            white-space: nowrap;
            z-index: 13;
        }

        .date {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11.25px;
            right: 327.125px;
            bottom: 10px;
            color: #a2a2a2;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 11.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 14;
        }

        .groups-16 {
            position: absolute;
            width: 359.375px;
            height: 34.375px;
            right: 0;
            bottom: 4.375px;
            background: rgba(0, 0, 0, 0);
            z-index: 8;
        }

        .image-17 {
            position: absolute;
            width: 11.875px;
            height: 11.25px;
            right: 201.875px;
            bottom: 11.875px;
            background: url(./template8/6ckR8Ndn4m.png) no-repeat center;
            background-size: cover;
            z-index: 10;
        }

        .scam-report {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 11px;
            right: 144.375px;
            bottom: 11.5px;
            color: #a0a0a0;
            font-family: Inter, var(--default-font-family);
            font-size: 8.75px;
            font-weight: 700;
            line-height: 10.589px;
            text-align: left;
            white-space: nowrap;
            z-index: 9;
        }

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
            background: url(./template8/BmSwgtXRFJ.png) no-repeat center;
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
        }`}
            </style>

            <div className="main-container">
                <div className="groups">
                    <span className="time-stamp">{formData.time || "2:14"}</span>
                    <span className="lte">LTE</span>
                    <div className="image"></div>
                    <div className="image-1"></div>
                    <div className="image-2"></div>
                    <div className="image-3"></div>
                </div>
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
                        <span className="crypto-transferr">Crypto transferred out of Binance. Please contact the recipient
                            platform for your<br />transaction receipt.</span>
                        <span className="why-hasnt-my-wi">Why hasn't my withdrawal arrived?</span>
                    </div>
                    <div className="background"></div>
                    <div className="groups-a">
                        <div className="groups-b">
                            <div className="flex-row-b">
                                <span className="network">Network</span>
                                <span className="trx">TRX</span>
                            </div>
                            <div className="flex-row-cc">
                                <span className="address">Address</span>
                                <span className="tbzzyyymtjrpbbmc">
                                    {receiverAddress}
                                    <div className="image-c"></div>
                                </span>
                            </div>
                            <span className="save-address">Save Address</span>
                            <div className="flex-row-eeb">
                                <span className="txid">Txid</span>
                                <span className="f5f5f013857f2c065ed3b1d0e95">
                                    {txidValue}
                                    <div className="image-e"></div>
                                </span>
                            </div>
                        </div>
                        <div className="groups-f">
                            <span className="usdt-10">{amountNumber}</span>
                            <span className="amount">Amount</span>
                        </div>
                        <div className="groups-11">
                            <div className="groups-12">
                                <span className="usdt-13">{formData.fee || 1}USDT</span>
                                <span className="network-fee">Network fee</span>
                            </div>
                            <div className="groups-14">
                                <span className="spot-wallet">Spot Wallet</span>
                                <span className="wallet">Wallet</span>
                            </div>
                            <div className="groups-15">
                                <span className="date-time">{Dates.formatTemplate8(formData.date)}</span>
                                <span className="date">Date</span>
                            </div>
                        </div>
                        <div className="groups-16">
                            <div className="image-17"></div>
                            <span className="scam-report">Scam Report</span>
                        </div>
                    </div>
                </div>
                <div className="button">
                    <div className="background-18">
                        <span className="withdraw-again">Withdraw Again</span>
                    </div>
                </div>
                <div className="background-19"></div>
                <div className="image-1a"></div>
                <div className="image-1b"></div>
            </div>
        </>
    );
};

export default Template8;