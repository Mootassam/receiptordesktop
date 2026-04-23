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

const formatSender = (sender: string) => truncateString(sender, 10, 10);
const formatReceiver = (receiver: string) => truncateString(receiver, 10, 10);
const formatTxid = (txid: string) => truncateString(txid, 6, 6);
const formatTokenAddress = (address: string) => truncateString(address, 5, 5);

const Template2: React.FC<Template2Props> = ({ formData }) => {
    const assetBase = window.location.protocol === "file:" ? "./" : "/";

    const senderFormatted = formatSender(formData.sender || "TH98ybKh1R2myLFwpEzMHV");
    const receiverFormatted = formatReceiver(formData.receiver || "TXoy99Kdfan3Yhc3usLGYa");
    const txidFormatted = formatTxid(formData.txid || "8d53bac9954f");
    const tokenAddress = formatTokenAddress(formData.sender || "TR7NHjLj6t");
    const tokenDisplay = `TRC20 ${tokenAddress}`;
    const displayHeight = formData.height || "60512630";

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

                input, select, textarea, button {
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
                    overflow: visible;
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
                    background: url(${assetBase}tempalate2/mo58s7vb09.png) no-repeat center;
                    background-size: cover;
                    z-index: 38;
                }

                .background {
                    position: relative;
                    width: 163.75px;
                    height: 33.75px;
                    margin: 1.25px 0 0 1.875px;
                    background: url(${assetBase}tempalate2/BmaSRY39Jq.png) no-repeat center;
                    background-size: cover;
                    z-index: 39;
                }

                .image {
                    position: absolute;
                    width: 20.625px;
                    height: 20.625px;
                    right: 135.625px;
                    bottom: 6.875px;
                    background: url(${assetBase}tempalate2/tpGif7AbjO.png) no-repeat center;
                    background-size: cover;
                    z-index: 47;
                }

                .image-2 {
                    position: absolute;
                    width: 18.125px;
                    height: 8.75px;
                    right: 9.375px;
                    bottom: 12.5px;
                    background: url(${assetBase}tempalate2/QbjKuHwWAA.png) no-repeat center;
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
                    background: url(${assetBase}tempalate2/0QKFTcfKw3.png) no-repeat center;
                    background-size: cover;
                    z-index: 41;
                }

                .image-4 {
                    position: absolute;
                    width: 18.75px;
                    height: 12.5px;
                    right: 75.625px;
                    bottom: 11.25px;
                    background: url(${assetBase}tempalate2/nOyVemaKtP.png) no-repeat center;
                    background-size: cover;
                    z-index: 43;
                }

                .image-5 {
                    position: absolute;
                    width: 16.875px;
                    height: 12.5px;
                    right: 52.5px;
                    bottom: 11.25px;
                    background: url(${assetBase}tempalate2/78wZpjuGHw.png) no-repeat center;
                    background-size: cover;
                    z-index: 42;
                }

                .image-6 {
                    position: absolute;
                    width: 12.5px;
                    height: 13.125px;
                    right: 289.375px;
                    bottom: 10.625px;
                    background: url(${assetBase}tempalate2/38jONjNWCo.png) no-repeat center;
                    background-size: cover;
                    z-index: 44;
                }

                .flex-row-fd {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 8px;
                    position: relative;
                    width: auto;
                    height: 17.5px;
                    margin: 10px 0 0 21.875px;
                    z-index: 37;
                }

                .image-7 {
                    flex-shrink: 0;
                    width: 6.25px;
                    height: 11.875px;
                    background: url(${assetBase}tempalate2/yjwoQdZaU5.png) no-repeat center;
                    background-size: cover;
                }

                .transaction-details {
                    flex-shrink: 0;
                    color: #dbdbdb;
                    font-family: Inter, var(--default-font-family);
                    font-size: 17.5px;
                    font-weight: 400;
                    line-height: 17.5px;
                    white-space: nowrap;
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

                /* Groups-8: no fixed width/height, only margin and padding */
                .groups-8 {
                    margin-top: 23.75px;
                    padding-left: 10.625px;
                    padding-right: 10.625px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 4;
                }

                /* Amount box */
                .groups-9 {
                    width: 100%;
                    height: 60px;
                    margin: 0 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 30;
                }

                .background-a {
                    width: 100%;
                    height: 57.5px;
                    background: #1b1c1e;
                    border-radius: 5.625px;
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                }

                .amount-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                .amount-left {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .image-b {
                    width: 35px;
                    height: 32.5px;
                    background: url(${assetBase}tempalate2/kufDOOS2sX.png) no-repeat center;
                    background-size: cover;
                }

                .amount-text {
                    display: flex;
                    flex-direction: column;
                }

                .usdt {
                    color: #c5c6c7;
                    font-family: Inter, var(--default-font-family);
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.2;
                }

                .trc-trnh-jl {
                    color: #888894;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.125px;
                    font-weight: 400;
                    line-height: 1.2;
                }

                /* Status/Time box */
                .groups-c {
                    width: 100%;
                    margin-top: 11.25px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 24;
                }

                .background-d {
                    width: 100%;
                    background: #1c1c1e;
                    border-radius: 5.625px;
                    padding: 14px 14px;
                }

                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .detail-label {
                    color: #c3c4c5;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 1.4;
                }

                .detail-value {
                    color: #c0c1c3;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.125px;
                    font-weight: 700;
                    line-height: 1.4;
                    text-align: right;
                }

                .pending-value {
                    color: #c6444a;
                    font-weight: 900;
                }

                .status-row {
                    margin-bottom: 16px;
                }

                /* From/To box */
                .groups-f {
                    width: 100%;
                    margin-top: 10px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 16;
                }

                .background-10 {
                    width: 100%;
                    background: #1b1c1e;
                    border: 0.63px solid #141414;
                    border-radius: 4.375px;
                    padding: 15px 14px;
                }

                .fromto-row {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .address-line {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .address-label {
                    color: #c3c4c5;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.75px;
                    font-weight: 400;
                    line-height: 1.2;
                    white-space: nowrap;
                }

                .address-value-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .address-value {
                    color: #cecfd0;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.75px;
                    font-weight: 700;
                    line-height: 1.2;
                    text-align: right;
                    word-break: break-all;
                    max-width: 200px;
                }

                .copy-icon {
                    width: 13.125px;
                    height: 13.125px;
                    background: url(${assetBase}tempalate2/vLLGwTrqMD.png) no-repeat center;
                    background-size: cover;
                    flex-shrink: 0;
                }

                .copy-icon-2 {
                    width: 13.125px;
                    height: 12.5px;
                    background: url(${assetBase}tempalate2/XubB4vemii.png) no-repeat center;
                    background-size: cover;
                    flex-shrink: 0;
                }

                /* TxID/Height box */
                .groups-14 {
                    width: 100%;
                    margin-top: 11.25px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 9;
                }

                .background-15 {
                    width: 100%;
                    background: #1b1c1e;
                    border-radius: 5.625px;
                    padding: 15px 14px;
                }

                .txid-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .txid-value-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .txid-copy-icon {
                    width: 13.125px;
                    height: 12.5px;
                    background: url(${assetBase}tempalate2/Vm9NQF2iYL.png) no-repeat center;
                    background-size: cover;
                    flex-shrink: 0;
                }

                .height-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* Button */
                .groups-17 {
                    width: 100%;
                    margin-top: 12.5px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 5;
                }

                .background-18 {
                    width: 100%;
                    height: 46.875px;
                    background: #1b1c1e;
                    border: 0.63px solid #0f1012;
                    border-radius: 6.25px 3.75px 4.375px 6.25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .view-on-blockcha {
                    color: #cdcdcd;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 900;
                    line-height: 15.128px;
                    white-space: nowrap;
                }

                .image-19 {
                    position: absolute;
                    width: 5.625px;
                    height: 8.75px;
                    right: 18.75px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: url(${assetBase}tempalate2/JrjhzV4TtK.png) no-repeat center;
                    background-size: cover;
                }

                .background-1a {
                    position: relative;
                    width: 131.25px;
                    height: 4.375px;
                    margin: 235.625px 0 0 118.75px;
                    background: url(${assetBase}tempalate2/Ee2iNnxYrV.png) no-repeat center;
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

                        {/* Groups-8 with only margin/padding */}
                        <div className="groups-8">
                            {/* Amount box */}
                            <div className="groups-9">
                                <div className="background-a">
                                    <div className="amount-content">
                                        <div className="amount-left">
                                            <div className="image-b"></div>
                                            <div className="amount-text">
                                                <span className="usdt">{formData.amount ? `-${formData.amount}USDT` : "-9USDT"}</span>
                                                <span className="trc-trnh-jl">{tokenDisplay}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status / Time */}
                            <div className="groups-c">
                                <div className="background-d">
                                    <div className="detail-row status-row">
                                        <span className="detail-label">Status</span>
                                        <span className="detail-value pending-value">Pending</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Time</span>
                                        <span className="detail-value">{Dates.formatTemplate2(formData.date) || "2024-04-09 10:15:22"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* From / To - each line with label, value, copy icon */}
                            <div className="groups-f">
                                <div className="background-10">
                                    <div className="fromto-row">
                                        {/* From line */}
                                        <div className="address-line">
                                            <span className="address-label">From</span>
                                            <div className="address-value-wrapper">
                                                <span className="address-value">{senderFormatted}</span>
                                                <div className="copy-icon"></div>
                                            </div>
                                        </div>
                                        {/* To line */}
                                        <div className="address-line">
                                            <span className="address-label">To</span>
                                            <div className="address-value-wrapper">
                                                <span className="address-value">{receiverFormatted}</span>
                                                <div className="copy-icon-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TxID / Height */}
                            <div className="groups-14">
                                <div className="background-15">
                                    <div className="txid-row">
                                        <span className="detail-label">TxID</span>
                                        <div className="txid-value-wrapper">
                                            <span className="detail-value">{txidFormatted}</span>
                                            <div className="txid-copy-icon"></div>
                                        </div>
                                    </div>
                                    <div className="height-row">
                                        <span className="detail-label">Height</span>
                                        <span className="detail-value">{displayHeight}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
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