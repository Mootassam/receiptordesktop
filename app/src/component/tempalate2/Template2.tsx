import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template2Props {
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

// Specific truncations based on your examples
const formatSender = (sender: string) => truncateString(sender, 10, 10);   // "TH98ybKh1R2...myLFwpEzMHV"
const formatReceiver = (receiver: string) => truncateString(receiver, 10, 10);
const formatTxid = (txid: string) => truncateString(txid, 6, 6);           // "8d53ba...c9954f"
const formatTokenAddress = (address: string) => truncateString(address, 5, 5); // "TR7NH...jLj6t"

const Template2: React.FC<Template2Props> = ({ formData }) => {
    // Prepare formatted values with fallbacks
    const senderFormatted = formatSender(formData.sender || "TH98ybKh1R2myLFwpEzMHV");
    const receiverFormatted = formatReceiver(formData.receiver || "TXoy99Kdfan3Yhc3usLGYa");
    const txidFormatted = formatTxid(formData.txid || "8d53bac9954f");
    // Token address: we use formData.sender again (as you requested) or fallback to "TR7NHjLj6t"
    const tokenAddress = formatTokenAddress(formData.sender || "TR7NHjLj6t");
    const tokenDisplay = `TRC20 ${tokenAddress}`;

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
            width: 368.75px;
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
            width: 368.75px;
            height: 553.125px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 3;
            overflow: visible auto;
        }

        .groups-1 {
            position: relative;
            width: 368.75px;
            height: 41.875px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 40;
        }

        .text {
            position: absolute;
            width: 165.625px;
            height: 35.625px;
            right: 103.75px;
            bottom: -0.63px;
            background: url(./tempalate2/mo58s7vb09.png) no-repeat center;
            background-size: cover;
            z-index: 38;
        }

        .background {
            position: relative;
            width: 163.75px;
            height: 33.75px;
            margin: 1.25px 0 0 1.875px;
            background: url(./tempalate2/BmaSRY39Jq.png) no-repeat center;
            background-size: cover;
            z-index: 39;
        }

        .image {
            position: absolute;
            width: 20.625px;
            height: 20.625px;
            right: 135.625px;
            bottom: 6.875px;
            background: url(./tempalate2/tpGif7AbjO.png) no-repeat center;
            background-size: cover;
            z-index: 47;
        }

        .image-2 {
            position: absolute;
            width: 18.125px;
            height: 8.75px;
            right: 9.375px;
            bottom: 12.5px;
            background: url(./tempalate2/QbjKuHwWAA.png) no-repeat center;
            background-size: cover;
            z-index: 46;
        }

        .time {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15.625px;
            right: 305.625px;
            bottom: 10px;
            color: #c5c5c5;
            font-family: Inter, var(--default-font-family);
            font-size: 14.375px;
            font-weight: 800;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 45;
        }

        .image-3 {
            position: absolute;
            width: 26.875px;
            height: 13.125px;
            right: 20px;
            bottom: 11.25px;
            background: url(./tempalate2/0QKFTcfKw3.png) no-repeat center;
            background-size: cover;
            z-index: 41;
        }

        .image-4 {
            position: absolute;
            width: 18.75px;
            height: 12.5px;
            right: 75.625px;
            bottom: 11.25px;
            background: url(./tempalate2/nOyVemaKtP.png) no-repeat center;
            background-size: cover;
            z-index: 43;
        }

        .image-5 {
            position: absolute;
            width: 16.875px;
            height: 12.5px;
            right: 52.5px;
            bottom: 11.25px;
            background: url(./tempalate2/78wZpjuGHw.png) no-repeat center;
            background-size: cover;
            z-index: 42;
        }

        .image-6 {
            position: absolute;
            width: 12.5px;
            height: 13.125px;
            right: 289.375px;
            bottom: 10.625px;
            background: url(./tempalate2/38jONjNWCo.png) no-repeat center;
            background-size: cover;
            z-index: 44;
        }

        .flex-row-fd {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 245.625px;
            height: 17.5px;
            margin: 10px 0 0 21.875px;
            z-index: 37;
        }

        .image-7 {
            flex-shrink: 0;
            position: relative;
            width: 6.25px;
            height: 11.875px;
            background: url(./tempalate2/yjwoQdZaU5.png) no-repeat center;
            background-size: cover;
            z-index: 37;
        }

        .transaction-details {
            flex-shrink: 0;
            position: relative;
            height: 17.5px;
            color: #dbdbdb;
            font-family: Inter, var(--default-font-family);
            font-size: 17.5px;
            font-weight: 400;
            line-height: 17.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 36;
        }

        .send {
            display: block;
            position: relative;
            height: 22.5px;
            margin: 36.25px 0 0 156.25px;
            color: #dfdfdf;
            font-family: Inter, var(--default-font-family);
            font-size: 21.875px;
            font-weight: 900;
            line-height: 22.5px;
            text-align: left;
            white-space: nowrap;
            z-index: 35;
        }

        .groups-8 {
            position: relative;
            width: 352.5px;
            height: 399.375px;
            margin: 23.75px 0 0 10.625px;
            background: rgba(0, 0, 0, 0);
            z-index: 4;
            overflow: visible auto;
        }

        .groups-9 {
            position: relative;
            width: 352.5px;
            height: 60px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 30;
            overflow: visible auto;
        }

        .background-a {
            position: relative;
            width: 339.375px;
            height: 57.5px;
            margin: 0.63px 0 0 3.75px;
            background: #1b1c1e;
            z-index: 31;
            border-radius: 5.625px;
        }

        .flex-column-e {
            position: absolute;
            width: 145.625px;
            height: 31.875px;
            right: 133.75px;
            bottom: 15px;
            font-size: 0px;
            z-index: 34;
        }

        .usdt {
            display: block;
            position: relative;
            height: 15px;
            margin: 0 0 0 0;
            color: #c5c6c7;
            font-family: Inter, var(--default-font-family);
            font-size: 15px;
            font-weight: 400;
            line-height: 15px;
            text-align: left;
            white-space: nowrap;
            z-index: 34;
        }

        .trc-trnh-jl {
            display: block;
            position: relative;
            height: 16.25px;
            margin: 0.63px 0 0 0;
            color: #888894;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 15.884px;
            text-align: left;
            white-space: nowrap;
            z-index: 33;
        }

        .image-b {
            position: absolute;
            width: 35px;
            height: 32.5px;
            right: 289.375px;
            bottom: 11.25px;
            background: url(./tempalate2/kufDOOS2sX.png) no-repeat center;
            background-size: cover;
            z-index: 32;
        }

        .groups-c {
            position: relative;
            width: 344.375px;
            height: 81.875px;
            margin: 11.25px 0 0 1.25px;
            background: rgba(0, 0, 0, 0);
            z-index: 24;
            overflow: visible auto;
        }

        .background-d {
            position: relative;
            width: 340px;
            height: 78.75px;
            margin: 0.63px 0 0 2.5px;
            background: #1c1c1e;
            z-index: 25;
            overflow: visible auto;
            border-radius: 5.625px;
        }

        .flex-row-da {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 311.25px;
            height: 16.25px;
            margin: 14.375px 0 0 14.375px;
            z-index: 29;
        }

        .status {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #c3c4c5;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 29;
        }

        .pending {
            flex-shrink: 0;
            position: relative;
            height: 16.25px;
            color: #c6444a;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 900;
            line-height: 16.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 28;
        }

        .flex-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 311.875px;
            height: 15px;
            margin: 16.25px 0 0 14.375px;
            z-index: 27;
        }

        .time-e {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #c3c4c5;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 900;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 27;
        }

        .text-9 {
            flex-shrink: 0;
            position: relative;
            height: 15px;
            color: #c0c1c3;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 700;
            line-height: 15px;
            text-align: left;
            white-space: nowrap;
            z-index: 26;
        }

        .groups-f {
            position: relative;
            width: 341.875px;
            height: 80px;
            margin: 10px 0 0 2.5px;
            background: rgba(0, 0, 0, 0);
            z-index: 16;
            overflow: visible auto;
        }

        .background-10 {
            position: relative;
            width: 340px;
            height: 78.75px;
            margin: 1.25px 0 0 1.25px;
            background: #1b1c1e;
            border: 0.63px solid #141414;
            z-index: 17;
            border-radius: 4.375px;
        }

        .flex-column-f {
            position: absolute;
            height: 48.125px;
            right: 32.5px;
            bottom: 15px;
            font-size: 0px;
            z-index: 22;
        }

        .thybkhr-my {
           display: flex;
    position: relative;
    justify-content: end;
            height: 16.25px;
            margin: 0px 0 0 17.5px;
            color: #cecfd0;
            font-family: Inter, var(--default-font-family);
                   font-size: 13.75px;

            font-weight: 700;
                    line-height: 16.25px;

            text-align: left;
            white-space: nowrap;
            z-index: 22;
        }

        .txoy-kdfan-y {
                      display: flex;
    position: relative;
    justify-content: end;
            height: 16.25px;
            margin: 15.625px 0 0 17.5px;
            color: #cbcccd;
            font-family: Inter, var(--default-font-family);
            font-size: 13.75px;
            font-weight: 700;
            line-height: 16.25px;
            text-align: left;
            white-space: nowrap;
            z-index: 20;
        }

        .flex-column-ccc {
            position: absolute;
            width: 34.375px;
            height: 45.625px;
            right: 290.625px;
            bottom: 16.875px;
            font-size: 0px;
            z-index: 23;
        }

        .from {
            display: block;
            position: relative;
            height: 13.75px;
            margin: 0 0 0 0;
            color: #c3c4c5;
            font-family: Inter, var(--default-font-family);
            font-size: 13.75px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 23;
        }

        .to {
            display: block;
            position: relative;
            height: 13.125px;
            margin: 18.75px 0 0 0;
            color: #c5c6c7;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 21;
        }

        .flex-column-f-11 {
            position: absolute;
            width: 13.125px;
            height: 45px;
            right: 12.5px;
            bottom: 15.625px;
            z-index: 19;
        }

        .image-12 {
            position: relative;
            width: 13.125px;
            height: 13.125px;
            margin: 0 0 0 0;
            background: url(./tempalate2/vLLGwTrqMD.png) no-repeat center;
            background-size: cover;
            z-index: 19;
        }

        .image-13 {
            position: relative;
            width: 13.125px;
            height: 12.5px;
            margin: 19.375px 0 0 0;
            background: url(./tempalate2/XubB4vemii.png) no-repeat center;
            background-size: cover;
            z-index: 18;
        }

        .groups-14 {
            position: relative;
            width: 343.75px;
            height: 82.5px;
            margin: 11.25px 0 0 1.25px;
            background: rgba(0, 0, 0, 0);
            z-index: 9;
            overflow: visible auto;
        }

        .background-15 {
            position: relative;
            width: 340px;
            height: 78.75px;
            margin: 3.125px 0 0 2.5px;
            background: #1b1c1e;
            z-index: 10;
            overflow: visible auto;
            border-radius: 5.625px;
        }

        .flex-row-e {
            position: relative;
            width: 312.5px;
            height: 15px;
            margin: 15px 0 0 14.375px;
            z-index: 15;
        }

        .txid {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.75px;
            right: 281.875px;
            bottom: 1.25px;
            color: #c6c7c7;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 15;
        }

        .dba-cf {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14.375px;
            right: 20px;
            bottom: 0.63px;
            color: #c2c3c3;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 900;
            line-height: 14.375px;
            text-align: left;
            white-space: nowrap;
            z-index: 14;
        }

        .image-16 {
            position: absolute;
            width: 13.125px;
            height: 12.5px;
            right: 0;
            bottom: 0;
            background: url(./tempalate2/Vm9NQF2iYL.png) no-repeat center;
            background-size: cover;
            z-index: 11;
        }

        .flex-row-ff {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 311.875px;
            height: 15.625px;
            margin: 16.875px 0 0 14.375px;
            z-index: 13;
        }

        .height {
            flex-shrink: 0;
            position: relative;
            height: 15.625px;
            color: #c4c4c4;
            font-family: Inter, var(--default-font-family);
            font-size: 13.75px;
            font-weight: 400;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 13;
        }

        .text-11 {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #c1c1c1;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 800;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 12;
        }

        .groups-17 {
            position: relative;
            width: 345px;
            height: 50px;
            margin: 12.5px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 5;
            overflow: visible auto;
        }

        .background-18 {
            position: relative;
            width: 340px;
            height: 46.875px;
            margin: 0.63px 0 0 3.75px;
            background: #1b1c1e;
            border: 0.63px solid #0f1012;
            z-index: 6;
            border-radius: 6.25px 3.75px 4.375px 6.25px;
        }

        .view-on-blockcha {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 16.25px;
            right: 146.25px;
            bottom: 15px;
            color: #cdcdcd;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 900;
            line-height: 15.128px;
            text-align: left;
            white-space: nowrap;
            z-index: 8;
        }

        .image-19 {
            position: absolute;
            width: 5.625px;
            height: 8.75px;
            right: 18.75px;
            bottom: 17.5px;
            background: url(./tempalate2/JrjhzV4TtK.png) no-repeat center;
            background-size: cover;
            z-index: 7;
        }

        .background-1a {
            position: relative;
            width: 131.25px;
            height: 4.375px;
            margin: 235.625px 0 0 118.75px;
            background: url(./tempalate2/Ee2iNnxYrV.png) no-repeat center;
            background-size: cover;
            z-index: 2;
        }

        .image-1b {
            position: absolute;
            width: 368.75px;
            height: 800px;
            right: 0;
            bottom: 0;
            background: #000;
            z-index: 1;
        }
      `}</style>

            <div className="main-container">
                <div className="root">
                    <div className="groups">
                        <div className="groups-1">
                            <div className="text">
                                <div className="background">
                                    <div className="image"></div>
                                    <div className="image-2"></div>
                                </div>
                            </div>
                            <span className="time">{formData.time || "5:21"}</span>
                            <div className="image-3"></div>
                            <div className="image-4"></div>
                            <div className="image-5"></div>
                            <div className="image-6"></div>
                        </div>
                        <div className="flex-row-fd">
                            <div className="image-7"></div>
                            <span className="transaction-details">Transaction Details</span>
                        </div>
                        <span className="send">Send</span>
                        <div className="groups-8">
                            <div className="groups-9">
                                <div className="background-a">
                                    <div className="flex-column-e">
                                        <span className="usdt">{formData.amount ? `-${formData.amount}USDT` : "-9USDT"}</span>
                                        <span className="trc-trnh-jl">{tokenDisplay}</span>
                                    </div>
                                    <div className="image-b"></div>
                                </div>
                            </div>
                            <div className="groups-c">
                                <div className="background-d">
                                    <div className="flex-row-da">
                                        <span className="status">Status</span><span className="pending">Pending</span>
                                    </div>
                                    <div className="flex-row">
                                        <span className="time-e">Time</span><span className="text-9">{Dates.formatTemplate2(formData.date)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="groups-f">
                                <div className="background-10">
                                    <div className="flex-column-f">
                                        <span className="thybkhr-my">{senderFormatted}</span>
                                        <span className="txoy-kdfan-y">{receiverFormatted}</span>
                                    </div>
                                    <div className="flex-column-ccc">
                                        <span className="from">From</span><span className="to">To</span>
                                    </div>
                                    <div className="flex-column-f-11">
                                        <div className="image-12"></div>
                                        <div className="image-13"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="groups-14">
                                <div className="background-15">
                                    <div className="flex-row-e">
                                        <span className="txid">TxID</span>
                                        <span className="dba-cf">{txidFormatted}</span>
                                        <div className="image-16"></div>
                                    </div>
                                    <div className="flex-row-ff">
                                        <span className="height">Height</span><span className="text-11">60512630</span>
                                    </div>
                                </div>
                            </div>
                            <div className="groups-17">
                                <div className="background-18">
                                    <span className="view-on-blockcha">View on Blockchain Explorer</span>
                                    <div className="image-19"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="background-1a"></div>
                </div>
                <div className="image-1b"></div>
            </div>
        </>
    );
};

export default Template2;