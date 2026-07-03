import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import StatusBar from '../../shared/StatusBar';

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
                    justify-content: center;
                    gap: 6px;
                    position: relative;
                    width: auto;
                    height: 16.875px;
                    margin: 13.125px 0 0 0;
                    z-index: 31;
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

                /* ---------- REFACTORED FLEX DETAILS SECTION ---------- */
                .details-section {
                    width: 369.375px;
                    margin: 0;
                    padding: 26.875px 15px 0 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 12;
                }

                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .detail-label {
                    color: #aaadb1;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.125px;
                    font-weight: 400;
                    line-height: 1.4;
                    text-align: left;
                    white-space: nowrap;
                }

                .detail-value {
                    color: #4e4f52;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 1.4;
                    text-align: right;
                    word-break: break-word;
                    max-width: 210px;
                }

                /* Network row with TRX badge */
                .network-value-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .trx-badge {
                    width: 36.875px;
                    height: 25px;
                    background: rgba(0, 0, 0, 0);
                    position: relative;
                }

                .trx-bg {
                    position: relative;
                    width: 31.875px;
                    height: 20px;
                    margin: 3.125px 0 0 2.5px;
                    background: url(${assetBase}tempalate1/nmkSCnhphG.png) no-repeat center;
                    background-size: cover;
                }

                .trx-text {
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
                }

                /* Address row */
                .address-row {
                    align-items: flex-start;
                }

                .address-value-wrapper {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    max-width: 210px;
                }

                .address-text {
                    color: #4e4f52;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 1.5;
                    text-align: right;
                    word-break: break-all;
                }

                .copy-icon {
                    width: 10.625px;
                    height: 11.875px;
                    background: url(${assetBase}tempalate1/KGZRJamQOK.png) no-repeat center;
                    background-size: cover;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                /* Txid row */
                .txid-row {
                    align-items: flex-start;
                }

                .txid-value-wrapper {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    max-width: 210px;
                }

                .txid-text {
                    color: #58595c;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.125px;
                    font-weight: 400;
                    line-height: 1.5;
                    text-align: right;
                    word-break: break-all;
                }

                .txid-copy-icon {
                    width: 10.625px;
                    height: 11.875px;
                    background: url(${assetBase}tempalate1/9d7XRQmpwL.png) no-repeat center;
                    background-size: cover;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                /* Double label row (Deposit Wallet / Spot Wallet) */
                .double-label-row {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }

                .deposit-wallet-label {
                    color: #9c9fa4;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.125px;
                    font-weight: 400;
                    line-height: 1.4;
                }

                .spot-wallet-label {
                    color: #4f4f52;
                    font-family: Inter, var(--default-font-family);
                    font-size: 13.125px;
                    font-weight: 400;
                    line-height: 1.4;
                }

                /* Date row */
                .date-value {
                    color: #4f4f52;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 1.4;
                }

                /* Price info box (unchanged) */
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
                    background: url(${assetBase}tempalate1/bcLjYNQKv1.png) no-repeat center;
                    background-size: cover;
                    z-index: 1;
                }
            `}</style>

            <div className="main-container">
                <div className="root">
                    <StatusBar color="#262626" />
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

                        {/* ----- REFACTORED FLEX DETAILS ----- */}
                        <div className="details-section">
                            {/* Network */}
                            <div className="detail-row">
                                <span className="detail-label">Network</span>
                                <div className="network-value-wrapper">
                                    <div className="trx-badge">
                                        <div className="trx-bg"></div>
                                        <span className="trx-text">TRX</span>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="detail-row address-row">
                                <span className="detail-label">Address</span>
                                <div className="address-value-wrapper">
                                    <span className="address-text">{formData.sender || "TYF8dWd5HHZiGjrcVGVEUq1N4LpLnRDdix"}</span>
                                    <div className="copy-icon"></div>
                                </div>
                            </div>

                            {/* Txid */}
                            <div className="detail-row txid-row">
                                <span className="detail-label">Txid</span>
                                <div className="txid-value-wrapper">
                                    <span className="txid-text">{formData.receiver || "Internal transfer 132554919104"}</span>
                                    <div className="txid-copy-icon"></div>
                                </div>
                            </div>

                            {/* Deposit Wallet / Spot Wallet */}
                            <div className="double-label-row">
                                <span className="deposit-wallet-label">Deposit Wallet</span>
                                <span className="spot-wallet-label">Spot Wallet</span>
                            </div>

                            {/* Date */}
                            <div className="detail-row">
                                <span className="detail-label">Date</span>
                                <span className="date-value">{Dates.formatTemplate1(formData.date) || "2022-11-12 08:03:17"}</span>
                            </div>
                        </div>

                        {/* Price info box (unchanged) */}
                        {/* <div className="groups-f">
                            <div className="background-10">
                                <div className="flex-row-bab">
                                    <span className="btc-usdt">BTC/USDT</span>
                                    <div className="image-11"></div>
                                    <span className="number-text">16,875.5</span>
                                    <span className="percentage-text">+1.23%</span>
                                </div>
                                <div className="flex-row-a">
                                    <div className="background-12"></div>
                                    <div className="background-13"></div>
                                    <div className="background-14"></div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="background-15"></div>
                </div>
            </div>
        </>
    );
};

export default Template1;